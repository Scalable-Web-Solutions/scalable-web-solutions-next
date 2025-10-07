// Server component: renders static content for SEO/SSR.
// Hydrates interactivity via <ClientRender /> (client-side).

import ClientRender, { type Step } from "./reuasble/ClientRender";
import ClientOnly from "./reuasble/ClientOnly";
import { Globe, ShieldCheck, Users } from "lucide-react";
import Squares from "./Squares";

const iconMap = {
  globe: Globe,
  shield: ShieldCheck,
  users: Users,
} as const;

const STEPS: Step[] = [
  { id: 0, tag: "Mindset", title: "We don’t increase your ad-spend, we optimize it.",
    body: "Most brands burn cash on traffic. We convert the traffic you already have into lifelong customers.",
    icon: "shield" },
  { id: 1, tag: "Method", title: "Experiments that Scale, one test at a time.",
    body: "From clean data to winning changes, we manage the entire testing pipeline so you scale with clarity.",
    icon: "shield" },
  { id: 2, tag: "Capability", title: "Global solutions with e-commerce focus.",
    body: "From analytics wiring to experimentation strategy, we build a system you can operate and grow with confidence.",
    icon: "globe" },
  { id: 3, tag: "Partnership", title: "1-on-1 support, no black box.",
    body: "You’ll have a direct line to us—reviews, roadmaps, and weekly wins that compound.",
    icon: "users" },
];

export default function AboutSection() {
  const first = STEPS[0];
  const IconSSR = iconMap[first.icon];

  return (
    <section id="about" className="relative z-10 w-full bg-gray-50 text-black overflow-hidden">
      {/* ...your ambient/noise decorations remain unchanged... */}

      {/* --- SSR-first block (always safe to render on the server) --- */}
      <div
        data-ssr-first
        id="about-ssr-first"
        className="relative z-10 mx-auto max-w-4xl px-6 flex items-center justify-center min-h-[80vh] py-20 text-left"
      >
        <div className="max-w-2xl">
          <p className="text-sm tracking-widest uppercase text-indigo-600/90 flex items-center gap-2">
            <IconSSR className="w-4 h-4" />
            {first.tag}
          </p>

          <h1 className="text-2xl sm:text-[45px] font-semibold leading-tight">{first.title}</h1>
          <p className="text-lg text-gray-700/90">{first.body}</p>

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

          <a
            href="/#contact"
            data-cta="schedule_consultation"
            className=" bg-gray-900 text-white px-6 py-4 rounded-full text-base sm:text-lg font-medium hover:bg-gray-800 active:scale-[0.99] transition"
          >
            Book a call
          </a>

          <div className="pt-4">
            <div className="mx-auto w-6 h-10 rounded-full border border-gray-300 flex items-start justify-center p-1 opacity-70">
              <div className="w-1 h-2 rounded-full bg-gray-400 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Client enhancement (mounts only on the client) --- */}
      <ClientOnly hideOnMountSelector="#about [data-ssr-first]">
      
        <div className="absolute inset-0">
          <Squares 
speed={0.5} 
squareSize={40}
direction='diagonal' // up, down, left, right, diagonal
borderColor="#f6f6f6"
/>
        </div>
        <div
        className="relative z-10 mx-auto max-w-4xl px-6 flex items-center justify-center min-h-[80vh] py-10 text-left"
      >
        
        <div className="max-w-2xl">

          <ClientRender steps={STEPS} hostSelector="#about-ssr-first" />

          <a
            href="/#contact"
            data-cta="schedule_consultation"
            className=" bg-gray-900 text-white px-6 py-4 ml-4 rounded-full text-base sm:text-lg font-medium hover:bg-gray-800 active:scale-[0.99] transition-all"
          >
            Book a call
          </a>

          <div className="pt-4">
            <div className="mx-auto w-6 h-10 rounded-full border border-gray-300 flex items-start justify-center p-1 opacity-70">
              <div className="w-1 h-2 rounded-full bg-gray-400 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
      </ClientOnly>
    </section>
  );
}
