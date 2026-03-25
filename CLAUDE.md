# CLAUDE.md
# Design System — Portal WX
# Read this entire file before writing any UI code.

## What this project is
A design system and component library for Portal WX (Sharry). This is NOT the product application — it's the living reference for every token, component, and pattern. Think of it like Storybook: each component has variants, states, and usage examples. Other parts of the product (dashboard, people, etc.) consume components from here.

Portal WX is a workplace management and access platform used in enterprise environments. Sharry is a white-label product, so the design system must support flexible brand styling while keeping the base UX, layout logic, and component behavior consistent.

## Source of truth
The component API, structure, and behavior reference is the internal Vue 3 Storybook at:
`https://monorepo-3c645f.gitlab.io/storybook-static/`

Components in this design system are the **React equivalents** of that library. When implementing a component:
- Match the prop API where possible (same names, same variants)
- Match the visual structure and hierarchy
- Adapt to React + Tailwind + our token system (do NOT copy Vue syntax)
- Chart and dashboard components are new — not in the Storybook — designed from scratch following DS rules

## Tech stack
Next.js 14+ (App Router) + Tailwind CSS v4 + TypeScript + GSAP + Lucide React

## Project structure
```
/
├── app/                        # DS showcase pages
│   ├── page.tsx                # Main entry
│   ├── globals.css             # All tokens, theme, base styles
│   ├── layout.tsx              # Root layout (Lexend font)
│   ├── components/             # Showcase pages (one per component)
│   │   ├── layout.tsx          # Sidebar nav + content shell
│   │   ├── _showcase.tsx       # Showcase + Preview helpers
│   │   └── [name]/page.tsx
│   └── dashboard/              # Dashboard example
├── components/                 # The actual reusable component library
│   ├── ui/                     # Core UI atoms
│   ├── layout/                 # Layout primitives
│   ├── navigation/             # Nav components
│   ├── overlays/               # Modal, Drawer
│   ├── forms/                  # Form inputs and validation
│   ├── data-display/           # Tables, lists, charts
│   ├── feedback/               # Alert, Toast, Banner
│   ├── kpi/                    # KPI system
│   └── dashboard/              # Dashboard widgets
├── lib/
│   ├── utils.ts                # cn() utility
│   └── animations.ts           # GSAP presets
└── hooks/                      # Reusable hooks
```

## Showcase rules
- Every component has its own page at `/app/components/[name]/page.tsx`
- Show all states: default, hover, focus, disabled, error, loading
- Show all variants
- Include usage examples with realistic data
- Use the `<Showcase>` and `<Preview>` wrappers from `_showcase.tsx`
- Consistent layout: left sidebar nav + main content area


## Non-negotiable rules

### Colors
- NEVER use hardcoded hex values inside components
- NEVER use arbitrary Tailwind colors for product UI (no `text-[#fff]`, no `bg-blue-500`)
- ONLY use tokens from `globals.css` via their Tailwind utility names
- Every component must work in both light mode and dark mode

### Brand color tokens (signature colors)

Sharry is a white-label product — color usage must be token-based and themeable.

Base signature palette (light mode):
- `--color-signature` → #6382D5 (primary brand color)
- `--color-d2` → #4D6EC7 (hover)
- `--color-d1` → #3F5BA7 (active / strong emphasis)
- `--color-l1` → #B8C2DE (subtle accent bg)
- `--color-l2` → #F5F6FA (background tint)

Tailwind utilities: `text-signature`, `bg-signature`, `bg-brand-l1`, `bg-brand-l2`, etc.

### Color generation rules (HSL-based)
The palette follows a systematic HSL transformation from the Signature base:
- Signature = hsl(x, a, b)
- D2 = hsl(x, a−22%, b−16%)
- D1 = hsl(x, a−10%, b−7%)
- L1 = hsl(x, a−38%, b+15%)
- L2 = hsl(x, a−38%, b+59%)

### Usage rules
- Signature → primary brand accent (active selections, primary buttons, links)
- D1/D2 → hover and active states
- L1/L2 → backgrounds, highlights, subtle layers
- Status colors → ONLY for feedback states (error, success, warning, info), never decoration

### Token reference
```
Surfaces:          bg-surface-base | bg-surface-raised | bg-surface-overlay | bg-surface-subtle
Text:              text-ink-primary | text-ink-secondary | text-ink-muted | text-ink-inverse
Status fg:         text-status-success | text-status-warning | text-status-error | text-status-info
Status bg:         bg-status-success-bg | bg-status-warning-bg | bg-status-error-bg | bg-status-info-bg
Brand:             text-signature | bg-signature | bg-brand-d1 | bg-brand-d2 | bg-brand-l1 | bg-brand-l2
Border:            border-border-default | border-border-strong | border-border-subtle
```

### Dark mode
The signature palette is defined for light mode. Dark mode must NOT be simple inversion.
- Preserve semantic roles
- Adjust lightness and saturation for readability
- Avoid overly bright or glowing brand colors
- Ensure accessible contrast
- Every component must be tested in both themes


## Typography
Primary font: **Lexend** (weights 300–700). No other brand font.

### Type scale classes (defined in globals.css)
```
.type-display      1.75rem / 600 / -0.02em   — page titles, large KPIs
.type-heading      1rem / 600 / -0.01em      — widget titles, panel headers
.type-subheading   0.8125rem / 500 / uppercase — section labels
.type-body         0.875rem / 400            — descriptions, helper text
.type-label        0.8125rem / 500           — form labels, compact text
.type-caption      0.75rem / 400            — metadata, timestamps
.type-kpi-xl       2.25rem / 600 / -0.03em  — primary KPI values
.type-kpi-lg       1.5rem / 600 / -0.02em   — secondary KPI values
.type-kpi-sm       1.125rem / 600 / -0.01em — inline metrics
```

### Typography rules
- No hardcoded font sizes — use the type scale classes above
- Do not overuse bold
- Prioritize spacing and hierarchy over visual styling
- Mono font allowed only for code/technical identifiers


## Animation
GSAP is used for structural UI motion. CSS transitions for micro-interactions.

**Use GSAP for:** drawer slide-in/out, modal entrance/exit, staged section reveals, panel expand/collapse

**Use CSS transitions for:** hover color changes, opacity fades, minor transform on hover, focus ring appearance

**Never use GSAP for:** decorative motion, constant movement, color animations, layout instability

**Principles:** motion must support hierarchy, never distract, never slow operational workflows


## Layout
```
Page bg:        bg-surface-base
Cards:          bg-surface-raised
Overlays:       bg-surface-overlay
Subtle layers:  bg-surface-subtle

Container:      max-w-full px-6 md:px-10 lg:px-16
Inner wrapper:  max-w-wide mx-auto
```

**Radius:**
- Cards → `rounded-xl` (--radius-card)
- Inputs → `rounded` (--radius-input)
- Pills/badges → `rounded-full` (--radius-pill)

**Density:** enterprise UI — information-dense, readable. No giant empty spaces. No marketing spacing.


## Component library

### Atoms — ui/

Core interactive and display primitives. Direct equivalents to Storybook `Base*` atoms.

| Component | Storybook ref | Description |
|---|---|---|
| Button | BaseButton | Primary, secondary, ghost, destructive. Sizes: sm/md/lg. With icons. |
| IconButton | — | Square icon-only button variant |
| Input | BaseInput | Text input with label, helper, error states |
| Textarea | BaseTextArea | Multiline input |
| Select | — | Dropdown select |
| Checkbox | BaseCheckbox | With label and error state |
| Radio | BaseRadio | With label and group |
| Toggle | BaseToggle | Boolean switch |
| Addon | BaseAddon | Input prefix/suffix decorator (icon, text, button) |
| Validate | BaseValidate | Form field validation wrapper (shows error/success) |
| ValidateGroup | BaseValidateGroup | Groups multiple Validate fields |
| SearchField | — | Search input with icon and clear |
| DatePicker | BaseDatePicker | Single date picker |
| DateRange | — | Date range picker |
| TimePicker | BaseTimePicker | Time input |
| DateTimePicker | BaseDateTimePicker | Combined date + time |
| Card | BaseCard | Surface container, optional interactive |
| Badge | BaseTag | Status/label pill. Variants: default, success, warning, error, info |
| Avatar | BaseAvatar | User avatar with fallback initials |
| Tabs | BaseTab / BaseTabGroup | Tab navigation |
| Tooltip | BaseTooltip | Hover tooltip |
| Divider | BaseHr | Horizontal/vertical rule |
| Spinner | BaseLoader | Loading spinner |
| Skeleton | BaseSkeleton | Content placeholder |
| EmptyState | BaseEmpty | Empty content state with icon + message |
| Status | BaseStatus | Status dot/indicator (online, offline, busy, away) |
| Tag | BaseTag | Inline label tag, closeable |
| Text | BaseText | Typed text wrapper (body, caption, label roles) |
| Title | BaseTitle | Typed title wrapper (display, heading, subheading roles) |
| Icon | BaseIcon | Lucide icon wrapper with sizing tokens |
| FeatureIcon | BaseFeatureIcon | Icon with colored background circle/square |
| Image | BaseImage | Image with loading state and fallback |
| AppStoreBadge | BaseAppStoreBadge | App Store / Google Play download badge |
| QrCode | BaseQrCode | QR code display block |
| DayStatus | BaseDayStatus | Calendar day with status indicator |
| Bar | BaseBar | Thin loading/progress bar (top-of-page style) |
| Box | BaseBox | Generic surface container / layout primitive |
| Group | BaseGroup | Logical grouping wrapper |
| FileUpload | BaseDragAndDrop | Drag-and-drop file upload zone |
| Video | BaseVideo | Video player with controls |
| Camera | BaseCamera | Camera capture input |
| CodeEditor | BaseCodeEditor | Syntax-highlighted code input |
| Wysiwyg | BaseWysiwyg | Rich text editor |
| Diff | BaseDiff | Code/text diff viewer |
| Map | BaseMap | Map embed container |
| Print | BasePrint | Print layout wrapper |
| InfiniteLoader | BaseInfiniteLoader | Infinite scroll trigger sentinel |
| VirtualScroller | BaseVirtualScroller | Virtualized list wrapper |
| WeekContainer | BaseWeekContainer | 7-day week calendar grid |
| Scrollbar | BaseScrollbar | Custom styled scrollbar |
| Animation | BaseAnimation | Transition/animation wrapper |
| KanbanCol | BaseKanbanCol | Kanban board column |

### Molecules — ui/ or dedicated folders

Composed components built from atoms.

| Component | Storybook ref | Description |
|---|---|---|
| Menu | BaseMenu | Dropdown context menu with items |
| MenuButton | BaseMenuButton | Button that triggers a Menu |
| DropdownButton | BaseDropdownButton | Button with attached dropdown options |
| DropdownInput | BaseDropdownInput | Input combined with dropdown |
| PageHeader | BasePageHeader | Page-level header: title, breadcrumbs, actions |
| MobileHeader | BaseMobileHeader | Mobile app top bar |
| UserMenu | BaseUserMenu | Avatar + name + dropdown (profile, logout) |
| Search | BaseSearch | Search input with results list |
| GoogleSearch | BaseGoogleSearch | Address/places autocomplete |
| Stepper | BaseStepper | Multi-step progress indicator |
| Wizard | BaseWizard | Multi-step form with navigation |
| BadgeCard | BaseBadgeCard | Card with an overlaid badge |
| ContentCard | BaseContentCard | Media + text card (image, title, body, action) |
| GuestCard | BaseGuestCard | Visitor/guest info display card |
| FacilityReportCard | BaseFacilityReportCard | Facility report summary card |
| Comment | BaseComment | Comment/reply thread item |
| ContentAI | BaseContentAI | AI-generated content block with indicator |
| OpeningHours | BaseOpeningHours | Business hours display / editor |
| LifeCheck | BaseLifeCheck | Connectivity/health status indicator |
| MobilePreviewContent | BaseMobilePreviewContent | Mobile screen preview frame |
| MobilePreviewProperty | BaseMobilePreviewProperty | Property row in mobile preview |
| GuestPrint | BaseGuestPrint | Print-optimized guest pass layout |
| Upload | BaseUpload | File upload with progress + preview |
| Notifications | BaseNotifications | Notification list/panel |

### Organisms — navigation/ overlays/ dashboard/

| Component | Storybook ref | Description |
|---|---|---|
| Sidebar | BaseSidebar | App sidebar with nav groups, collapse |
| TopBar | — | Top navigation bar |
| AppSidebar | — | Full app sidebar with branding |
| Modal | BaseModal | Dialog overlay |
| Drawer | — | Side panel (GSAP animated) |
| Validity | BaseValidity | Multi-field validity summary |

### Layout — layout/

| Component | Description |
|---|---|
| PageShell | Full page wrapper: sidebar + topbar + content |
| Section | Content section with title and spacing |
| Grid | Responsive CSS grid |
| Stack | Vertical or horizontal flex stack |
| SplitPanel | Two-column resizable or fixed split |
| Col / Row | Grid column / row primitives |

### Feedback — feedback/

| Component | Description |
|---|---|
| Alert | Inline status message (success, warning, error, info) |
| Toast | Ephemeral notification |
| Banner | Page-level announcement bar |

### Data display — data-display/

| Component | Description |
|---|---|
| Table | Data table with head, rows, cells, sorting |
| List | Structured item list |
| Timeline | Chronological event list |
| MetricList | Label + value pairs |
| StatBlock | Large stat with label |
| ProgressBar | Labeled progress bar |
| DistributionBar | Segmented distribution bar |

### Charts — data-display/charts/ (new, not in Storybook)

Chart components use SVG primitives or a lightweight charting library. All charts must:
- Use token colors only (status tokens, brand tokens)
- Support responsive sizing via container width
- Support dark mode
- Include loading and empty states
- Have accessible labels/tooltips

| Component | Description |
|---|---|
| LineChart | Time-series line chart |
| AreaChart | Filled area chart |
| BarChart | Vertical or horizontal bar chart |
| DonutChart | Donut/ring chart |
| PieChart | Pie chart |
| SparklineChart | Tiny inline trend line |
| HeatMap | Grid-based intensity map |
| GaugeChart | Radial gauge / progress arc |
| ScatterPlot | X/Y scatter chart |

### KPI system — kpi/

KPI components are critical. They are the primary signal surface of the product.

| Component | Description |
|---|---|
| KPICard | Level 1: compact, clickable overview metric |
| KPIRow | Horizontal list of KPI metrics |
| KPIGroup | Level 2: grouped secondary metrics in a panel |
| KPIInline | Tiny inline metric for tables or subheaders |

**Level 1 rules:** one value, minimal context, optional trend, compact, clickable
**Level 2 rules:** up to 3 metrics per group, tied to L1, includes filters + charts

### Dashboard widgets — dashboard/

Pre-composed widgets for the dashboard. Each widget uses components from the library above.

| Widget | Description |
|---|---|
| DashboardFilterBar | Time range + contextual filters |
| SystemStatusWidget | System health overview |
| WorkplaceAccessWidget | Access events KPI |
| SiteActivityWidget | Site activity trend |
| VisitorsWidget | Visitor count KPI |
| ParkingWidget | Parking occupancy |
| DigitalAdoptionWidget | App adoption metrics |
| PeopleIdentityWidget | Identity verification KPI |


## Component behavior rules
- Every interactive component → hover, focus, disabled state
- Every stateful component → light and dark mode
- Every clickable KPI → visually identifiable as interactive
- Drawers → default Level 2 interaction pattern
- Avoid page navigation when drill-down works in context
- Forms → always have a validation state (Validate/ValidateGroup)


## Interaction patterns

### Drilldown
Clicking a KPI → opens Level 2 in a Drawer. Never navigate to a new page for contextual detail.

### Progressive disclosure
Level 1 (overview) → Level 2 (detail). Never overload L1. Never hide primary signal in L2.

### Filters
All detailed views and L2 surfaces support: time range + contextual filters (site, zone, segment).
Filters update: KPIs, charts, distributions, tables.


## Accessibility
- Visible focus states (never remove without replacement)
- Keyboard navigation
- Semantic HTML
- aria labels on interactive elements
- Sufficient contrast in both themes


## Design principles
- Clarity over visuals
- Structure over decoration
- Consistency over creativity
- Signal over noise
- Calm enterprise UI over trendy dashboard UI

## Rules when unsure
1. Prefer less UI, not more
2. Prefer neutral surfaces
3. Prefer clear hierarchy over decoration
4. Follow existing component patterns
5. Do not invent new tokens
6. Keep Level 1 compact and Level 2 structured

## Final rule
If the component looks flashy → it is probably wrong.
If the component looks simple, structured, and clear → it is probably correct.
