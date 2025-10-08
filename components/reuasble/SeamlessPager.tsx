"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  sections: React.ReactNode[];
  transition?: "fade" | "slide";
  stiffness?: number;          // 0.06..0.30 (higher = snappier)
  gapPx?: number;
  gain?: number;               // >1 to advance faster per pixel scrolled
  className?: string;
  releaseOverlapRatio?: number;// 0..1 vh released early so below content appears sooner (0.06-0.14 sweet spot)
  phaseCurve?: number;         // easing exponent for end ease-out (2..5). Higher = stronger end slow-down
  overscrollContain?: boolean; // reduce momentum spillover at boundaries
  id: string;
};

export default function SeamlessPager({
  sections,
  transition = "fade",
  stiffness = 0.2,
  gapPx = 0,
  gain = 1,
  className,
  releaseOverlapRatio = 0.08,
  phaseCurve = 3.0,
  overscrollContain = true,
  id,
}: Props) {
  const N = Math.max(1, sections.length);
  const hostRef = useRef<HTMLDivElement | null>(null);

  // Engagement + progress
  const [engaged, setEngaged] = useState(false);
  const [progress, setProgress] = useState(0); // 0..N-1 (fractional)
  const targetRef = useRef(0);
  const smoothRef = useRef(0);
  const rafRef = useRef(0);

  // Anchors
  const sectionTopDocRef = useRef(0);
  const engageStartRef = useRef(0);
  const lastViewportH = useRef(1);
  const lastYRef = useRef(0);

  // Entry/exit feel
  const enterBandRatio = 0.10;    // engage when within ±10% vh of top
  const exitBandRatio  = 0.16;    // disengage after ±16% vh (hysteresis)
  const enterDeadzoneRatio = 0.05;// scroll cushion after engage before motion

  // Soft-exit tools
  const endTaperRatio = 0.18;     // last 18% of pager eases out
  const endTaperStrength = 0.7;   // 0..1 (1 strongest)

  const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smoothstep = (e0: number, e1: number, x: number) => {
    const t = clamp((x - e0) / Math.max(1e-6, (e1 - e0)));
    return t * t * (3 - 2 * t);
  };
  const easeOutPow = (x: number, pow: number) => 1 - Math.pow(1 - clamp(x), pow);

  // Detect motion preferences (kept) and MOBILE (new)
  const prefersReduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Mobile detection: coarse pointer is a reliable proxy
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  });
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener?.("change", onChange);
    // Fallback for older Safari
    // @ts-ignore
    mq.addListener?.(onChange);
    return () => {
      mq.removeEventListener?.("change", onChange);
      // @ts-ignore
      mq.removeListener?.(onChange);
    };
  }, []);

  // Measure absolute document Y of the section top
  useEffect(() => {
    if (!hostRef.current) return;
    const el = hostRef.current;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      sectionTopDocRef.current = window.scrollY + rect.top;
      lastViewportH.current = Math.max(1, window.innerHeight);
    };

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure, { passive: true });

    // initial
    measure();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Scroll logic (doc-position based)
  useEffect(() => {
    if (!hostRef.current) return;

    let engagedPrev = false;

    const onScroll = () => {
      const h = Math.max(1, window.innerHeight);
      lastViewportH.current = h;

      const y = window.scrollY;
      const topDoc = sectionTopDocRef.current;

      // Pager spans N * vh, but RELEASE slightly early
      const pagerStart = topDoc;
      const pagerEnd   = pagerStart + N * h - h * releaseOverlapRatio;

      const enterPx = enterBandRatio * h;
      const exitPx  = exitBandRatio * h;

      const shouldEnter = y >= pagerStart - enterPx && y <= pagerStart + enterPx;
      const shouldStay  = y >= pagerStart - exitPx && y <= pagerEnd + exitPx;

      const nowEngaged = engagedPrev ? shouldStay : shouldEnter;

      // CONTINUOUS PREVIEW while NOT engaged (no dead-zone here)
      const previewLinear = clamp((y - pagerStart) / h, 0, N - 1); // fractional 0..N-1

      if (nowEngaged && !engagedPrev) {
        // Anchor so current fractional preview maps exactly to current progress
        // We want: (y - engageStart - deadzonePx)/h == previewLinear
        const deadzonePx = h * enterDeadzoneRatio;
        engageStartRef.current = y - previewLinear * h - deadzonePx;

        // Keep fractional continuity
        targetRef.current = previewLinear;
        smoothRef.current = previewLinear;
        setProgress(previewLinear);
      }

      engagedPrev = nowEngaged;
      setEngaged(nowEngaged);

      if (nowEngaged) {
        const deadzonePx = h * enterDeadzoneRatio;

        // Linear local progress (pages)
        const localLinear = (y - engageStartRef.current - deadzonePx) / h; // 0..N-1

        // Normalize to 0..1 phase (where 1 means last page)
        const phaseLinear = clamp(localLinear / Math.max(1e-6, (N - 1)));

        // Tapered gain (fast mid, reduce near end)
        const taperAmount = smoothstep(1 - endTaperRatio, 1, phaseLinear) * endTaperStrength;
        const taperedGain = 1 + (Math.max(1, gain) - 1) * (1 - taperAmount);

        // Apply gain on phase, then non-linear ease-out (power curve)
        const phaseWithGain = clamp(phaseLinear * taperedGain, 0, 1);
        const phaseEased    = easeOutPow(phaseWithGain, phaseCurve);

        // Map back to 0..N-1
        const local = phaseEased * (N - 1);

        targetRef.current = Math.min(N - 1, Math.max(0, local));
      } else {
        // Outside the pager:
        if (y > pagerEnd) {
          targetRef.current = N - 1;
          smoothRef.current = N - 1;
          setProgress(N - 1);
        } else if (y < pagerStart) {
          targetRef.current = 0;
          smoothRef.current = 0;
          setProgress(0);
        } else {
          // Inside vertical span but not in the enter band → show PREVIEW frame
          targetRef.current = previewLinear;
          smoothRef.current = previewLinear;
          setProgress(previewLinear);
        }
      }

      lastYRef.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // init

    return () => window.removeEventListener("scroll", onScroll);
  }, [
    N,
    enterBandRatio,
    exitBandRatio,
    enterDeadzoneRatio,
    releaseOverlapRatio,
    gain,
    endTaperRatio,
    endTaperStrength,
    phaseCurve,
  ]);

  // rAF smoothing — DISABLED on mobile (instant snaps)
  useEffect(() => {
    const tick = () => {
      const target = targetRef.current;

      if (isMobile || prefersReduced) {
        // No animation: snap immediately
        if (smoothRef.current !== target) {
          smoothRef.current = target;
          setProgress(target);
        }
      } else {
        // Desktop: keep lerp
        smoothRef.current += (target - smoothRef.current) * stiffness;
        if (Math.abs(smoothRef.current - target) < 0.0005) smoothRef.current = target;
        setProgress(smoothRef.current);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [prefersReduced, stiffness, isMobile]);

  // Indices + tween
  const idx = Math.floor(progress);
  const t = Math.min(1, Math.max(0, progress - idx));
  const iA = idx;
  const iB = Math.min(N - 1, idx + 1);

  // Heights (match early-release distance)
  const engagedVh = Math.max(100, N * 100 - releaseOverlapRatio * 100);
  const isAtEnd = !engaged && progress >= N - 1 - 1e-6;
  const spacerHeight = engaged ? `${engagedVh}vh` : (isAtEnd ? `${engagedVh}vh` : "100vh");

  // Styles
  const stickyStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    height: "100vh",
    overflow: "hidden",
    width: "100%",
    ...(overscrollContain ? { overscrollBehaviorY: "contain" as any } : null),
  };
  const layerBase: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  };
  const innerWrap: React.CSSProperties = {
    width: "min(1100px, 92vw)", // change to "100vw" for full-bleed
    margin: "0 auto",
    gap: gapPx,
  };

  // Visual tweening — DISABLED on mobile (render a single layer only)
  let aOpacity = 1, bOpacity = 0, aTransform = "translateY(0px)", bTransform = "translateY(0px)";
  if (!isMobile) {
    if (transition === "fade") {
      aOpacity = 1 - t;
      bOpacity = t;
    } else if (transition === "slide") {
      const slide = 60;
      const opacityT = Math.pow(t, 2.5); // steep ease-in for incoming
      aOpacity = Math.max(0, 1 - t * 1.2);
      bOpacity = Math.min(1, opacityT);
      aTransform = `translateY(${-t * slide}px)`;
      bTransform = `translateY(${(1 - t) * 20}px)`;
    }
  }

  // On mobile we render only the nearest section, no crossfade/slide at all.
  const mobileIndex = Math.min(N - 1, Math.max(0, Math.round(progress)));

  return (
    <section
      ref={hostRef}
      id={id}
      className={className}
      style={{ position: "relative", ...(overscrollContain ? { overscrollBehaviorY: "contain" as any } : null) }}
    >
      <div style={stickyStyle}>
        {isMobile ? (
          // MOBILE: single static layer (no animations)
          <div style={{ ...layerBase, opacity: 1, transform: "none" }}>
            <div style={innerWrap}>{sections[mobileIndex]}</div>
          </div>
        ) : !engaged ? (
          // Desktop preview frame
          <div style={{ ...layerBase, opacity: 1, transform: "none" }}>
            <div style={innerWrap}>
              {sections[Math.min(N - 1, Math.max(0, Math.round(progress)))]}
            </div>
          </div>
        ) : (
          // Desktop animated crossfade/slide
          <>
            {/* Outgoing */}
            <div
              style={{
                ...layerBase,
                opacity: aOpacity,
                transform: aTransform,
                pointerEvents: "none",
                willChange: "opacity, transform",
              }}
            >
              <div style={innerWrap}>{sections[iA]}</div>
            </div>
            {/* Incoming */}
            <div
              style={{
                ...layerBase,
                opacity: bOpacity,
                transform: bTransform,
                pointerEvents: "none",
                willChange: "opacity, transform",
              }}
            >
              <div style={innerWrap}>{sections[iB]}</div>
            </div>
          </>
        )}
      </div>

      {/* Drives native scrolling; matches early-release distance */}
      <div style={{ height: spacerHeight }} aria-hidden />
    </section>
  );
}
