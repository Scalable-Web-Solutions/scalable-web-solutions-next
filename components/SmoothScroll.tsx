"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Prevent double init (Fast Refresh / re-mounts)
    if (lenisRef.current) return;

    const lenis = new Lenis({
      // tune if you like:
      duration: 1.1,        // ~ease length
      smoothWheel: true,
      gestureOrientation: "vertical",
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // rAF loop (Lenis expects time in ms)
    const raf = (time: number) => {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    };
    rafId.current = requestAnimationFrame(raf);

    // Optional: if you prefer GSAP’s ticker, use this instead of rAF:
    // const tick = (t: number) => lenis.raf(t * 1000);
    // gsap.ticker.add(tick);
    // gsap.ticker.lagSmoothing(0);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      // If you used gsap.ticker, remove it here and restore lagSmoothing
      // gsap.ticker.remove(tick);

      // Kill ScrollTriggers if you dynamically remount
      // ScrollTrigger.kill();

      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
