"use client";

import Link from "next/link";
import {
  Smartphone, Users2, LayoutGrid, UtensilsCrossed,
  CalendarCheck, MapPin, Wrench, Users, Building2,
} from "lucide-react";

/* ── Brand tokens ─────────────────────────────────────────────────────── */
const G = {
  brand: "#00CC56",
  dark:  "#08916F",
  text:  "#1B2232",
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

/* ── Logo ─────────────────────────────────────────────────────────────── */
function YourBuildingLogo() {
  return (
    <div className="bg-white rounded-xl px-3 py-2 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://www.figma.com/api/mcp/asset/672f988d-95e1-4a54-b58d-039a23bdbef5"
        alt="your building"
        width={144}
        height={40}
        style={{ display: "block", objectFit: "contain" }}
      />
    </div>
  );
}

/* ── iPhone mockup ────────────────────────────────────────────────────── */
function IPhoneMockup({ children, width = 300 }: { children: React.ReactNode; width?: number }) {
  return (
    <div className="relative select-none" style={{ width }}>
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 48,
          border: "10px solid #1c1c1e",
          background: "#1c1c1e",
          boxShadow: "0 60px 120px rgba(0,0,0,0.5), 0 20px 40px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        {/* Buttons */}
        <div className="absolute left-0 top-[90px] w-[3px] h-[30px] bg-[#2a2a2a] rounded-r-sm" />
        <div className="absolute left-0 top-[136px] w-[3px] h-[56px] bg-[#2a2a2a] rounded-r-sm" />
        <div className="absolute left-0 top-[206px] w-[3px] h-[56px] bg-[#2a2a2a] rounded-r-sm" />
        <div className="absolute right-0 top-[112px] w-[3px] h-[72px] bg-[#2a2a2a] rounded-l-sm" />

        {/* Screen */}
        <div className="overflow-hidden bg-white" style={{ borderRadius: 40 }}>
          {/* Status bar */}
          <div className="relative bg-white flex items-center justify-between px-5 pt-3 pb-2">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#1c1c1e] rounded-full" style={{ width: 108, height: 32 }} />
            <span className="text-[11px] font-semibold z-10" style={{ color: G.text }}>9:41</span>
            <div className="flex items-center gap-1 z-10">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                <rect x="0" y="4" width="3" height="7" rx="0.5" fill="#1B2232" />
                <rect x="4.5" y="2.5" width="3" height="8.5" rx="0.5" fill="#1B2232" />
                <rect x="9" y="0.5" width="3" height="10.5" rx="0.5" fill="#1B2232" />
                <rect x="13.5" y="0.5" width="2.5" height="10.5" rx="0.5" fill="#1B2232" fillOpacity="0.25" />
              </svg>
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

/* ── Badge / Home screen ──────────────────────────────────────────────── */
function BadgeScreen() {
  return (
    <div className="bg-[#f5f6f9]" style={{ minHeight: 520 }}>
      {/* Building photo header */}
      <div className="relative h-44 overflow-hidden">
        {/* Simulated building exterior photo */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 176" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="bldg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7ba8c4" />
              <stop offset="40%" stopColor="#5e8faa" />
              <stop offset="100%" stopColor="#3d6a85" />
            </linearGradient>
            <linearGradient id="bldgOverlay" x1="0" y1="0" x2="0" y2="1">
              <stop offset="50%" stopColor="transparent" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
            </linearGradient>
          </defs>
          <rect width="300" height="176" fill="url(#bldg)" />
          {/* Glass panels */}
          {Array.from({ length: 8 }).map((_, c) =>
            Array.from({ length: 6 }).map((_, r) => (
              <rect key={`${c}-${r}`} x={c * 38 + r * 4} y={r * 30 - 10} width="32" height="26"
                fill="white" fillOpacity={0.06 + ((c + r) % 3) * 0.04}
                stroke="white" strokeOpacity="0.12" strokeWidth="0.5" />
            ))
          )}
          <rect width="300" height="176" fill="url(#bldgOverlay)" />
        </svg>
        {/* Building name overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white font-bold text-[16px] drop-shadow">Your Building</p>
          <p className="text-white/70 text-[11px]">Prague Business Park</p>
        </div>
      </div>

      {/* Mobile badge card */}
      <div className="mx-3 -mt-4 rounded-2xl overflow-hidden shadow-lg relative z-10" style={{ background: G.brand }}>
        <div className="px-4 pt-3 pb-1">
          <p className="text-[8px] uppercase tracking-widest font-semibold text-white/70">Mobile Badge</p>
        </div>
        <div className="px-4 pb-3 flex items-center gap-3">
          {/* Avatar photo simulation */}
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/30">
            <svg viewBox="0 0 44 44" width="44" height="44">
              <rect width="44" height="44" fill="#c8a882" />
              <ellipse cx="22" cy="17" rx="8" ry="9" fill="#e8c9a8" />
              <ellipse cx="22" cy="38" rx="14" ry="12" fill="#d4a87a" />
            </svg>
          </div>
          <div>
            <p className="text-[12px] font-bold text-white">Laurie Moore</p>
            <p className="text-[10px] text-white/70">Badge #502</p>
          </div>
          <div className="ml-auto bg-white/20 rounded px-2 py-1">
            <p className="text-[8px] font-bold text-white tracking-widest">HID</p>
          </div>
        </div>
        <div className="px-4 pb-3 flex gap-1">
          {[20, 12, 12].map((w, i) => (
            <div key={i} className="h-1 rounded-full bg-white/30" style={{ width: w }} />
          ))}
        </div>
      </div>

      {/* Getting started */}
      <div className="mx-3 mt-2 bg-white rounded-xl flex items-center justify-between px-4 py-3 shadow-sm">
        <p className="text-[11px] font-semibold" style={{ color: G.text }}>Getting started</p>
        <span className="text-[#aaa] text-sm">›</span>
      </div>

      {/* Content card with image */}
      <div className="mx-3 mt-2 rounded-xl overflow-hidden bg-white shadow-sm">
        <div className="h-14 overflow-hidden relative">
          <svg viewBox="0 0 280 56" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="cardImg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a8d5c2" />
                <stop offset="100%" stopColor="#6ab89a" />
              </linearGradient>
            </defs>
            <rect width="280" height="56" fill="url(#cardImg)" />
            {/* Subtle glass effect */}
            <rect x="0" y="0" width="280" height="28" fill="white" fillOpacity="0.1" />
          </svg>
          <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-white/30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-sm bg-white/70" />
            </div>
            <p className="text-[9px] font-semibold text-white">your building</p>
          </div>
        </div>
      </div>

      {/* Bottom tab bar */}
      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-[#f0f0f0] px-3 pt-2 pb-3">
        <div className="flex justify-around items-center">
          {[
            { label: "Home", active: true },
            { label: "Amenities", active: false },
            { label: "About", active: false },
            { label: "Profile", active: false },
          ].map(({ label, active }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <div className="w-6 h-6 rounded-lg" style={{ background: active ? G.brand : "#e5e7eb" }} />
              <span className="text-[8px]" style={{ color: active ? G.dark : "#9ca3af" }}>{label}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: G.brand }}>
              <span className="text-white text-[10px] font-bold">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Restaurants screen ───────────────────────────────────────────────── */
function RestaurantsScreen() {
  const items = [
    {
      name: "Bam Bama Bistro", addr: "3 Grove Rd, Surbiton KT6 4BS, London · 2 Comments",
      special: true,
      photo: { from: "#c8a055", to: "#a07830" },
    },
    {
      name: "East Garden", addr: "3 Grove Rd, Surbiton KT6 4BS, London · 2 Comments",
      special: false,
      photo: { from: "#6a9e78", to: "#4a7a58" },
    },
    {
      name: "Sakura Kitchen", addr: "3 Grove Rd, Surbiton KT6 4BS, London · 2 Comments",
      special: false,
      photo: { from: "#c47a70", to: "#a05850" },
    },
  ];
  return (
    <div className="relative bg-white" style={{ minHeight: 580 }}>
      {/* Back nav */}
      <div className="bg-white px-4 py-2.5 flex items-center gap-2 border-b border-[#f0f0f0]">
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
          <path d="M7 1L1 7L7 13" stroke={G.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-[11px] text-[#aaa]">Amenities</p>
      </div>
      <div className="px-4 py-3">
        <p className="text-[18px] font-bold" style={{ color: G.text }}>Restaurants</p>
      </div>

      <div className="px-3 space-y-3">
        {items.map(({ name, addr, special, photo }) => (
          <div key={name} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#f0f0f0]">
            {/* Photo with realistic gradient + texture */}
            <div className="relative h-20 overflow-hidden">
              <svg viewBox="0 0 280 80" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id={`photo-${name}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={photo.from} />
                    <stop offset="100%" stopColor={photo.to} />
                  </linearGradient>
                </defs>
                <rect width="280" height="80" fill={`url(#photo-${name})`} />
                {/* Food texture dots */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <circle key={i} cx={20 + i * 22} cy={20 + (i % 3) * 15} r={4 + (i % 3) * 2}
                    fill="white" fillOpacity={0.08 + (i % 4) * 0.03} />
                ))}
                <rect width="280" height="80" fill="rgba(0,0,0,0.12)" />
              </svg>
              <span className="absolute top-2 left-2 bg-black/40 text-white text-[7px] px-2 py-0.5 rounded font-semibold uppercase tracking-wide">London</span>
              {special && (
                <span className="absolute top-2 right-2 text-white text-[7px] px-2 py-0.5 rounded font-semibold uppercase"
                  style={{ background: G.brand }}>Special Offer!</span>
              )}
            </div>
            <div className="px-3 py-2">
              <p className="text-[11px] font-semibold" style={{ color: G.text }}>{name}</p>
              <p className="text-[9px] text-[#9ca3af] mt-0.5">{addr}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom tab bar */}
      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-[#f0f0f0] px-3 pt-2 pb-3">
        <div className="flex justify-around items-center">
          {[
            { label: "Home", active: false },
            { label: "Amenities", active: true },
            { label: "About", active: false },
            { label: "Profile", active: false },
          ].map(({ label, active }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <div className="w-6 h-6 rounded-lg" style={{ background: active ? G.brand : "#e5e7eb" }} />
              <span className="text-[8px]" style={{ color: active ? G.dark : "#9ca3af" }}>{label}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#e5e7eb" }}>
              <span className="text-[#9ca3af] text-[10px] font-bold">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── QR Code ──────────────────────────────────────────────────────────── */
function QRCodeBlock() {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-lg inline-flex shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://www.figma.com/api/mcp/asset/240229b6-5423-4fd4-9c17-a7c731917226"
        alt="Download QR code"
        width={120}
        height={120}
        style={{ display: "block", borderRadius: 6 }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════ */
export default function WebLandingPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "Lexend, sans-serif", backgroundColor: "white" }}>

      {/* ════════════════════════════════════════════════
          HERO — dark glass building photo simulation
      ════════════════════════════════════════════════ */}
      <section className="relative overflow-visible" style={{ minHeight: "100vh" }}>

        {/* Background: dark glass skyscraper */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              {/* Dark steel-blue building photo base */}
              <linearGradient id="heroBg" x1="0.2" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#2c3e50" />
                <stop offset="35%"  stopColor="#3d5a70" />
                <stop offset="70%"  stopColor="#4a7090" />
                <stop offset="100%" stopColor="#2a4a60" />
              </linearGradient>
              {/* Glass panel shimmer */}
              <linearGradient id="panelShimmer" x1="0" y1="0" x2="0.3" y2="1">
                <stop offset="0%"   stopColor="white" stopOpacity="0.18" />
                <stop offset="50%"  stopColor="white" stopOpacity="0.08" />
                <stop offset="100%" stopColor="white" stopOpacity="0.03" />
              </linearGradient>
              {/* Reflection highlight */}
              <linearGradient id="panelHighlight" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#7ec8e3" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#4a90b8" stopOpacity="0.05" />
              </linearGradient>
              {/* Left dark overlay for text legibility */}
              <linearGradient id="leftDark" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#1a2535" stopOpacity="0.85" />
                <stop offset="30%"  stopColor="#1a2535" stopOpacity="0.55" />
                <stop offset="55%"  stopColor="#1a2535" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#1a2535" stopOpacity="0" />
              </linearGradient>
              {/* Bottom fade to white (for smooth transition) */}
              <linearGradient id="bottomWhite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="75%" stopColor="transparent" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.12" />
              </linearGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#heroBg)" />

            {/* Glass facade — perspective panels (skyscraper look) */}
            {Array.from({ length: 14 }).map((_, col) =>
              Array.from({ length: 18 }).map((_, row) => {
                const x = 260 + col * 86 + row * 12;
                const y = row * 62 - 80;
                const w = 74;
                const h = 54;
                const bright = (col * 3 + row * 2) % 7 === 0;
                const mid    = (col + row) % 4 === 1;
                return (
                  <g key={`${col}-${row}`}>
                    <rect x={x} y={y} width={w} height={h}
                      fill={bright ? "url(#panelHighlight)" : "url(#panelShimmer)"}
                      stroke="white" strokeOpacity={0.12 + (col % 3) * 0.04} strokeWidth="0.7"
                    />
                    {mid && (
                      <rect x={x + 3} y={y + 3} width={w * 0.5} height={h * 0.55}
                        fill="white" fillOpacity={0.09} rx="1"
                      />
                    )}
                  </g>
                );
              })
            )}

            {/* Sky gradient at the very top */}
            <rect width="100%" height="30%" fill="url(#bottomWhite)" />

            {/* Left overlay: text area */}
            <rect width="100%" height="100%" fill="url(#leftDark)" />
          </svg>
        </div>

        {/* ── Topbar ──────────────────────────────────── */}
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
            <div className="flex h-12 w-12 items-center justify-center rounded-lg text-lg"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(4px)" }}>
              🇨🇿
            </div>
          </div>
        </nav>

        {/* ── Hero content: text left, phone right ──── */}
        <div className="relative z-10 flex items-end px-[138px] pt-8 pb-0">

          {/* LEFT */}
          <div className="flex-1 pb-24 max-w-[680px]">
            <h1
              className="text-white font-bold mb-10"
              style={{ fontSize: 60, lineHeight: "80px", letterSpacing: "-0.02em" }}
            >
              Unlock&nbsp;ComplexName<br />
              and its&nbsp;amenities
            </h1>

            {/* QR + description + badges row */}
            <div className="flex items-start gap-6">
              <QRCodeBlock />
              <div className="pt-2">
                <p className="text-white font-semibold text-[16px] leading-snug mb-4">
                  Scan the QR code<br />to download the app for free
                </p>
                <div className="flex flex-col gap-2.5">
                  <a href="#">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://www.figma.com/api/mcp/asset/306f7ec4-4709-4a5c-9d83-4075e19beef8" alt="Download on the App Store" height={40} style={{ height: 40, width: "auto", display: "block" }} />
                  </a>
                  <a href="#">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://www.figma.com/api/mcp/asset/caf1dff0-b2e6-4e39-ad62-753ad0084785" alt="Get it on Google Play" height={40} style={{ height: 40, width: "auto", display: "block" }} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — phone overflows well into white section below */}
          <div
            className="hidden md:block shrink-0"
            style={{ marginBottom: -280, paddingRight: 60 }}
          >
            <IPhoneMockup width={320}>
              <BadgeScreen />
            </IPhoneMockup>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          INTRO — white, phone visible floating right
      ════════════════════════════════════════════════ */}
      <section className="relative bg-white z-10" style={{ paddingTop: 320, paddingBottom: 80 }}>
        <div className="px-[138px]">
          <div style={{ maxWidth: 670 }}>
            <p className="font-bold text-[18px] leading-[1.6] mb-4" style={{ color: G.text }}>
              The mobile app grants you a virtual key to premium services and amenities
              in your office building. Get them all at your fingertips!
            </p>
            <p className="text-[14px] leading-[1.7] text-[#6b7280]">
              Complex Name mobile app is a mainstay of a smart workplace platform
              delivered by Sharry for Skanska as a property developer.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FEATURES — WHITE bg (matches Figma), phone left, grid right
      ════════════════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden" style={{ paddingTop: 80, paddingBottom: 100 }}>

        {/* Decorative circle — Figma Ellipse 19 */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: -100, top: 160,
            width: 560, height: 560,
            background: `${G.brand}10`,
            filter: "blur(2px)",
          }}
          aria-hidden="true"
        />

        <div className="relative px-[138px]">
          <div className="flex flex-col md:flex-row items-center gap-[120px]">

            {/* Restaurants phone — LEFT */}
            <div className="shrink-0 relative">
              <div className="absolute rounded-full blur-3xl"
                style={{ inset: -60, background: `${G.brand}10` }} aria-hidden="true" />
              <IPhoneMockup width={320}>
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

              <div className="grid grid-cols-3 gap-x-4 gap-y-10 mb-10">
                {features.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-3">
                    <div
                      className="flex items-center justify-center rounded-full shadow-md"
                      style={{ width: 70, height: 70, background: G.brand }}
                    >
                      <Icon size={28} color="white" strokeWidth={1.6} />
                    </div>
                    <p className="text-center text-[13px] font-medium leading-snug" style={{ color: G.text }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-[#6b7280] text-sm mb-6">... and many more!</p>

              <div className="flex gap-3 flex-wrap items-center">
                <a href="#">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://www.figma.com/api/mcp/asset/306f7ec4-4709-4a5c-9d83-4075e19beef8" alt="Download on the App Store" height={48} style={{ height: 48, width: "auto", display: "block" }} />
                </a>
                <a href="#">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://www.figma.com/api/mcp/asset/caf1dff0-b2e6-4e39-ad62-753ad0084785" alt="Get it on Google Play" height={48} style={{ height: 48, width: "auto", display: "block" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════ */}
      <footer className="bg-white border-t border-[#f0f0f0] py-12 px-[138px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-10">

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#9ca3af] mb-4">Menu</p>
            <ul className="space-y-2.5">
              {[{ label: "Home", href: "/web" }, { label: "Administration", href: "/login" }].map(({ label, href }) => (
                <li key={label}><Link href={href} className="text-[13px]" style={{ color: G.text }}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#9ca3af] mb-4">Legal &amp; Privacy</p>
            <ul className="space-y-2.5">
              {["Terms & Conditions", "Privacy policy", "Data protection", "Agreement", "Security"].map(item => (
                <li key={item}><a href="#" className="text-[13px]" style={{ color: G.text }}>{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#9ca3af] mb-4">ComplexName Address</p>
            <address className="not-italic text-[13px] leading-loose" style={{ color: G.text }}>
              Palachovo náměstí<br />
              625 00 Brno – Starý Lískovec
            </address>
          </div>

          <div>
            <div className="h-40 rounded-2xl overflow-hidden" style={{ background: "#e2ecf0" }}>
              <svg viewBox="0 0 220 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <rect width="220" height="160" fill="#e2ecf0" />
                <path d="M0 80 Q55 60 110 72 Q165 85 220 68" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round" />
                <path d="M65 0 Q72 44 68 80 Q64 112 72 160" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M110 0 L115 160" stroke="white" strokeWidth="3" fill="none" />
                <path d="M0 110 L220 104" stroke="white" strokeWidth="3" fill="none" />
                <circle cx="110" cy="74" r="11" fill={G.brand} stroke="white" strokeWidth="2.5" />
                <circle cx="110" cy="74" r="4.5" fill="white" />
                <rect x="58" y="50" width="104" height="16" rx="4" fill="white" fillOpacity="0.95" />
                <text x="110" y="62" textAnchor="middle" fontSize="7.5" fill="#374151" fontFamily="Lexend, system-ui" fontWeight="600">BRNO-NOVÝ LISKOVEC</text>
              </svg>
            </div>
          </div>
        </div>

        <div className="border-t border-[#f0f0f0] pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
