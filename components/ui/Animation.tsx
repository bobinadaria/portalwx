"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type AnimationPreset = "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "none";

interface AnimationProps {
  preset?: AnimationPreset;
  duration?: number;
  delay?: number;
  children: React.ReactNode;
  className?: string;
  /** If false, animation is skipped */
  animate?: boolean;
}

const presetClasses: Record<AnimationPreset, string> = {
  "fade":        "animate-[fadeIn_var(--dur)_var(--delay)_both]",
  "slide-up":    "animate-[slideUp_var(--dur)_var(--delay)_both]",
  "slide-down":  "animate-[slideDown_var(--dur)_var(--delay)_both]",
  "slide-left":  "animate-[slideLeft_var(--dur)_var(--delay)_both]",
  "slide-right": "animate-[slideRight_var(--dur)_var(--delay)_both]",
  "scale":       "animate-[scaleIn_var(--dur)_var(--delay)_both]",
  "none":        "",
};

export function Animation({
  preset = "fade",
  duration = 200,
  delay = 0,
  children,
  className,
  animate = true,
}: AnimationProps) {
  return (
    <>
      <style>{`
        @keyframes fadeIn    { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp   { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideLeft { from { opacity: 0; transform: translateX(8px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideRight{ from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes scaleIn   { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
      `}</style>
      <div
        className={cn(animate && presetClasses[preset], className)}
        style={{
          "--dur": `${duration}ms`,
          "--delay": `${delay}ms`,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </>
  );
}
