# People Spec
# Portal WX — People & Identity Management
# All components reference the design system in CLAUDE.md

---

## Purpose

People is the **reactive triage view** for user identity and access management.

It provides:
- full list of all users across all sites
- health-based filtering (Healthy / Needs attention / Needs onboarding)
- quick actions for bulk operations (sync, export)
- drill-down into individual user detail (overview, permissions, change history)

People is NOT:
- a reporting tool
- a user creation wizard
- an HR system

People is:
- triage-driven — surface problems first
- action-oriented — every issue has a recommended next step
- identity-focused — connecting people to access systems

---

## Navigation

### Sidebar integration

The "People" nav item in the left sidebar must display a user count that reflects the currently selected site:

```
People (3,645)
```

Rules:
- Count updates when site filter changes in sidebar site selector
- "All your sites" → total user count across all sites
- Specific site selected → user count for that site only
- Format: comma-separated thousands (e.g., 12,482)

---

## Scale requirements

- Users: from 1 to 50,000+
- Sites per user: from 1 to 10+
- ACS per site: from 1 to 20+
- Credentials per user: from 1 to 10+

UI must gracefully handle:
- Small scale (< 100 users) → no empty states, compact view
- Large scale (10,000+ users) → paginated table, performant filtering

---

## People List (Level 1)

### Page header

```
People
12,482 users in system · Reactive triage view
```

- Title: "People"
- Subtitle: "{totalUsers} users in system · Reactive triage view"
- User count updates based on active filters

### Top bar actions

Left side:
- Search input: "Search by name, email, company, or ID..."

Right side (button group):
- Export (dropdown with chevron) — secondary variant
- Import users — secondary variant
- + Add user — primary variant (signature color)

---

### Status filter tabs

Horizontal tab bar with 3 states. Each tab has:
- Status dot (color-coded)
- Label
- Count badge

Tabs:
1. **Healthy** — green dot — count of healthy users
2. **Needs attention** — orange dot — count of users with issues
3. **Needs onboarding** — blue dot — count of users pending onboarding

Right side of filter bar:
- Settings gear icon
- Sites dropdown filter
- "Clear all" button (visible only when a filter is active)

#### Default state (no filter selected)
- All tabs are inactive (gray dots)
- Table shows all users
- No sub-filter panel

#### Healthy filter selected
- Green dot active on "Healthy" tab
- Tab gets subtle green border/highlight
- No sub-filter panel
- Table filtered to healthy users only

#### Needs attention filter selected
- Orange dot active on "Needs attention" tab
- Tab gets subtle orange border/highlight
- Sub-filter panel appears below tabs:

```
FILTER BY ISSUE TYPE
[Failed identity update  3] [Failed access level update  2] [Unknown badge type  6] [Failed card update  5]
```

- Orange border on sub-filter container
- Orange heading "FILTER BY ISSUE TYPE"
- Each chip shows issue label + count
- Chips are toggleable — clicking filters table further
- Multiple chips can be active simultaneously

#### Needs onboarding filter selected
- Blue dot active on "Needs onboarding" tab
- Tab gets subtle blue border/highlight
- Sub-filter panel appears below tabs:

```
NARROW ONBOARDING QUEUE
[Domain ▾] [Company ▾] [Custom field ▾] [Unknown badge type  4]
```

- Blue border on sub-filter container
- Blue heading "NARROW ONBOARDING QUEUE"
- Dropdown filters: Domain, Company, Custom field
- Chip filter: "Unknown badge type" with count

---

### Selection bar

When one or more users are selected via checkbox:
- Green bar appears below filter tabs, above table
- Shows: "{count} user(s) selected"
- Actions: Sync selected, Export selected, Deselect

Bar styling:
- Green/signature background
- White text
- Action buttons as text links/buttons on the right

---

### People table

Columns:
| Column | Content | Width |
|--------|---------|-------|
| Checkbox | Selection checkbox | 40px |
| USER | Avatar (initials, colored), Full name, Email, Company | flex |
| SITES | Primary site name + "+N" overflow badge | ~200px |
| GLOBAL STATE | Status badge (Healthy/Needs attention/Needs onboarding) | ~160px |
| LAST SYNC | Relative time (e.g., "1h ago", "30m ago", "2d ago") | ~120px |

#### USER column detail
- Avatar: circular, colored background, 2-letter initials
- Name: bold, primary ink
- Email: secondary ink, smaller
- Company: muted ink, smallest

#### SITES column
- Shows primary site name
- If user has multiple sites: "+N" badge after site name
- "+N" in muted style

#### GLOBAL STATE column
Status badges with colored dot + label:
- **Healthy** — green dot, green text, green border
- **Needs attention** — orange dot, orange text, orange border
- **Needs onboarding** — blue dot, blue text, blue border

#### Table header
- Checkbox in header for select-all (toggles between: unchecked, checked, indeterminate)
- Column headers: uppercase, muted, small text
- Sortable columns (click to sort)

#### Table row states
- Default: white background
- Hover: subtle background highlight
- Selected (checked): subtle highlight, checkbox filled
- Click row → navigates to People Detail

---

## People Detail (Level 2)

Full-page view accessed by clicking a user row or navigating to `/people/{userId}`.

### Back navigation

Top of page:
```
← Back to People
```
- Signature/brand color link
- Returns to People list preserving filter state

---

### User header card

Rounded card containing:

Left side:
- Large avatar (initials, colored background)
- Full name (heading)
- Email
- Phone number
- Company name
- EMP ID badge with copy button: `EMP #uuid-string` [copy icon]

Right side:
- Global state badge (Healthy / Needs attention / Needs onboarding) with info tooltip icon
- Last activity time (e.g., "2d ago", "Yesterday")
- Action buttons:
  - **Sync** — secondary button with sync icon
  - **Onboard** — primary/danger button (only for "Needs onboarding" state)
  - **Edit** — secondary button with edit icon
  - **...** — more menu (dropdown)

#### State-specific header variations

**Healthy:**
- Green "Healthy" badge with info icon
- Buttons: Sync, Edit, ...

**Needs attention:**
- Orange "Needs attention" badge
- Buttons: Sync, Edit, ...

**Needs onboarding:**
- Blue "Needs onboarding" badge with info icon
- Buttons: Sync, Onboard (red/pink primary), Edit, ...

---

### Right sidebar — STATUS card

Fixed position card on the right side of the detail page.

#### STATUS section
Key-value pairs:
| Field | Value |
|-------|-------|
| Global state | Status badge (colored) |
| Last sync | Relative time |
| Failing systems | Count (red if > 0, dash "—" if none) |
| Credentials | Count |
| Sites | Count |
| Missing fields | Count (red, only for "Needs onboarding") |

#### QUICK ACTIONS section

List of action buttons (full-width, left-aligned with icons):

**Healthy user:**
- Sync user (sync icon)
- Export user log (download icon)
- Edit profile (edit icon)

**Needs attention user:**
- Sync user (sync icon)
- Retry provisioning (red/warning — outlined danger style)
- Export user log (download icon)
- Edit profile (edit icon)

**Needs onboarding user:**
- Sync user (sync icon)
- Complete onboarding (red/pink primary button)
- Export user log (download icon)
- Edit profile (edit icon)

#### OPEN ISSUES section (conditional)

Only visible when user has issues (Needs attention or Needs onboarding).

List of issues with warning triangle icons:
- Each issue as a text item with ⚠ icon
- Orange/warning color for text

---

### Tab navigation

3 tabs below user header:
1. **Overview** — dot indicator when issues present
2. **Permissions**
3. **Change History**

Active tab: underline style, bold text
Dot indicator: small colored dot after tab label (matches state color)

---

### Overview tab

#### 1. Health Breakdown

Section with icon + heading: "✧ Health Breakdown"

Right side: "Issues detected" badge (only when issues exist, red/error style)

4 status cards in a row:
| Card | Label | Content |
|------|-------|---------|
| 1 | IDENTITY SYNC | ● OK (green) or ● Warning (orange) with description |
| 2 | ACCESS ROLES | ● OK (green) or ● Warning (orange) with description |
| 3 | CREDENTIAL SYNC | ● OK (green) or ● Warning (orange) with description |
| 4 | LAST SYNC ATTEMPT | Time + date (no status dot) |

Card styling:
- Green-tinted background when OK
- Orange-tinted background when Warning
- Warning cards include description text below status

Below cards (when issues exist):
```
Recommended action    [🔧 Review Salto credentials]  (primary action button)
```

#### 2. Detected problems (conditional — only for Needs attention)

Orange/warning section:

Left column — "⚠ Detected problems":
- Bullet list of current issues

Right column — "NEXT STEPS":
- Actionable items with chevron (›) prefix

#### 3. Onboarding required (conditional — only for Needs onboarding)

Blue/info section:

Left column — "ℹ Onboarding required":
- Description of what's needed

Right column — "NEXT STEPS":
- Specific field completion instructions

#### 4. Integration / ACS Systems

Section with icon + heading: "⊟ Integration / ACS Systems" + count badge

Collapsible cards for each connected ACS:

Card header:
- Status badge (● OK green, ● Warning orange)
- ACS name (bold)
- ACS type/vendor label (muted)
- Expand/collapse chevron

Card body (expanded):
| Field | Value |
|-------|-------|
| STATUS | "Fully synced" or error message (red if error) |
| CREDENTIALS | "N configured" |
| RETRIES | "None" or "N failed" (red if failed) |

Warning alert (if applicable):
- Yellow/warning background
- "⚠ N site affected"

Action buttons:
- **Sync now** — primary small button (dark)
- **View logs** — secondary small button with external link icon

#### 5. Sites & Access Structure

Section with icon + heading: "📍 Sites & Access Structure" + count badge

Collapsible cards for each site:

Card header:
- Pin icon
- Site name
- **Primary** badge (red/pink, only for primary site)
- "N ACS system(s)" label
- Expand/collapse chevron

Card body (expanded):
For each ACS at this site:
- Status badge (● OK / ● Warning)
- ACS name + vendor label
- **Roles**: chip/tag list (e.g., "Standard Access", "Office Level 5", "Meeting Rooms")
- **Credentials**: "N active"

Warning alert (if applicable):
- Yellow background
- Warning icon + message (e.g., "Unknown site mapping — WH-EAST-02 not recognized")
- "Fix provisioning" button on the right (outlined)

#### 6. Onboarding Status (conditional — only for Needs onboarding)

Section with icon + heading: "📋 Onboarding Status" + "N missing" badge (red)

Info banner:
- Blue/info background
- "ℹ These fields are required in Sharry before provisioning is complete"

Field checklist:
Each row shows:
- Status icon: ✅ (green check, filled) or ❌ (red X, filled)
- Field name
- Value (right-aligned) or "Missing" label (red text)

Example fields:
| Status | Field | Value |
|--------|-------|-------|
| ❌ | License plate | Missing |
| ❌ | Emergency phone number | Missing |
| ✅ | Occupancy | Floor 3, Desk 12 |
| ✅ | Employee ID | EMP-20451 |

Bottom: "Complete onboarding" button (red/pink primary)

#### 7. Credentials

Section with icon + heading: "🏷 Credentials" + count badge

Summary row with status badges:
- ● N Active (green badge)
- ● N Inactive (gray badge) — only if count > 0
- ⚠ N Issues (red badge) — only if count > 0

Table:
| Column | Content |
|--------|---------|
| STATUS | Badge: Active (green) / Inactive (gray) / Issues (red) |
| TYPE | Credential type (e.g., "HID iCLASS", "Salto JustIN Mobile", "HID Prox") |
| NUMBER | Masked number (e.g., "****4521") or full ID (e.g., "MOB-9912") |
| ACS | ACS system name |
| SITES | Site name + "+N" overflow |
| LAST UPDATED | Relative time |

Issues row: warning icon at the end of the row

#### 8. Access Photo

Section with icon + heading: "📸 Access Photo"

Content:
- Photo placeholder (dashed border circle with camera icon, "No photo" text)
- Description: "Access photo"
- Helper text: "Used for identity verification at access points. PNG or JPG, max 5 MB."
- "Upload photo" button (secondary, with camera icon)

#### 9. Data Source & Ownership

Section with icon + heading: "ℹ Data Source & Ownership"
Collapsible section (chevron to expand/collapse)

Left column:
| Field | Value |
|-------|-------|
| Origin | e.g., "Created in Salto Space" / "Created in Sharry" |
| Registered from | e.g., "Salto Space — Torre (Lima)" / "Sharry HR Import" |
| Created | Date (e.g., "15 Mar 2024") |
| Owned by Sharry | "Yes" / "No" |
| Identifier | e.g., "Email — michael.park@techcorp.com" |

Right column:
- **SOURCE PRIORITY** heading
- Description: "Sharry is source of truth. Overrides ACS on: Custom fields · Metadata · Onboarding data"

---

## Permissions tab

(To be defined — tab exists but content spec pending)

---

## Change History tab

(To be defined — tab exists but content spec pending)

---

## Mock data requirements

### People list mock data

35 users total:
- 14 Healthy
- 11 Needs attention
- 10 Needs onboarding

Each user:
```typescript
interface PeopleListUser {
  id: string;              // UUID
  empId: string;           // EMP #uuid
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  avatarColor: string;     // CSS color for avatar background
  sites: {
    primary: string;       // Primary site name
    additional: number;    // Count of additional sites
  };
  globalState: "healthy" | "needs-attention" | "needs-onboarding";
  lastSync: string;        // Relative time string
  // Detail data
  failingSystems: number;
  credentials: number;
  missingFields?: number;  // Only for needs-onboarding
}
```

### Attention issue types
```typescript
interface AttentionIssueType {
  label: string;
  count: number;
}
```

Issue types:
- Failed identity update
- Failed access level update
- Unknown badge type
- Failed card update

### People detail mock data

```typescript
interface PeopleDetailUser extends PeopleListUser {
  healthBreakdown: {
    identitySync: "ok" | "warning";
    identitySyncDetail?: string;
    accessRoles: "ok" | "warning";
    accessRolesDetail?: string;
    credentialSync: "ok" | "warning";
    credentialSyncDetail?: string;
    lastSyncAttempt: string;      // Relative time
    lastSyncDate: string;         // Date string
  };
  detectedProblems?: string[];
  nextSteps?: string[];
  recommendedAction?: {
    label: string;
    action: string;
  };
  acsSystems: AcsSystemDetail[];
  sitesAccess: SiteAccessDetail[];
  credentialsList: CredentialDetail[];
  onboardingFields?: OnboardingField[];  // Only for needs-onboarding
  dataSource: {
    origin: string;
    registeredFrom: string;
    created: string;
    ownedBySharry: boolean;
    identifier: string;
    sourcePriority: string;
  };
  openIssues?: string[];
}

interface AcsSystemDetail {
  name: string;
  vendor: string;
  status: "ok" | "warning";
  syncStatus: string;         // "Fully synced" or error message
  credentials: string;        // "N configured"
  retries: string;            // "None" or "N failed"
  sitesAffected?: number;
  expanded: boolean;
}

interface SiteAccessDetail {
  name: string;
  isPrimary: boolean;
  acsCount: number;
  acsSystems: {
    name: string;
    vendor: string;
    status: "ok" | "warning";
    roles: string[];
    credentials: string;      // "N active"
    warning?: string;         // Warning message if any
  }[];
}

interface CredentialDetail {
  status: "active" | "inactive" | "issues";
  type: string;
  number: string;
  acs: string;
  sites: string;
  lastUpdated: string;
  hasIssue?: boolean;
}

interface OnboardingField {
  name: string;
  status: "complete" | "missing";
  value?: string;
}
```

---

## Component mapping

| UI Element | Design System Component |
|------------|------------------------|
| Search input | Custom input with search icon |
| Filter tabs | Custom tab component with dot + count |
| Status badges | `Badge` (success/warning/info variants) |
| User avatar | `Avatar` (initials mode, colored) |
| Data table | `Table` / `TableHead` / `TableRow` / `TableCell` |
| Action buttons | `Button` (primary/secondary/danger variants) |
| Cards (health, ACS, sites) | `Card` component |
| Selection bar | Custom bar component |
| Chips/tags | Custom chip component (roles, issue types) |
| Collapsible sections | Custom accordion with chevron toggle |

---

## Routing

- `/people` → People list (Level 1)
- `/people/{userId}` → People detail (Level 2)

The People section uses the same layout shell as Dashboard:
- AppSidebar on the left (People nav item active)
- Main content area on the right

---

## Responsive behavior

- Table scrolls horizontally on narrow viewports
- Filter sub-panels stack vertically on mobile
- Right sidebar (STATUS card) moves below header on narrow screens
- Search and action buttons wrap on mobile
