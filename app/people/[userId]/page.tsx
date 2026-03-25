"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/feedback/Alert";
import { getUserDetail, type GlobalState, type PeopleDetailUser, type AcsSystemDetail, type SiteAccessDetail, type CredentialDetail, type OnboardingField } from "@/lib/people-data";
import {
  ArrowLeft,
  RefreshCw,
  Edit,
  MoreHorizontal,
  Copy,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  ExternalLink,
  Camera,
  Download,
  MapPin,
  Layers,
  Tag,
  Info,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

/* ── Avatar ───────────────────────────────── */
function Avatar({
  firstName,
  lastName,
  color,
  size = "md",
}: {
  firstName: string;
  lastName: string;
  color: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  const sizeClass = {
    sm: "h-8 w-8 text-[11px]",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
    xl: "h-16 w-16 text-lg",
  }[size];
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold text-ink-inverse shrink-0",
        sizeClass
      )}
      style={{ backgroundColor: color }}
    >
      {initials}
    </span>
  );
}

/* ── State badge ──────────────────────────── */
function StateBadge({ state }: { state: GlobalState }) {
  if (state === "healthy") return <Badge variant="success" dot>Healthy</Badge>;
  if (state === "needs-attention") return <Badge variant="warning" dot>Needs attention</Badge>;
  return <Badge variant="info" dot>Needs onboarding</Badge>;
}

/* ── Section heading ──────────────────────── */
function SectionHeading({
  icon,
  title,
  badge,
  collapsible,
  collapsed,
  onToggle,
}: {
  icon: React.ReactNode;
  title: string;
  badge?: React.ReactNode;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div
      className={cn("flex items-center gap-2 mb-4", collapsible && "cursor-pointer")}
      onClick={collapsible ? onToggle : undefined}
    >
      <span className="text-ink-muted">{icon}</span>
      <h3 className="type-heading flex-1">{title}</h3>
      {badge}
      {collapsible && (
        <ChevronDown
          size={16}
          className={cn("text-ink-muted transition-transform", collapsed && "-rotate-90")}
        />
      )}
    </div>
  );
}

/* ── Health card ──────────────────────────── */
function HealthCard({
  label,
  status,
  detail,
  isTime,
}: {
  label: string;
  status?: "ok" | "warning";
  detail?: string;
  isTime?: boolean;
}) {
  const bg = isTime
    ? "bg-surface-subtle"
    : status === "ok"
    ? "bg-status-success-bg"
    : "bg-status-warning-bg";

  return (
    <div className={cn("rounded-lg p-3 space-y-1.5", bg)}>
      <p className="type-subheading">{label}</p>
      {isTime ? (
        <p className="type-label text-ink-primary">{detail}</p>
      ) : (
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              status === "ok" ? "bg-status-success" : "bg-status-warning"
            )}
          />
          <span
            className={cn(
              "text-xs font-semibold",
              status === "ok" ? "text-status-success" : "text-status-warning"
            )}
          >
            {status === "ok" ? "OK" : "Warning"}
          </span>
        </div>
      )}
      {detail && !isTime && status === "warning" && (
        <p className="type-caption text-status-warning">{detail}</p>
      )}
    </div>
  );
}

/* ── Collapsible ACS card ─────────────────── */
function AcsCard({ acs }: { acs: AcsSystemDetail }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-border-default overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-4 py-3 bg-surface-raised hover:bg-surface-subtle transition-colors text-left"
      >
        <span
          className={cn(
            "h-2 w-2 rounded-full shrink-0",
            acs.status === "ok" ? "bg-status-success" : "bg-status-warning"
          )}
        />
        <span className="font-semibold text-ink-primary text-sm flex-1">{acs.name}</span>
        <span className="type-caption text-ink-muted">{acs.vendor}</span>
        <ChevronDown
          size={15}
          className={cn("text-ink-muted transition-transform shrink-0", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="px-4 py-3 border-t border-border-subtle space-y-3 bg-surface-raised">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "STATUS",      value: acs.syncStatus,   error: acs.status === "warning" },
              { label: "CREDENTIALS", value: acs.credentials,  error: false },
              { label: "RETRIES",     value: acs.retries,      error: acs.retries !== "None" },
            ].map(({ label, value, error }) => (
              <div key={label}>
                <p className="type-subheading mb-0.5">{label}</p>
                <p className={cn("type-label", error ? "text-status-error" : "text-ink-primary")}>
                  {value}
                </p>
              </div>
            ))}
          </div>
          {acs.sitesAffected != null && acs.sitesAffected > 0 && (
            <div className="flex items-center gap-2 rounded bg-status-warning-bg px-3 py-2">
              <TriangleAlert size={13} className="text-status-warning shrink-0" />
              <span className="type-caption text-status-warning">
                {acs.sitesAffected} site affected
              </span>
            </div>
          )}
          <div className="flex gap-2">
            <Button variant="primary" size="md" icon={<RefreshCw size={13} />}>
              Sync now
            </Button>
            <Button variant="secondary" size="md" icon={<ExternalLink size={13} />}>
              View logs
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Collapsible site card ────────────────── */
function SiteCard({ site }: { site: SiteAccessDetail }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-border-default overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-4 py-3 bg-surface-raised hover:bg-surface-subtle transition-colors text-left"
      >
        <MapPin size={14} className="text-ink-muted shrink-0" />
        <span className="font-semibold text-ink-primary text-sm flex-1">{site.name}</span>
        {site.isPrimary && <Badge variant="error">Primary</Badge>}
        <span className="type-caption text-ink-muted">{site.acsCount} ACS</span>
        <ChevronDown
          size={15}
          className={cn("text-ink-muted transition-transform shrink-0", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="px-4 py-3 border-t border-border-subtle space-y-4 bg-surface-raised">
          {site.acsSystems.map((acs) => (
            <div key={acs.name} className="space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    acs.status === "ok" ? "bg-status-success" : "bg-status-warning"
                  )}
                />
                <span className="text-sm font-semibold text-ink-primary">{acs.name}</span>
                <span className="type-caption text-ink-muted">{acs.vendor}</span>
              </div>
              <div className="pl-4 space-y-1.5">
                <div>
                  <p className="type-subheading mb-1">Roles</p>
                  <div className="flex flex-wrap gap-1.5">
                    {acs.roles.map((r) => (
                      <span
                        key={r}
                        className="rounded-full border border-border-default bg-surface-subtle px-2.5 py-0.5 text-xs text-ink-secondary"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="type-caption">
                  <span className="text-ink-muted">Credentials: </span>
                  <span className="text-ink-primary">{acs.credentials}</span>
                </p>
                {acs.warning && (
                  <div className="flex items-start justify-between gap-3 rounded bg-status-warning-bg px-3 py-2">
                    <div className="flex items-start gap-1.5">
                      <TriangleAlert size={13} className="text-status-warning mt-0.5 shrink-0" />
                      <span className="type-caption text-status-warning">{acs.warning}</span>
                    </div>
                    <Button variant="secondary" size="md">Fix provisioning</Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Credential row ────────────────────────── */
function CredRow({ cred }: { cred: CredentialDetail }) {
  const badgeVariant =
    cred.status === "active" ? "success" : cred.status === "inactive" ? "neutral" : "error";
  return (
    <TableRow>
      <td className="px-4 py-2.5 text-sm">
        <Badge variant={badgeVariant} dot>{cred.status}</Badge>
      </td>
      <td className="px-4 py-2.5 type-label text-ink-primary">{cred.type}</td>
      <td className="px-4 py-2.5 type-caption font-mono">{cred.number}</td>
      <td className="px-4 py-2.5 type-caption">{cred.acs}</td>
      <td className="px-4 py-2.5 type-caption">{cred.sites}</td>
      <td className="px-4 py-2.5 type-caption text-ink-muted">{cred.lastUpdated}</td>
      <td className="px-4 py-2.5 w-8">
        {cred.hasIssue && (
          <TriangleAlert size={14} className="text-status-warning" aria-label="Has issue" />
        )}
      </td>
    </TableRow>
  );
}

/* ── Onboarding field row ─────────────────── */
function OnboardingRow({ field }: { field: OnboardingField }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border-subtle last:border-0">
      {field.status === "complete" ? (
        <CheckCircle2 size={16} className="text-status-success shrink-0" />
      ) : (
        <XCircle size={16} className="text-status-error shrink-0" />
      )}
      <span className="type-label flex-1 text-ink-primary">{field.name}</span>
      {field.status === "complete" ? (
        <span className="type-caption text-ink-secondary">{field.value}</span>
      ) : (
        <span className="type-caption text-status-error font-medium">Missing</span>
      )}
    </div>
  );
}

/* ── Simple table row helper ──────────────── */
function TableRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <tr className={cn("border-b border-border-subtle last:border-0", className)}>{children}</tr>;
}

/* ── KV row for sidebar ──────────────────── */
function KVRow({ label, value, valueClass }: { label: string; value: React.ReactNode; valueClass?: string }) {
  return (
    <div className="flex items-start justify-between gap-2 py-1.5 border-b border-border-subtle last:border-0">
      <span className="type-caption text-ink-muted shrink-0">{label}</span>
      <span className={cn("type-label text-right", valueClass)}>{value}</span>
    </div>
  );
}

/* ── Quick action button ──────────────────── */
function QuickAction({ icon, label, variant = "secondary" }: { icon: React.ReactNode; label: string; variant?: "secondary" | "danger" | "primary" }) {
  const styles = {
    secondary: "text-ink-secondary hover:text-ink-primary hover:bg-surface-subtle",
    danger: "text-status-error hover:bg-status-error-bg",
    primary: "text-status-error hover:bg-status-error-bg font-semibold",
  }[variant];
  return (
    <button className={cn("flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors", styles)}>
      <span className="shrink-0">{icon}</span>
      {label}
    </button>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function PeopleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const user = getUserDetail(userId);

  const [activeTab, setActiveTab] = useState<"overview" | "permissions" | "history">("overview");
  const [dataSourceOpen, setDataSourceOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center text-ink-muted type-body">
        User not found.
      </div>
    );
  }

  const isAttention = user.globalState === "needs-attention";
  const isOnboarding = user.globalState === "needs-onboarding";
  const missingCount = user.onboardingFields?.filter((f) => f.status === "missing").length ?? 0;

  /* ── Credential counts ── */
  const credCounts = {
    active: user.credentialsList.filter((c) => c.status === "active").length,
    inactive: user.credentialsList.filter((c) => c.status === "inactive").length,
    issues: user.credentialsList.filter((c) => c.status === "issues").length,
  };

  return (
    <div className="max-w-full px-6 md:px-10 lg:px-16 py-8">

      {/* ── Back nav ─────────────────────────── */}
      <button
        onClick={() => router.push("/people")}
        className="inline-flex items-center gap-1.5 text-signature hover:text-brand-d1 type-label mb-6 transition-colors"
      >
        <ArrowLeft size={15} />
        Back to People
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">

        {/* ── Left column ─────────────────────── */}
        <div className="space-y-6 min-w-0">

          {/* ── User header card ─────────────── */}
          <div className="rounded-xl border border-border-default bg-surface-raised p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              {/* Left: avatar + info */}
              <div className="flex items-start gap-4">
                <Avatar
                  firstName={user.firstName}
                  lastName={user.lastName}
                  color={user.avatarColor}
                  size="xl"
                />
                <div className="space-y-0.5">
                  <h2 className="type-heading">{user.firstName} {user.lastName}</h2>
                  <p className="type-body text-ink-secondary">{user.email}</p>
                  {user.phone && <p className="type-body text-ink-secondary">{user.phone}</p>}
                  <p className="type-caption text-ink-muted">{user.company}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="type-caption text-ink-muted font-mono">EMP #{user.empId}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(user.empId)}
                      className="text-ink-muted hover:text-ink-secondary transition-colors"
                      aria-label="Copy employee ID"
                    >
                      <Copy size={12} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: state + actions */}
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2">
                  <StateBadge state={user.globalState} />
                  <button className="text-ink-muted hover:text-ink-secondary transition-colors">
                    <Info size={14} />
                  </button>
                </div>
                <p className="type-caption text-ink-muted">{user.lastSync}</p>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="md" icon={<RefreshCw size={13} />}>Sync</Button>
                  {isOnboarding && (
                    <Button variant="danger" size="md">Onboard</Button>
                  )}
                  <Button variant="secondary" size="md" icon={<Edit size={13} />}>Edit</Button>
                  <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border-2 border-border-default text-ink-secondary hover:bg-surface-subtle transition-colors">
                    <MoreHorizontal size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Tabs ─────────────────────────── */}
          <div className="border-b border-border-default flex gap-6">
            {(["overview", "permissions", "history"] as const).map((tab) => {
              const label = tab === "overview" ? "Overview" : tab === "permissions" ? "Permissions" : "Change History";
              const hasDot = tab === "overview" && (isAttention || isOnboarding);
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative inline-flex items-center gap-1.5 pb-3 text-sm font-medium transition-colors",
                    activeTab === tab
                      ? "text-signature border-b-2 border-signature -mb-px"
                      : "text-ink-secondary hover:text-ink-primary"
                  )}
                >
                  {label}
                  {hasDot && (
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        isAttention ? "bg-status-warning" : "bg-status-info"
                      )}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Tab content ──────────────────── */}
          {activeTab === "overview" && (
            <div className="space-y-8">

              {/* 1. Health Breakdown */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-ink-muted" />
                    <h3 className="type-heading">Health Breakdown</h3>
                  </div>
                  {(isAttention || isOnboarding) && (
                    <Badge variant="error">Issues detected</Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <HealthCard label="Identity sync" status={user.healthBreakdown.identitySync} detail={user.healthBreakdown.identitySyncDetail} />
                  <HealthCard label="Access roles" status={user.healthBreakdown.accessRoles} detail={user.healthBreakdown.accessRolesDetail} />
                  <HealthCard label="Credential sync" status={user.healthBreakdown.credentialSync} detail={user.healthBreakdown.credentialSyncDetail} />
                  <HealthCard
                    label="Last sync attempt"
                    isTime
                    detail={`${user.healthBreakdown.lastSyncAttempt} · ${user.healthBreakdown.lastSyncDate}`}
                  />
                </div>
                {user.recommendedAction && (
                  <div className="mt-3 flex items-center justify-between rounded-lg border border-border-default bg-surface-subtle px-4 py-2.5">
                    <span className="type-caption text-ink-secondary">Recommended action</span>
                    <Button variant="primary" size="md" icon={<RefreshCw size={13} />}>
                      {user.recommendedAction.label}
                    </Button>
                  </div>
                )}
              </section>

              {/* 2. Detected problems (needs-attention) */}
              {isAttention && user.detectedProblems && (
                <section className="rounded-xl border border-status-warning bg-status-warning-bg/30 p-5">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TriangleAlert size={15} className="text-status-warning" />
                        <h4 className="type-label font-semibold text-status-warning">Detected problems</h4>
                      </div>
                      <ul className="space-y-1.5">
                        {user.detectedProblems.map((p) => (
                          <li key={p} className="type-caption text-ink-secondary flex items-start gap-1.5">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-status-warning shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {user.nextSteps && (
                      <div>
                        <p className="type-subheading mb-3">Next steps</p>
                        <ul className="space-y-1.5">
                          {user.nextSteps.map((s) => (
                            <li key={s} className="type-caption text-ink-secondary">{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* 3. Onboarding required (needs-onboarding) */}
              {isOnboarding && (
                <section className="rounded-xl border border-status-info bg-status-info-bg/30 p-5">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Info size={15} className="text-status-info" />
                        <h4 className="type-label font-semibold text-status-info">Onboarding required</h4>
                      </div>
                      <p className="type-caption text-ink-secondary">
                        This user has incomplete profile fields required by Sharry before access provisioning can complete.
                      </p>
                    </div>
                    <div>
                      <p className="type-subheading mb-3">Next steps</p>
                      <ul className="space-y-1.5">
                        <li className="type-caption text-ink-secondary">› Complete all required profile fields</li>
                        <li className="type-caption text-ink-secondary">› Trigger onboarding from the button above</li>
                        <li className="type-caption text-ink-secondary">› Credential provisioning will run automatically</li>
                      </ul>
                    </div>
                  </div>
                </section>
              )}

              {/* 4. ACS Systems */}
              <section>
                <SectionHeading
                  icon={<Layers size={16} />}
                  title="Integration / ACS Systems"
                  badge={<Badge variant="neutral">{user.acsSystems.length}</Badge>}
                />
                <div className="space-y-2">
                  {user.acsSystems.map((acs) => (
                    <AcsCard key={acs.id} acs={acs} />
                  ))}
                </div>
              </section>

              {/* 5. Sites & Access Structure */}
              <section>
                <SectionHeading
                  icon={<MapPin size={16} />}
                  title="Sites & Access Structure"
                  badge={<Badge variant="neutral">{user.sitesAccess.length}</Badge>}
                />
                <div className="space-y-2">
                  {user.sitesAccess.map((site) => (
                    <SiteCard key={site.name} site={site} />
                  ))}
                </div>
              </section>

              {/* 6. Onboarding Status (needs-onboarding only) */}
              {isOnboarding && user.onboardingFields && (
                <section>
                  <SectionHeading
                    icon={<CheckCircle2 size={16} />}
                    title="Onboarding Status"
                    badge={
                      missingCount > 0 ? (
                        <Badge variant="error">{missingCount} missing</Badge>
                      ) : undefined
                    }
                  />
                  <div className="rounded-xl border border-border-default bg-surface-raised overflow-hidden">
                    <div className="flex items-center gap-2 bg-status-info-bg border-b border-border-subtle px-4 py-2.5">
                      <Info size={14} className="text-status-info shrink-0" />
                      <p className="type-caption text-status-info">
                        These fields are required in Sharry before provisioning is complete
                      </p>
                    </div>
                    <div className="px-4">
                      {user.onboardingFields.map((f) => (
                        <OnboardingRow key={f.name} field={f} />
                      ))}
                    </div>
                    <div className="px-4 py-3 border-t border-border-subtle">
                      <Button variant="danger" size="md">Complete onboarding</Button>
                    </div>
                  </div>
                </section>
              )}

              {/* 7. Credentials */}
              <section>
                <SectionHeading
                  icon={<Tag size={16} />}
                  title="Credentials"
                  badge={<Badge variant="neutral">{user.credentialsList.length}</Badge>}
                />
                {/* Summary row */}
                {user.credentialsList.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {credCounts.active > 0 && (
                      <Badge variant="success" dot>{credCounts.active} Active</Badge>
                    )}
                    {credCounts.inactive > 0 && (
                      <Badge variant="neutral" dot>{credCounts.inactive} Inactive</Badge>
                    )}
                    {credCounts.issues > 0 && (
                      <Badge variant="error" dot>{credCounts.issues} Issues</Badge>
                    )}
                  </div>
                )}
                {user.credentialsList.length > 0 ? (
                  <div className="overflow-x-auto rounded-xl border border-border-default">
                    <table className="w-full text-sm">
                      <thead className="border-b border-border-default bg-surface-subtle">
                        <tr>
                          {["Status", "Type", "Number", "ACS", "Sites", "Last updated", ""].map((h) => (
                            <th key={h} className="px-4 py-2.5 text-left type-label text-ink-secondary font-medium">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {user.credentialsList.map((cred, i) => (
                          <CredRow key={i} cred={cred} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="type-caption text-ink-muted">No credentials issued yet.</p>
                )}
              </section>

              {/* 8. Access Photo */}
              <section>
                <SectionHeading icon={<Camera size={16} />} title="Access Photo" />
                <div className="rounded-xl border border-border-default bg-surface-raised p-5 flex items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-border-strong text-ink-muted shrink-0">
                    <Camera size={22} />
                  </div>
                  <div className="space-y-1">
                    <p className="type-label text-ink-primary">Access photo</p>
                    <p className="type-caption text-ink-muted">
                      Used for identity verification at access points. PNG or JPG, max 5 MB.
                    </p>
                    <p className="type-caption text-ink-muted">No photo uploaded.</p>
                    <div className="mt-2">
                      <Button variant="secondary" size="md" icon={<Camera size={13} />}>
                        Upload photo
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* 9. Data Source & Ownership */}
              <section>
                <SectionHeading
                  icon={<Info size={16} />}
                  title="Data Source & Ownership"
                  collapsible
                  collapsed={!dataSourceOpen}
                  onToggle={() => setDataSourceOpen(!dataSourceOpen)}
                />
                {dataSourceOpen && (
                  <div className="rounded-xl border border-border-default bg-surface-raised p-5">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        {[
                          { label: "Origin",            value: user.dataSource.origin },
                          { label: "Registered from",   value: user.dataSource.registeredFrom },
                          { label: "Created",           value: user.dataSource.created },
                          { label: "Owned by Sharry",   value: user.dataSource.ownedBySharry ? "Yes" : "No" },
                          { label: "Identifier",        value: user.dataSource.identifier },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex gap-3">
                            <span className="type-caption text-ink-muted w-32 shrink-0">{label}</span>
                            <span className="type-label text-ink-primary">{value}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="type-subheading mb-2">Source priority</p>
                        <p className="type-caption text-ink-secondary">{user.dataSource.sourcePriority}</p>
                      </div>
                    </div>
                  </div>
                )}
              </section>

            </div>
          )}

          {activeTab === "permissions" && (
            <div className="rounded-xl border border-border-default bg-surface-raised p-8 text-center">
              <p className="type-body text-ink-muted">Permissions view — spec pending.</p>
            </div>
          )}

          {activeTab === "history" && (
            <div className="rounded-xl border border-border-default bg-surface-raised p-8 text-center">
              <p className="type-body text-ink-muted">Change History — spec pending.</p>
            </div>
          )}

        </div>

        {/* ── Right sidebar ─────────────────── */}
        <aside className="space-y-4">

          {/* STATUS card */}
          <div className="rounded-xl border border-border-default bg-surface-raised p-4">
            <p className="type-subheading mb-3">Status</p>
            <div className="space-y-0">
              <KVRow
                label="Global state"
                value={<StateBadge state={user.globalState} />}
              />
              <KVRow label="Last sync" value={user.lastSync} />
              <KVRow
                label="Failing systems"
                value={user.failingSystems > 0 ? String(user.failingSystems) : "—"}
                valueClass={user.failingSystems > 0 ? "text-status-error font-semibold" : ""}
              />
              <KVRow label="Credentials" value={String(user.credentials)} />
              <KVRow label="Sites" value={String(user.sites.additional + 1)} />
              {isOnboarding && (
                <KVRow
                  label="Missing fields"
                  value={String(user.missingFields ?? 0)}
                  valueClass="text-status-error font-semibold"
                />
              )}
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="rounded-xl border border-border-default bg-surface-raised p-4">
            <p className="type-subheading mb-2">Quick actions</p>
            <div className="space-y-0.5">
              <QuickAction icon={<RefreshCw size={14} />} label="Sync user" />
              {isAttention && (
                <QuickAction icon={<TriangleAlert size={14} />} label="Retry provisioning" variant="danger" />
              )}
              {isOnboarding && (
                <QuickAction icon={<CheckCircle2 size={14} />} label="Complete onboarding" variant="primary" />
              )}
              <QuickAction icon={<Download size={14} />} label="Export user log" />
              <QuickAction icon={<Edit size={14} />} label="Edit profile" />
            </div>
          </div>

          {/* OPEN ISSUES (conditional) */}
          {user.openIssues && user.openIssues.length > 0 && (
            <div className="rounded-xl border border-status-warning bg-status-warning-bg/30 p-4">
              <p className="type-subheading text-status-warning mb-2">Open issues</p>
              <ul className="space-y-2">
                {user.openIssues.map((issue) => (
                  <li key={issue} className="flex items-start gap-2">
                    <AlertTriangle size={13} className="text-status-warning mt-0.5 shrink-0" />
                    <span className="type-caption text-status-warning">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </aside>
      </div>
    </div>
  );
}
