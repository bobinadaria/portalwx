"use client";
import { Showcase, Preview } from "../_showcase";

/* ── Brand ─────────────────────────────────────────── */
const primary = [
  { label: "primary-100", alias: "L2",        cls: "bg-brand-l2",  hex: "#F5F6FA" },
  { label: "primary-200", alias: "L1",        cls: "bg-brand-l1",  hex: "#B8C2DE" },
  { label: "primary-300", alias: "Signature", cls: "bg-signature", hex: "#6382D5" },
  { label: "primary-400", alias: "D1",        cls: "bg-brand-d1",  hex: "#3F5BA7" },
  { label: "primary-500", alias: "D2",        cls: "bg-brand-d2",  hex: "#4D6EC7" },
];

/* ── Gray ───────────────────────────────────────────── */
const gray = [
  { label: "gray-100", cls: "bg-gray-100", hex: "#F5F6FA" },
  { label: "gray-200", cls: "bg-gray-200", hex: "#EBEDF3" },
  { label: "gray-300", cls: "bg-gray-300", hex: "#A3ACC2" },
  { label: "gray-400", cls: "bg-gray-400", hex: "#616C84" },
  { label: "gray-500", cls: "bg-gray-500", hex: "#373F51" },
  { label: "gray-600", cls: "bg-gray-600", hex: "#2F3541" },
  { label: "gray-700", cls: "bg-gray-700", hex: "#232834" },
  { label: "gray-800", cls: "bg-gray-800", hex: "#1B2232" },
];

/* ── Status ─────────────────────────────────────────── */
const statusColors = [
  { label: "success",  fg: "bg-status-success",    bg: "bg-status-success-bg",  fgHex: "#28AF61", bgHex: "#CBEAD8" },
  { label: "warning",  fg: "bg-status-warning",    bg: "bg-status-warning-bg",  fgHex: "#F2CD4A", bgHex: "#FEF9E0" },
  { label: "error",    fg: "bg-status-error",      bg: "bg-status-error-bg",    fgHex: "#EB5757", bgHex: "#FEF0F0" },
  { label: "info",     fg: "bg-status-info",       bg: "bg-status-info-bg",     fgHex: "#2D9CDB", bgHex: "#E0F3FC" },
];

/* ── Categorical ────────────────────────────────────── */
const categorical = [
  { label: "0",  cls: "bg-chart-0",  hex: "#E50E59" },
  { label: "1",  cls: "bg-chart-1",  hex: "#6BCCA5" },
  { label: "2",  cls: "bg-chart-2",  hex: "#FF9494" },
  { label: "3",  cls: "bg-chart-3",  hex: "#C1AEF8" },
  { label: "4",  cls: "bg-chart-4",  hex: "#FBBF24" },
  { label: "5",  cls: "bg-chart-5",  hex: "#93C5FD" },
  { label: "6",  cls: "bg-chart-6",  hex: "#9EDCC5" },
  { label: "7",  cls: "bg-chart-7",  hex: "#FFC4CD" },
  { label: "8",  cls: "bg-chart-8",  hex: "#D8CBFF" },
  { label: "9",  cls: "bg-chart-9",  hex: "#FFE5BE" },
  { label: "10", cls: "bg-chart-10", hex: "#C2DAF7" },
];

/* ── Surfaces & Ink ─────────────────────────────────── */
const surfaces = [
  { label: "surface-base",    cls: "bg-surface-base" },
  { label: "surface-raised",  cls: "bg-surface-raised" },
  { label: "surface-subtle",  cls: "bg-surface-subtle" },
  { label: "surface-overlay", cls: "bg-surface-overlay" },
];

const ink = [
  { label: "ink-primary",   hex: "#373F51" },
  { label: "ink-secondary", hex: "#616C84" },
  { label: "ink-muted",     hex: "#A3ACC2" },
  { label: "ink-inverse",   hex: "#FFFFFF" },
];

/* ── Shadows ────────────────────────────────────────── */
const shadows = [
  { label: "box-shadow-primary",    token: "--box-shadow-primary",    value: "0 2px 4px #1b22320d" },
  { label: "box-shadow-secondary",  token: "--box-shadow-secondary",  value: "0 2px 12px #1b223217" },
  { label: "box-shadow-tertiary",   token: "--box-shadow-tertiary",   value: "0 3px 9px #1b22320a" },
  { label: "box-shadow-quaternary", token: "--box-shadow-quaternary", value: "0 4px 8px #1b22320a" },
  { label: "box-shadow-quinary",    token: "--box-shadow-quinary",    value: "0 2px 12px 0 #1b223217" },
];

const shadowAliases = [
  { label: "shadow-card",    token: "--shadow-card",    alias: "→ box-shadow-primary" },
  { label: "shadow-raised",  token: "--shadow-raised",  alias: "→ box-shadow-secondary" },
  { label: "shadow-overlay", token: "--shadow-overlay", alias: "→ box-shadow-quaternary" },
];

/* ── Border Radius ──────────────────────────────────── */
const radii = [
  { label: "border-radius-4",     value: "4px",  size: "w-4  h-4" },
  { label: "border-radius-6",     value: "6px",  size: "w-5  h-5" },
  { label: "border-radius-8",     value: "8px",  size: "w-6  h-6" },
  { label: "border-radius-12",    value: "12px", size: "w-8  h-8" },
  { label: "border-radius-24",    value: "24px", size: "w-10 h-10" },
  { label: "border-radius-round", value: "50%",  size: "w-10 h-10" },
];

const radiusAliases = [
  { label: "radius-card",  value: "12px (border-radius-12)" },
  { label: "radius-input", value: "8px (border-radius-8)" },
  { label: "radius-pill",  value: "50% (border-radius-round)" },
];

/* ── Transitions ────────────────────────────────────── */
const transitions = [
  { label: "--transition-primary",       value: "0.15s",  desc: "Micro-interactions, hover" },
  { label: "--transition-secondary",     value: "0.25s",  desc: "Panel reveals, focus" },
  { label: "--transition-animate-slow",  value: "0.75s",  desc: "GSAP entrance, slow motion" },
  { label: "--transition-animate",       value: "3s",     desc: "Long ambient animation" },
];

/* ── Z-index ────────────────────────────────────────── */
const zIndex = [
  { label: "--z-index-top-above",     value: "1030", desc: "Tooltips, floating UI" },
  { label: "--z-index-top",           value: "1020", desc: "Modals, drawers" },
  { label: "--z-index-top-below",     value: "1010", desc: "Dropdowns, menus" },
  { label: "--z-index-content-above", value: "2",    desc: "Overlapping content" },
  { label: "--z-index-content",       value: "1",    desc: "Default stacking" },
  { label: "--z-index-zero",          value: "0",    desc: "Reset / base" },
  { label: "--z-index-content-below", value: "-1",   desc: "Behind base layer" },
];

/* ── Shared table styles ────────────────────────────── */
const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="type-caption text-left pb-2 pr-6 font-medium text-ink-muted border-b border-border-default">
    {children}
  </th>
);
const Td = ({ children, mono }: { children: React.ReactNode; mono?: boolean }) => (
  <td className={`type-caption py-2.5 pr-6 border-b border-border-subtle text-ink-secondary ${mono ? "font-mono" : ""}`}>
    {children}
  </td>
);

export default function TokensPage() {
  return (
    <Showcase title="Tokens" description="Complete design token reference — colors, shadows, radius, transitions, and z-index from globals.css.">

      {/* ── Brand / Primary ── */}
      <Preview label="Brand — Primary Scale">
        <div className="flex flex-wrap gap-4">
          {primary.map((c) => (
            <div key={c.label} className="space-y-2 text-center">
              <div className={`${c.cls} h-16 w-16 rounded-xl border border-border-default`} />
              <p className="type-caption font-medium">{c.alias}</p>
              <p className="type-caption text-ink-muted">{c.label}</p>
              <p className="type-caption text-ink-muted font-mono">{c.hex}</p>
            </div>
          ))}
        </div>
      </Preview>

      {/* ── Gray ── */}
      <Preview label="Gray Scale">
        <div className="flex flex-wrap gap-4">
          {gray.map((c) => (
            <div key={c.label} className="space-y-2 text-center">
              <div className={`${c.cls} h-16 w-16 rounded-xl border border-border-default`} />
              <p className="type-caption font-medium">{c.label}</p>
              <p className="type-caption text-ink-muted font-mono">{c.hex}</p>
            </div>
          ))}
        </div>
      </Preview>

      {/* ── Status ── */}
      <Preview label="Status Colors">
        <div className="flex flex-wrap gap-6">
          {statusColors.map((s) => (
            <div key={s.label} className="space-y-2">
              <div className="flex gap-2 items-end">
                <div>
                  <div className={`${s.fg} h-12 w-12 rounded-lg border border-border-default`} />
                  <p className="type-caption text-ink-muted mt-1 font-mono">{s.fgHex}</p>
                </div>
                <div>
                  <div className={`${s.bg} h-12 w-12 rounded-lg border border-border-default`} />
                  <p className="type-caption text-ink-muted mt-1 font-mono">{s.bgHex}</p>
                </div>
              </div>
              <p className="type-label capitalize">{s.label}</p>
            </div>
          ))}
        </div>
      </Preview>

      {/* ── Categorical ── */}
      <Preview label="Categorical — Chart Series">
        <div className="flex flex-wrap gap-3">
          {categorical.map((c) => (
            <div key={c.label} className="space-y-1.5 text-center">
              <div className={`${c.cls} h-12 w-12 rounded-lg`} />
              <p className="type-caption text-ink-muted">{c.label}</p>
              <p className="type-caption text-ink-muted font-mono text-[10px]">{c.hex}</p>
            </div>
          ))}
        </div>
      </Preview>

      {/* ── Surfaces & Ink ── */}
      <Preview label="Surfaces & Ink">
        <div className="space-y-6">
          <div>
            <p className="type-caption text-ink-muted mb-3">Surfaces</p>
            <div className="flex flex-wrap gap-4">
              {surfaces.map((s) => (
                <div key={s.label} className="space-y-1.5 text-center">
                  <div className={`${s.cls} h-14 w-28 rounded-xl border border-border-default`} />
                  <p className="type-caption">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="type-caption text-ink-muted mb-3">Ink</p>
            <div className="space-y-2">
              {ink.map((i) => (
                <div key={i.label} className="flex items-center gap-4">
                  <span className="type-label w-32">{i.label}</span>
                  <span className="type-caption text-ink-muted font-mono">{i.hex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Preview>

      {/* ── Shadows ── */}
      <Preview label="Shadows">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="type-caption text-ink-muted">Base tokens</p>
            <div className="flex flex-wrap gap-6">
              {shadows.map((s) => (
                <div key={s.label} className="space-y-3 text-center">
                  <div
                    className="h-16 w-24 rounded-xl bg-surface-raised"
                    style={{ boxShadow: s.value }}
                  />
                  <div>
                    <p className="type-caption font-medium">{s.label}</p>
                    <p className="type-caption text-ink-muted font-mono text-[10px]">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="type-caption text-ink-muted mb-3">Semantic aliases</p>
            <table className="w-full">
              <thead><tr><Th>Token</Th><Th>Maps to</Th></tr></thead>
              <tbody>
                {shadowAliases.map((s) => (
                  <tr key={s.label}>
                    <Td mono>{s.token}</Td>
                    <Td>{s.alias}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Preview>

      {/* ── Border Radius ── */}
      <Preview label="Border Radius">
        <div className="space-y-6">
          <div className="flex flex-wrap items-end gap-6">
            {radii.map((r) => (
              <div key={r.label} className="space-y-2 text-center">
                <div
                  className={`bg-brand-l1 border-2 border-signature ${r.size}`}
                  style={{ borderRadius: r.value }}
                />
                <p className="type-caption font-medium">{r.label}</p>
                <p className="type-caption text-ink-muted font-mono">{r.value}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="type-caption text-ink-muted mb-3">Semantic aliases</p>
            <table className="w-full">
              <thead><tr><Th>Token</Th><Th>Value</Th></tr></thead>
              <tbody>
                {radiusAliases.map((r) => (
                  <tr key={r.label}>
                    <Td mono>--{r.label}</Td>
                    <Td>{r.value}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Preview>

      {/* ── Transitions ── */}
      <Preview label="Transitions">
        <table className="w-full">
          <thead>
            <tr>
              <Th>Token</Th>
              <Th>Value</Th>
              <Th>Usage</Th>
            </tr>
          </thead>
          <tbody>
            {transitions.map((t) => (
              <tr key={t.label}>
                <Td mono>{t.label}</Td>
                <Td mono>{t.value}</Td>
                <Td>{t.desc}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Preview>

      {/* ── Z-index ── */}
      <Preview label="Z-Index">
        <table className="w-full">
          <thead>
            <tr>
              <Th>Token</Th>
              <Th>Value</Th>
              <Th>Usage</Th>
            </tr>
          </thead>
          <tbody>
            {zIndex.map((z) => (
              <tr key={z.label}>
                <Td mono>{z.label}</Td>
                <Td mono>{z.value}</Td>
                <Td>{z.desc}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Preview>

    </Showcase>
  );
}
