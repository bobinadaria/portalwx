/**
 * GSAP animation presets for Portal WX.
 *
 * Rules:
 * - GSAP is ONLY for structural motion: drawers, modals, staged reveals
 * - Do NOT use GSAP for color, hover, or decorative animation
 * - CSS transitions handle hover, opacity, focus ring
 */

import type { gsap as GSAPType } from "gsap";

// Lazy-loaded gsap instance (client-only)
let _gsap: typeof GSAPType | null = null;

async function getGSAP() {
  if (typeof window === "undefined") return null;
  if (_gsap) return _gsap;
  const { gsap } = await import("gsap");
  _gsap = gsap;
  return gsap;
}

// ─── Drawer ───────────────────────────────────────────────────────────────────

export interface DrawerAnimationOptions {
  direction?: "right" | "left" | "bottom";
  duration?: number;
  ease?: string;
}

/**
 * Animate a drawer element into view.
 * @param el - The drawer DOM element
 */
export async function animateDrawerIn(
  el: HTMLElement,
  { direction = "right", duration = 0.28, ease = "power2.out" }: DrawerAnimationOptions = {}
) {
  const gsap = await getGSAP();
  if (!gsap) return;

  const from =
    direction === "right"
      ? { x: "100%" }
      : direction === "left"
        ? { x: "-100%" }
        : { y: "100%" };

  gsap.fromTo(el, { ...from, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration, ease });
}

/**
 * Animate a drawer element out of view.
 * @param el - The drawer DOM element
 * @param onComplete - Callback after animation ends
 */
export async function animateDrawerOut(
  el: HTMLElement,
  onComplete: () => void,
  { direction = "right", duration = 0.22, ease = "power2.in" }: DrawerAnimationOptions = {}
) {
  const gsap = await getGSAP();
  if (!gsap) {
    onComplete();
    return;
  }

  const to =
    direction === "right"
      ? { x: "100%" }
      : direction === "left"
        ? { x: "-100%" }
        : { y: "100%" };

  gsap.to(el, { ...to, opacity: 0, duration, ease, onComplete });
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export interface ModalAnimationOptions {
  duration?: number;
  ease?: string;
}

/**
 * Animate a modal panel into view (scale + fade).
 */
export async function animateModalIn(
  el: HTMLElement,
  { duration = 0.25, ease = "power2.out" }: ModalAnimationOptions = {}
) {
  const gsap = await getGSAP();
  if (!gsap) return;

  gsap.fromTo(
    el,
    { scale: 0.96, opacity: 0, y: 8 },
    { scale: 1, opacity: 1, y: 0, duration, ease }
  );
}

/**
 * Animate a modal panel out of view.
 */
export async function animateModalOut(
  el: HTMLElement,
  onComplete: () => void,
  { duration = 0.18, ease = "power2.in" }: ModalAnimationOptions = {}
) {
  const gsap = await getGSAP();
  if (!gsap) {
    onComplete();
    return;
  }

  gsap.to(el, { scale: 0.96, opacity: 0, y: 8, duration, ease, onComplete });
}

/**
 * Animate the modal backdrop (overlay).
 */
export async function animateBackdropIn(el: HTMLElement, duration = 0.2) {
  const gsap = await getGSAP();
  if (!gsap) return;
  gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration, ease: "none" });
}

export async function animateBackdropOut(
  el: HTMLElement,
  onComplete: () => void,
  duration = 0.18
) {
  const gsap = await getGSAP();
  if (!gsap) {
    onComplete();
    return;
  }
  gsap.to(el, { opacity: 0, duration, ease: "none", onComplete });
}

// ─── Staged reveal ────────────────────────────────────────────────────────────

export interface StaggerOptions {
  stagger?: number;
  duration?: number;
  ease?: string;
  y?: number;
}

/**
 * Stagger-reveal a list of elements (e.g. cards, rows).
 * Useful for page-load entrance of grouped content.
 */
export async function animateStagedReveal(
  elements: HTMLElement[] | NodeListOf<Element>,
  { stagger = 0.06, duration = 0.3, ease = "power2.out", y = 12 }: StaggerOptions = {}
) {
  const gsap = await getGSAP();
  if (!gsap) return;

  gsap.fromTo(
    elements,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, ease, stagger }
  );
}

// ─── Panel slide ──────────────────────────────────────────────────────────────

/**
 * Slide a panel in from below (e.g. expanding detail section).
 */
export async function animatePanelExpand(
  el: HTMLElement,
  { duration = 0.24, ease = "power2.out" }: { duration?: number; ease?: string } = {}
) {
  const gsap = await getGSAP();
  if (!gsap) return;

  gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration, ease });
}

export async function animatePanelCollapse(
  el: HTMLElement,
  onComplete: () => void,
  { duration = 0.2, ease = "power2.in" }: { duration?: number; ease?: string } = {}
) {
  const gsap = await getGSAP();
  if (!gsap) {
    onComplete();
    return;
  }
  gsap.to(el, { height: 0, opacity: 0, duration, ease, onComplete });
}
