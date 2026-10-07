import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center px-4">
      <div className="text-center">
        <p className="label">404 · Not found</p>
        <h1 className="mt-4 font-serif text-6xl text-ink">
          This point is an <span className="italic text-accent">outlier.</span>
        </h1>
        <p className="mt-4 text-ink-2">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink">
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
