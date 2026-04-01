"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, HelpCircle } from "lucide-react";
import { Toggle } from "@/components/ui/Toggle";
import { cn } from "@/lib/utils";

/* ── Language selector ────────────────────────────────── */
const LANGS = [
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "cs", flag: "🇨🇿", label: "CS" },
  { code: "de", flag: "🇩🇪", label: "DE" },
];

/* ── App icon ─────────────────────────────────────────── */
function AppIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-signature shadow-md">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <rect x="4" y="4" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.9" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.6" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.6" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.9" />
      </svg>
    </div>
  );
}

/* ── Vertical branding ────────────────────────────────── */
function VerticalBrand() {
  return (
    <div
      className="absolute bottom-8 right-0 flex items-center gap-1.5"
      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
    >
      <span className="text-[11px] font-semibold text-white/60 tracking-wider uppercase">Portal</span>
      <span className="text-[11px] font-bold text-white uppercase tracking-widest">WX</span>
      <span className="text-[11px] text-white/40">by</span>
      <span className="text-[11px] font-bold text-white tracking-wider">Sharry</span>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────── */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(false);
  const [lang, setLang] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentLang = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate auth → redirect to portal
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">

      {/* ── Left: photo + card ─────────────────────────── */}
      <div className="relative flex-1 overflow-hidden">

        {/* Background — outdoor photo simulation */}
        <div className="absolute inset-0" aria-hidden="true">
          {/* Sky gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(160deg, #f5e6c8 0%, #fad47e 30%, #e8c87a 50%, #b8d4a8 75%, #6ea87a 100%)",
            }}
          />
          {/* Large soft circle — light bloom effect from photo */}
          <div
            className="absolute"
            style={{
              top: "-10%",
              left: "15%",
              width: "80%",
              height: "90%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,240,180,0.6) 0%, rgba(255,220,100,0.3) 40%, transparent 70%)",
            }}
          />
          {/* Dark vignette bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
          {/* Silhouette figures */}
          <div className="absolute bottom-0 inset-x-0 flex items-end justify-center gap-12 pb-0 opacity-25">
            <div className="w-24 h-48 bg-black/60 rounded-t-full" style={{ clipPath: "ellipse(38% 100% at 50% 100%)" }} />
            <div className="w-20 h-40 bg-black/50 rounded-t-full" style={{ clipPath: "ellipse(35% 100% at 50% 100%)" }} />
          </div>
        </div>

        {/* ── Login card ───────────────────────────────── */}
        <div className="absolute top-[10%] left-[8%] w-[360px]">
          <form
            onSubmit={handleNext}
            className="rounded-3xl bg-white shadow-2xl px-8 py-8 space-y-6"
          >
            {/* App icon */}
            <AppIcon />

            {/* Heading */}
            <h1 className="text-2xl font-bold text-[#1a2033]">Log in</h1>

            {/* Email field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-[13px] font-medium text-ink-secondary">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={cn(
                  "h-10 w-full rounded-lg border border-border-default bg-white px-3.5 text-sm text-ink-primary",
                  "placeholder:text-ink-muted transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1",
                  "hover:border-border-strong"
                )}
              />
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <Toggle
                checked={remember}
                onChange={setRemember}
              />
              <span className="text-sm text-ink-secondary">Remember me</span>
              <button
                type="button"
                aria-label="What does Remember me mean?"
                className="text-ink-muted hover:text-ink-primary transition-colors"
              >
                <HelpCircle size={14} />
              </button>
            </div>

            {/* Next button */}
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-2",
                loading
                  ? "bg-signature/60 cursor-not-allowed"
                  : "bg-[#8b96b8] hover:bg-signature"
              )}
            >
              {loading ? (
                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  <ChevronRight size={16} />
                  Next
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── Right: brand panel ─────────────────────────── */}
      <div
        className="relative hidden md:flex w-[38%] shrink-0 flex-col items-center justify-center"
        style={{ backgroundColor: "#7b8fd4" }}
      >
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <svg width="100%" height="100%">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>

        {/* Language selector — top right */}
        <div className="absolute top-5 right-5">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 px-3 py-2 transition-colors"
              aria-label="Select language"
            >
              <span className="text-base">{currentLang.flag}</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-[calc(100%+6px)] rounded-xl bg-white shadow-xl border border-border-default py-1 w-28 z-20">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={cn(
                      "flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors",
                      l.code === lang
                        ? "bg-brand-l2 text-signature font-medium"
                        : "text-ink-primary hover:bg-surface-subtle"
                    )}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Vertical Portal WX branding */}
        <VerticalBrand />
      </div>

    </div>
  );
}
