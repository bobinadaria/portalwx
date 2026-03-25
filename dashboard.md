# Dashboard Spec
# Portal WX — Operational & Executive Dashboard
# All components reference the design system in CLAUDE.md

---

## Core principle (NON-NEGOTIABLE)

Dashboard must communicate the core Sharry story:

"Connecting people and places through access"

Every KPI MUST reflect at least one of:
- People (who)
- Place (where)
- Access (how)

Strong dashboards connect all three.

If a metric does not support this → it does not belong here.

---

## Product language rules (IMPORTANT)

Use:
- workplace language
- real-world concepts
- access-driven terminology

Avoid:
- technical system terms
- backend language
- infrastructure naming

BAD:
Component Health
Identity Provider
System Module

GOOD:
Systems
Access Systems

---

## Purpose

Dashboard is the **entry point to Portal WX**.

It provides:
- high-level operational overview across sites
- fast understanding of workplace usage
- visibility of how people interact with places through access
- quick drill-down into operational domains

Dashboard is NOT:
- a reporting tool
- a BI dashboard
- a data exploration tool

Dashboard is:
- KPI-driven
- narrative-driven
- optimized for **5-second understanding**

---

## Scale requirements (CRITICAL)

The dashboard must support a wide range of client sizes:

- Sites: from 1 to 70+
- ACS: from 1 to 20+

UI must gracefully handle both extremes:
- 1 site, 1 ACS → no scrolling, compact single view
- 70 sites, 20 ACS → horizontal scroll with fade-out, dropdowns, lazy loading

Client types:
- Enterprise (primary) — large site counts, many ACS, no parking focus
- Building (secondary) — smaller scale, parking relevant

All scale-sensitive components must adapt to data volume. Never show empty scroll areas or broken layouts at small scale.

---

## ACS status vocabulary (STRICT)

Only 2 possible statuses per ACS:

- **Operational** → ACS is connected and working correctly
- **Lost Connection** → ACS has no active connection

Rules:
- NO "degraded", NO "offline", NO "unknown" in UI language
- "Operational" replaces all previous "Online" labels
- "Lost Connection" replaces all previous "Offline" labels
- Aggregate site status is derived from its ACS statuses:
  - All ACS Operational → site is Operational
  - Any ACS Lost Connection → site is Affected

---

## KPI architecture

Dashboard follows strict 2-level KPI hierarchy:

---

### LEVEL 1 — Executive KPI cards

- horizontal row
- 1 KPI per card
- no filters
- readable in ≤ 5 seconds

Each card:
- Title
- KPI
- Context label
- Trend

---

### LEVEL 2 — Operational detail

- right-side panel (drawer)
- opens on click

Contains:
- filters
- supporting KPIs
- visualizations
- detailed structure

---

## Global filters (LEVEL 2 only)

- Site
- Zone
- Time

Must:
- behave consistently
- update all data

---

## Layout shell

- left sidebar (fixed)
- main content grid
- NO "Live" status indicator anywhere in the header

### Critical layout rule:

Sites & Access Status widget is FULL WIDTH in row 1.

Reason:
- it is the primary entry point
- it contains map + site list + status — needs space

Grid:
- Sites & Access Status → 100% (full width)
- All other widgets → grid below

---

## Widget order

1. Sites & Access Status (full width)
2. Occupancy
3. Guests
4. Bookings
5. Digital Badge Adoption
6. Service Requests
7. People & Access State

---

# LEVEL 1 — KPI CARDS

---

## 1. Sites & Access Status

### Purpose

Single unified widget replacing:
- Global Site Footprint
- System Status

Shows geographic distribution, site operational state, and ACS connectivity in one compact, interactive surface.

---

### Level 1 — top section

Primary KPI:
Total sites

Example:
4 sites

Supporting KPIs (inline, small):
- Operational: 2
- Affected: 2

---

### Map — 2D interactive

Use a 2D flat map (NOT a globe, NOT a 3D projection).

Goal: make size differences between sites immediately readable.

Recommended approach — Bubble map:
- Each site is represented as a circle on the 2D map
- Circle size scales proportionally to the number of users at that site
- Color:
  - Green → Operational
  - Red → Affected (any ACS Lost Connection)

Alternative if bubble map is not viable:
- Use marker pins with a small badge showing user count
- Size the pin head by user count tier (S / M / L)

Rules:
- Map must be pan-able and zoom-able
- Clicking a bubble/pin → opens Level 2 right panel for that site
- Map should not dominate the card — keep it compact, ~50% of card height
- No globe projection, no 3D, no satellite imagery

---

### Site list — horizontal scroll

Below the map, all sites displayed as horizontal scrolling chips/cards.

Rules:
- Sort: Affected sites first, then Operational
- Horizontal scroll with right-side fade-out (CSS mask: linear-gradient to transparent)
- Each chip shows:
  - Site name
  - Status dot (green / red)
  - Short impact line if Affected (see below)
- Scale: works for 1 site (no scroll, no fade) and 70+ sites (scroll + fade)
- On chip click → pan map to site + open Level 2 panel

---

### Impact layer

Always visible inline when issues exist. Appears as a compact alert below the site list.

Format:

ACS Lost Connection in [Site A], [Site B] — [N] users affected

Rules:
- user-first language
- no ACS technical names
- scannable in < 3 seconds
- hidden when all systems Operational

---

### What is NOT shown in Level 1

- No ACS list
- No individual ACS names
- No uptime percentages
- No identity health breakdown

---

### Level 2 — Site Detail Panel

Opens on site chip click or map click.

#### Site info
- Site name
- Country
- Status (Operational / Affected)

#### Site KPIs
- Total users
- ACS connected (count)
- Credential coverage (%)

#### ACS layer

List of ACS per site:

Each ACS shows:
- Name
- Status: Operational / Lost Connection (no other values)
- Last sync timestamp

If all ACS Operational → show single line "All access systems operational"
If any Lost Connection → show each affected ACS with: name + "Lost Connection" + last seen

---

## 2. Occupancy

Renamed from: Workplace Presence

### Scope

Employees only: Home users + Travelers
Guests are shown in a separate widget (see Widget 3).

---

### Level 1

Primary KPI:
Current occupancy

Format:
People / Capacity + %

Example:
342 / 800 · 43%

Context label:
Employees across all sites

Trend: occupancy over time (sparkline)

---

### Level 2

KPIs:
- Home users (count)
- Travelers (count)
- Total employees present

Visualizations:
- Occupancy by site (bar or stacked bar)
- Daily occupancy trend (line chart)

Filters:
- Site
- Zone
- Time

---

## 3. Guests

New widget, split from Workplace Presence.

### Level 1

Primary KPI:
Guests today

Format:
Count

Example:
47 guests

Context label:
Active visits across all sites

Trend: guest volume trend (sparkline)

---

### Level 2

KPIs:
- Invited (count)
- Arrived (count)
- Arrival rate (%)

Visualizations:
- Guests by site
- Arrival vs invite trend over time

Guest badge types breakdown:
- Digital card (BLE, Wallet, QR, Biometric)
- Plastic card
- Other

Interaction:
Click Digital card → breakdown into BLE / Wallet / QR / Biometric

Filters:
- Site
- Time

---

## 4. Bookings

Replaces: Parking Access

### Rationale

Parking is relevant primarily for building clients. Enterprise clients use a wider range of reservation types.

This widget covers all types of reservations universally.

---

### Reservation types

Supported types (show only what is configured per client):

- Hot desks
- Meeting rooms / Conference rooms
- Parking spots (shown only if client has parking enabled)
- Lockers
- Event spaces / Auditoriums

Note: enterprise clients typically use hot desks, meeting rooms, lockers, and event spaces.
Building clients more likely to use parking spots.

---

### Level 1

Primary KPI:
Total bookings today

Format:
Count

Example:
214 bookings

Context label:
Across all reservation types and sites

Trend: booking volume trend (sparkline)

---

### Level 2 — Universal structure (not type-specific)

KPIs:
- Total bookings
- Unique bookers
- Cancellation rate (%)
- No-show rate (%)

Visualizations:

1. Bookings by type (donut chart)
   - Distribution across hot desks / meeting rooms / parking / lockers / events

2. Occupancy by site (horizontal bar)
   - How full each site's bookable resources are

3. Booking trend over time (line chart)
   - Volume per day/week, filterable by type

4. Utilization by zone (bar)
   - Which zones / floors are most booked
   - Useful for understanding which areas need more capacity

Filters:
- Site
- Zone
- Reservation type
- Time

---

## 5. Digital Badge Adoption

Renamed from: Sharry Adoption

### Scope

Employees only. Guests excluded.

### What is a Digital Badge

Digital badge = any of:
- Wallet (Apple Wallet / Google Wallet)
- BLE (Bluetooth Low Energy)
- QR code
- Biometric

Physical card is NOT a digital badge.

---

### Level 1

Primary KPI:
Digital badge adoption rate (%)

Format:
Percentage

Example:
71%

Context label:
Employees using digital access instead of physical

Trend: adoption trend over time (sparkline)

Secondary inline metric:
Active digital users: [N]

Definition of active: user who has generated a credential and used it at least once in the selected period.

---

### Level 2

KPIs:
- Digital users (count)
- Physical card users (count)
- Active digital users (count, see definition above)
- Growth vs previous period (%)

Badge type breakdown:
- Wallet
- BLE
- QR
- Biometric

Interaction:
Click any badge type → see breakdown by site

Visualizations:
- Donut: digital vs physical split
- Bar: adoption by site
- Line: adoption trend over time

Mobile App integration:
- Active app users (from Mobile App analytics) appears here as a supporting metric
- Reasoning: digital badge usage is correlated with app usage; active app user = user who opened app at least once in period

Filters:
- Site
- Time

---

## 6. Service Requests

New widget.

### Purpose

Visibility into open and resolved service requests across the platform.
Adapted from operational reporting data.

---

### Level 1

Primary KPI:
Currently open requests

Format:
Count

Example:
82

Supporting:
- Requests created (period): 21
- Requests closed (period): 19
- Change vs previous period: +91% / +12%

Context label:
Open requests that haven't been closed yet

Trend: open request volume trend (sparkline)

---

### Level 2

#### Section: Requests in numbers

KPIs:
- Currently open requests
- Requests created (in period)
- Requests closed (in period)
- Previous period comparison for each
- % change for each

---

#### Section: How are they created?

Who reports the most:
- Horizontal bar chart: requests by tenant (sorted descending)
- Y-axis: Tenant name
- X-axis: New requests count
- Color per tenant

Where are they reported:
- Horizontal bar chart: requests by location / zone
- Y-axis: Location name
- X-axis: New requests count

---

#### Section: Team performance

New vs closed requests over time:
- Line chart with 3 series:
  - New requests
  - Requests moved to processing
  - Requests closed
- X-axis: time (months)

Average time to close:
- Line chart with 2 series:
  - Average resolution time
  - Average response time
- X-axis: time (months)

Definition:
- Response time = time from creation to "processing" status in Sharry
- Resolution time = time from creation to "closed" status

---

#### Section: Attention needed

Highest response time by tenant (last 6 months):
- Horizontal bar chart
- Shows tenants with longest average response time

Highest resolution time by tenant (last 6 months):
- Horizontal bar chart
- Shows tenants with longest average resolution time

---

#### Section: Addressing the past

Top 10 longest outstanding open requests:
- Table view
- Columns: Site, Tenant, Created At, Assigned to, Location, Request ID, Status, Description, Time open
- Sorted by creation date ascending (oldest first)
- Visual indicator: color coding for time open (neutral → warning → critical)

Filters:
- Site
- Tenant
- Date range

---

## 7. People & Access State

Primary KPI:
Total users

Secondary:
Users with issues

Meaning:
Are people ready to access workplaces?

---

### Level 1

Primary KPI:
Total users

Badge:
[N] users with issues (if any, shown as warning badge)

Context label:
Access readiness of people

---

### Level 2

KPIs:
- Healthy (count)
- Needs onboarding (count)
- Needs attention (count)

Needs attention breakdown:
- Failed identity update
- Failed access level update
- Unknown badge type
- Failed card update

Interaction:
Click category → open People module → filtered listing

Mobile App integration:
- New app users metric surfaces here as onboarding signal
- Reasoning: new app users correlate with onboarding completeness; a gap between "new users" and "healthy" may indicate onboarding issues

---

# LEVEL 2 — RIGHT SIDE PANELS

All panels:
- opened via drawer (right side)
- include Zone + Time filters (except Site Detail)
- description bar below header
- content scrolls independently

---

## Panel: Sites & Access Status → Site Detail

Structure: Site → ACS

Status types:
- Operational
- Lost Connection

Aggregation:
- all Operational → site is Operational
- any Lost Connection → site is Affected

Content:
- site name, country, status
- total users, credential coverage
- ACS list: name, status, last sync
- if all operational: summary line only

---

## Panel: Occupancy

KPIs:
- Home users
- Travelers
- Total present

Charts:
- Occupancy by site (bar)
- Daily trend (line)

---

## Panel: Guests

KPIs:
- Invited
- Arrived
- Arrival rate %

Charts:
- Guests by site
- Invite vs arrival trend

Badge type breakdown with drill-down into Digital badge subtypes.

---

## Panel: Bookings

KPIs:
- Total bookings
- Unique bookers
- Cancellation rate
- No-show rate

Charts:
- By type (donut)
- By site (bar)
- Trend (line)
- By zone (bar)

---

## Panel: Digital Badge Adoption

KPIs:
- Digital users
- Physical card users
- Active digital users
- Growth %

Charts:
- Digital vs physical (donut)
- By site (bar)
- Adoption trend (line)
- Badge type breakdown

---

## Panel: Service Requests

See Level 2 detail described in widget section above.

---

## Panel: People & Access State

KPIs:
- Healthy
- Needs onboarding
- Needs attention (with breakdown)

Interaction: category click → filtered People module

---

# Component structure

- Card
- KPI block
- Charts (DonutChart, LineChart, BarChart, SparklineChart)
- Drawer (Level 2 panels)
- HorizontalScroll with right-side fade mask
- Badge / StatusDot
- ImpactAlert (inline warning block)
- BubbleMap / MarkerMap (2D only)

---

# Visual hierarchy

- Level 1 dominates
- Level 2 supports
- Scale-adaptive components for 1–70+ sites

---

# What we DO

- reflect workplace reality
- connect people, places, access
- scale gracefully from small building clients to large enterprise
- separate employee and guest data where relevant

---

# What we DO NOT do

- no technical dashboards
- no backend language
- no globe / 3D maps
- no "Live" status indicators without functional meaning
- no "degraded" or "offline" ACS labels — only Operational / Lost Connection

---

# Responsive

Mobile:
- stacked

Desktop:
- grid

---

# Data consistency

- consistent metrics
- no contradictions
- employee and guest data never mixed in same KPI without explicit labeling

---

# Mobile App data integration

Mobile App analytics (App Users data) is integrated where logically relevant:

| Metric | Used in widget | Reason |
|---|---|---|
| All users in Sharry | People & Access State | Total platform user baseline |
| Active app users | Digital Badge Adoption | Active badge usage correlates with app activity |
| New app users | People & Access State | Onboarding signal |
| Average app opens / user | Digital Badge Adoption | Engagement indicator for digital credential users |
| Average user engagement | Digital Badge Adoption (Level 2) | Depth of app usage among badge users |

Rules:
- Mobile app data is supporting context, not a primary KPI in any Level 1 card
- It surfaces in Level 2 panels only
- Label clearly as "App data" when shown alongside access data

---

# Future

- drill-down to individual user access history
- predictive occupancy
- cross-widget site filtering (click site on map → all widgets filter to that site)
- booking recommendation engine (suggest zones with availability)
- ACS health timeline (incident log per site)
