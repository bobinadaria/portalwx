"use client";
import { Showcase, Preview } from "../_showcase";

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="type-caption text-left pb-2 pr-8 font-medium text-ink-muted border-b border-border-default">
    {children}
  </th>
);
const Td = ({ children, mono }: { children: React.ReactNode; mono?: boolean }) => (
  <td className={`type-caption py-2.5 pr-8 border-b border-border-subtle text-ink-secondary ${mono ? "font-mono" : ""}`}>
    {children}
  </td>
);

/* ── Storybook base type system ─────────────────────── */
const displayHeadings = [
  { name: "H1", size: "30px", lineHeight: "48px", weight: "Bold",   style: { fontSize: 30, lineHeight: "48px", fontWeight: 700 } },
  { name: "H2", size: "20px", lineHeight: "32px", weight: "Bold",   style: { fontSize: 20, lineHeight: "32px", fontWeight: 700 } },
  { name: "H3", size: "16px", lineHeight: "30px", weight: "Bold",   style: { fontSize: 16, lineHeight: "30px", fontWeight: 700 } },
];

const bodyStyles = [
  { name: "BaseText10",         size: "10px", lineHeight: "12px", weight: "Medium",   style: { fontSize: 10, lineHeight: "12px", fontWeight: 500 } },
  { name: "BaseText11",         size: "11px", lineHeight: "20px", weight: "Medium",   style: { fontSize: 11, lineHeight: "20px", fontWeight: 500 } },
  { name: "BaseTextUserMail12", size: "12px", lineHeight: "18px", weight: "Regular",  style: { fontSize: 12, lineHeight: "18px", fontWeight: 400 } },
  { name: "BaseText12 Bold",    size: "12px", lineHeight: "18px", weight: "Bold",     style: { fontSize: 12, lineHeight: "18px", fontWeight: 700 } },
  { name: "BaseText12 SemiBold",size: "12px", lineHeight: "18px", weight: "SemiBold", style: { fontSize: 12, lineHeight: "18px", fontWeight: 600 } },
  { name: "BaseText13",         size: "13px", lineHeight: "24px", weight: "Regular",  style: { fontSize: 13, lineHeight: "24px", fontWeight: 400 } },
  { name: "BaseTextLink13",     size: "13px", lineHeight: "24px", weight: "SemiBold", style: { fontSize: 13, lineHeight: "24px", fontWeight: 600 } },
  { name: "BaseTextBold13",     size: "13px", lineHeight: "24px", weight: "Bold",     style: { fontSize: 13, lineHeight: "24px", fontWeight: 700 } },
  { name: "BaseText14",         size: "14px", lineHeight: "18px", weight: "Regular",  style: { fontSize: 14, lineHeight: "18px", fontWeight: 400 } },
  { name: "BaseText15",         size: "15px", lineHeight: "18px", weight: "Regular",  style: { fontSize: 15, lineHeight: "18px", fontWeight: 400 } },
  { name: "BaseText16",         size: "16px", lineHeight: "30px", weight: "Regular",  style: { fontSize: 16, lineHeight: "30px", fontWeight: 400 } },
];

/* ── DS semantic scale ──────────────────────────────── */
const semanticScale = [
  { cls: "type-display",    label: "Display",    spec: "28px / 600 / −0.02em",  sample: "Executive Dashboard" },
  { cls: "type-heading",    label: "Heading",    spec: "16px / 600 / −0.01em",  sample: "Portfolio Status" },
  { cls: "type-subheading", label: "Subheading", spec: "13px / 500 / uppercase", sample: "Site Overview" },
  { cls: "type-body",       label: "Body",       spec: "14px / 400",             sample: "Occupancy across all sites is trending upward this quarter." },
  { cls: "type-label",      label: "Label",      spec: "13px / 500",             sample: "Last updated 5 min ago" },
  { cls: "type-caption",    label: "Caption",    spec: "12px / 400",             sample: "March 17, 2026 · 14:32 UTC" },
];

const kpiScale = [
  { cls: "type-kpi-xl", label: "KPI XL", spec: "36px / 600 / −0.03em", sample: "2,481" },
  { cls: "type-kpi-lg", label: "KPI LG", spec: "24px / 600 / −0.02em", sample: "98.2%" },
  { cls: "type-kpi-sm", label: "KPI SM", spec: "18px / 600 / −0.01em", sample: "+14" },
];

export default function TypographyPage() {
  return (
    <Showcase title="Typography" description="Lexend type system — display headings, body styles, and the Portal WX semantic scale.">

      {/* ── Display Headings ── */}
      <Preview label="Display Headings">
        <table className="w-full">
          <thead>
            <tr>
              <Th>Style</Th>
              <Th>Family</Th>
              <Th>Size</Th>
              <Th>Line Height</Th>
              <Th>Weight</Th>
            </tr>
          </thead>
          <tbody>
            {displayHeadings.map((t) => (
              <tr key={t.name}>
                <td className="py-3 pr-8 border-b border-border-subtle">
                  <span style={t.style} className="text-ink-primary">{t.name}</span>
                </td>
                <Td>Lexend</Td>
                <Td mono>{t.size}</Td>
                <Td mono>{t.lineHeight}</Td>
                <Td>{t.weight}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Preview>

      {/* ── Body / Base Styles ── */}
      <Preview label="Body / Base Styles">
        <table className="w-full">
          <thead>
            <tr>
              <Th>Style</Th>
              <Th>Family</Th>
              <Th>Size</Th>
              <Th>Line Height</Th>
              <Th>Weight</Th>
            </tr>
          </thead>
          <tbody>
            {bodyStyles.map((t) => (
              <tr key={t.name}>
                <td className="py-2.5 pr-8 border-b border-border-subtle">
                  <span style={t.style} className="text-ink-primary">{t.name}</span>
                </td>
                <Td>Lexend</Td>
                <Td mono>{t.size}</Td>
                <Td mono>{t.lineHeight}</Td>
                <Td>{t.weight}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Preview>

      {/* ── DS Semantic Scale ── */}
      <Preview label="DS Semantic Scale">
        <table className="w-full">
          <thead>
            <tr>
              <Th>Class</Th>
              <Th>Spec</Th>
              <Th>Sample</Th>
            </tr>
          </thead>
          <tbody>
            {semanticScale.map((t) => (
              <tr key={t.cls}>
                <td className="py-2.5 pr-8 border-b border-border-subtle align-middle">
                  <span className="type-caption font-mono text-ink-muted">.{t.cls}</span>
                </td>
                <td className="py-2.5 pr-8 border-b border-border-subtle align-middle">
                  <span className="type-caption font-mono text-ink-muted">{t.spec}</span>
                </td>
                <td className="py-2.5 pr-8 border-b border-border-subtle align-middle">
                  <span className={t.cls}>{t.sample}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Preview>

      {/* ── KPI Numbers ── */}
      <Preview label="KPI Numbers">
        <table className="w-full">
          <thead>
            <tr>
              <Th>Class</Th>
              <Th>Spec</Th>
              <Th>Sample</Th>
            </tr>
          </thead>
          <tbody>
            {kpiScale.map((t) => (
              <tr key={t.cls}>
                <td className="py-2.5 pr-8 border-b border-border-subtle align-middle">
                  <span className="type-caption font-mono text-ink-muted">.{t.cls}</span>
                </td>
                <td className="py-2.5 pr-8 border-b border-border-subtle align-middle">
                  <span className="type-caption font-mono text-ink-muted">{t.spec}</span>
                </td>
                <td className="py-3 pr-8 border-b border-border-subtle align-middle">
                  <span className={t.cls}>{t.sample}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Preview>

    </Showcase>
  );
}
