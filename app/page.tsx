import Link from "next/link";

export default function DesignSystemHome() {
  return (
    <main className="min-h-screen bg-surface-base px-6 py-10">
      <div style={{ maxWidth: "var(--width-wide)" }} className="mx-auto">
        <p className="type-subheading mb-2">Portal WX</p>
        <h1 className="type-display mb-4">Design System</h1>
        <p className="type-body max-w-xl mb-4">
          Token layer, component library, and showcase for Portal WX (Sharry).
        </p>
        <Link
          href="/components"
          className="inline-flex items-center gap-2 rounded bg-signature px-4 py-2 text-sm font-medium text-ink-inverse transition-colors hover:bg-brand-d2"
        >
          Browse Components
        </Link>

        {/* Surface tokens */}
        <section className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "surface-base", cls: "bg-surface-base border border-border-default" },
            { label: "surface-raised", cls: "bg-surface-raised border border-border-default" },
            { label: "surface-subtle", cls: "bg-surface-subtle border border-border-default" },
            { label: "surface-overlay", cls: "bg-surface-overlay border border-border-default" },
          ].map(({ label, cls }) => (
            <div key={label} className={`${cls} rounded-xl p-4`}>
              <p className="type-caption">{label}</p>
            </div>
          ))}
        </section>

        {/* Brand scale */}
        <section className="mt-6 flex flex-wrap gap-3">
          {[
            { label: "Signature", cls: "bg-signature" },
            { label: "D1", cls: "bg-brand-d1" },
            { label: "D2", cls: "bg-brand-d2" },
            { label: "L1", cls: "bg-brand-l1" },
            { label: "L2", cls: "bg-brand-l2 border border-border-default" },
          ].map(({ label, cls }) => (
            <div key={label} className={`${cls} rounded-xl px-4 py-3`}>
              <p className="type-caption text-ink-inverse mix-blend-difference">{label}</p>
            </div>
          ))}
        </section>

        {/* Typography scale */}
        <section className="mt-10 bg-surface-raised rounded-xl p-6 border border-border-default space-y-4">
          <p className="type-subheading mb-4">Typography</p>
          <p className="type-display">Display — Page title</p>
          <p className="type-heading">Heading — Widget title</p>
          <p className="type-subheading">Subheading — Section label</p>
          <p className="type-body">Body — Description and helper text</p>
          <p className="type-label">Label — Form labels and metadata</p>
          <p className="type-caption">Caption — Timestamps and fine print</p>
          <div className="flex items-baseline gap-6 pt-2">
            <span className="type-kpi-xl">2,481</span>
            <span className="type-kpi-lg">98.2%</span>
            <span className="type-kpi-sm">+14</span>
          </div>
        </section>
      </div>
    </main>
  );
}
