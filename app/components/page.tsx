"use client";
import Link from "next/link";

const sections = [
  {
    title: "Foundation",
    items: [
      { label: "Tokens", href: "/components/tokens" },
      { label: "Typography", href: "/components/typography" },
    ],
  },
  {
    title: "Layout",
    items: [
      { label: "Grid & Stack", href: "/components/grid-stack" },
      { label: "SplitPanel", href: "/components/split-panel" },
      { label: "Drawer & Modal", href: "/components/overlays" },
    ],
  },
  {
    title: "UI",
    items: [
      { label: "Button", href: "/components/button" },
      { label: "Card & Badge", href: "/components/card-badge" },
      { label: "Tabs", href: "/components/tabs" },
      { label: "Feedback", href: "/components/feedback" },
      { label: "Avatar", href: "/components/avatar" },
    ],
  },
  {
    title: "Forms",
    items: [
      { label: "Inputs", href: "/components/inputs" },
      { label: "Controls", href: "/components/controls" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { label: "Table", href: "/components/table" },
      { label: "Charts & Metrics", href: "/components/charts" },
      { label: "Timeline & List", href: "/components/timeline-list" },
    ],
  },
  {
    title: "KPI",
    items: [
      { label: "KPI System", href: "/components/kpi" },
    ],
  },
];

export default function ComponentsIndex() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="type-display">Components</h1>
        <p className="type-body mt-2">Browse all Portal WX design system components.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-xl border border-border-default bg-surface-raised p-5"
          >
            <p className="type-subheading mb-3">{section.title}</p>
            <ul className="space-y-1.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-signature hover:text-brand-d2 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
