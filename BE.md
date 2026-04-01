# Backend Module Data Audit for Dashboard

> **Source:** Meeting "People Dashboard | C-level" (Feb 26, 2026) with Langr, Hudinek, Bobina.
> **Goal:** Identify what data each backend module holds and the most valuable metric per target audience for an overview dashboard.

## Prompt

> For each module on Backend, help me distill what data the module has and what would be the most valuable metric for given target audiences to show on an overview dashboard. Include info if given module has matching insight/analytics dashboard.

## Target Personas (from meeting)

| Persona | Needs |
|---|---|
| **C-level Manager** | High-level KPIs, trends, utilization rates, cost indicators |
| **Security Manager** | Access anomalies, incident counts, compliance status |
| **Security Operator** | Real-time alerts, door status, badge issues |
| **Facility/Operations** | Occupancy, ticket resolution, resource utilization |

## Existing Analytics Infrastructure

The platform already has **GoodData embedded dashboards** (external BI) for these modules:

| GoodData Dashboard | Config Key |
|---|---|
| Overview | `good_data_overview` |
| Access | `good_data_access` |
| Guestbook | `good_data_guestbook` |
| Parking | `good_data_parking` |
| Maintenance | `good_data_maintenance` |
| Reservation | `good_data_reservation` |
| User | `good_data_user` |
| Waste Management | `good_data_waste_management` |

Additionally: `data_studio_report` (Google Data Studio embed).

These are toggled per-tenant via settings. Only visible to SuperAdmin + Administrator roles.

The backend also has:
- **`packages/complex/dashboard/`** — Widget-based dashboard framework (could host new native widgets)
- **`packages/complex/metrics/`** — Generic KPI display model (CRUD for metric definitions, not yet module-integrated)
- **Parking ReportsController** — The only module with a native reporting endpoint (history, CSV export)

---

## Module-by-Module Audit

### 1. Access

| | |
|---|---|
| **Data held** | Access levels, roles, doors, cards/badges (physical + virtual), badge formats, device registry, blacklisted devices, elevator clearances, integration-specific records (Salto, Honeywell, Bosch, C4) |
| **Key tables** | `access_levels`, `cards`, `badges`, `doors`, `access_roles`, `badge_counter`, `blacklisted_devices`, `devices` |
| **Activity log** | Yes (Spatie) |
| **Existing dashboard** | GoodData (`good_data_access`) |
| **Native analytics** | None |

**Recommended metrics by persona:**

| Persona | Metric | Why |
|---|---|---|
| C-level | **Active badge count vs total employees** (adoption rate) | Shows digital badge rollout progress |
| Security Manager | **Access denials per day** (trend) | Anomaly detection, policy compliance |
| Security Operator | **Doors in error state** (real-time) | Immediate operational awareness |

---

### 2. Parking

| | |
|---|---|
| **Data held** | Spots (inventory), reservations, license plates, license plate blocklist, company-to-spot allocation, recommendations, activity logs |
| **Key tables** | `reservations`, `spots`, `license_plates`, `license_plates_blocklist`, `company_spot`, `activity_logs` |
| **Activity log** | Yes (custom `ParkingLogActivity`) |
| **Existing dashboard** | GoodData (`good_data_parking`) |
| **Native analytics** | Yes - `ReportsController` with history, date-range filtering, CSV/Excel export |

**Recommended metrics by persona:**

| Persona | Metric | Why |
|---|---|---|
| C-level | **Average occupancy rate** (%) | Space utilization = cost efficiency |
| Facility | **Peak-hour occupancy** (heatmap) | Capacity planning |
| Security | **Blocklisted plate attempts** | Unauthorized access attempts |

---

### 3. Guestbook (Visitor Management)

| | |
|---|---|
| **Data held** | Guests, guestbooks, receptions, invitations, visitor agreements, blocked guests, entry notifications, elevator clearances, access cards per visitor, visitor notes |
| **Key tables** | `guestbooks`, `guests`, `receptions`, `invitations`, `blocked_guests`, `guest_blocklist`, `visitor_agreements`, `entry_notifications` |
| **Activity log** | Yes |
| **Existing dashboard** | GoodData (`good_data_guestbook`) |
| **Native analytics** | None |

**Recommended metrics by persona:**

| Persona | Metric | Why |
|---|---|---|
| C-level | **Visitors per month** (trend) | Business activity indicator |
| Security Manager | **Unsigned agreements count** | Compliance risk |
| Reception/Ops | **Today's expected visitors** | Operational readiness |

---

### 4. Bookings / Reservations 2.0

| | |
|---|---|
| **Data held** | Bookings, booking instances (recurring), bookable assets (rooms, desks, equipment), participants, files |
| **Key tables** | `bookings`, `booking_instances`, `booking_assets`, `booking_participants` |
| **Activity log** | Yes |
| **Existing dashboard** | GoodData (`good_data_reservation`) |
| **Native analytics** | None |

**Recommended metrics by persona:**

| Persona | Metric | Why |
|---|---|---|
| C-level | **Room utilization rate** (booked vs available hours) | Real estate cost optimization |
| Facility | **No-show rate** (booked but unused) | Policy enforcement, resource waste |
| Operations | **Most/least booked assets** (ranking) | Reallocation decisions |

---

### 5. People (Users / Employees / Companies)

| | |
|---|---|
| **Data held** | User accounts, companies (org units), devices, user-location mappings, roles & permissions, company domains/languages, activity log |
| **Key tables** | `users`, `companies`, `devices`, `user_locations`, `roles`, `permissions`, `activity_log` |
| **Activity log** | Yes (Spatie) |
| **Existing dashboard** | GoodData (`good_data_user`) |
| **Native analytics** | None |

**Recommended metrics by persona:**

| Persona | Metric | Why |
|---|---|---|
| C-level | **Total active users / registered users** (adoption %) | Platform ROI |
| C-level | **Mobile app adoption** (users with registered devices) | Digital transformation KPI |
| HR/Ops | **Users per company/department** | Onboarding completeness |

---

### 6. Service Requests (Facility Reports)

| | |
|---|---|
| **Data held** | Service tickets (with statuses, assignments), facility reports, attachments, external integrations (CAFM sync), company mappings |
| **Key tables** | `service_tickets`, `reports`, `report_statuses`, `service_ticket_files`, `report_integrations` |
| **Activity log** | Yes (activity controllers exist) |
| **Existing dashboard** | GoodData (`good_data_maintenance`) |
| **Native analytics** | Partial — `ReportListController` + `ReportListActivityController` (list/detail, no aggregation) |

**Recommended metrics by persona:**

| Persona | Metric | Why |
|---|---|---|
| C-level | **Avg resolution time** (days) | Service quality KPI |
| Facility | **Open tickets by category** (breakdown) | Workload prioritization |
| Operations | **Overdue tickets count** | SLA compliance |

---

### 7. Alerts

| | |
|---|---|
| **Data held** | Alert records, metadata (AlertMedia vendor integration) |
| **Key tables** | `alerts` |
| **Activity log** | Minimal |
| **Existing dashboard** | None |
| **Native analytics** | None |

**Recommended metrics by persona:**

| Persona | Metric | Why |
|---|---|---|
| C-level | **Alerts triggered this month** (count + trend) | Safety/incident awareness |
| Security Manager | **Avg response time** (if tracked) | Emergency readiness |

---

### 8. Agreements

| | |
|---|---|
| **Data held** | Agreement documents, content versions, types, user signatures, signature history, member lists |
| **Key tables** | `agreements`, `agreements_contents`, `agreement_user`, `agreement_histories` |
| **Activity log** | Via history table |
| **Existing dashboard** | None |
| **Native analytics** | None |

**Recommended metrics by persona:**

| Persona | Metric | Why |
|---|---|---|
| C-level | **Agreement signature rate** (signed / required, %) | Compliance posture |
| Legal/HR | **Unsigned mandatory agreements** (list) | Risk exposure |

---

### 9. Content (News, Events, Polls, Forums, Signage, Gallery, Guides)

| Sub-module | Data held | Engagement tracking |
|---|---|---|
| **News** | Articles, multilingual content, comments, sources | `news_views` table (view count per article) |
| **Events** | Events, multilingual content, vendors, images | None |
| **Polls** | Questions, answer options, votes (per-user) | `poll_votes` table |
| **Forums** | Posts, comments, attachments | `cs_forum_posts_reads` (read tracking) |
| **Signage** | Displays, content blocks, modules | None |
| **Gallery** | Photo galleries (part of About module) | None |
| **Guides** | Guide categories, guides (part of About module) | None |

**Existing dashboard:** None
**Native analytics:** None (but raw tracking data exists for News, Polls, Forums)

**Recommended metrics by persona:**

| Persona | Metric | Why |
|---|---|---|
| C-level | **Content engagement rate** (views + votes + reads / active users) | Employee engagement proxy |
| Comms/HR | **Top news articles by views** | Content strategy effectiveness |
| Comms/HR | **Poll participation rate** | Employee voice indicator |

---

### 10. Restaurants (Canteens)

| | |
|---|---|
| **Data held** | Canteen locations, menus, menu files, opening hours, multilingual content |
| **Key tables** | `canteens`, `canteen_menus`, `canteen_opening_hours` |
| **Activity log** | No |
| **Existing dashboard** | None |
| **Native analytics** | None |

**Recommended metrics by persona:**

| Persona | Metric | Why |
|---|---|---|
| Facility | **Menu publishing freshness** (days since last update) | Operational hygiene |

> Limited dashboard value without order/transaction data. Currently content-only.

---

### 11. Marketplace (Special Offers)

| | |
|---|---|
| **Data held** | Offers, multilingual content, files, usage/redemption tracking |
| **Key tables** | `special_offers`, `special_offer_contents`, `special_offer_uses` |
| **Activity log** | No |
| **Existing dashboard** | None |
| **Native analytics** | None (but `special_offer_uses` tracks redemptions) |

**Recommended metrics by persona:**

| Persona | Metric | Why |
|---|---|---|
| C-level | **Offer redemption rate** (uses / impressions) | Employee benefit engagement |
| Ops | **Most redeemed offers** (ranking) | Vendor negotiation leverage |

---

### 12. Destinations (Travel)

| | |
|---|---|
| **Data held** | Custom/client-specific implementation (McKinsey package) |
| **Existing dashboard** | None |
| **Native analytics** | None |

> Too custom to recommend generic metrics. Skip for v1 dashboard.

---

## Summary: Highest-Value Metrics for Overview Dashboard

These are the "one metric per module" picks for a C-level overview screen:

| Module | Hero Metric | Data Source |
|---|---|---|
| **People** | Active users / total (adoption %) | `users` table |
| **Access** | Active badges vs employees | `badges` + `users` |
| **Parking** | Average occupancy rate | `reservations` + `spots` |
| **Guestbook** | Visitors this month (trend) | `guests` table |
| **Bookings** | Room utilization rate | `bookings` + `booking_assets` |
| **Service Requests** | Avg resolution time | `service_tickets` statuses |
| **Agreements** | Signature completion rate | `agreement_user` vs required |
| **Content** | Engagement rate (views+votes/users) | `news_views` + `poll_votes` |
| **Marketplace** | Offer redemption rate | `special_offer_uses` |
| **Alerts** | Alerts this month | `alerts` |

## Existing Dashboard Coverage

```
                        GoodData    Native BE     Recommended
Module                  Embed       Analytics     for v1 Dashboard
------------------------------------------------------------
People/Users            yes         -             yes
Access                  yes         -             yes
Parking                 yes         YES (reports) yes
Guestbook               yes         -             yes
Booking/Reservation     yes         -             yes
Service Requests        yes         partial       yes
Agreements              -           -             yes
Content                 -           partial*      yes
Marketplace             -           partial*      maybe (v2)
Alerts                  -           -             maybe (v2)
Restaurants             -           -             no (no data)
Destinations            -           -             no (custom)

* partial = raw tracking tables exist, no aggregation endpoint
```

## Dashboard Mock — C-level Overview

```
+-----------------------------------------------------------------------------------+
|  SHARRY WORKPLACE                                    [C-level] [Security] [Ops]   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  PEOPLE                    ACCESS                     PARKING                     |
|  +---------------------+  +---------------------+   +------------------------+   |
|  |  2,847 / 3,200      |  |  2,614 / 3,200      |   |  ||||||||||||....       |   |
|  |  ================>   |  |  ===============>    |   |  78% occupied          |   |
|  |  89% adopted         |  |  82% badge adoption  |   |  312 / 400 spots      |   |
|  |                      |  |                      |   |                        |   |
|  |  +142 this month     |  |  12 denials today    |   |  Peak: 91% (Tue 9am)  |   |
|  |  68% mobile app      |  |  0 doors in error    |   |  Trend: +3% vs last w |   |
|  +---------------------+  +---------------------+   +------------------------+   |
|                                                                                   |
|  GUESTBOOK                 BOOKINGS                   SERVICE REQUESTS            |
|  +---------------------+  +---------------------+   +------------------------+   |
|  |      ^               |  |                      |   |                        |   |
|  |     /|\  847         |  |  ##  ##  ..  ##  ..  |   |  Avg resolution: 2.3d  |   |
|  |    / | \             |  |  ##  ##  ..  ##  ..  |   |  ==================>   |   |
|  |   /  |  \  visitors  |  |  ##  ##  ..  ##  ..  |   |                        |   |
|  |  ---+---+---> month  |  |  67% utilization     |   |  14 open | 3 overdue  |   |
|  |  J  F  M             |  |  22% no-show rate    |   |  [!] 3 SLA breaches   |   |
|  +---------------------+  +---------------------+   +------------------------+   |
|                                                                                   |
|  AGREEMENTS                CONTENT                    MARKETPLACE                 |
|  +---------------------+  +---------------------+   +------------------------+   |
|  |                      |  |                      |   |                        |   |
|  |  [=========  ] 94%   |  |  News views    4.2k  |   |  Redemption rate: 34% |   |
|  |  signed              |  |  Poll particip  67%  |   |                        |   |
|  |                      |  |  Forum reads   1.8k  |   |  Top: Gym pass (89x)  |   |
|  |  [!] 12 unsigned     |  |                      |   |  Top: Lunch deal (72x)|   |
|  |  mandatory (NDA)     |  |  Engagement: 43%     |   |                        |   |
|  +---------------------+  +---------------------+   +------------------------+   |
|                                                                                   |
|  ALERTS                    PARKING (detail flyout)                                |
|  +---------------------+  +--------------------------------------------------+   |
|  |                      |  |  Occupancy by hour (today)                       |   |
|  |  2 alerts this month |  |                                                  |   |
|  |  (vs 5 avg)          |  |  100%|          xxxxxxxx                         |   |
|  |                      |  |   80%|      xxxxxxxxxxxxxxxxx                    |   |
|  |  Last: Fire drill    |  |   60%|   xxxxxxxxxxxxxxxxxxxxxxxx                |   |
|  |  Mar 12 — 4m resp.   |  |   40%|  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx           |   |
|  |                      |  |   20%| xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx         |   |
|  +---------------------+  |     0%+--+--+--+--+--+--+--+--+--+--+--+->       |   |
|                            |       6  7  8  9 10 11 12 13 14 15 16 17         |   |
|                            +--------------------------------------------------+   |
+-----------------------------------------------------------------------------------+

LEGEND:
  [C-level]  = Role switcher — each persona sees different metric emphasis
  ====>      = Progress bar
  ||||..     = Occupancy bar
  ##         = Utilization heatmap cell (booked)
  ..         = Utilization heatmap cell (empty)
  xxxxx      = Area chart fill
  [!]        = Attention flag
  ^/|\       = Trend line (visitors over months)

INTERACTION MODEL (from meeting notes):
  - Each card is clickable -> opens flyout with module analytics detail
  - Flyout replaces current GoodData embeds with native charts
  - Role switcher changes visible cards + metric emphasis
  - "Resolve" actions directly from dashboard (e.g., click overdue ticket)
```

```
PERSONA VIEWS — what changes per role:

C-LEVEL                        SECURITY MANAGER              SECURITY OPERATOR
+--------------------------+   +--------------------------+  +--------------------------+
| People: adoption %       |   | Access: denials/day      |  | Access: doors in error   |
| Parking: occupancy       |   | Access: blacklist hits   |  | Access: badge errors NOW |
| Bookings: utilization    |   | Guestbook: unsigned NDAs |  | Parking: blocklist hits  |
| Service Req: resolution  |   | Alerts: response times   |  | Alerts: active NOW       |
| Agreements: signature %  |   | Parking: blocklist hits  |  | Guestbook: check-ins NOW |
| Content: engagement      |   | Agreements: compliance % |  |                          |
| Marketplace: redemptions |   |                          |  | (real-time focus,        |
| Guestbook: visitor trend |   | (trend + compliance      |  |  fewer modules,          |
| Alerts: monthly count    |   |  focus, weekly/monthly)  |  |  live status emphasis)   |
+--------------------------+   +--------------------------+  +--------------------------+
```

## Next Steps (from meeting)

1. Daria to review existing GoodData dashboards and available data
2. Ondrej to share platform access + screenshots for Daria
3. Define KPIs per persona (this document is input)
4. Daria to design realistic dashboard prototype
5. Involve Artem for data import/export considerations
6. Follow-up workshop on branding/assets (with Lukas, Honza, Zuzka)