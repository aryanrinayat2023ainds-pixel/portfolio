import { ImageResponse } from "next/og";

export const alt = "Aryan Rinayat — AI & Data Science student at MMCOE, Pune";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Deterministic scatter so the image is stable between builds.
const dots = Array.from({ length: 70 }, (_, i) => {
  const cx = [880, 1010, 940][i % 3];
  const cy = [200, 330, 470][i % 3];
  const a = (i * 137.5 * Math.PI) / 180;
  const r = 18 + ((i * 29) % 70);
  return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.8 };
});

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0b0c10",
          color: "#eceae4",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        {dots.map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              width: 7,
              height: 7,
              borderRadius: 7,
              background: i % 9 === 0 ? "#ff7a45" : "rgba(236,234,228,0.35)",
            }}
          />
        ))}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, letterSpacing: 4, color: "#8a8d96", fontFamily: "monospace" }}>
            <div style={{ width: 14, height: 14, borderRadius: 14, background: "#ff7a45" }} />
            PORTFOLIO
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 120, lineHeight: 1, display: "flex", gap: 28 }}>
              <span>Aryan</span>
              <span style={{ color: "#ff7a45", fontStyle: "italic" }}>Rinayat</span>
            </div>
            <div style={{ marginTop: 28, fontSize: 36, color: "#b4b6bd", fontFamily: "sans-serif" }}>
              AI &amp; Data Science · MMCOE, Pune
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
