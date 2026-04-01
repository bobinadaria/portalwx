"use client";

import Link from "next/link";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import {
  Smartphone, Users2, LayoutGrid, UtensilsCrossed,
  CalendarCheck, MapPin, Wrench, Users, Building2,
} from "lucide-react";

/* ── Brand tokens (from Figma: SIGNATURE #00CC56, SIGNATURE D1 #08916F) ── */
const G = {
  brand:  "#00CC56",   // SIGNATURE — primary green
  dark:   "#08916F",   // SIGNATURE D1 — dark teal (Admin button)
  light:  "#e6f9f2",   // subtle bg tint (features section)
  text:   "#1B2232",   // HSL Greyscale/Second - 1
};

/* ── Features list ────────────────────────────────────────────────────── */
const features = [
  { icon: Smartphone,      label: "Mobile Access" },
  { icon: Users2,          label: "Virtual Reception" },
  { icon: LayoutGrid,      label: "Dynamic Dashboard" },
  { icon: UtensilsCrossed, label: "Lunch Menu" },
  { icon: CalendarCheck,   label: "Reservations" },
  { icon: MapPin,          label: "Nearby Events" },
  { icon: Wrench,          label: "Maintenance Request" },
  { icon: Users,           label: "Vibrant Community" },
  { icon: Building2,       label: "Building Information" },
];

/* ── "Your Building" logo ─────────────────────────────────────────────── */
function YourBuildingLogo() {
  return (
    <div className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-2.5 shadow-sm" style={{ minWidth: 144 }}>
      {/* Stacked chevron / leaf mark */}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="7" fill={G.brand} />
        {/* Two stacked chevron shapes */}
        <path d="M8 11 L16 17 L24 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M8 17 L16 23 L24 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <span className="text-[13px] font-semibold text-[#1B2232] leading-tight">
        your<br />building
      </span>
    </div>
  );
}

/* ── iPhone 16 Pro mockup ─────────────────────────────────────────────── */
function IPhoneMockup({ children, width = 290 }: { children: React.ReactNode; width?: number }) {
  const BORDER = 9;
  const R_OUTER = 46;
  const R_INNER = 38;
  return (
    <div className="relative select-none" style={{ width }}>
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: R_OUTER,
          border: `${BORDER}px solid #1c1c1e`,
          background: "#1c1c1e",
          boxShadow: "0 50px 100px rgba(0,0,0,0.35), 0 20px 40px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        {/* Volume + silent buttons */}
        <div className="absolute left-0 top-[88px] w-[3px] h-[30px] bg-[#2a2a2a] rounded-r-sm" />
        <div className="absolute left-0 top-[132px] w-[3px] h-[52px] bg-[#2a2a2a] rounded-r-sm" />
        <div className="absolute left-0 top-[198px] w-[3px] h-[52px] bg-[#2a2a2a] rounded-r-sm" />
        {/* Power button */}
        <div className="absolute right-0 top-[108px] w-[3px] h-[68px] bg-[#2a2a2a] rounded-l-sm" />

        {/* Screen */}
        <div className="overflow-hidden bg-[#f4f6fb]" style={{ borderRadius: R_INNER }}>
          {/* Status bar area with Dynamic Island */}
          <div className="relative bg-white px-5 pt-3 pb-1 flex items-center justify-between">
            <div
              className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#1c1c1e] rounded-full"
              style={{ width: 106, height: 30 }}
            />
            <span className="text-[11px] font-semibold text-[#1B2232] z-10">9:41</span>
            <div className="flex items-center gap-1 z-10">
              {/* Signal bars */}
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                <rect x="0" y="4" width="3" height="7" rx="0.5" fill="#1B2232" />
                <rect x="4.5" y="2.5" width="3" height="8.5" rx="0.5" fill="#1B2232" />
                <rect x="9" y="0.5" width="3" height="10.5" rx="0.5" fill="#1B2232" />
                <rect x="13.5" y="0.5" width="2.5" height="10.5" rx="0.5" fill="#1B2232" fillOpacity="0.25" />
              </svg>
              {/* Battery */}
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                <rect x="0.5" y="0.5" width="18" height="11" rx="2.5" stroke="#1B2232" strokeOpacity="0.35" />
                <rect x="2" y="2" width="14" height="8" rx="1.5" fill="#1B2232" />
                <path d="M19.5 4.5v3a1.5 1.5 0 0 0 0-3z" fill="#1B2232" fillOpacity="0.4" />
              </svg>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Badge screen (Home screen content) ──────────────────────────────── */
function BadgeScreen() {
  return (
    <div className="bg-[#f4f6fb]" style={{ minHeight: 510 }}>
      {/* App header */}
      <div className="bg-white px-4 py-3 border-b border-[#f0f0f0]">
        <p className="text-[13px] font-bold text-[#1B2232]">Your Building</p>
      </div>

      {/* Mobile Badge card */}
      <div className="mx-3 mt-3 rounded-2xl overflow-hidden" style={{ background: G.brand }}>
        <div className="px-4 pt-3 pb-1">
          <p className="text-[8px] uppercase tracking-widest font-semibold text-white/70">Mobile Badge</p>
        </div>
        <div className="px-4 pb-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[11px] bg-white/25 text-white">LM</div>
          <div>
            <p className="text-[11px] font-bold text-white">Laurie Moore</p>
            <p className="text-[9px] text-white/70">Badge #502</p>
          </div>
          <div className="ml-auto bg-white/20 rounded px-1.5 py-0.5">
            <p className="text-[7px] font-bold text-white tracking-widest">HID</p>
          </div>
        </div>
        {/* Dots */}
        <div className="px-4 pb-3 flex gap-1">
          {[20, 12, 12].map((w, i) => (
            <div key={i} className="h-1 rounded-full bg-white/30" style={{ width: w }} />
          ))}
        </div>
      </div>

      {/* Getting started */}
      <div className="mx-3 mt-2 bg-white rounded-xl flex items-center justify-between px-4 py-3">
        <p className="text-[11px] font-semibold text-[#1B2232]">Getting started</p>
        <span className="text-[#aaa]">›</span>
      </div>

      {/* Content card */}
      <div className="mx-3 mt-2 rounded-xl overflow-hidden bg-white">
        <div className="h-16 flex items-end p-3" style={{ background: `linear-gradient(135deg, ${G.brand}22, ${G.brand}11)` }}>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded" style={{ background: `${G.brand}40` }} />
            <p className="text-[8px] font-semibold" style={{ color: G.dark }}>Your Building</p>
          </div>
        </div>
      </div>

      {/* Bottom tab bar */}
      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-[#f0f0f0] px-2 py-2">
        <div className="flex justify-around items-center">
          {[
            { label: "Home", active: true },
            { label: "Amenities", active: false },
            { label: "About", active: false },
            { label: "Profile", active: false },
          ].map(({ label, active }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="w-5 h-5 rounded-lg" style={{ background: active ? G.brand : "#e5e7eb" }} />
              <span className="text-[8px]" style={{ color: active ? G.dark : "#9ca3af" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Restaurants screen ───────────────────────────────────────────────── */
function RestaurantsScreen() {
  const items = [
    { name: "Bam Bama Bistro",  color: "#c8a96e", special: true },
    { name: "East Garden",      color: "#7ba88e", special: false },
    { name: "Sakura Kitchen",   color: "#d4847a", special: false },
  ];
  return (
    <div className="relative bg-[#f4f6fb]" style={{ minHeight: 570 }}>
      {/* Back bar */}
      <div className="bg-white px-4 py-2.5 flex items-center gap-2 border-b border-[#f0f0f0]">
        <span className="text-[11px]" style={{ color: G.brand }}>‹</span>
        <p className="text-[10px] text-[#aaa]">Amenities</p>
      </div>
      <div className="px-4 py-3">
        <p className="text-[15px] font-bold text-[#1B2232]">Restaurants</p>
      </div>
      <div className="px-3 space-y-2">
        {items.map(({ name, color, special }) => (
          <div key={name} className="bg-white rounded-xl overflow-hidden">
            <div className="relative h-[66px]" style={{ background: color }}>
              <span className="absolute top-2 left-2 bg-black/30 text-white text-[6px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide">London</span>
              {special && (
                <span className="absolute top-2 right-2 text-white text-[6px] px-1.5 py-0.5 rounded font-semibold" style={{ background: G.brand }}>
                  SPECIAL OFFER!
                </span>
              )}
            </div>
            <div className="px-3 py-2">
              <p className="text-[10px] font-semibold text-[#1B2232]">{name}</p>
              <p className="text-[8px] text-[#aaa]">3 Grove Rd · 2 Comments</p>
            </div>
          </div>
        ))}
      </div>
      {/* Bottom tab bar */}
      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-[#f0f0f0] px-2 py-2">
        <div className="flex justify-around items-center">
          {[
            { label: "Home", active: false },
            { label: "Amenities", active: true },
            { label: "About", active: false },
            { label: "Profile", active: false },
          ].map(({ label, active }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="w-5 h-5 rounded-lg" style={{ background: active ? G.brand : "#e5e7eb" }} />
              <span className="text-[8px]" style={{ color: active ? G.dark : "#9ca3af" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── QR code block ───────────────────────────────────────────────────── */
function QRCodeBlock() {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-lg inline-flex">
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
        {/* Top-left finder */}
        <rect x="4" y="4" width="28" height="28" rx="3" fill="#1B2232" />
        <rect x="8" y="8" width="20" height="20" rx="2" fill="white" />
        <rect x="12" y="12" width="12" height="12" rx="1" fill="#1B2232" />
        {/* Top-right finder */}
        <rect x="64" y="4" width="28" height="28" rx="3" fill="#1B2232" />
        <rect x="68" y="8" width="20" height="20" rx="2" fill="white" />
        <rect x="72" y="12" width="12" height="12" rx="1" fill="#1B2232" />
        {/* Bottom-left finder */}
        <rect x="4" y="64" width="28" height="28" rx="3" fill="#1B2232" />
        <rect x="8" y="68" width="20" height="20" rx="2" fill="white" />
        <rect x="12" y="72" width="12" height="12" rx="1" fill="#1B2232" />
        {/* Data dots — pseudo-random pattern */}
        {Array.from({ length: 11 }).map((_, col) =>
          Array.from({ length: 5 }).map((_, row) => {
            const x = 40 + col * 5;
            const y = 4 + row * 5;
            return ((col * 7 + row * 13 + col * row) % 17 > 7)
              ? <rect key={`a${col}-${row}`} x={x} y={y} width="4" height="4" rx="0.5" fill="#1B2232" />
              : null;
          })
        )}
        {Array.from({ length: 5 }).map((_, col) =>
          Array.from({ length: 11 }).map((_, row) => {
            const x = 4 + col * 5;
            const y = 40 + row * 5;
            return ((col * 11 + row * 5 + col + row) % 13 > 5)
              ? <rect key={`b${col}-${row}`} x={x} y={y} width="4" height="4" rx="0.5" fill="#1B2232" />
              : null;
          })
        )}
        {Array.from({ length: 11 }).map((_, col) =>
          Array.from({ length: 11 }).map((_, row) => {
            const x = 40 + col * 5;
            const y = 40 + row * 5;
            return ((col * 3 + row * 17 + (col ^ row)) % 19 > 9)
              ? <rect key={`c${col}-${row}`} x={x} y={y} width="4" height="4" rx="0.5" fill="#1B2232" />
              : null;
          })
        )}
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════ */
export default function WebLandingPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "Lexend, sans-serif", backgroundColor: "white" }}>

      {/* ══════════════════════════════════════════════════════
          HERO — light glass building background
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-visible"
        style={{ minHeight: "100vh" }}
      >
        {/* ── Glass building background ─────────────────────── */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              {/* Base: pale teal-blue — matches Figma building photo ambiance */}
              <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#cef5ed" />
                <stop offset="40%" stopColor="#d8f5ef" />
                <stop offset="100%" stopColor="#b8ede3" />
              </linearGradient>
              {/* Glass panel fill */}
              <linearGradient id="glassPanel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.18" />
                <stop offset="100%" stopColor="white" stopOpacity="0.06" />
              </linearGradient>
              {/* Left dark overlay — makes white text legible */}
              <linearGradient id="leftVignette" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#1B2232" stopOpacity="0.60" />
                <stop offset="38%"  stopColor="#1B2232" stopOpacity="0.30" />
                <stop offset="70%"  stopColor="#1B2232" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#1B2232" stopOpacity="0" />
              </linearGradient>
              {/* Bottom fade */}
              <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="70%"  stopColor="transparent" />
                <stop offset="100%" stopColor="#d8f5ef" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Background fill */}
            <rect width="100%" height="100%" fill="url(#heroBg)" />

            {/* Glass facade panels — perspective grid on the right */}
            {Array.from({ length: 12 }).map((_, col) =>
              Array.from({ length: 16 }).map((_, row) => {
                const x = 340 + col * 84 + row * 10;
                const y = row * 68 - 60;
                const w = 72;
                const h = 60;
                const alpha = 0.6 + ((col + row) % 5) * 0.08;
                const bright = (col + row) % 4 === 0;
                return (
                  <g key={`${col}-${row}`}>
                    <rect x={x} y={y} width={w} height={h}
                      fill="url(#glassPanel)"
                      stroke="white"
                      strokeWidth="0.8"
                      strokeOpacity={alpha * 0.55}
                    />
                    {bright && (
                      <rect x={x + 5} y={y + 5} width={w * 0.45} height={h * 0.5}
                        fill="white" fillOpacity={0.12} rx="1"
                      />
                    )}
                  </g>
                );
              })
            )}

            {/* Left vignette for text legibility */}
            <rect width="100%" height="100%" fill="url(#leftVignette)" />
            {/* Bottom fade */}
            <rect width="100%" height="100%" fill="url(#bottomFade)" />
          </svg>
        </div>

        {/* ── Topbar ────────────────────────────────────────── */}
        <nav className="relative z-20 flex items-center justify-between px-[30px] py-[30px]">
          <YourBuildingLogo />
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-lg px-6 py-3 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: G.dark }}
            >
              Administration
            </Link>
            {/* Flag */}
            <div className="flex h-12 w-12 items-center justify-center rounded-lg text-lg"
              style={{ background: "rgba(27,34,50,0.5)" }}>
              🇨🇿
            </div>
          </div>
        </nav>

        {/* ── Hero content ──────────────────────────────────── */}
        <div className="relative z-10 flex flex-col md:flex-row items-end px-[138px] pt-8 pb-0">

          {/* LEFT — headline + QR + badges */}
          <div className="flex-1 pb-20 max-w-[680px]">
            {/* Headline */}
            <h1
              className="text-white font-bold mb-10"
              style={{ fontSize: 60, lineHeight: "80px", letterSpacing: "-0.02em" }}
            >
              Unlock&nbsp;ComplexName<br />
              and its&nbsp;amenities
            </h1>

            {/* QR + description + badges */}
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid relative">
              {/* QR code */}
              <div className="col-1 row-1">
                <QRCodeBlock />
              </div>
              {/* Description text */}
              <div className="col-1 row-1 ml-[200px] mt-0 w-[227px]">
                <p className="text-white font-semibold text-[15px] leading-snug mt-6">
                  Scan the QR code to<br />download the app for free
                </p>
              </div>
              {/* iOS badge */}
              <div className="col-1 row-1 ml-[200px] mt-[96px]">
                <AppStoreBadge store="apple" href="#" size="sm" />
              </div>
              {/* Android badge */}
              <div className="col-1 row-1 ml-[332px] mt-[96px]">
                <AppStoreBadge store="google" href="#" size="sm" />
              </div>
            </div>
          </div>

          {/* RIGHT — Home page phone (extends below hero) */}
          <div
            className="hidden md:block shrink-0"
            style={{ marginBottom: -160, marginRight: -40 }}
          >
            <IPhoneMockup width={310}>
              <BadgeScreen />
            </IPhoneMockup>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INTRO — white section
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative bg-white z-10"
        style={{ paddingTop: 200, paddingBottom: 100 }}
      >
        <div className="px-[138px]">
          <div style={{ maxWidth: 670 }}>
            <p className="font-bold text-[18px] leading-[1.6] mb-5" style={{ color: G.text }}>
              The mobile app grants you a virtual key to premium services and amenities in your office building.
              Get them all at your fingertips!
            </p>
            <p className="text-[14px] leading-[1.7] text-[#6b7280]">
              Complex Name mobile app is a mainstay of a smart workplace platform delivered by Sharry
              for Skanska as a property developer.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURES — mint bg, Restaurants phone LEFT, grid RIGHT
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: G.light, paddingTop: 80, paddingBottom: 80 }}
      >
        {/* Decorative circle — matches Figma Ellipse 19 */}
        <div
          className="absolute rounded-full"
          style={{
            left: -80,
            top: 300,
            width: 560,
            height: 560,
            background: `${G.brand}12`,
          }}
          aria-hidden="true"
        />

        <div className="relative px-[138px]">
          <div className="flex flex-col md:flex-row items-center gap-[168px]">

            {/* Restaurants phone — LEFT */}
            <div className="shrink-0 relative">
              <div
                className="absolute rounded-full blur-3xl"
                style={{ inset: -50, background: `${G.brand}15` }}
                aria-hidden="true"
              />
              <IPhoneMockup width={310}>
                <RestaurantsScreen />
              </IPhoneMockup>
            </div>

            {/* Features grid — RIGHT */}
            <div className="flex-1">
              <h2
                className="font-bold text-[36px] leading-tight mb-12"
                style={{ color: G.text }}
              >
                Enjoy first-class features
              </h2>

              <div className="grid grid-cols-3 gap-x-6 gap-y-10 mb-10">
                {features.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-3">
                    <div
                      className="flex items-center justify-center rounded-full shadow-md"
                      style={{ width: 70, height: 70, background: G.brand }}
                    >
                      <Icon size={28} color="white" strokeWidth={1.6} />
                    </div>
                    <p className="text-center text-[13px] font-medium text-[#374151] leading-snug">{label}</p>
                  </div>
                ))}
              </div>

              <p className="text-[#6b7280] text-sm mb-6">... and many more!</p>

              <div className="flex gap-3 flex-wrap">
                <AppStoreBadge store="apple" href="#" size="md" />
                <AppStoreBadge store="google" href="#" size="md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer className="bg-white border-t border-[#f0f0f0] py-12 px-[138px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-10">

          {/* Menu */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#9ca3af] mb-4">Menu</p>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/web" },
                { label: "Administration", href: "/login" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-[13px]" style={{ color: G.text }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#9ca3af] mb-4">Legal &amp; Privacy</p>
            <ul className="space-y-2.5">
              {["Terms & Conditions", "Privacy policy", "Data protection", "Agreement", "Security"].map(item => (
                <li key={item}>
                  <a href="#" className="text-[13px]" style={{ color: G.text }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#9ca3af] mb-4">ComplexName Address</p>
            <address className="not-italic text-[13px] leading-loose" style={{ color: G.text }}>
              Palachovo náměstí<br />
              625 00 Brno – Starý Lískovec
            </address>
          </div>

          {/* Map */}
          <div>
            <div className="h-40 rounded-2xl overflow-hidden" style={{ background: "#e2ecf0" }}>
              <svg viewBox="0 0 220 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <rect width="220" height="160" fill="#e2ecf0" />
                {/* Streets */}
                <path d="M0 80 Q55 60 110 72 Q165 85 220 68" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round" />
                <path d="M65 0 Q72 44 68 80 Q64 112 72 160" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M110 0 L115 160" stroke="white" strokeWidth="3" fill="none" />
                <path d="M0 110 L220 104" stroke="white" strokeWidth="3" fill="none" />
                {/* Location pin */}
                <circle cx="110" cy="74" r="11" fill={G.brand} stroke="white" strokeWidth="2.5" />
                <circle cx="110" cy="74" r="4.5" fill="white" />
                {/* Label */}
                <rect x="58" y="50" width="104" height="16" rx="4" fill="white" fillOpacity="0.95" />
                <text x="110" y="62" textAnchor="middle" fontSize="7.5" fill="#374151" fontFamily="Lexend, system-ui" fontWeight="600">BRNO-NOVÝ LISKOVEC</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#f0f0f0] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Sharry wordmark */}
            <svg viewBox="0 0 72 20" width="72" height="20" fill="none">
              <circle cx="10" cy="10" r="8" fill={G.brand} />
              <circle cx="10" cy="10" r="3.5" fill="white" />
              <text x="23" y="14.5" fontSize="12" fontWeight="700" fill={G.brand} fontFamily="Lexend, system-ui">sharry</text>
            </svg>
            <span className="text-[12px] text-[#9ca3af]">© Sharry Europe 2022. All Rights Reserved</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
