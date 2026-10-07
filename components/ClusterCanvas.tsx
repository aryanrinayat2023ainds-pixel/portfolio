"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Pt = { x: number; y: number; c: number };
type Centroid = { x: number; y: number; tx: number; ty: number };

const K = 4;
const N = 160;
const STEP_MS = 850;
const REST_MS = 2600;

function gaussian() {
  // Box–Muller
  let u = 0;
  let v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/** Points in normalised [0,1] space, drawn from K loose blobs. */
function makeData(): Pt[] {
  const blobs = Array.from({ length: K }, () => ({
    x: 0.15 + Math.random() * 0.7,
    y: 0.15 + Math.random() * 0.7,
    s: 0.06 + Math.random() * 0.06,
  }));
  return Array.from({ length: N }, (_, i) => {
    const b = blobs[i % K];
    return {
      x: Math.min(0.97, Math.max(0.03, b.x + gaussian() * b.s)),
      y: Math.min(0.97, Math.max(0.03, b.y + gaussian() * b.s)),
      c: -1,
    };
  });
}

function initCentroids(pts: Pt[]): Centroid[] {
  // Random distinct points (Forgy init) — deliberately naive so the iterations are visible.
  const picks = new Set<number>();
  while (picks.size < K) picks.add(Math.floor(Math.random() * pts.length));
  return [...picks].map((i) => ({ x: pts[i].x, y: pts[i].y, tx: pts[i].x, ty: pts[i].y }));
}

/** One Lloyd iteration. Returns how many points changed cluster, plus inertia. */
function step(pts: Pt[], cs: Centroid[]) {
  let changed = 0;
  let inertia = 0;
  for (const p of pts) {
    let best = 0;
    let bestD = Infinity;
    cs.forEach((c, i) => {
      const d = (p.x - c.tx) ** 2 + (p.y - c.ty) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    if (p.c !== best) changed++;
    p.c = best;
    inertia += bestD;
  }
  cs.forEach((c, i) => {
    let sx = 0;
    let sy = 0;
    let n = 0;
    for (const p of pts)
      if (p.c === i) {
        sx += p.x;
        sy += p.y;
        n++;
      }
    if (n) {
      c.tx = sx / n;
      c.ty = sy / n;
    }
  });
  return { changed, inertia };
}

export function ClusterCanvas() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const state = useRef({ pts: [] as Pt[], cs: [] as Centroid[], hover: -1, converged: false });
  const [hud, setHud] = useState({ iter: 0, inertia: 0, converged: false });
  const reseedRef = useRef<() => void>(() => {});

  const reseed = useCallback(() => reseedRef.current(), []);

  useEffect(() => {
    const cv = canvas.current!;
    const box = wrap.current!;
    const ctx = cv.getContext("2d")!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let timer = 0;
    let visible = true;
    let iter = 0;
    let colors = { dot: "", accent: "", line: "" };

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      colors = {
        dot: s.getPropertyValue("--dot").trim(),
        accent: s.getPropertyValue("--accent").trim(),
        line: s.getPropertyValue("--line-strong").trim(),
      };
    };

    const resize = () => {
      const r = box.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      const { pts, cs, hover } = state.current;
      ctx.clearRect(0, 0, w, h);
      const pad = 18;
      const X = (v: number) => pad + v * (w - pad * 2);
      const Y = (v: number) => pad + v * (h - pad * 2);

      // spokes from each point to its centroid
      ctx.lineWidth = 1;
      for (const p of pts) {
        if (p.c < 0) continue;
        const c = cs[p.c];
        ctx.strokeStyle = p.c === hover ? colors.accent : colors.line;
        ctx.globalAlpha = p.c === hover ? 0.55 : 0.5;
        ctx.beginPath();
        ctx.moveTo(X(p.x), Y(p.y));
        ctx.lineTo(X(c.x), Y(c.y));
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      for (const p of pts) {
        ctx.fillStyle = p.c === hover && hover >= 0 ? colors.accent : colors.dot;
        ctx.beginPath();
        ctx.arc(X(p.x), Y(p.y), 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // centroids: ring + cross
      for (const c of cs) {
        const cx = X(c.x);
        const cy = Y(c.y);
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(cx, cy, 9, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - 4, cy);
        ctx.lineTo(cx + 4, cy);
        ctx.moveTo(cx, cy - 4);
        ctx.lineTo(cx, cy + 4);
        ctx.stroke();
      }
    };

    // Centroids glide toward their targets between iterations.
    const animate = () => {
      raf = 0;
      let moving = false;
      for (const c of state.current.cs) {
        const dx = c.tx - c.x;
        const dy = c.ty - c.y;
        if (Math.abs(dx) + Math.abs(dy) > 0.0005) moving = true;
        c.x += dx * 0.12;
        c.y += dy * 0.12;
      }
      draw();
      if (moving && visible) raf = requestAnimationFrame(animate);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(animate);
    };

    const tick = () => {
      if (!visible) return;
      const s = state.current;
      if (s.converged) {
        newRun();
        return;
      }
      const { changed, inertia } = step(s.pts, s.cs);
      iter++;
      s.converged = changed === 0;
      setHud({ iter, inertia, converged: s.converged });
      kick();
      timer = window.setTimeout(tick, s.converged ? REST_MS : STEP_MS);
    };

    const newRun = () => {
      clearTimeout(timer);
      const pts = makeData();
      const cs = initCentroids(pts);
      state.current = { pts, cs, hover: -1, converged: false };
      iter = 0;
      if (reduced) {
        let r = { changed: 1, inertia: 0 };
        while (r.changed && iter < 50) {
          r = step(pts, cs);
          iter++;
        }
        cs.forEach((c) => {
          c.x = c.tx;
          c.y = c.ty;
        });
        state.current.converged = true;
        setHud({ iter, inertia: r.inertia, converged: true });
        draw();
        return;
      }
      setHud({ iter: 0, inertia: 0, converged: false });
      draw();
      timer = window.setTimeout(tick, STEP_MS);
    };
    reseedRef.current = newRun;

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      const pad = 18;
      const x = (e.clientX - r.left - pad) / (r.width - pad * 2);
      const y = (e.clientY - r.top - pad) / (r.height - pad * 2);
      let best = -1;
      let bestD = Infinity;
      state.current.cs.forEach((c, i) => {
        const d = (x - c.x) ** 2 + (y - c.y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      if (best !== state.current.hover) {
        state.current.hover = best;
        draw();
      }
    };
    const onLeave = () => {
      state.current.hover = -1;
      draw();
    };

    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting && !document.hidden;
      if (visible && !was && !reduced) {
        clearTimeout(timer);
        timer = window.setTimeout(tick, STEP_MS);
        kick();
      }
    });
    const onVis = () => {
      visible = !document.hidden;
      if (visible && !reduced) {
        clearTimeout(timer);
        timer = window.setTimeout(tick, STEP_MS);
      }
    };
    const onTheme = () => {
      requestAnimationFrame(() => {
        readColors();
        draw();
      });
    };

    readColors();
    const ro = new ResizeObserver(resize);
    ro.observe(box);
    io.observe(box);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("themechange", onTheme);
    newRun();

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("themechange", onTheme);
    };
  }, []);

  return (
    <figure className="card relative flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="label flex items-center gap-2">
          <span className="pulse-dot inline-block size-1.5 rounded-full bg-accent" aria-hidden />
          k-means · live
        </p>
        <p className="label tabular-nums" aria-live="off">
          k={K} · iter {String(hud.iter).padStart(2, "0")}
          <span className="hidden sm:inline"> · inertia {hud.inertia.toFixed(2)}</span>
        </p>
      </div>
      <div ref={wrap} className="relative min-h-[260px] flex-1">
        <canvas
          ref={canvas}
          onClick={reseed}
          role="img"
          aria-label="Animated k-means clustering: 160 random points are grouped into 4 clusters as the centroids move to the mean of their assigned points."
          className="absolute inset-0 size-full cursor-crosshair"
        />
      </div>
      <figcaption className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-ink-3">
        <span>{hud.converged ? "Converged — no point changed cluster." : "Assign each point to its nearest centroid, then move centroids to the mean."}</span>
        <button
          type="button"
          onClick={reseed}
          className="shrink-0 rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-ink-2 transition-colors hover:border-accent hover:text-accent"
        >
          Reseed
        </button>
      </figcaption>
    </figure>
  );
}
