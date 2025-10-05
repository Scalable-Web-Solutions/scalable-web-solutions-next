"use client";

import { useEffect, useMemo, useRef, useState } from "react";
// If you want automatic image optimization, switch to next/image and allow remote domains in next.config.mjs

export type LogoItem = {
  alt: string;
  src: string;
  link: string;
  box?: string; // size classes for container
  img?: string; // height classes for <img>
};

type Props = {
  title?: string;
  logos?: LogoItem[];
  /** Lower = fewer repeats; higher = more runway. */
  minFill?: number; // viewport coverage multiplier
  /** Animation speed, e.g. "40s" (mobile) and "30s" (md+ via tailwind-style var) */
  speed?: string;
};

const DEFAULT_LOGOS: LogoItem[] = [
  { alt: "WooCommerce",  src: "https://play-lh.googleusercontent.com/aPsA6vS25mrocOJqZhTZyxm7sntS_IZuHh4oLBI6v-70A_mLV0Fe0spqSDTbK_Fy8As", link: "https://woocommerce.com/",  box: "h-20 w-20 sm:h-24 sm:w-24", img: "h-12" },
  { alt: "BigCommerce",  src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYZyqmtqSYlC6DpFKfKYxy4bw_N8Itrv3wFg&s", link: "https://www.bigcommerce.com/", box: "h-20 w-20 sm:h-24 sm:w-24", img: "h-12" },
  { alt: "Shopify",      src: "https://play-lh.googleusercontent.com/lQYxSdISBENwWO7RCF1j_AzjzdOaa1LUgRckYPFVvDkSWdD8P6jqCZebmAyZfufGpIY", link: "https://www.shopify.com/",   box: "h-20 w-20 sm:h-24 sm:w-24", img: "h-12" },
  { alt: "Klaviyo",      src: "https://static.wixstatic.com/media/2293e6_da97e8ea3719441d97b3b47e4b2d7534~mv2.png", link: "https://klaviyo.com/",     box: "h-20 w-20 sm:h-24 sm:w-24", img: "h-14" },
  { alt: "Stripe",       src: "https://cdn.iconscout.com/icon/free/png-256/free-stripe-logo-icon-svg-download-png-2945188.png", link: "https://stripe.com/", box: "h-20 w-20 sm:h-24 sm:w-24", img: "h-14" },
  { alt: "Intelligems",  src: "https://cdn.shopify.com/app-store/listing_images/63fb68ea6dcc0f2694c656e6dd5a895f/icon/CMeOqL2y3Y8DEAE=.png", link: "https://www.intelligems.io/", box: "h-20 w-20 sm:h-24 sm:w-24", img: "h-14" }
];

export default function PartnerStrip({
  title = "Partnered with familiar brands.",
  logos = DEFAULT_LOGOS,
  minFill = 2.2,
  speed = "40s",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const probeRef = useRef<HTMLDivElement | null>(null);
  const [repeats, setRepeats] = useState(3);

  const measureAndSetRepeats = () => {
    const container = containerRef.current;
    const probe = probeRef.current;
    if (!container || !probe) return;

    const vw = container.clientWidth || window.innerWidth;
    const setWidth = probe.scrollWidth || 1;
    const needed = Math.ceil((vw * minFill) / setWidth) + 1; // +1 ensures seamless loop
    setRepeats(Math.max(2, needed));
  };

  useEffect(() => {
    // run on mount
    measureAndSetRepeats();

    // resize observer
    const ro = new ResizeObserver(() => {
      measureAndSetRepeats();
      // re-measure next frame (after repeats state settles)
      requestAnimationFrame(measureAndSetRepeats);
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minFill, logos]);

  // Build one lane-set to measure and reuse
  const LaneSet = useMemo(
    () => (
      <div className="lane-set" ref={probeRef}>
        {logos.map((item) => (
          <a
            key={item.src}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
            aria-label={item.alt}
          >
            <div
              className={`rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,.06)] ring-1 ring-black/5 grid place-items-center ${item.box ?? "h-20 w-20 sm:h-24 sm:w-24"}`}
            >
              {/* For next/image, replace with <Image ... fill={false} width={?} height={?} /> */}
              <img
                src={item.src}
                alt={item.alt}
                className={`${item.img ?? "h-12"} w-auto opacity-80 transition hover:opacity-100`}
                loading="lazy"
                decoding="async"
              />
            </div>
          </a>
        ))}
      </div>
    ),
    [logos]
  );

  return (
    <section className="py-14 relative bg-transparent">
      <div className="mx-auto max-w-3xl px-6 mb-6">
        <p className="text-lg font-semibold tracking-wide text-slate-600 text-center">
          {title}
        </p>
      </div>

      <div className="relative w-full overflow-hidden" ref={containerRef}>
        <div
          className="group [--speed:40s] md:[--speed:30s] hover:[--pause:paused]"
          aria-label="Supported platforms"
          role="region"
        >
          {/* Track holds N identical sets; CSS shifts by exactly 1 set */}
          <div
            className="track [animation-play-state:var(--pause, running)]"
            style={
              {
                ["--n" as any]: String(repeats),
                ["--speed" as any]: speed, // mobile base speed; md: override via utility above if you want
              } as React.CSSProperties
            }
          >
            {Array.from({ length: repeats }).map((_, i) => (
              <div className="lane-set" aria-hidden={i > 0} key={`set-${i}`}>
                {logos.map((item) => (
                  <a
                    key={`${item.src}-${i}`}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                    aria-label={item.alt}
                  >
                    <div
                      className={`rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,.06)] ring-1 ring-black/5 grid place-items-center ${item.box ?? "h-20 w-20 sm:h-24 sm:w-24"}`}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className={`${item.img ?? "h-12"} w-auto opacity-80 transition hover:opacity-100`}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Component-scoped styles */}
      <style jsx>{`
        @keyframes ticker-x {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% / var(--n))); }
        }

        .track {
          display: flex;
          width: max-content;
          animation: ticker-x var(--speed, 40s) linear infinite;
        }
        .lane-set {
          display: inline-flex;
          align-items: center;
          gap: 2rem;      /* Tailwind gap-8 */
          padding-inline: 1rem;
        }

        /* Pause on hover (respects --pause var set via hover utility) */
        .group:hover .track {
          animation-play-state: var(--pause, running);
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .track { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
