// Mock data for all dashboard widgets
// Structured around the KPI Level 1 → Level 2 hierarchy

// ── ACS statuses: only "operational" or "lost-connection" ──

export interface AcsUnit {
  name: string;
  zones: string;
  status: "operational" | "lost-connection";
  lastSync: string;
  trend: number[];
}

export interface SiteAcsGroup {
  site: string;
  acs: AcsUnit[];
}

export interface SiteAcs {
  name: string;
  status: "operational" | "lost-connection";
  lastSync: string;
}

export interface SiteFootprintData {
  id: string;
  name: string;
  city: string;
  country: string;
  flag: string;
  coordinates: [number, number];
  status: "operational" | "affected";
  totalUsers: number;
  acsConnected: number;
  credentialCoverage: number;
  acs: SiteAcs[];
}

// ── Occupancy (employees only) ──

export interface OccupancyData {
  totalPresent: number;
  totalCapacity: number;
  homeUsers: number;
  travelers: number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  trend: number[];
}

// ── Guests ──

export interface GuestsData {
  totalGuests: number;
  invited: number;
  arrived: number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  trend: number[];
  badgeTypes: { label: string; value: number; color: string }[];
}

// ── Bookings ──

export type BookingType = "hot-desks" | "meeting-rooms" | "parking" | "lockers" | "event-spaces";

export interface BookingsData {
  totalBookings: number;
  uniqueBookers: number;
  cancellationRate: number;
  noShowRate: number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  trend: number[];
  byType: { type: BookingType; label: string; count: number; color: string }[];
}

// ── Digital Badge Adoption (employees only) ──

export interface DigitalBadgeAdoptionData {
  adoptionRate: number;
  digitalUsers: number;
  physicalCardUsers: number;
  activeDigitalUsers: number;
  activeAppUsers: number;
  avgAppOpens: number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  trend: number[];
  badgeBreakdown: { name: string; value: number }[];
}

// ── Service Requests ──

export interface ServiceRequestsData {
  openRequests: number;
  createdInPeriod: number;
  closedInPeriod: number;
  prevCreated: number;
  prevClosed: number;
  createdChange: string;
  closedChange: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  trend: number[];
  byTenant: { tenant: string; count: number; color: string }[];
  byLocation: { location: string; count: number; color: string }[];
}

// ── People & Access State ──

export interface PeopleIdentityData {
  totalPeople: number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  healthy: number;
  needsOnboarding: number;
  needsAttention: number;
  attentionBreakdown: { label: string; count: number }[];
  newAppUsers: number;
}

// ── Workplace Usage (kept for L2) ──

export interface WorkplaceAccessData {
  totalInteractions: number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  trend: number[];
  accessEvents: number;
  uniqueUsers: number;
  methodDistribution: { label: string; value: number; color: string }[];
}

// ── Mock Data ──────────────────────────────────────────

export const sitesFootprint: SiteFootprintData[] = [
  {
    id: "ny",
    name: "HQ — New York",
    city: "New York",
    country: "USA",
    flag: "🇺🇸",
    coordinates: [-74.006, 40.7128],
    status: "operational",
    totalUsers: 16,
    acsConnected: 2,
    credentialCoverage: 91,
    acs: [
      { name: "Lenel", status: "operational", lastSync: "2 min ago" },
      { name: "Genetec", status: "operational", lastSync: "1 min ago" },
    ],
  },
  {
    id: "london",
    name: "Building B — London",
    city: "London",
    country: "UK",
    flag: "🇬🇧",
    coordinates: [-0.1278, 51.5074],
    status: "affected",
    totalUsers: 9,
    acsConnected: 1,
    credentialCoverage: 87,
    acs: [
      { name: "Lenel", status: "lost-connection", lastSync: "24 min ago" },
    ],
  },
  {
    id: "singapore",
    name: "Building C — Singapore",
    city: "Singapore",
    country: "SGP",
    flag: "🇸🇬",
    coordinates: [103.8198, 1.3521],
    status: "operational",
    totalUsers: 6,
    acsConnected: 1,
    credentialCoverage: 95,
    acs: [
      { name: "Genetec", status: "operational", lastSync: "3 min ago" },
    ],
  },
  {
    id: "berlin",
    name: "Building D — Berlin",
    city: "Berlin",
    country: "DEU",
    flag: "🇩🇪",
    coordinates: [13.405, 52.52],
    status: "affected",
    totalUsers: 4,
    acsConnected: 1,
    credentialCoverage: 88,
    acs: [
      { name: "Lenel", status: "lost-connection", lastSync: "8 min ago" },
    ],
  },
];

export const systemAcsBySite: SiteAcsGroup[] = [
  {
    site: "HQ — New York",
    acs: [
      { name: "Lenel", zones: "Floor 3", status: "operational", lastSync: "2 min ago", trend: [99.7, 99.8, 99.9, 99.8, 99.9, 99.8, 99.8] },
      { name: "Genetec", zones: "Floor 1–2, Parking", status: "operational", lastSync: "1 min ago", trend: [99.2, 99.3, 99.5, 99.6, 99.5, 99.5, 99.5] },
    ],
  },
  {
    site: "Building B — London",
    acs: [
      { name: "Lenel", zones: "Building A", status: "lost-connection", lastSync: "24 min ago", trend: [99.1, 98.5, 95.2, 90.1, 88.0, 87.5, 87.2] },
    ],
  },
  {
    site: "Building C — Singapore",
    acs: [
      { name: "Genetec", zones: "Main Entrance, Roof", status: "operational", lastSync: "3 min ago", trend: [99.8, 99.9, 99.9, 99.9, 99.9, 99.9, 99.9] },
    ],
  },
  {
    site: "Building D — Berlin",
    acs: [
      { name: "Lenel", zones: "Main Entrance", status: "lost-connection", lastSync: "8 min ago", trend: [99.0, 98.0, 96.5, 95.2, 94.5, 94.2, 94.1] },
    ],
  },
];

export const occupancyData: OccupancyData = {
  totalPresent: 692,
  totalCapacity: 1450,
  homeUsers: 542,
  travelers: 150,
  change: "+3.2%",
  changeType: "positive",
  trend: [620, 650, 680, 670, 700, 685, 692],
};

export const guestsData: GuestsData = {
  totalGuests: 47,
  invited: 62,
  arrived: 47,
  change: "+12.4%",
  changeType: "positive",
  trend: [32, 28, 41, 38, 45, 42, 47],
  badgeTypes: [
    { label: "Digital card", value: 62, color: "bg-signature" },
    { label: "Plastic card", value: 28, color: "bg-brand-l1" },
    { label: "Other", value: 10, color: "bg-surface-subtle" },
  ],
};

export const bookingsData: BookingsData = {
  totalBookings: 214,
  uniqueBookers: 156,
  cancellationRate: 8.2,
  noShowRate: 4.1,
  change: "+6.7%",
  changeType: "positive",
  trend: [180, 195, 210, 202, 220, 208, 214],
  byType: [
    { type: "hot-desks", label: "Hot Desks", count: 84, color: "bg-signature" },
    { type: "meeting-rooms", label: "Meeting Rooms", count: 62, color: "bg-brand-d2" },
    { type: "parking", label: "Parking Spots", count: 32, color: "bg-brand-l1" },
    { type: "lockers", label: "Lockers", count: 22, color: "bg-brand-d1" },
    { type: "event-spaces", label: "Event Spaces", count: 14, color: "bg-surface-subtle" },
  ],
};

export const digitalBadgeAdoptionData: DigitalBadgeAdoptionData = {
  adoptionRate: 71,
  digitalUsers: 910,
  physicalCardUsers: 373,
  activeDigitalUsers: 784,
  activeAppUsers: 3146,
  avgAppOpens: 14.2,
  change: "+5.1%",
  changeType: "positive",
  trend: [58, 62, 65, 68, 70, 71, 71],
  badgeBreakdown: [
    { name: "Wallet", value: 38 },
    { name: "BLE", value: 31 },
    { name: "QR", value: 22 },
    { name: "Biometric", value: 9 },
  ],
};

export const serviceRequestsData: ServiceRequestsData = {
  openRequests: 82,
  createdInPeriod: 21,
  closedInPeriod: 19,
  prevCreated: 11,
  prevClosed: 17,
  createdChange: "+91%",
  closedChange: "+12%",
  change: "+91%",
  changeType: "negative",
  trend: [65, 58, 62, 70, 74, 78, 82],
  byTenant: [
    { tenant: "Eaton Corporation", count: 6, color: "#6382D5" },
    { tenant: "American Tower", count: 3, color: "#4D6EC7" },
    { tenant: "DaVita", count: 3, color: "#9B7EDC" },
    { tenant: "Edison International", count: 3, color: "#EB7B59" },
    { tenant: "Corteva", count: 2, color: "#28af61" },
    { tenant: "Boston Scientific", count: 1, color: "#f2cd4a" },
    { tenant: "ConocoPhillips", count: 1, color: "#B8C2DE" },
    { tenant: "CSX", count: 1, color: "#eb5757" },
    { tenant: "Dish Network", count: 1, color: "#8B9C5A" },
  ],
  byLocation: [
    { location: "Entertainment Room 2", count: 3, color: "#6382D5" },
    { location: "Kitchen 1", count: 3, color: "#f2cd4a" },
    { location: "Kitchen 3", count: 3, color: "#B8C2DE" },
    { location: "Kitchen 4", count: 3, color: "#28af61" },
    { location: "Office B1", count: 3, color: "#9B7EDC" },
    { location: "Office F1", count: 2, color: "#4D6EC7" },
    { location: "Office M1", count: 2, color: "#8B9C5A" },
    { location: "Meeting Room 101", count: 1, color: "#EB7B59" },
    { location: "Office B2", count: 1, color: "#eb5757" },
  ],
};

export const peopleIdentityData: PeopleIdentityData = {
  totalPeople: 1283,
  change: "+1.8%",
  changeType: "positive",
  healthy: 1104,
  needsOnboarding: 142,
  needsAttention: 37,
  attentionBreakdown: [
    { label: "Failed identity update", count: 14 },
    { label: "Failed access level update", count: 11 },
    { label: "Unknown badge type", count: 8 },
    { label: "Failed card update", count: 4 },
  ],
  newAppUsers: 264,
};

export const workplaceAccessData: WorkplaceAccessData = {
  totalInteractions: 12847,
  change: "+8.3%",
  changeType: "positive",
  trend: [9200, 10100, 11400, 10800, 12100, 11900, 12847],
  accessEvents: 8432,
  uniqueUsers: 1283,
  methodDistribution: [
    { label: "Mobile", value: 5840, color: "bg-signature" },
    { label: "Card", value: 4120, color: "bg-brand-l1" },
    { label: "PIN", value: 1890, color: "bg-brand-d2" },
    { label: "Other", value: 997, color: "bg-surface-subtle" },
  ],
};

// ── Filter Options ─────────────────────────────────────

export const siteOptions = [
  { label: "All Sites", value: "all" },
  { label: "HQ — New York", value: "ny" },
  { label: "Building B — London", value: "london" },
  { label: "Building C — Singapore", value: "singapore" },
  { label: "Building D — Berlin", value: "berlin" },
];

export const zoneOptions = [
  { label: "All Zones", value: "all" },
  { label: "Lobby", value: "lobby" },
  { label: "Floor 1", value: "floor-1" },
  { label: "Floor 2", value: "floor-2" },
  { label: "Parking", value: "parking" },
];

export const timeOptions = [
  { label: "Today", value: "day" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
];

// ── Chart data ─────────────────────────────────────────

export const accessByDay = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  values: [9200, 10100, 11400, 10800, 12100, 11900, 12847],
};

export const presenceByDay = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  employees: [620, 650, 680, 670, 700, 685, 692],
};

export const guestsByDay = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  invited: [50, 55, 62, 58, 65, 60, 62],
  arrived: [32, 28, 41, 38, 45, 42, 47],
};

export const bookingsByDay = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  values: [180, 195, 210, 202, 220, 208, 214],
};

export const bookingsBySite = [
  { site: "New York", occupancy: 78, bookings: 92 },
  { site: "London", occupancy: 65, bookings: 58 },
  { site: "Singapore", occupancy: 82, bookings: 40 },
  { site: "Berlin", occupancy: 54, bookings: 24 },
];

export const bookingsByZone = [
  { zone: "Floor 1 — Open Space", bookings: 48, capacity: 60 },
  { zone: "Floor 2 — Quiet Zone", bookings: 36, capacity: 40 },
  { zone: "Floor 3 — Meeting Wing", bookings: 42, capacity: 50 },
  { zone: "Lobby — Hot Desks", bookings: 28, capacity: 35 },
  { zone: "Parking Level B1", bookings: 32, capacity: 80 },
  { zone: "Event Hall A", bookings: 8, capacity: 10 },
];

export const adoptionBySite = [
  { site: "New York", digital: 82, physical: 18 },
  { site: "London", digital: 70, physical: 30 },
  { site: "Singapore", digital: 65, physical: 35 },
  { site: "Berlin", digital: 55, physical: 45 },
];

export const adoptionTrend = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  values: [68, 69, 70, 71, 72, 72, 71],
};

export const siteComparison = [
  { site: "HQ — New York", present: 412, capacity: 600, accessEvents: 5420, trend: "+4.2%", trendType: "positive" as const },
  { site: "Building B — London", present: 234, capacity: 400, accessEvents: 3210, trend: "+2.1%", trendType: "positive" as const },
  { site: "Building C — Singapore", present: 121, capacity: 200, accessEvents: 2340, trend: "+8.7%", trendType: "positive" as const },
  { site: "Building D — Berlin", present: 80, capacity: 250, accessEvents: 1877, trend: "-1.2%", trendType: "negative" as const },
];

// Service requests charts
export const requestsOverTime = {
  labels: ["Mar 2025", "Apr 2025", "Jul 2025", "Sep 2025", "Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026"],
  newRequests: [4, 3, 2, 11, 14, 15, 10, 15, 14],
  movedToProcessing: [1, 1, 1, 2, 3, 4, 4, 5, 4],
  closed: [1, 1, 2, 2, 4, 5, 3, 4, 4],
};

export const avgTimeToClose = {
  labels: ["Mar 2025", "Apr 2025", "Jul 2025", "Sep 2025", "Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026"],
  resolutionTime: [385, 320, 240, 115, 78, 45, 33, 8, 3],
  responseTime: [370, 310, 240, 108, 72, 42, 30, 5, 2],
};

export const highestResponseByTenant = [
  { tenant: "American Airlines Group", days: 192.5 },
  { tenant: "DaVita", days: 128.1 },
  { tenant: "Analog Devices", days: 122.6 },
  { tenant: "ConocoPhillips", days: 20.6 },
  { tenant: "Corteva", days: 17.8 },
  { tenant: "Boston Scientific", days: 17.0 },
  { tenant: "Evergy", days: 7.1 },
  { tenant: "Chipotle Mexican Grill", days: 6.3 },
  { tenant: "Edwards Lifesciences", days: 3.9 },
  { tenant: "CSX", days: 3.9 },
];

export const highestResolutionByTenant = [
  { tenant: "American Airlines Group", days: 192.5 },
  { tenant: "DaVita", days: 128.1 },
  { tenant: "Analog Devices", days: 122.6 },
  { tenant: "Clorox", days: 34.8 },
  { tenant: "Boston Scientific", days: 29.1 },
  { tenant: "Chipotle Mexican Grill", days: 24.0 },
  { tenant: "Corteva", days: 21.3 },
  { tenant: "ConocoPhillips", days: 20.6 },
  { tenant: "American Tower", days: 1.5 },
  { tenant: "Evergy", days: 7.1 },
];

export const longestOutstandingRequests = [
  { site: "New York", tenant: "DaVita", createdAt: "08/22/2022", location: "Entertainment Room 3", reportId: 299, status: "new" },
  { site: "New York", tenant: "DaVita", createdAt: "09/02/2022", location: "Kitchen 3", reportId: 301, status: "new" },
  { site: "New York", tenant: "DaVita", createdAt: "09/20/2022", location: "Meeting Room 104", reportId: 310, status: "new" },
  { site: "New York", tenant: "DaVita", createdAt: "09/23/2022", location: "Floor 1", reportId: 312, status: "new" },
  { site: "New York", tenant: "Extra Space Storage", createdAt: "10/14/2022", location: "Lobby B", reportId: 323, status: "new" },
  { site: "New York", tenant: "Celanese", createdAt: "01/16/2023", location: "Meeting Room 102", reportId: 376, status: "new" },
  { site: "New York", tenant: "DaVita", createdAt: "01/19/2023", location: "Floor 1", reportId: 384, status: "new" },
  { site: "New York", tenant: "Consolidated Edison", createdAt: "02/15/2023", location: "Office C2", reportId: 400, status: "new" },
  { site: "New York", tenant: "CarMax", createdAt: "03/22/2023", location: "Entertainment Room 1", reportId: 417, status: "new" },
  { site: "New York", tenant: "CarMax", createdAt: "03/27/2023", location: "Office B1", reportId: 421, status: "new" },
];

export const digitalCardBreakdown = [
  { name: "Wallet", value: 38 },
  { name: "BLE", value: 31 },
  { name: "QR", value: 22 },
  { name: "Biometric", value: 9 },
];

// Guest digital badge breakdown
export const guestDigitalBreakdown = [
  { name: "BLE", value: 28 },
  { name: "Wallet", value: 18 },
  { name: "QR", value: 12 },
  { name: "Biometric", value: 4 },
];

// ── Bookings utilization heatmap (day × hour) ──────────
// Values are utilization hours per cell
export const bookingsHeatmapHours = [
  "9-10", "10-11", "11-12", "12-13", "13-14", "14-15", "15-16", "16-17", "17-18", "18-19", "19-20",
];
export const bookingsHeatmapDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// [dayIndex, hourIndex, value] — value is utilization in hours
export const bookingsHeatmapData = [
  // Mon
  [0, 0, 1.0], [0, 1, 1.0], [0, 2, 1.0], [0, 3, 1.0], [0, 4, 0.3], [0, 5, 0.8], [0, 6, 2.0], [0, 7, 1.8],
  // Tue
  [1, 0, 0.8], [1, 1, 0.3], [1, 5, 1.8], [1, 6, 1.5], [1, 7, 0.3],
  // Wed
  [2, 4, 1.0], [2, 5, 1.0], [2, 6, 1.0], [2, 7, 1.0], [2, 8, 1.0], [2, 9, 1.3], [2, 10, 0.8],
  // Thu
  [3, 1, 1.8], [3, 2, 3.0], [3, 3, 2.3], [3, 4, 1.8], [3, 5, 1.0], [3, 6, 1.0], [3, 7, 1.0], [3, 8, 0.3],
  // Fri
  [4, 2, 0.8], [4, 3, 1.0], [4, 4, 1.0], [4, 5, 0.3],
];

// ── Per-site KPI data ──────────────────────────────────
// People counts MUST match people-data.ts exactly:
//   HQ NY=16 (healthy=7, attention=6, onboarding=3)
//   London=9  (healthy=3, attention=3, onboarding=3)
//   Singapore=6 (healthy=3, attention=1, onboarding=2)
//   Berlin=4  (healthy=1, attention=1, onboarding=2)
//   Total=35  (healthy=14, attention=11, onboarding=10)

interface SiteKPIs {
  occupancy: OccupancyData;
  guests: GuestsData;
  bookings: BookingsData;
  digitalBadge: DigitalBadgeAdoptionData;
  serviceRequests: ServiceRequestsData;
  people: PeopleIdentityData;
}

const perSiteKPIs: Record<string, SiteKPIs> = {
  "HQ — New York": {
    occupancy: { totalPresent: 318, totalCapacity: 650, homeUsers: 280, travelers: 38, change: "+4.1%", changeType: "positive", trend: [280, 295, 310, 305, 322, 315, 318] },
    guests:   { totalGuests: 22, invited: 29, arrived: 22, change: "+9.2%", changeType: "positive", trend: [15, 13, 19, 17, 21, 20, 22], badgeTypes: [{ label: "Digital card", value: 62, color: "bg-signature" }, { label: "Plastic card", value: 28, color: "bg-brand-l1" }, { label: "Other", value: 10, color: "bg-surface-subtle" }] },
    bookings: { totalBookings: 99, uniqueBookers: 72, cancellationRate: 7.8, noShowRate: 3.9, change: "+7.2%", changeType: "positive", trend: [83, 90, 97, 93, 102, 96, 99], byType: [{ type: "hot-desks", label: "Hot Desks", count: 39, color: "bg-signature" }, { type: "meeting-rooms", label: "Meeting Rooms", count: 29, color: "bg-brand-d2" }, { type: "parking", label: "Parking Spots", count: 15, color: "bg-brand-l1" }, { type: "lockers", label: "Lockers", count: 10, color: "bg-brand-d1" }, { type: "event-spaces", label: "Event Spaces", count: 6, color: "bg-surface-subtle" }] },
    digitalBadge: { adoptionRate: 73, digitalUsers: 12, physicalCardUsers: 4, activeDigitalUsers: 10, activeAppUsers: 14, avgAppOpens: 15.1, change: "+5.8%", changeType: "positive", trend: [60, 64, 67, 70, 72, 73, 73], badgeBreakdown: [{ name: "Wallet", value: 40 }, { name: "BLE", value: 30 }, { name: "QR", value: 21 }, { name: "Biometric", value: 9 }] },
    serviceRequests: { openRequests: 38, createdInPeriod: 10, closedInPeriod: 9, prevCreated: 5, prevClosed: 8, createdChange: "+100%", closedChange: "+13%", change: "+100%", changeType: "negative", trend: [30, 27, 29, 32, 34, 36, 38], byTenant: [{ tenant: "Eaton Corporation", count: 6, color: "#6382D5" }, { tenant: "American Tower", count: 3, color: "#4D6EC7" }, { tenant: "DaVita", count: 1, color: "#9B7EDC" }], byLocation: [{ location: "Entertainment Room 2", count: 3, color: "#6382D5" }, { location: "Kitchen 1", count: 3, color: "#f2cd4a" }, { location: "Office B1", count: 2, color: "#9B7EDC" }] },
    people: { totalPeople: 16, change: "+1.2%", changeType: "positive", healthy: 7, needsOnboarding: 3, needsAttention: 6, attentionBreakdown: [{ label: "Failed identity update", count: 2 }, { label: "Failed access level update", count: 1 }, { label: "Unknown badge type", count: 2 }, { label: "Failed card update", count: 1 }], newAppUsers: 3 },
  },
  "Building B — London": {
    occupancy: { totalPresent: 180, totalCapacity: 377, homeUsers: 160, travelers: 20, change: "+2.8%", changeType: "positive", trend: [158, 165, 175, 172, 183, 178, 180] },
    guests:   { totalGuests: 12, invited: 16, arrived: 12, change: "+14.3%", changeType: "positive", trend: [8, 7, 11, 10, 12, 11, 12], badgeTypes: [{ label: "Digital card", value: 58, color: "bg-signature" }, { label: "Plastic card", value: 32, color: "bg-brand-l1" }, { label: "Other", value: 10, color: "bg-surface-subtle" }] },
    bookings: { totalBookings: 55, uniqueBookers: 40, cancellationRate: 9.1, noShowRate: 4.5, change: "+5.8%", changeType: "positive", trend: [46, 50, 54, 51, 57, 53, 55], byType: [{ type: "hot-desks", label: "Hot Desks", count: 22, color: "bg-signature" }, { type: "meeting-rooms", label: "Meeting Rooms", count: 17, color: "bg-brand-d2" }, { type: "parking", label: "Parking Spots", count: 9, color: "bg-brand-l1" }, { type: "lockers", label: "Lockers", count: 5, color: "bg-brand-d1" }, { type: "event-spaces", label: "Event Spaces", count: 2, color: "bg-surface-subtle" }] },
    digitalBadge: { adoptionRate: 68, digitalUsers: 6, physicalCardUsers: 3, activeDigitalUsers: 5, activeAppUsers: 8, avgAppOpens: 13.4, change: "+4.2%", changeType: "positive", trend: [56, 59, 62, 65, 67, 68, 68], badgeBreakdown: [{ name: "Wallet", value: 37 }, { name: "BLE", value: 32 }, { name: "QR", value: 22 }, { name: "Biometric", value: 9 }] },
    serviceRequests: { openRequests: 22, createdInPeriod: 6, closedInPeriod: 5, prevCreated: 3, prevClosed: 5, createdChange: "+100%", closedChange: "0%", change: "+100%", changeType: "negative", trend: [17, 15, 17, 19, 20, 21, 22], byTenant: [{ tenant: "Edison International", count: 3, color: "#EB7B59" }, { tenant: "Corteva", count: 2, color: "#28af61" }, { tenant: "Boston Scientific", count: 1, color: "#f2cd4a" }], byLocation: [{ location: "Kitchen 3", count: 3, color: "#B8C2DE" }, { location: "Office F1", count: 2, color: "#4D6EC7" }, { location: "Meeting Room 101", count: 1, color: "#EB7B59" }] },
    people: { totalPeople: 9, change: "+2.1%", changeType: "positive", healthy: 3, needsOnboarding: 3, needsAttention: 3, attentionBreakdown: [{ label: "Failed identity update", count: 1 }, { label: "Failed access level update", count: 1 }, { label: "Unknown badge type", count: 1 }, { label: "Failed card update", count: 0 }], newAppUsers: 2 },
  },
  "Building C — Singapore": {
    occupancy: { totalPresent: 118, totalCapacity: 247, homeUsers: 106, travelers: 12, change: "+3.5%", changeType: "positive", trend: [103, 108, 114, 112, 119, 116, 118] },
    guests:   { totalGuests: 8, invited: 11, arrived: 8, change: "+14.3%", changeType: "positive", trend: [5, 5, 7, 7, 8, 8, 8], badgeTypes: [{ label: "Digital card", value: 70, color: "bg-signature" }, { label: "Plastic card", value: 22, color: "bg-brand-l1" }, { label: "Other", value: 8, color: "bg-surface-subtle" }] },
    bookings: { totalBookings: 37, uniqueBookers: 27, cancellationRate: 7.2, noShowRate: 3.6, change: "+6.4%", changeType: "positive", trend: [31, 33, 36, 34, 38, 36, 37], byType: [{ type: "hot-desks", label: "Hot Desks", count: 15, color: "bg-signature" }, { type: "meeting-rooms", label: "Meeting Rooms", count: 11, color: "bg-brand-d2" }, { type: "parking", label: "Parking Spots", count: 5, color: "bg-brand-l1" }, { type: "lockers", label: "Lockers", count: 4, color: "bg-brand-d1" }, { type: "event-spaces", label: "Event Spaces", count: 2, color: "bg-surface-subtle" }] },
    digitalBadge: { adoptionRate: 75, digitalUsers: 5, physicalCardUsers: 1, activeDigitalUsers: 4, activeAppUsers: 6, avgAppOpens: 14.8, change: "+6.3%", changeType: "positive", trend: [62, 65, 68, 71, 73, 75, 75], badgeBreakdown: [{ name: "Wallet", value: 39 }, { name: "BLE", value: 30 }, { name: "QR", value: 22 }, { name: "Biometric", value: 9 }] },
    serviceRequests: { openRequests: 13, createdInPeriod: 3, closedInPeriod: 3, prevCreated: 2, prevClosed: 3, createdChange: "+50%", closedChange: "0%", change: "+50%", changeType: "negative", trend: [10, 9, 10, 11, 12, 13, 13], byTenant: [{ tenant: "ConocoPhillips", count: 1, color: "#B8C2DE" }, { tenant: "CSX", count: 1, color: "#eb5757" }, { tenant: "Dish Network", count: 1, color: "#8B9C5A" }], byLocation: [{ location: "Kitchen 4", count: 3, color: "#28af61" }, { location: "Office M1", count: 2, color: "#8B9C5A" }] },
    people: { totalPeople: 6, change: "+1.5%", changeType: "positive", healthy: 3, needsOnboarding: 2, needsAttention: 1, attentionBreakdown: [{ label: "Failed identity update", count: 0 }, { label: "Failed access level update", count: 0 }, { label: "Unknown badge type", count: 1 }, { label: "Failed card update", count: 0 }], newAppUsers: 1 },
  },
  "Building D — Berlin": {
    occupancy: { totalPresent: 76, totalCapacity: 176, homeUsers: 68, travelers: 8, change: "+2.1%", changeType: "positive", trend: [68, 71, 74, 73, 77, 75, 76] },
    guests:   { totalGuests: 5, invited: 6, arrived: 5, change: "+11.1%", changeType: "positive", trend: [4, 3, 4, 4, 5, 5, 5], badgeTypes: [{ label: "Digital card", value: 60, color: "bg-signature" }, { label: "Plastic card", value: 30, color: "bg-brand-l1" }, { label: "Other", value: 10, color: "bg-surface-subtle" }] },
    bookings: { totalBookings: 23, uniqueBookers: 17, cancellationRate: 8.7, noShowRate: 4.3, change: "+4.6%", changeType: "positive", trend: [19, 20, 22, 21, 23, 22, 23], byType: [{ type: "hot-desks", label: "Hot Desks", count: 8, color: "bg-signature" }, { type: "meeting-rooms", label: "Meeting Rooms", count: 5, color: "bg-brand-d2" }, { type: "parking", label: "Parking Spots", count: 3, color: "bg-brand-l1" }, { type: "lockers", label: "Lockers", count: 3, color: "bg-brand-d1" }, { type: "event-spaces", label: "Event Spaces", count: 4, color: "bg-surface-subtle" }] },
    digitalBadge: { adoptionRate: 67, digitalUsers: 3, physicalCardUsers: 1, activeDigitalUsers: 2, activeAppUsers: 4, avgAppOpens: 12.8, change: "+3.1%", changeType: "positive", trend: [55, 58, 61, 63, 65, 66, 67], badgeBreakdown: [{ name: "Wallet", value: 36 }, { name: "BLE", value: 33 }, { name: "QR", value: 22 }, { name: "Biometric", value: 9 }] },
    serviceRequests: { openRequests: 9, createdInPeriod: 2, closedInPeriod: 2, prevCreated: 1, prevClosed: 1, createdChange: "+100%", closedChange: "+100%", change: "+100%", changeType: "negative", trend: [7, 7, 8, 8, 9, 9, 9], byTenant: [{ tenant: "Eaton Corporation", count: 1, color: "#6382D5" }, { tenant: "DaVita", count: 1, color: "#9B7EDC" }], byLocation: [{ location: "Office B2", count: 1, color: "#eb5757" }, { location: "Office M1", count: 1, color: "#8B9C5A" }] },
    people: { totalPeople: 4, change: "+0.8%", changeType: "positive", healthy: 1, needsOnboarding: 2, needsAttention: 1, attentionBreakdown: [{ label: "Failed identity update", count: 0 }, { label: "Failed access level update", count: 1 }, { label: "Unknown badge type", count: 0 }, { label: "Failed card update", count: 0 }], newAppUsers: 1 },
  },
};

const allSitesKPIs: SiteKPIs = {
  occupancy: occupancyData,
  guests: guestsData,
  bookings: bookingsData,
  digitalBadge: digitalBadgeAdoptionData,
  serviceRequests: serviceRequestsData,
  people: { totalPeople: 35, change: "+1.8%", changeType: "positive", healthy: 14, needsOnboarding: 10, needsAttention: 11, attentionBreakdown: [{ label: "Failed identity update", count: 3 }, { label: "Failed access level update", count: 3 }, { label: "Unknown badge type", count: 4 }, { label: "Failed card update", count: 1 }], newAppUsers: 7 },
};

/** Returns KPI data for the given site name, or aggregated all-sites data if undefined. */
export function getDashboardKPIs(site?: string): SiteKPIs {
  if (!site) return allSitesKPIs;
  return perSiteKPIs[site] ?? allSitesKPIs;
}

/** Returns only the site footprint entries relevant to the selection. */
export function getFilteredSites(site?: string): SiteFootprintData[] {
  if (!site) return sitesFootprint;
  return sitesFootprint.filter((s) => s.name === site);
}
