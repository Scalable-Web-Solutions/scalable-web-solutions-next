// Server component: renders static content for SEO/SSR.
// Hydrates interactivity via <AboutCarousel />.

import AboutCarousel from "./AboutCarousel.client";
import { Globe, ShieldCheck, Users } from "lucide-react";

export type Step = {
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

const STEPS: Step[] = [
  {
    id: 0,
    tag: "Mindset",
    title: "We don’t increase your ad-spend, we optimize it.",
    body:
      "Most brands burn cash on traffic. We convert the traffic you already have into lifelong customers.",
    icon: "shield",
  },
  {
    id: 1,
    tag: "Method",
    title: "Experiments that Scale, one test at a time.",
    body:
      "From clean data to winning changes, we manage the entire testing pipeline so you scale with clarity.",
    icon: "shield",
  },
  {
    id: 2,
    tag: "Capability",
    title: "Global solutions with e-commerce focus.",
    body:
      "From analytics wiring to experimentation strategy, we build a system you can operate and grow with confidence.",
    icon: "globe",
  },
  {
    id: 3,
    tag: "Partnership",
    title: "1-on-1 support, no black box.",
    body:
      "You’ll have a direct line to us—reviews, roadmaps, and weekly wins that compound.",
    icon: "users",
  },
];

export default function AboutSection() {
  // Renders the first step immediately (SSR) for crawlers & instant paint.
  const first = STEPS[0];
  const IconSSR = iconMap[first.icon];

  return (
    <section id="about" className="relative z-10 w-full bg-gray-50 text-black overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <span
          className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle closest-side, rgba(99,102,241,0.35), transparent 70%)" }}
        />
        <span
          className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle closest-side, rgba(236,72,153,0.30), transparent 70%)" }}
        />
        <span
          className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle closest-side, rgba(16,185,129,0.25), transparent 70%)" }}
        />
      </div>

      {/* subtle noise */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%%22 height=%22100%%22 filter=%22url(%23n)%22 opacity=%220.15%22/></svg>')",
          backgroundSize: "240px 240px",
        }}
      />

      {/* SSR content paint (first step) */}
      <div data-ssr-first className="relative z-10 mx-auto max-w-4xl px-6 flex items-center justify-center min-h-[80vh] py-20 text-left">
        <div className="space-y-6 max-w-2xl">
          <p className="text-sm tracking-widest uppercase text-indigo-600/90 flex items-center gap-2">
            <IconSSR className="w-4 h-4" />
            {first.tag}
          </p>

          <h1 className="text-2xl sm:text-[45px] font-semibold leading-tight">
            {first.title}
          </h1>

          <p className="text-lg text-gray-700/90">
            {first.body}
          </p>

          {/* Proof pills (SSR) */}
          <div className="flex flex-wrap items-center gap-2 pt-1 w-fit max-w-full">
            {["+12-28 RPV lifts", "Clean analytics wiring", "Weekly experiment cadence"].map((txt) => (
              <span
                key={txt}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur px-3 py-1.5 text-sm"
              >
                <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17l-3.88-3.88-1.41 1.41L9 19 20.29 7.71l-1.41-1.41z"/>
                </svg>
                {txt}
              </span>
            ))}
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-gray-200 via-gray-300/60 to-transparent my-2" />

          {/* CTA (SSR link behavior) */}
          <a
            href="/#contact"
            data-cta="schedule_consultation"
            className="inline-block mt-4 bg-gray-900 text-white px-6 py-4 rounded-full text-base sm:text-lg font-medium hover:bg-gray-800 active:scale-[0.99] transition"
          >
            Book a call
          </a>

          {/* Scroll hint */}
          <div className="pt-4">
            <div className="mx-auto w-6 h-10 rounded-full border border-gray-300 flex items-start justify-center p-1 opacity-70">
              <div className="w-1 h-2 rounded-full bg-gray-400 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Client enhancement renders over the SSR content and takes control */}
      <AboutCarousel steps={STEPS} hostSelector="#about-ssr-first" />
    </section>
  );
}
