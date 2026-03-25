"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSiteContext } from "@/lib/site-context";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SearchField } from "@/components/ui/SearchField";
import { Select } from "@/components/ui/Select";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/data-display/Table";
import {
  getPeopleList,
  peopleCounts,
  attentionIssues,
  type GlobalState,
  type PeopleListUser,
} from "@/lib/people-data";
import {
  Settings,
  Download,
  Upload,
  Plus,
  RefreshCw,
  X,
  ChevronDown,
} from "lucide-react";

/* ── Avatar ──────────────────────────────── */
function Avatar({
  firstName,
  lastName,
  color,
  size = "md",
}: {
  firstName: string;
  lastName: string;
  color: string;
  size?: "sm" | "md" | "lg";
}) {
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  const sizeClass = { sm: "h-7 w-7 text-[10px]", md: "h-9 w-9 text-xs", lg: "h-12 w-12 text-sm" }[size];
  return (
    <span
      className={cn("inline-flex items-center justify-center rounded-full font-semibold text-ink-inverse shrink-0", sizeClass)}
      style={{ backgroundColor: color }}
    >
      {initials}
    </span>
  );
}

/* ── Status badge ─────────────────────────── */
function StateBadge({ state }: { state: GlobalState }) {
  if (state === "healthy")
    return <Badge variant="success" dot>Healthy</Badge>;
  if (state === "needs-attention")
    return <Badge variant="warning" dot>Needs attention</Badge>;
  return <Badge variant="info" dot>Needs onboarding</Badge>;
}

/* ── Filter tab ───────────────────────────── */
interface FilterTabProps {
  label: string;
  count: number;
  state: GlobalState | null;
  active: boolean;
  onClick: () => void;
}

function FilterTab({ label, count, state, active, onClick }: FilterTabProps) {
  const dotColor = state === "healthy"
    ? "bg-status-success"
    : state === "needs-attention"
    ? "bg-status-warning"
    : state === "needs-onboarding"
    ? "bg-status-info"
    : "bg-ink-muted";

  const activeStyle = state === "healthy"
    ? "border-status-success bg-status-success-bg text-status-success"
    : state === "needs-attention"
    ? "border-status-warning bg-status-warning-bg text-status-warning"
    : state === "needs-onboarding"
    ? "border-status-info bg-status-info-bg text-status-info"
    : "";

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signature",
        active
          ? cn("border", activeStyle)
          : "border-border-default bg-surface-raised text-ink-secondary hover:bg-surface-subtle"
      )}
    >
      <span className={cn("h-2 w-2 rounded-full shrink-0", active ? dotColor : "bg-ink-muted")} />
      {label}
      <span className={cn(
        "rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
        active ? "bg-white/60" : "bg-surface-subtle text-ink-muted"
      )}>
        {count}
      </span>
    </button>
  );
}

/* ── Chip filter ───────────────────────────── */
function ChipFilter({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-status-warning bg-status-warning-bg text-status-warning"
          : "border-border-default bg-surface-raised text-ink-secondary hover:bg-surface-subtle"
      )}
    >
      {label}
      <span className={cn("font-semibold", active ? "" : "text-ink-muted")}>{count}</span>
    </button>
  );
}

/* ── Onboarding filter dropdown ─────────────── */
function OnboardingChip({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-1 rounded-full border border-border-default bg-surface-raised px-3 py-1 text-xs font-medium text-ink-secondary hover:bg-surface-subtle transition-colors">
      {label}
      <ChevronDown size={12} className="text-ink-muted" />
    </button>
  );
}

/* ── Main page ─────────────────────────────── */
export default function PeoplePage() {
  const router = useRouter();
  const { selectedSite } = useSiteContext();

  // Filter list to selected site, or show all
  const allUsers = useMemo(
    () => {
      const list = getPeopleList();
      return selectedSite ? list.filter((u) => u.sites.primary === selectedSite) : list;
    },
    [selectedSite]
  );

  const [activeTab, setActiveTab] = useState<GlobalState | null>(null);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeChips, setActiveChips] = useState<Set<string>>(new Set());

  const tabCounts = {
    healthy: allUsers.filter((u) => u.globalState === "healthy").length,
    "needs-attention": allUsers.filter((u) => u.globalState === "needs-attention").length,
    "needs-onboarding": allUsers.filter((u) => u.globalState === "needs-onboarding").length,
  };

  /* ── Filtered users ── */
  const filtered = useMemo(() => {
    let list = allUsers;
    if (activeTab) list = list.filter((u) => u.globalState === activeTab);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.firstName.toLowerCase().includes(q) ||
          u.lastName.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.company.toLowerCase().includes(q) ||
          u.empId.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allUsers, activeTab, search]);

  /* ── Selection ── */
  const allSelected = filtered.length > 0 && filtered.every((u) => selectedIds.has(u.id));
  const someSelected = filtered.some((u) => selectedIds.has(u.id));
  const selectedCount = filtered.filter((u) => selectedIds.has(u.id)).length;

  function toggleAll() {
    if (allSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filtered.forEach((u) => next.delete(u.id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filtered.forEach((u) => next.add(u.id));
        return next;
      });
    }
  }

  function toggleRow(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleChip(label: string) {
    setActiveChips((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  function clearSelection() {
    setSelectedIds(new Set());
  }

  function clearFilter() {
    setActiveTab(null);
    setActiveChips(new Set());
  }

  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8 space-y-6">

      {/* ── Page header ─────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="type-display">People</h1>
          <p className="type-body mt-1">
            {allUsers.length.toLocaleString()} users{selectedSite ? ` at ${selectedSite}` : " in system"} · Reactive triage view
          </p>
        </div>
        {/* Action buttons — full set on desktop, only primary on mobile */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="secondary" size="md" icon={<Download size={14} />} iconRight={<ChevronDown size={12} />}>
              Export
            </Button>
            <Button variant="secondary" size="md" icon={<Upload size={14} />}>
              Import users
            </Button>
          </div>
          <Button variant="primary" size="md" icon={<Plus size={14} />}>
            Add user
          </Button>
        </div>
      </div>

      {/* ── Search ──────────────────────────────── */}
      <SearchField
        placeholder="Search by name, email, company, or ID..."
        value={search}
        onSearch={setSearch}
        className="max-w-md"
      />

      {/* ── Filter tabs ─────────────────────────── */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <FilterTab
            label="Healthy"
            count={tabCounts.healthy}
            state="healthy"
            active={activeTab === "healthy"}
            onClick={() => setActiveTab(activeTab === "healthy" ? null : "healthy")}
          />
          <FilterTab
            label="Needs attention"
            count={tabCounts["needs-attention"]}
            state="needs-attention"
            active={activeTab === "needs-attention"}
            onClick={() => setActiveTab(activeTab === "needs-attention" ? null : "needs-attention")}
          />
          <FilterTab
            label="Needs onboarding"
            count={tabCounts["needs-onboarding"]}
            state="needs-onboarding"
            active={activeTab === "needs-onboarding"}
            onClick={() => setActiveTab(activeTab === "needs-onboarding" ? null : "needs-onboarding")}
          />

          <div className="ml-auto flex items-center gap-2">
            <button className="inline-flex h-8 w-8 items-center justify-center rounded text-ink-muted hover:text-ink-primary transition-colors">
              <Settings size={15} />
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border-default bg-surface-raised px-3 h-8 text-xs text-ink-secondary hover:bg-surface-subtle transition-colors">
              Sites
              <ChevronDown size={12} className="text-ink-muted" />
            </button>
            {activeTab && (
              <button
                onClick={clearFilter}
                className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink-secondary transition-colors"
              >
                <X size={12} />
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Needs attention sub-filter */}
        {activeTab === "needs-attention" && (
          <div className="rounded-lg border border-status-warning bg-status-warning-bg/40 px-4 py-3 space-y-2">
            <p className="type-subheading text-status-warning">Filter by issue type</p>
            <div className="flex flex-wrap gap-2">
              {attentionIssues.map((issue) => (
                <ChipFilter
                  key={issue.label}
                  label={issue.label}
                  count={issue.count}
                  active={activeChips.has(issue.label)}
                  onClick={() => toggleChip(issue.label)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Needs onboarding sub-filter */}
        {activeTab === "needs-onboarding" && (
          <div className="rounded-lg border border-status-info bg-status-info-bg/40 px-4 py-3 space-y-2">
            <p className="type-subheading text-status-info">Narrow onboarding queue</p>
            <div className="flex flex-wrap gap-2">
              <OnboardingChip label="Domain" />
              <OnboardingChip label="Company" />
              <OnboardingChip label="Custom field" />
              <ChipFilter
                label="Unknown badge type"
                count={4}
                active={activeChips.has("unknown-badge")}
                onClick={() => toggleChip("unknown-badge")}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Selection bar ───────────────────────── */}
      {selectedCount > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-status-success px-4 py-2.5">
          <p className="text-sm font-medium text-ink-inverse">
            {selectedCount} user{selectedCount !== 1 ? "s" : ""} selected
          </p>
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-inverse hover:opacity-80 transition-opacity">
              <RefreshCw size={13} />
              Sync selected
            </button>
            <button className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-inverse hover:opacity-80 transition-opacity">
              <Download size={13} />
              Export selected
            </button>
            <button
              onClick={clearSelection}
              className="text-xs font-medium text-ink-inverse/70 hover:text-ink-inverse transition-colors"
            >
              Deselect
            </button>
          </div>
        </div>
      )}

      {/* ── Mobile card list ────────────────────── */}
      <div className="flex flex-col gap-2 md:hidden">
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-ink-muted type-body">
            No users match the current filter.
          </p>
        ) : (
          filtered.map((user) => (
            <PeopleCard
              key={user.id}
              user={user}
              selected={selectedIds.has(user.id)}
              onSelect={() => toggleRow(user.id)}
              onClick={() => router.push(`/people/${user.id}`)}
            />
          ))
        )}
      </div>

      {/* ── Desktop table ───────────────────────── */}
      <div className="hidden md:block">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell header className="w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-border-strong accent-signature cursor-pointer"
                  aria-label="Select all"
                />
              </TableCell>
              <TableCell header>User</TableCell>
              <TableCell header>Sites</TableCell>
              <TableCell header>Global state</TableCell>
              <TableCell header>Last sync</TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            {filtered.map((user) => (
              <PeopleRow
                key={user.id}
                user={user}
                selected={selectedIds.has(user.id)}
                onSelect={() => toggleRow(user.id)}
                onClick={() => router.push(`/people/${user.id}`)}
              />
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <td colSpan={5} className="py-12 text-center text-ink-muted type-body">
                  No users match the current filter.
                </td>
              </TableRow>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

/* ── People mobile card ───────────────────── */
function PeopleCard({
  user,
  selected,
  onSelect,
  onClick,
}: {
  user: PeopleListUser;
  selected: boolean;
  onSelect: () => void;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-xl border bg-surface-raised px-4 py-3 transition-colors cursor-pointer",
        "hover:shadow-[var(--shadow-raised)] active:bg-surface-subtle",
        selected ? "border-signature bg-brand-l2" : "border-border-default"
      )}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={selected}
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        onChange={() => {}}
        className="h-4 w-4 rounded border-border-strong accent-signature cursor-pointer shrink-0"
        aria-label={`Select ${user.firstName} ${user.lastName}`}
      />

      {/* Avatar */}
      <Avatar firstName={user.firstName} lastName={user.lastName} color={user.avatarColor} />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-ink-primary truncate text-sm">
            {user.firstName} {user.lastName}
          </p>
          <StateBadge state={user.globalState} />
        </div>
        <p className="type-caption truncate">{user.email}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <p className="type-caption text-ink-muted truncate">{user.sites.primary}</p>
          {user.sites.additional > 0 && (
            <span className="type-caption text-ink-muted shrink-0">+{user.sites.additional}</span>
          )}
          <span className="type-caption text-ink-muted shrink-0 ml-auto">{user.lastSync}</span>
        </div>
      </div>
    </div>
  );
}

/* ── People table row ─────────────────────── */
function PeopleRow({
  user,
  selected,
  onSelect,
  onClick,
}: {
  user: PeopleListUser;
  selected: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onClick: () => void;
}) {
  return (
    <TableRow
      onClick={onClick}
      className={cn(selected && "bg-brand-l2")}
    >
      {/* Checkbox */}
      <TableCell className="w-10">
        <input
          type="checkbox"
          checked={selected}
          onClick={(e) => { e.stopPropagation(); onSelect(e); }}
          onChange={() => {}}
          className="h-4 w-4 rounded border-border-strong accent-signature cursor-pointer"
          aria-label={`Select ${user.firstName} ${user.lastName}`}
        />
      </TableCell>

      {/* USER */}
      <TableCell>
        <div className="flex items-center gap-3 min-w-0">
          <Avatar firstName={user.firstName} lastName={user.lastName} color={user.avatarColor} />
          <div className="min-w-0">
            <p className="font-semibold text-ink-primary truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="type-caption truncate">{user.email}</p>
            <p className="type-caption text-ink-muted truncate">{user.company}</p>
          </div>
        </div>
      </TableCell>

      {/* SITES */}
      <TableCell className="min-w-[180px]">
        <span className="type-label text-ink-primary">{user.sites.primary}</span>
        {user.sites.additional > 0 && (
          <span className="ml-1.5 type-caption text-ink-muted">+{user.sites.additional}</span>
        )}
      </TableCell>

      {/* GLOBAL STATE */}
      <TableCell className="min-w-[160px]">
        <StateBadge state={user.globalState} />
      </TableCell>

      {/* LAST SYNC */}
      <TableCell className="min-w-[110px]">
        <span className="type-caption">{user.lastSync}</span>
      </TableCell>
    </TableRow>
  );
}
