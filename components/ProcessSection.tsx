"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  title: string;
  body: string;
  kpi?: string;
  icon?: React.ReactNode;
};

type Props = {
  id?: string;
  steps: Step[];
  gap?: number;              // px between slides
  disableBelowPx?: number;   // fallback to vertical stack on small screens
  snap?: boolean;            // snap to whole slides
  className?: string;        // outer section classes
};

export default function ProcessSection({
  id = "process",
  steps,
  gap = 24,
  disableBelowPx = 900,
  snap = true,
  className,
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current!;
    const track = trackRef.current!;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isWide: `(min-width: ${disableBelowPx}px)`,
        isMobile: `(max-width: ${disableBelowPx - 1}px)`,
        noReduce: "(prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const slides = Array.from(track.children) as HTMLElement[];

        // Progress highlight function for both mobile and desktop
        function highlight(i: number) {
          steps.forEach((_, j) => {
            gsap.to(`#dot-${j}`, {
              backgroundColor: j === i ? "rgba(200,112,255,.9)" : "rgba(255,255,255,.2)",
              duration: 0.2
            });
            gsap.to(`#label-${j}`, {
              color: j === i ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.5)",
              duration: 0.2
            });
          });
        }

        // Mobile animations - optimized for Safari
        if (ctx.conditions?.isMobile && ctx.conditions?.noReduce) {
          // Reset any desktop styles
          gsap.set(section, { clearProps: "all" });
          gsap.set(track, { clearProps: "all" });
          gsap.set(slides, { clearProps: "all" });

          // Set up mobile vertical layout with optimized animations
          slides.forEach((slide, i) => {
            const content = slide.querySelector('.max-w-3xl');
            const bg = slide.querySelector('.pointer-events-none');
            const children = content ? Array.from(content.children) : [];

            // Force hardware acceleration and optimize for mobile
            gsap.set(slide, {
              opacity: 0,
              y: 60, // Reduced from 100
              force3D: true,
              willChange: "transform, opacity"
            });

            gsap.set(children, {
              opacity: 0,
              y: 30, // Reduced from 50
              force3D: true
            });

            if (bg) {
              gsap.set(bg, {
                opacity: 0,
                scale: 1.1, // Reduced from 1.2
                force3D: true,
                willChange: "transform, opacity"
              });
            }

            // Simplified entrance animation - no scale transforms
            ScrollTrigger.create({
              trigger: slide,
              start: "top 85%", // Trigger earlier
              end: "bottom 15%",
              onEnter: () => {
                // Update progress
                highlight(i);

                // Animate SVG path
                gsap.fromTo(slide.querySelector('#flow'),
                  { strokeDashoffset: 120 },
                  { strokeDashoffset: 0, duration: 1.2, ease: "power1.out" }
                );

                // Animate slide container - no scale for better performance
                gsap.to(slide, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6, // Faster
                  ease: "power1.out", // Simpler easing
                  force3D: true
                });

                // Simplified stagger animation
                gsap.to(children, {
                  opacity: 1,
                  y: 0,
                  duration: 0.4, // Faster
                  stagger: 0.1, // Reduced stagger
                  ease: "power1.out",
                  delay: 0.2, // Reduced delay
                  force3D: true
                });

                // Simplified background animation
                if (bg) {
                  gsap.to(bg, {
                    opacity: 0.3,
                    scale: 1,
                    duration: 0.8, // Faster
                    ease: "power1.out",
                    force3D: true
                  });
                }
              },
              onLeave: () => {
                // Simplified exit - just opacity
                gsap.to(slide, {
                  opacity: 0.5,
                  duration: 0.3,
                  ease: "power1.out"
                });
              },
              onEnterBack: () => {
                highlight(i);
                gsap.to(slide, {
                  opacity: 1,
                  duration: 0.3,
                  ease: "power1.out"
                });
              }
            });

            // Reduced parallax for better performance
            if (bg) {
              gsap.to(bg, {
                y: -50, // Reduced from -100
                scrollTrigger: {
                  trigger: slide,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 3, // Slower scrub for smoother performance
                }
              });
            }

            // Remove content parallax to reduce load
          });

          return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
          };
        }

        // Desktop horizontal scroll
        if (!(ctx.conditions?.isWide && ctx.conditions?.noReduce)) {
          return () => { };
        }

        // Layout the horizontal track
        gsap.set(section, { position: "relative", width: "100%", height: "100vh", overflow: "hidden" });
        gsap.set(track, {
          display: "flex",
          flexWrap: "nowrap",
          gap,
          height: "100vh",
          width: slides.length * window.innerWidth + (slides.length - 1) * gap,
        });
        gsap.set(slides, { width: "100vw", height: "100vh", flex: "0 0 auto" });

        // Pin the section and scrub horizontal distance equal to overflow
        const tween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,

            onRefresh: () => {
              // in case fonts/images changed sizing
              gsap.set(track, {
                width: slides.length * window.innerWidth + (slides.length - 1) * gap,
              });
            },
          },
        });

        // Add progress tracking for desktop horizontal scroll
        slides.forEach((slide, i) => {
          ScrollTrigger.create({
            trigger: slide,
            containerAnimation: tween,
            start: "left center",
            end: "right center",
            onEnter: () => {
              highlight(i);
              gsap.fromTo(slide.querySelector('#flow'),
                { strokeDashoffset: 120 },
                { strokeDashoffset: 0, duration: 1.2, ease: "power1.out" }
              );
            },
            onEnterBack: () => {
              highlight(i);
              gsap.fromTo(slide.querySelector('#flow'),
                { strokeDashoffset: 120 },
                { strokeDashoffset: 0, duration: 1.2, ease: "power1.out" }
              );
            }
          });
        });

        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", handleResize);

        // If images inside slides, refresh after they load
        const imgs = track.querySelectorAll("img");
        imgs.forEach((img) => {
          if (img.complete) return;
          img.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
        });

        return () => {
          window.removeEventListener("resize", handleResize);
          tween?.scrollTrigger?.kill();
          tween?.kill();
        };
      }
    );

    return () => mm.revert();
  }, [gap, disableBelowPx, snap]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={className}
      aria-roledescription="carousel"
      aria-label="How we do it"
    >
      {/* Sticky progress rail */}
      <ul className="hidden lg:flex items-center gap-6 text-sm text-white/50 absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        {steps.map((s, i) => (
          <li key={i} className="flex items-center gap-2">
            <span id={`dot-${i}`} className="size-2 rounded-full bg-white/20 block" />
            <span id={`label-${i}`} className="tracking-wide">{s.title}</span>
          </li>
        ))}
      </ul>

      <div ref={trackRef} className="lg:flex lg:flex-nowrap">
        {steps.map((s, i) => (
          <article
            key={i}
            className="relative flex items-center justify-center min-h-screen lg:min-h-0 py-20 lg:py-0 overflow-hidden transform-gpu"
          >
            <svg className="pointer-events-none absolute inset-0 -z-10 opacity-30" viewBox="0 0 1600 900" preserveAspectRatio="none">
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#A774FF" stopOpacity=".3" />
                  <stop offset="1" stopColor="#46B3FF" stopOpacity=".3" />
                </linearGradient>
              </defs>
              <path id="flow" d="M-50 700 C 300 600, 900 800, 1900 650" fill="none" stroke="url(#g)" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 14" />
            </svg>

            {/* Slide content (style however you want) */}
            <div className="max-w-3xl mx-auto text-center px-6">
              <div className="mb-6 flex justify-center">{s.icon}</div>
              <h2 className="text-4xl md:text-6xl font-semibold text-white mb-4">{s.title}</h2>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6">{s.body}</p>
              {s.kpi && (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white">
                  <span className="text-sm opacity-80">Result</span>
                  <span className="font-medium">{s.kpi}</span>
                </div>
              )}
            </div>

            {/* Optional background flourishes per slide - optimized for mobile */}

          </article>
        ))}
      </div>
    </section>
  );
}
