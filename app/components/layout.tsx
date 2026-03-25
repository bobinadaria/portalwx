"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutGrid, ToggleLeft, Table2, BarChart3, Type, Palette,
  Layers, PanelRight, Search, Upload, Bell, CheckSquare,
  Sparkles, Map, Users, Activity, Zap, GitBranch, BarChart2,
  Gauge, Grid3X3, MessageSquare, Clock, Building2, Smartphone,
} from "lucide-react";

const navSections = [
  {
    title: "Foundation",
    items: [
      { label: "Tokens",     href: "/components/tokens",     icon: <Palette size={14} /> },
      { label: "Typography", href: "/components/typography",  icon: <Type size={14} /> },
    ],
  },
  {
    title: "Layout",
    items: [
      { label: "Grid & Stack",  href: "/components/grid-stack",  icon: <LayoutGrid size={14} /> },
      { label: "SplitPanel",    href: "/components/split-panel",  icon: <Layers size={14} /> },
      { label: "Col & Row",     href: "/components/col-row",      icon: <Grid3X3 size={14} /> },
      { label: "Drawer & Modal",href: "/components/overlays",     icon: <PanelRight size={14} /> },
      { label: "App Sidebar",   href: "/components/app-sidebar",  icon: <PanelRight size={14} /> },
    ],
  },
  {
    title: "UI Atoms",
    items: [
      { label: "Button",       href: "/components/button",      icon: <ToggleLeft size={14} /> },
      { label: "Card & Badge", href: "/components/card-badge",  icon: <Layers size={14} /> },
      { label: "Tag",          href: "/components/tag",         icon: <Layers size={14} /> },
      { label: "Avatar",       href: "/components/avatar",      icon: <Users size={14} /> },
      { label: "Tabs",         href: "/components/tabs",        icon: <Layers size={14} /> },
      { label: "Status",       href: "/components/status",      icon: <Activity size={14} /> },
      { label: "Icon",         href: "/components/icon",        icon: <Zap size={14} /> },
      { label: "FeatureIcon",  href: "/components/feature-icon",icon: <Sparkles size={14} /> },
      { label: "Box & Group",  href: "/components/box-group",   icon: <LayoutGrid size={14} /> },
      { label: "Image",        href: "/components/image",       icon: <Layers size={14} /> },
      { label: "Text & Title", href: "/components/text-title",  icon: <Type size={14} /> },
      { label: "Crumbs",       href: "/components/crumbs",      icon: <Layers size={14} /> },
      { label: "Bar",          href: "/components/bar",         icon: <BarChart2 size={14} /> },
      { label: "DayStatus",    href: "/components/day-status",  icon: <Clock size={14} /> },
      { label: "AppStoreBadge",href: "/components/app-store-badge", icon: <Smartphone size={14} /> },
      { label: "QrCode",       href: "/components/qr-code",     icon: <Grid3X3 size={14} /> },
      { label: "Animation",    href: "/components/animation",   icon: <Activity size={14} /> },
      { label: "Kanban",       href: "/components/kanban",      icon: <Layers size={14} /> },
    ],
  },
  {
    title: "Feedback",
    items: [
      { label: "Alert & Toast", href: "/components/feedback", icon: <Bell size={14} /> },
      { label: "Banner",        href: "/components/banner",   icon: <Bell size={14} /> },
    ],
  },
  {
    title: "Forms",
    items: [
      { label: "Inputs",        href: "/components/inputs",     icon: <ToggleLeft size={14} /> },
      { label: "Controls",      href: "/components/controls",   icon: <ToggleLeft size={14} /> },
      { label: "Addon",         href: "/components/addon",      icon: <ToggleLeft size={14} /> },
      { label: "Validate",      href: "/components/validate",   icon: <CheckSquare size={14} /> },
      { label: "TimePicker",    href: "/components/time-picker",icon: <Clock size={14} /> },
      { label: "DateTimePicker",href: "/components/datetime-picker", icon: <Clock size={14} /> },
      { label: "Upload",        href: "/components/upload",     icon: <Upload size={14} /> },
      { label: "CodeEditor",    href: "/components/code-editor",icon: <ToggleLeft size={14} /> },
      { label: "Wysiwyg",       href: "/components/wysiwyg",    icon: <Type size={14} /> },
      { label: "Diff",          href: "/components/diff",       icon: <GitBranch size={14} /> },
    ],
  },
  {
    title: "Molecules",
    items: [
      { label: "Menu",           href: "/components/menu",            icon: <Layers size={14} /> },
      { label: "PageHeader",     href: "/components/page-header",     icon: <Layers size={14} /> },
      { label: "MobileHeader",   href: "/components/mobile-header",   icon: <Smartphone size={14} /> },
      { label: "UserMenu",       href: "/components/user-menu",       icon: <Users size={14} /> },
      { label: "Search",         href: "/components/search",          icon: <Search size={14} /> },
      { label: "Stepper",        href: "/components/stepper",         icon: <CheckSquare size={14} /> },
      { label: "Wizard",         href: "/components/wizard",          icon: <CheckSquare size={14} /> },
      { label: "BadgeCard",      href: "/components/badge-card",      icon: <Layers size={14} /> },
      { label: "ContentCard",    href: "/components/content-card",    icon: <Layers size={14} /> },
      { label: "GuestCard",      href: "/components/guest-card",      icon: <Users size={14} /> },
      { label: "FacilityReport", href: "/components/facility-report", icon: <Building2 size={14} /> },
      { label: "Comment",        href: "/components/comment",         icon: <MessageSquare size={14} /> },
      { label: "ContentAI",      href: "/components/content-ai",      icon: <Sparkles size={14} /> },
      { label: "OpeningHours",   href: "/components/opening-hours",   icon: <Clock size={14} /> },
      { label: "LifeCheck",      href: "/components/life-check",      icon: <Activity size={14} /> },
      { label: "Mobile Preview", href: "/components/mobile-preview",  icon: <Smartphone size={14} /> },
      { label: "GuestPrint",     href: "/components/guest-print",     icon: <Layers size={14} /> },
    ],
  },
  {
    title: "Media & Utility",
    items: [
      { label: "Video",   href: "/components/video",  icon: <Activity size={14} /> },
      { label: "Camera",  href: "/components/camera", icon: <Activity size={14} /> },
      { label: "Map",     href: "/components/map",    icon: <Map size={14} /> },
    ],
  },
  {
    title: "Data Display",
    items: [
      { label: "Table",          href: "/components/table",         icon: <Table2 size={14} /> },
      { label: "Timeline & List",href: "/components/timeline-list", icon: <Layers size={14} /> },
      { label: "InfiniteLoader", href: "/components/infinite-loader",icon: <Activity size={14} /> },
      { label: "WeekContainer",  href: "/components/week-container", icon: <Clock size={14} /> },
    ],
  },
  {
    title: "Charts",
    items: [
      { label: "Line & Area",  href: "/components/charts",         icon: <BarChart3 size={14} /> },
      { label: "Bar Chart",    href: "/components/bar-chart",      icon: <BarChart2 size={14} /> },
      { label: "Donut & Pie",  href: "/components/donut-chart",    icon: <BarChart3 size={14} /> },
      { label: "Sparkline",    href: "/components/sparkline",      icon: <Activity size={14} /> },
      { label: "HeatMap",      href: "/components/heatmap",        icon: <Grid3X3 size={14} /> },
      { label: "Gauge",        href: "/components/gauge",          icon: <Gauge size={14} /> },
      { label: "ScatterPlot",  href: "/components/scatter",        icon: <Activity size={14} /> },
    ],
  },
  {
    title: "Organisms",
    items: [
      { label: "Notifications", href: "/components/notifications", icon: <Bell size={14} /> },
      { label: "Validity",      href: "/components/validity",      icon: <CheckSquare size={14} /> },
    ],
  },
  {
    title: "KPI",
    items: [
      { label: "KPI System", href: "/components/kpi", icon: <BarChart3 size={14} /> },
    ],
  },
];

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-surface-base">
      {/* Sidebar */}
      <aside className="flex h-full w-56 shrink-0 flex-col border-r border-border-default bg-surface-raised overflow-y-auto">
        <div className="flex h-14 items-center px-4 border-b border-border-default shrink-0">
          <Link href="/" className="type-heading text-signature hover:opacity-80 transition-opacity">
            Portal WX
          </Link>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-4">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 rounded px-3 py-1.5 text-xs transition-colors",
                        pathname === item.href
                          ? "bg-brand-l2 text-signature font-medium"
                          : "text-ink-secondary hover:bg-surface-subtle hover:text-ink-primary"
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-8 py-8">
        <div className="mx-auto max-w-[1000px]">{children}</div>
      </main>
    </div>
  );
}
