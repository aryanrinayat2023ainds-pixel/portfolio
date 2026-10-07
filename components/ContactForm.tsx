"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { ArrowRight, Check } from "./Icons";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

const field =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent";

/**
 * Sends messages through FormSubmit (https://formsubmit.co) — no backend or API key required.
 * The very first submission triggers a one-time activation email to `site.email`.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) return; // bot

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setStatus({ kind: "error", message: "Please fill in your name, email and message." });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio message from ${name}`,
          _replyto: email,
          _template: "table",
          _captcha: "false",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
      if (res.ok && String(json.success) === "true") {
        setStatus({ kind: "sent" });
        form.reset();
      } else {
        setStatus({ kind: "error", message: json.message || "The message couldn't be sent." });
      }
    } catch {
      setStatus({ kind: "error", message: "Network error — the message couldn't be sent." });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="card flex flex-col items-start gap-4 p-8">
        <span className="grid size-11 place-items-center rounded-full bg-accent-soft text-accent">
          <Check />
        </span>
        <h3 className="font-serif text-3xl text-ink">Message sent.</h3>
        <p className="text-ink-2">Thanks for reaching out — I&apos;ll reply to the email you provided.</p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="text-sm text-accent underline-offset-4 hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="label mb-2 block">Name</span>
          <input name="name" required autoComplete="name" maxLength={100} placeholder="Your name" className={field} />
        </label>
        <label className="block">
          <span className="label mb-2 block">Email</span>
          <input name="email" type="email" required autoComplete="email" maxLength={200} placeholder="you@company.com" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="label mb-2 block">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="An internship, a project, a hackathon team — what's on your mind?"
          className={`${field} resize-y`}
        />
      </label>
      {/* honeypot */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="flex flex-col-reverse items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-3">
          Or email directly:{" "}
          <a href={`mailto:${site.email}`} className="text-ink-2 underline-offset-4 hover:text-accent hover:underline">
            {site.email}
          </a>
        </p>
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
        >
          {status.kind === "sending" ? "Sending…" : "Send message"}
          <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {status.kind === "error" && (
        <p role="alert" className="rounded-xl border border-accent/40 bg-accent-soft px-4 py-3 text-sm text-ink">
          {status.message}{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-accent underline underline-offset-4">
            Email me instead
          </a>
          .
        </p>
      )}
    </form>
  );
}
