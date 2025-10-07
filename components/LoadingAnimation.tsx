"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  /** Public props (tweak timings to taste) */
  text?: string;
  show?: boolean;
  autoHide?: boolean;

  // visuals
  bgColor?: string;
  fontSize?: string;
  fontWeight?: number | string;
  letterSpacing?: string;

  /** gradient that fills the text */
  textGradient?: string;

  /** shine animation properties */
  shineIntensity?: number; // kept for parity (CSS already uses 0.95 highlight)
  shineWidth?: number;

  // timings (ms)
  bgIn?: number;
  textIn?: number;
  shineDuration?: number;
  hold?: number;
  out?: number;

  /** called when the sequence is done (autoHide OR bg-out ends) */
  onDone?: () => void;
};

export default function ShineSplash({
  text = "Scalable",
  show = true,
  autoHide = true,

  // visuals
  bgColor = "#ffffff",
  fontSize = "clamp(75px, 15vw, 260px)",
  fontWeight = 500,
  letterSpacing = "0em",
  textGradient = "linear-gradient(to right, #32155c, #c870ff, #32155c)",
  shineIntensity = 0.95, // not directly used—parity with Svelte API
  shineWidth = 30,

  // timings
  bgIn = 350,
  textIn = 350,
  shineDuration = 700,
  hold = 250,
  out = 650,

  onDone,
}: Props) {
  // local "show" (matches Svelte's internal mutation on autoHide)
  const [visible, setVisible] = useState(show);

  // recompute when any timing changes
  const { delayText, delayShine, delayOut, total } = useMemo(() => {
    const delayText = bgIn + 100;
    const delayShine = bgIn + textIn + 50;
    const delayOut = bgIn + textIn + shineDuration + hold - 100;
    const total = delayOut + out;
    return { delayText, delayShine, delayOut, total };
  }, [bgIn, textIn, shineDuration, hold, out]);

  // keep visible in sync if parent toggles `show` explicitly
  useEffect(() => {
    setVisible(show);
  }, [show]);

  // autoHide timer like Svelte's onMount
  useEffect(() => {
    if (!visible) return;
    if (!autoHide) return;

    const t = window.setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, total);

    return () => window.clearTimeout(t);
  }, [autoHide, visible, total, onDone]);

  const overlayRef = useRef<HTMLDivElement | null>(null);

  // fire onDone when the bg fade-out animation ends (even if autoHide=false)
  const handleAnimationEnd: React.AnimationEventHandler<HTMLDivElement> = (e) => {
    // styled-jsx keeps keyframe names as defined below ("bg-out")
    if (e.animationName === "bg-out") {
      onDone?.();
    }
  };

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="overlay"
      style={
        {
          // CSS custom props (ms units included)
          ["--bg-in" as any]: `${bgIn}ms`,
          ["--text-in" as any]: `${textIn}ms`,
          ["--shine" as any]: `${shineDuration}ms`,
          ["--delay-text" as any]: `${delayText}ms`,
          ["--delay-shine" as any]: `${delayShine}ms`,
          ["--delay-out" as any]: `${delayOut}ms`,
          ["--out" as any]: `${out}ms`,
          background: bgColor,
        } as React.CSSProperties
      }
      onAnimationEnd={handleAnimationEnd}
    >
      <h1
        className="logo"
        style={
          {
            ["--text-grad" as any]: textGradient,
            ["--shine-intensity" as any]: shineIntensity,
            ["--shine-width" as any]: `${shineWidth}px`,
            ["--slice-w" as any]: "28%",
            ["--shine-angle" as any]: "120deg",
            fontSize,
            fontWeight: String(fontWeight),
            letterSpacing,
          } as React.CSSProperties
        }
      >
        {text}
      </h1>

      {/* --- styles --- */}
      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          opacity: 0;
          visibility: hidden;
          animation: bg-in var(--bg-in) ease forwards,
            bg-out var(--out) ease var(--delay-out) forwards;
          background: ${bgColor};
        }

        @keyframes bg-in {
          from {
            opacity: 0;
            visibility: hidden;
          }
          to {
            opacity: 1;
            visibility: visible;
          }
        }
        @keyframes bg-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        .logo {
          position: relative;
          margin: 0;
          line-height: 1;
          color: transparent;
          /* two-layer background: moving white "slice" + static gradient fill */
          background-image: linear-gradient(
              var(--shine-angle),
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0) 40%,
              rgba(255, 255, 255, 0.95) 50%,
              rgba(255, 255, 255, 0) 60%,
              rgba(255, 255, 255, 0) 100%
            ),
            var(--text-grad);
          background-size: var(--slice-w) 100%, 100% 100%;
          background-position: -35% 0, center;
          -webkit-background-clip: text;
          background-clip: text;
          filter: drop-shadow(0 6px 24px rgba(0, 0, 0, 0.05));
          background-repeat: no-repeat, no-repeat;
          
          /* Prevent flash of black text */
          visibility: hidden;

          /* sequence: fade in, shine sweep, fade out */
          opacity: 0;
          animation: text-in var(--text-in) cubic-bezier(0.22, 0.61, 0.36, 1)
              var(--delay-text) forwards,
            shine var(--shine) ease var(--delay-shine) forwards,
            text-out var(--out) ease var(--delay-out) forwards;
        }

        @keyframes text-in {
          to {
            opacity: 1;
            visibility: visible;
          }
        }
        @keyframes text-out {
          to {
            opacity: 0;
          }
        }

        /* Animate only the first background's X position to create the slice sweep */
        @keyframes shine {
          from {
            background-position: -35% 0, center;
          }
          to {
            background-position: 135% 0, center;
          }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .overlay,
          .logo {
            animation-duration: 1ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>
    </div>
  );
}
