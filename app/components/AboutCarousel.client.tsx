"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronsDown, Pause, Play, Globe, ShieldCheck, Users } from "lucide-react";

type Step = {
  id: number;
  tag: string;
  title: string;
  body: string;
  icon: "globe" | "shield" | "users";
};

const iconMap = {
  globe: Globe,
  shield: ShieldCheck,
  users: Users,
} as const;

type Props = {
  steps: Step[];
  intervalMs?: number;
  /** CSS selector of the SSR-first block to hide once the client mounts (e.g. "#about-ssr-first") */
  hostSelector?: string;
};

export default function AboutCarousel({ steps, intervalMs = 5000, hostSelector }: Props) {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [inView, setInView] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [textMaxWidth, setTextMaxWidth] = useState<number | null>(null);

  const pillGroupRef = useRef<HTMLDivElement | null>(null);
  const thirdPillRef = useRef<HTMLSpanElement | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const touchYRef = useRef(0);

  const next = () => setActive((i) => (i + 1) % steps.length);
  const prev = () => setActive((i) => (i - 1 + steps.length) % steps.length);
  const goTo = (i: number) => {
    setActive(((i % steps.length) + steps.length) % steps.length);
    restart();
  };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  const start = () => {
    stop();
    if (autoplay && inView && !isMobile) {
      timerRef.current = window.setInterval(next, intervalMs) as unknown as number;
    }
  };
  const restart = () => start();

  // Hide the SSR-first block once client is ready (prevents duplicate content)
  useEffect(() => {
    if (!hostSelector) return;
    const ssrFirst = document.querySelector<HTMLElement>(hostSelector);
    if (ssrFirst) {
      ssrFirst.setAttribute("aria-hidden", "true");
      ssrFirst.classList.add("hidden");
      return () => {
        ssrFirst.removeAttribute("aria-hidden");
        ssrFirst.classList.remove("hidden");
      };
    }
  }, [hostSelector]);

  // viewport visibility (pause when not visible)
  useEffect(() => {
    const el = hostRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? true),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // responsive/mobile detection
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  // clamp body text to third pill right edge (desktop only)
  const updateClamp = () => {
    const group = pillGroupRef.current;
    const third = thirdPillRef.current;
    if (!group || !third) return;
    const groupRect = group.getBoundingClientRect();
    const thirdRect = third.getBoundingClientRect();
    setTextMaxWidth(Math.round(thirdRect.right - groupRect.left));
  };

  useEffect(() => {
    updateClamp();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateClamp) : null;
    if (ro) {
      if (pillGroupRef.current) ro.observe(pillGroupRef.current);
      if (thirdPillRef.current) ro.observe(thirdPillRef.current);
    }
    const onWinResize = () => updateClamp();
    window.addEventListener("resize", onWinResize);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", onWinResize);
    };
  }, []);

  // autoplay lifecycle
  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, inView, isMobile, intervalMs]);

  // touch swipe
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchYRef.current = e.touches[0].clientY;
  };
  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const dy = e.changedTouches[0].clientY - touchYRef.current;
    if (Math.abs(dy) > 40) (dy > 0 ? prev() : next());
    restart();
  };

  const ActiveIcon = iconMap[steps[active].icon];

  return (
    <div
      ref={hostRef}
      className="pointer-events-auto relative z-10 mx-auto max-w-4xl px-6 -mt-[80vh] pt-[80vh] pb-20"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="space-y-6 max-w-2xl">
        <p className="text-sm tracking-widest uppercase text-indigo-600/90 flex items-center gap-2">
          <ActiveIcon className="w-4 h-4" />
          {steps[active].tag}
        </p>

        <h2 className="text-2xl sm:text-[45px] font-semibold leading-tight">
          {steps[active].title}
        </h2>

        <p
          className="text-lg text-gray-700/90"
          style={!isMobile && textMaxWidth ? { maxWidth: `${textMaxWidth}px` } : undefined}
        >
          {steps[active].body}
        </p>

        {/* Pills */}
        <div ref={pillGroupRef} className="flex flex-wrap items-center gap-2 pt-1 w-fit max-w-full">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur px-3 py-1.5 text-sm">
            <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17l-3.88-3.88-1.41 1.41L9 19 20.29 7.71l-1.41-1.41z"/>
            </svg>
            +12-28 RPV lifts
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur px-3 py-1.5 text-sm">
            <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17l-3.88-3.88-1.41 1.41L9 19 20.29 7.71l-1.41-1.41z"/>
            </svg>
            Clean analytics wiring
          </span>
          <span
            ref={thirdPillRef}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur px-3 py-1.5 text-sm"
          >
            <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17l-3.88-3.88-1.41 1.41L9 19 20.29 7.71l-1.41-1.41z"/>
            </svg>
            Weekly experiment cadence
          </span>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-gray-200 via-gray-300/60 to-transparent my-2" />

        {/* Controls (desktop) */}
        {!isMobile && (
          <div className="flex items-center gap-3 pt-2">
            {steps.map((s) => (
              <button
                key={s.id}
                className={`h-2.5 rounded-full transition-all ${active === s.id ? "w-8 bg-indigo-600" : "w-2.5 bg-gray-300"}`}
                aria-label={`Go to ${s.tag}`}
                onClick={() => goTo(s.id)}
              />
            ))}
            <button
              className="ml-2 rounded-full border border-gray-200 p-2 hover:bg-gray-50"
              onClick={() => { next(); restart(); }}
              aria-label="Next"
            >
              <ChevronsDown className="w-4 h-4" />
            </button>
            <button
              className="rounded-full border border-gray-200 p-2 hover:bg-gray-50"
              onClick={() => { setAutoplay((a) => !a); }}
              aria-label="Toggle autoplay"
            >
              {autoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Reduced motion helper */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-bounce { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
