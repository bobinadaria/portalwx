/* ─────────────────────────────────────────────
   People & Identity — Mock Data
   Portal WX / Sharry
───────────────────────────────────────────── */

export type GlobalState = "healthy" | "needs-attention" | "needs-onboarding";

export interface PeopleListUser {
  id: string;
  empId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  avatarColor: string; // CSS variable reference, e.g. "var(--color-1)"
  sites: { primary: string; additional: number };
  globalState: GlobalState;
  lastSync: string;
  failingSystems: number;
  credentials: number;
  missingFields?: number;
}

export interface AttentionIssue {
  label: string;
  count: number;
}

export interface AcsSystemDetail {
  id: string;
  name: string;
  vendor: string;
  status: "ok" | "warning";
  syncStatus: string;
  credentials: string;
  retries: string;
  sitesAffected?: number;
}

export interface SiteAccessDetail {
  name: string;
  isPrimary: boolean;
  acsCount: number;
  acsSystems: {
    name: string;
    vendor: string;
    status: "ok" | "warning";
    roles: string[];
    credentials: string;
    warning?: string;
  }[];
}

export interface CredentialDetail {
  status: "active" | "inactive" | "issues";
  type: string;
  number: string;
  acs: string;
  sites: string;
  lastUpdated: string;
  hasIssue?: boolean;
}

export interface OnboardingField {
  name: string;
  status: "complete" | "missing";
  value?: string;
}

export interface HealthBreakdown {
  identitySync: "ok" | "warning";
  identitySyncDetail?: string;
  accessRoles: "ok" | "warning";
  accessRolesDetail?: string;
  credentialSync: "ok" | "warning";
  credentialSyncDetail?: string;
  lastSyncAttempt: string;
  lastSyncDate: string;
}

export interface DataSource {
  origin: string;
  registeredFrom: string;
  created: string;
  ownedBySharry: boolean;
  identifier: string;
  sourcePriority: string;
}

export interface PeopleDetailUser extends PeopleListUser {
  healthBreakdown: HealthBreakdown;
  detectedProblems?: string[];
  nextSteps?: string[];
  recommendedAction?: { label: string; action: string };
  acsSystems: AcsSystemDetail[];
  sitesAccess: SiteAccessDetail[];
  credentialsList: CredentialDetail[];
  onboardingFields?: OnboardingField[];
  dataSource: DataSource;
  openIssues?: string[];
}

/* ── Avatar colors (categorical palette) ─────── */
const AV = [
  "var(--color-1)",  // teal
  "var(--color-3)",  // soft purple
  "var(--color-5)",  // soft blue
  "var(--color-6)",  // mint
  "var(--color-8)",  // lavender
  "var(--color-10)", // light blue
  "var(--color-0)",  // crimson
];
const av = (i: number) => AV[i % AV.length];

/* ── Attention issue types ─────────────────── */
export const attentionIssues: AttentionIssue[] = [
  { label: "Failed identity update", count: 3 },
  { label: "Failed access level update", count: 2 },
  { label: "Unknown badge type", count: 6 },
  { label: "Failed card update", count: 5 },
];

/* ── Raw user data ─────────────────────────── */
const raw: Omit<PeopleListUser, "id" | "empId">[] = [
  // ── Healthy (14) ──────────────────────────
  { firstName: "Alex",      lastName: "Chen",       email: "alex.chen@techcorp.com",       phone: "+1 212 555 0101", company: "TechCorp",        avatarColor: av(0), sites: { primary: "HQ — New York",          additional: 1 }, globalState: "healthy",           lastSync: "30m ago",  failingSystems: 0, credentials: 2 },
  { firstName: "Sarah",     lastName: "Johnson",    email: "sarah.johnson@acme.com",        phone: "+1 212 555 0102", company: "ACME Corp",       avatarColor: av(1), sites: { primary: "Building B — London",    additional: 0 }, globalState: "healthy",           lastSync: "1h ago",   failingSystems: 0, credentials: 1 },
  { firstName: "Marcus",    lastName: "Williams",   email: "m.williams@meridian.com",       phone: "+1 415 555 0103", company: "Meridian Group",  avatarColor: av(2), sites: { primary: "HQ — New York",          additional: 2 }, globalState: "healthy",           lastSync: "45m ago",  failingSystems: 0, credentials: 3 },
  { firstName: "Elena",     lastName: "Petrov",     email: "e.petrov@techcorp.com",                                   company: "TechCorp",        avatarColor: av(3), sites: { primary: "Building C — Singapore", additional: 0 }, globalState: "healthy",           lastSync: "2h ago",   failingSystems: 0, credentials: 1 },
  { firstName: "James",     lastName: "Murphy",     email: "j.murphy@acme.com",             phone: "+1 617 555 0105", company: "ACME Corp",       avatarColor: av(4), sites: { primary: "HQ — New York",          additional: 1 }, globalState: "healthy",           lastSync: "3h ago",   failingSystems: 0, credentials: 2 },
  { firstName: "Aisha",     lastName: "Ibrahim",    email: "a.ibrahim@meridian.com",        phone: "+44 20 5550 106", company: "Meridian Group",  avatarColor: av(5), sites: { primary: "Building B — London",    additional: 1 }, globalState: "healthy",           lastSync: "20m ago",  failingSystems: 0, credentials: 2 },
  { firstName: "Lucas",     lastName: "Rodriguez",  email: "l.rodriguez@techcorp.com",      phone: "+1 212 555 0107", company: "TechCorp",        avatarColor: av(6), sites: { primary: "HQ — New York",          additional: 0 }, globalState: "healthy",           lastSync: "1h ago",   failingSystems: 0, credentials: 1 },
  { firstName: "Nina",      lastName: "Park",       email: "n.park@acme.com",               phone: "+1 212 555 0108", company: "ACME Corp",       avatarColor: av(0), sites: { primary: "HQ — New York",          additional: 1 }, globalState: "healthy",           lastSync: "4h ago",   failingSystems: 0, credentials: 2 },
  { firstName: "David",     lastName: "Kim",        email: "d.kim@meridian.com",            phone: "+65 9555 0109",   company: "Meridian Group",  avatarColor: av(1), sites: { primary: "Building C — Singapore", additional: 1 }, globalState: "healthy",           lastSync: "2h ago",   failingSystems: 0, credentials: 3 },
  { firstName: "Rachel",    lastName: "Torres",     email: "r.torres@techcorp.com",                                   company: "TechCorp",        avatarColor: av(2), sites: { primary: "Building D — Berlin",    additional: 0 }, globalState: "healthy",           lastSync: "6h ago",   failingSystems: 0, credentials: 1 },
  { firstName: "Oliver",    lastName: "Brown",      email: "o.brown@acme.com",              phone: "+1 415 555 0111", company: "ACME Corp",       avatarColor: av(3), sites: { primary: "HQ — New York",          additional: 0 }, globalState: "healthy",           lastSync: "1h ago",   failingSystems: 0, credentials: 1 },
  { firstName: "Fatima",    lastName: "Al-Rashid",  email: "f.alrashid@meridian.com",       phone: "+44 20 5550 112", company: "Meridian Group",  avatarColor: av(4), sites: { primary: "Building B — London",    additional: 0 }, globalState: "healthy",           lastSync: "3h ago",   failingSystems: 0, credentials: 2 },
  { firstName: "Thomas",    lastName: "Anderson",   email: "t.anderson@techcorp.com",       phone: "+1 212 555 0113", company: "TechCorp",        avatarColor: av(5), sites: { primary: "HQ — New York",          additional: 2 }, globalState: "healthy",           lastSync: "30m ago",  failingSystems: 0, credentials: 3 },
  { firstName: "Yuki",      lastName: "Tanaka",     email: "y.tanaka@acme.com",             phone: "+81 3 5550 114",  company: "ACME Corp",       avatarColor: av(6), sites: { primary: "Building C — Singapore", additional: 1 }, globalState: "healthy",           lastSync: "1h ago",   failingSystems: 0, credentials: 2 },
  // ── Needs attention (11) ─────────────────
  { firstName: "Michael",   lastName: "Park",       email: "m.park@techcorp.com",           phone: "+1 212 555 0115", company: "TechCorp",        avatarColor: av(0), sites: { primary: "HQ — New York",          additional: 1 }, globalState: "needs-attention",   lastSync: "2d ago",   failingSystems: 1, credentials: 2 },
  { firstName: "Emma",      lastName: "Wilson",     email: "e.wilson@acme.com",             phone: "+1 617 555 0116", company: "ACME Corp",       avatarColor: av(1), sites: { primary: "Building B — London",    additional: 0 }, globalState: "needs-attention",   lastSync: "1d ago",   failingSystems: 1, credentials: 1 },
  { firstName: "Carlos",    lastName: "Mendez",     email: "c.mendez@meridian.com",         phone: "+1 212 555 0117", company: "Meridian Group",  avatarColor: av(2), sites: { primary: "HQ — New York",          additional: 0 }, globalState: "needs-attention",   lastSync: "3d ago",   failingSystems: 2, credentials: 2 },
  { firstName: "Lisa",      lastName: "Zhang",      email: "l.zhang@techcorp.com",                                    company: "TechCorp",        avatarColor: av(3), sites: { primary: "Building C — Singapore", additional: 1 }, globalState: "needs-attention",   lastSync: "4h ago",   failingSystems: 1, credentials: 3 },
  { firstName: "Robert",    lastName: "Taylor",     email: "r.taylor@acme.com",             phone: "+1 415 555 0119", company: "ACME Corp",       avatarColor: av(4), sites: { primary: "HQ — New York",          additional: 0 }, globalState: "needs-attention",   lastSync: "2d ago",   failingSystems: 1, credentials: 1 },
  { firstName: "Priya",     lastName: "Sharma",     email: "p.sharma@meridian.com",         phone: "+91 99 5550 120", company: "Meridian Group",  avatarColor: av(5), sites: { primary: "Building D — Berlin",    additional: 1 }, globalState: "needs-attention",   lastSync: "5h ago",   failingSystems: 1, credentials: 2 },
  { firstName: "Jack",      lastName: "O'Brien",    email: "j.obrien@techcorp.com",         phone: "+1 212 555 0121", company: "TechCorp",        avatarColor: av(6), sites: { primary: "HQ — New York",          additional: 1 }, globalState: "needs-attention",   lastSync: "1d ago",   failingSystems: 2, credentials: 2 },
  { firstName: "Anna",      lastName: "Kowalski",   email: "a.kowalski@acme.com",           phone: "+48 22 5550 122", company: "ACME Corp",       avatarColor: av(0), sites: { primary: "Building B — London",    additional: 0 }, globalState: "needs-attention",   lastSync: "3d ago",   failingSystems: 1, credentials: 1 },
  { firstName: "Benjamin",  lastName: "Lee",        email: "b.lee@meridian.com",            phone: "+1 415 555 0123", company: "Meridian Group",  avatarColor: av(1), sites: { primary: "HQ — New York",          additional: 2 }, globalState: "needs-attention",   lastSync: "6h ago",   failingSystems: 1, credentials: 3 },
  { firstName: "Sophie",    lastName: "Martin",     email: "s.martin@techcorp.com",                                   company: "TechCorp",        avatarColor: av(2), sites: { primary: "Building B — London",    additional: 0 }, globalState: "needs-attention",   lastSync: "2d ago",   failingSystems: 1, credentials: 1 },
  { firstName: "Diego",     lastName: "Flores",     email: "d.flores@acme.com",             phone: "+1 212 555 0125", company: "ACME Corp",       avatarColor: av(3), sites: { primary: "HQ — New York",          additional: 1 }, globalState: "needs-attention",   lastSync: "1d ago",   failingSystems: 2, credentials: 2 },
  // ── Needs onboarding (10) ────────────────
  { firstName: "Maria",     lastName: "Santos",     email: "m.santos@techcorp.com",         phone: "+55 11 5550 126", company: "TechCorp",        avatarColor: av(4), sites: { primary: "Building C — Singapore", additional: 0 }, globalState: "needs-onboarding",  lastSync: "7d ago",   failingSystems: 0, credentials: 0, missingFields: 2 },
  { firstName: "Kevin",     lastName: "Walsh",      email: "k.walsh@acme.com",              phone: "+1 617 555 0127", company: "ACME Corp",       avatarColor: av(5), sites: { primary: "HQ — New York",          additional: 0 }, globalState: "needs-onboarding",  lastSync: "5d ago",   failingSystems: 0, credentials: 0, missingFields: 3 },
  { firstName: "Ingrid",    lastName: "Larsson",    email: "i.larsson@meridian.com",                                  company: "Meridian Group",  avatarColor: av(6), sites: { primary: "Building B — London",    additional: 0 }, globalState: "needs-onboarding",  lastSync: "10d ago",  failingSystems: 0, credentials: 1, missingFields: 1 },
  { firstName: "Ahmed",     lastName: "Hassan",     email: "a.hassan@techcorp.com",         phone: "+20 2 5550 129",  company: "TechCorp",        avatarColor: av(0), sites: { primary: "Building D — Berlin",    additional: 0 }, globalState: "needs-onboarding",  lastSync: "3d ago",   failingSystems: 0, credentials: 0, missingFields: 2 },
  { firstName: "Claire",    lastName: "Dubois",     email: "c.dubois@acme.com",             phone: "+33 1 5550 130",  company: "ACME Corp",       avatarColor: av(1), sites: { primary: "Building B — London",    additional: 0 }, globalState: "needs-onboarding",  lastSync: "6d ago",   failingSystems: 0, credentials: 0, missingFields: 3 },
  { firstName: "Ryan",      lastName: "Mitchell",   email: "r.mitchell@meridian.com",       phone: "+1 212 555 0131", company: "Meridian Group",  avatarColor: av(2), sites: { primary: "HQ — New York",          additional: 0 }, globalState: "needs-onboarding",  lastSync: "4d ago",   failingSystems: 0, credentials: 0, missingFields: 2 },
  { firstName: "Mei",       lastName: "Lin",        email: "m.lin@techcorp.com",                                      company: "TechCorp",        avatarColor: av(3), sites: { primary: "Building C — Singapore", additional: 0 }, globalState: "needs-onboarding",  lastSync: "8d ago",   failingSystems: 0, credentials: 0, missingFields: 1 },
  { firstName: "Patrick",   lastName: "O'Connor",   email: "p.oconnor@acme.com",            phone: "+353 1 5550 133", company: "ACME Corp",       avatarColor: av(4), sites: { primary: "Building B — London",    additional: 0 }, globalState: "needs-onboarding",  lastSync: "2d ago",   failingSystems: 0, credentials: 0, missingFields: 2 },
  { firstName: "Valentina", lastName: "Cruz",       email: "v.cruz@meridian.com",           phone: "+57 1 5550 134",  company: "Meridian Group",  avatarColor: av(5), sites: { primary: "HQ — New York",          additional: 0 }, globalState: "needs-onboarding",  lastSync: "9d ago",   failingSystems: 0, credentials: 0, missingFields: 3 },
  { firstName: "Samuel",    lastName: "Osei",       email: "s.osei@techcorp.com",           phone: "+233 30 5550135", company: "TechCorp",        avatarColor: av(6), sites: { primary: "Building D — Berlin",    additional: 0 }, globalState: "needs-onboarding",  lastSync: "5d ago",   failingSystems: 0, credentials: 0, missingFields: 2 },
];

/* ── Build list ────────────────────────────── */
export const peopleList: PeopleListUser[] = raw.map((u, i) => ({
  ...u,
  id: `user-${String(i + 1).padStart(3, "0")}`,
  empId: `EMP-${(20400 + i + 1).toString()}`,
}));

/* ── Detail data helpers ──────────────────── */
const healthyBreakdown = (lastSync: string, date: string): HealthBreakdown => ({
  identitySync: "ok",
  accessRoles: "ok",
  credentialSync: "ok",
  lastSyncAttempt: lastSync,
  lastSyncDate: date,
});

const attentionBreakdown = (issue: "identity" | "access" | "credential", lastSync: string, date: string): HealthBreakdown => ({
  identitySync: issue === "identity" ? "warning" : "ok",
  identitySyncDetail: issue === "identity" ? "Failed to update identity provider record. Check Salto credentials." : undefined,
  accessRoles: issue === "access" ? "warning" : "ok",
  accessRolesDetail: issue === "access" ? "Access level assignment failed. Role mapping conflict detected." : undefined,
  credentialSync: issue === "credential" ? "warning" : "ok",
  credentialSyncDetail: issue === "credential" ? "Credential type not recognized by ACS. Manual review required." : undefined,
  lastSyncAttempt: lastSync,
  lastSyncDate: date,
});

const onboardingBreakdown = (lastSync: string, date: string): HealthBreakdown => ({
  identitySync: "ok",
  accessRoles: "warning",
  accessRolesDetail: "Cannot provision access roles until onboarding is complete.",
  credentialSync: "warning",
  credentialSyncDetail: "No credentials issued. Complete onboarding first.",
  lastSyncAttempt: lastSync,
  lastSyncDate: date,
});

const saltoAcs = (status: "ok" | "warning" = "ok"): AcsSystemDetail => ({
  id: "acs-salto",
  name: "Salto Space",
  vendor: "Salto",
  status,
  syncStatus: status === "ok" ? "Fully synced" : "Failed — identity record mismatch",
  credentials: "2 configured",
  retries: status === "ok" ? "None" : "3 failed",
  sitesAffected: status === "warning" ? 1 : undefined,
});

const hidAcs = (status: "ok" | "warning" = "ok"): AcsSystemDetail => ({
  id: "acs-hid",
  name: "HID ProAccess",
  vendor: "HID",
  status,
  syncStatus: status === "ok" ? "Fully synced" : "Lost Connection — last seen 2d ago",
  credentials: "1 configured",
  retries: "None",
  sitesAffected: status === "warning" ? 1 : undefined,
});

const buildSiteAccess = (primary: string, status: "ok" | "warning" = "ok"): SiteAccessDetail[] => [
  {
    name: primary,
    isPrimary: true,
    acsCount: 2,
    acsSystems: [
      {
        name: "Salto Space",
        vendor: "Salto",
        status,
        roles: ["Standard Access", "Office Level 5", "Meeting Rooms"],
        credentials: "2 active",
        warning: status === "warning" ? "Unknown site mapping — WH-EAST-02 not recognized" : undefined,
      },
      {
        name: "HID ProAccess",
        vendor: "HID",
        status: "ok",
        roles: ["Main Entrance", "Parking Level 1"],
        credentials: "1 active",
      },
    ],
  },
];

const buildCredentials = (count: number, state: GlobalState): CredentialDetail[] => {
  if (count === 0) return [];
  const creds: CredentialDetail[] = [];
  if (count >= 1) creds.push({ status: state === "needs-attention" ? "issues" : "active", type: "HID iCLASS", number: "****4521", acs: "HID ProAccess", sites: "HQ — New York", lastUpdated: "2d ago", hasIssue: state === "needs-attention" });
  if (count >= 2) creds.push({ status: "active", type: "Salto JustIN Mobile", number: "MOB-9912", acs: "Salto Space", sites: "HQ — New York", lastUpdated: "1h ago" });
  if (count >= 3) creds.push({ status: "inactive", type: "HID Prox", number: "****7733", acs: "HID ProAccess", sites: "Building B — London", lastUpdated: "30d ago" });
  return creds;
};

const buildDataSource = (firstName: string, lastName: string, email: string, origin: "salto" | "sharry" = "salto"): DataSource => ({
  origin: origin === "salto" ? "Created in Salto Space" : "Created in Sharry",
  registeredFrom: origin === "salto" ? "Salto Space — Torre (Lima)" : "Sharry HR Import",
  created: "15 Mar 2024",
  ownedBySharry: origin === "sharry",
  identifier: `Email — ${email}`,
  sourcePriority: "Sharry is source of truth. Overrides ACS on: Custom fields · Metadata · Onboarding data",
});

const onboardingFields2missing: OnboardingField[] = [
  { name: "License plate",          status: "missing" },
  { name: "Emergency phone number", status: "missing" },
  { name: "Occupancy",              status: "complete", value: "Floor 3, Desk 12" },
  { name: "Employee ID",            status: "complete", value: "EMP-20451" },
];

const onboardingFields3missing: OnboardingField[] = [
  { name: "License plate",          status: "missing" },
  { name: "Emergency phone number", status: "missing" },
  { name: "Department",             status: "missing" },
  { name: "Occupancy",              status: "complete", value: "Floor 2, Desk 8" },
  { name: "Employee ID",            status: "complete", value: "EMP-20452" },
];

const onboardingFields1missing: OnboardingField[] = [
  { name: "License plate",          status: "missing" },
  { name: "Occupancy",              status: "complete", value: "Floor 4, Desk 22" },
  { name: "Employee ID",            status: "complete", value: "EMP-20453" },
  { name: "Emergency phone number", status: "complete", value: "+1 212 555 0199" },
];

/* ── Full detail map ───────────────────────── */
const detailOverrides: Record<string, Partial<PeopleDetailUser>> = {
  /* Needs attention — unique problem sets */
  "user-015": {
    detectedProblems: ["Identity record failed to update in Salto Space", "Credential mapping not found for badge type HID iCLASS SE"],
    nextSteps: ["› Review Salto credentials in ACS settings", "› Re-map badge type from HID admin console"],
    recommendedAction: { label: "Review Salto credentials", action: "review-salto" },
    openIssues: ["Failed identity update — Salto Space", "Unknown badge type — HID iCLASS SE"],
  },
  "user-017": {
    detectedProblems: ["Access level assignment failed — role conflict", "Card update rejected by HID ProAccess"],
    nextSteps: ["› Resolve role mapping conflict in access policy", "› Re-issue card via HID ProAccess admin"],
    recommendedAction: { label: "Resolve role conflict", action: "resolve-role" },
    openIssues: ["Failed access level update", "Failed card update"],
  },
  "user-021": {
    detectedProblems: ["Two ACS systems returned errors on last sync", "Access role assignment pending"],
    nextSteps: ["› Retry provisioning for Salto Space", "› Check HID ProAccess connectivity"],
    recommendedAction: { label: "Retry provisioning", action: "retry-provisioning" },
    openIssues: ["Failed identity update — 2 systems affected", "Failed access level update"],
  },
  "user-025": {
    detectedProblems: ["Card update failed — duplicate credential detected", "Access level out of sync"],
    nextSteps: ["› Remove duplicate credential from HID console", "› Re-sync access level assignment"],
    recommendedAction: { label: "Remove duplicate credential", action: "remove-duplicate" },
    openIssues: ["Failed card update", "Failed access level update"],
  },
};

/* ── Export: getUser ───────────────────────── */
export function getUserDetail(id: string): PeopleDetailUser | undefined {
  const user = peopleList.find((u) => u.id === id);
  if (!user) return undefined;

  const idx = parseInt(id.replace("user-", ""), 10) - 1;
  const isHealthy = user.globalState === "healthy";
  const isAttention = user.globalState === "needs-attention";
  const isOnboarding = user.globalState === "needs-onboarding";

  const breakdownIssue = idx % 3 === 0 ? "identity" : idx % 3 === 1 ? "access" : "credential";
  const siteStatus: "ok" | "warning" = isAttention && idx % 2 === 0 ? "warning" : "ok";

  const base: PeopleDetailUser = {
    ...user,
    healthBreakdown: isHealthy
      ? healthyBreakdown(user.lastSync, "15 Mar 2025")
      : isAttention
      ? attentionBreakdown(breakdownIssue, user.lastSync, "12 Mar 2025")
      : onboardingBreakdown(user.lastSync, "10 Mar 2025"),
    detectedProblems: isAttention
      ? ["Identity record failed to update in ACS", "Credential requires manual review"]
      : undefined,
    nextSteps: isAttention
      ? ["› Review ACS connection settings", "› Retry credential provisioning"]
      : undefined,
    recommendedAction: isAttention
      ? { label: "Retry provisioning", action: "retry-provisioning" }
      : undefined,
    acsSystems: isAttention
      ? [saltoAcs("warning"), hidAcs()]
      : [saltoAcs(), hidAcs()],
    sitesAccess: buildSiteAccess(user.sites.primary, siteStatus),
    credentialsList: buildCredentials(user.credentials, user.globalState),
    onboardingFields: isOnboarding
      ? idx % 3 === 0
        ? onboardingFields3missing
        : idx % 3 === 1
        ? onboardingFields2missing
        : onboardingFields1missing
      : undefined,
    dataSource: buildDataSource(user.firstName, user.lastName, user.email, idx % 3 === 0 ? "sharry" : "salto"),
    openIssues: isAttention
      ? ["Failed identity update — Salto Space", "Unknown badge type — HID iCLASS"]
      : isOnboarding
      ? [`${user.missingFields ?? 2} required fields missing`]
      : undefined,
  };

  /* Apply specific overrides for key users */
  return { ...base, ...detailOverrides[id] };
}

export function getPeopleList(): PeopleListUser[] {
  return peopleList;
}

/**
 * Returns the number of users for a given site name.
 * Pass undefined / empty string to get the total across all sites.
 * A user belongs to a site if that site is their primary site
 * OR if they have additional sites (counted once).
 */
export function getPeopleCountForSite(site?: string): number {
  if (!site) return peopleList.length;
  return peopleList.filter((u) => u.sites.primary === site).length;
}

export const peopleCounts = {
  total: 35,
  healthy: 14,
  needsAttention: 11,
  needsOnboarding: 10,
};
