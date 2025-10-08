"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  sections: React.ReactNode[];
  transition?: "fade" | "slide";
  stiffness?: number;           // 0.06..0.30 (higher = snappier)
  gapPx?: number;
  gain?: number;                // >1 to advance faster per pixel scrolled
  className?: string;
  releaseOverlapRatio?: number; // 0..1 vh released early (0.06-0.14 sweet spot)
  phaseCurve?: number;          // 2..5, higher = stronger end ease-out
  overscrollContain?: boolean;
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

  // render state (changes rarely)
  const [engaged, setEngaged] = useState(false);
  const [renderIdx, setRenderIdx] = useState(0); // integer page for rendering children

  // animation state (mutated refs; no re-render)
  const targetRef = useRef(0);
  const smoothRef = useRef(0);
  const progressRef = useRef(0);
  const rafRef = useRef(0);

  // anchors
  const sectionTopDocRef = useRef(0);
  const engageStartRef = useRef(0);
  const lastViewportH = useRef(1);

  // layer refs (so we can mutate styles directly)
  const outLayerRef = useRef<HTMLDivElement | null>(null);
  const inLayerRef  = useRef<HTMLDivElement | null>(null);
  const previewRef  = useRef<HTMLDivElement | null>(null);

  const prefersReduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // tuning
  const enterBandRatio = 0.10;
  const exitBandRatio  = 0.16;
  const enterDeadzoneRatio = 0.05;
  const endTaperRatio = 0.18;
  const endTaperStrength = 0.7;

  // utils
  const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smoothstep = (e0: number, e1: number, x: number) => {
    const t = clamp((x - e0) / Math.max(1e-6, e1 - e0));
    return t * t * (3 - 2 * t);
  };
  const easeOutPow = (x: number, pow: number) => 1 - Math.pow(1 - clamp(x), pow);

  // measure
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
    measure();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // scroll handler -> updates target only (no setState inside the hot path)
  useEffect(() => {
    let engagedPrev = false;

    const onScroll = () => {
      const h = Math.max(1, window.innerHeight);
      lastViewportH.current = h;

      const y = window.scrollY;
      const topDoc = sectionTopDocRef.current;

      const pagerStart = topDoc;
      const pagerEnd   = pagerStart + N * h - h * releaseOverlapRatio;

      const enterPx = enterBandRatio * h;
      const exitPx  = exitBandRatio * h;

      const shouldEnter = y >= pagerStart - enterPx && y <= pagerStart + enterPx;
      const shouldStay  = y >= pagerStart - exitPx && y <= pagerEnd + exitPx;

      const nowEngaged = engagedPrev ? shouldStay : shouldEnter;

      // fractional preview based on absolute Y (no state)
      const previewLinear = clamp((y - pagerStart) / h, 0, N - 1);

      if (nowEngaged && !engagedPrev) {
        const deadzonePx = h * enterDeadzoneRatio;
        engageStartRef.current = y - previewLinear * h - deadzonePx;
        targetRef.current = previewLinear;
        smoothRef.current = previewLinear;
        progressRef.current = previewLinear;
        // also prime the render index so children match first frame
        setRenderIdx(Math.floor(previewLinear));
      }

      // commit engaged state only when it changes
      if (nowEngaged !== engagedPrev) {
        engagedPrev = nowEngaged;
        setEngaged(nowEngaged);
      }

      if (nowEngaged) {
        const deadzonePx = h * enterDeadzoneRatio;
        const localLinear = (y - engageStartRef.current - deadzonePx) / h;         // 0..N-1
        const phaseLinear = clamp(localLinear / Math.max(1e-6, N - 1));             // 0..1
        const taperAmount = smoothstep(1 - endTaperRatio, 1, phaseLinear) * endTaperStrength;
        const taperedGain = 1 + (Math.max(1, gain) - 1) * (1 - taperAmount);
        const phaseWithGain = clamp(phaseLinear * taperedGain, 0, 1);
        const phaseEased    = easeOutPow(phaseWithGain, phaseCurve);
        const local = phaseEased * (N - 1);

        targetRef.current = Math.min(N - 1, Math.max(0, local));
      } else {
        if (y > pagerEnd) {
          targetRef.current = N - 1;
          smoothRef.current = N - 1;
          progressRef.current = N - 1;
          setRenderIdx(N - 1);
        } else if (y < pagerStart) {
          targetRef.current = 0;
          smoothRef.current = 0;
          progressRef.current = 0;
          setRenderIdx(0);
        } else {
          targetRef.current = previewLinear;
          smoothRef.current = previewLinear;
          progressRef.current = previewLinear;
          setRenderIdx(Math.floor(previewLinear));
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
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

  // rAF: mutate layer styles directly (no setState)
  useEffect(() => {
    const EPS = 0.0006;
    const OUT = outLayerRef.current;
    const IN  = inLayerRef.current;
    const PRE = previewRef.current;

    const tick = () => {
      const target = targetRef.current;

      if (prefersReduced) {
        // jump
        if (Math.abs(progressRef.current - target) > EPS) {
          progressRef.current = target;
          const idx = Math.floor(target);
          setRenderIdx((prev) => (prev !== idx ? idx : prev));
        }
      } else {
        smoothRef.current += (target - smoothRef.current) * stiffness;
        if (Math.abs(smoothRef.current - target) < EPS) smoothRef.current = target;
        progressRef.current = smoothRef.current;
      }

      // Update transforms/opacity without re-rendering
      const progress = progressRef.current;
      const idx = Math.floor(progress);
      const t = clamp(progress - idx, 0, 1);

      // when page index crossed to a new integer, trigger a *single* re-render
      setRenderIdx((prev) => (prev !== idx ? idx : prev));

      // Apply visuals
      if (engaged) {
        if (transition === "fade") {
          const aOpacity = 1 - t;
          const bOpacity = t;
          if (OUT) OUT.style.opacity = String(aOpacity);
          if (IN)  IN.style.opacity  = String(bOpacity);
          if (OUT) OUT.style.transform = "translate3d(0,0,0)";
          if (IN)  IN.style.transform  = "translate3d(0,0,0)";
        } else {
          const slide = 60;
          const opacityT = t * t * t; // even steeper ease-in
          const aOpacity = Math.max(0, 1 - t * 1.2);
          const bOpacity = Math.min(1, opacityT);
          if (OUT) {
            OUT.style.opacity = String(aOpacity);
            OUT.style.transform = `translate3d(0, ${-t * slide}px, 0)`;
          }
          if (IN) {
            IN.style.opacity = String(bOpacity);
            IN.style.transform = `translate3d(0, ${(1 - t) * 20}px, 0)`;
          }
        }
        if (PRE) PRE.style.opacity = "0";
      } else {
        // preview frame: show nearest slide, no transforms
        if (OUT) { OUT.style.opacity = "0"; OUT.style.transform = "translate3d(0,0,0)"; }
        if (IN)  { IN.style.opacity  = "0"; IN.style.transform  = "translate3d(0,0,0)"; }
        if (PRE) PRE.style.opacity = "1";
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [transition, stiffness, prefersReduced, engaged]);

  // derived for rendering children
  const nextIdx = Math.min(N - 1, renderIdx + 1);

  // layout constants
  const engagedVh = Math.max(100, N * 100 - releaseOverlapRatio * 100);
  const isAtEnd = !engaged && progressRef.current >= N - 1 - 1e-6;
  const spacerHeight = engaged ? `${engagedVh}vh` : (isAtEnd ? `${engagedVh}vh` : "100vh");

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
    // big win on mobile when sections are heavy:
    contain: "layout paint",
    willChange: "opacity, transform",
    transform: "translate3d(0,0,0)",
  };
  const innerWrap: React.CSSProperties = {
    width: "min(1100px, 92vw)",
    margin: "0 auto",
    gap: gapPx,
    contentVisibility: "auto",
  };

  return (
    <section
      ref={hostRef}
      id={id}
      className={className}
      style={{ position: "relative", ...(overscrollContain ? { overscrollBehaviorY: "contain" as any } : null) }}
    >
      <div style={stickyStyle}>
        {/* preview layer */}
        <div ref={previewRef} style={{ ...layerBase, opacity: 1 }}>
          <div style={innerWrap}>{sections[Math.min(N - 1, Math.max(0, renderIdx))]}</div>
        </div>

        {/* outgoing */}
        <div ref={outLayerRef} style={{ ...layerBase, opacity: 0, pointerEvents: "none" }}>
          <div style={innerWrap}>{sections[renderIdx]}</div>
        </div>

        {/* incoming */}
        <div ref={inLayerRef} style={{ ...layerBase, opacity: 0, pointerEvents: "none" }}>
          <div style={innerWrap}>{sections[nextIdx]}</div>
        </div>
      </div>

      {/* natural scroll spacer */}
      <div style={{ height: spacerHeight }} aria-hidden />
    </section>
  );
}
