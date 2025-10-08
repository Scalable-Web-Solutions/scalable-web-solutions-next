"use client";

import React from "react";

export default function Refine() {
  return (
    <section className="relative min-h-[100svh] bg-gray-100 flex items-center overflow-hidden px-4 sm:px-6">
      <div className="relative w-full max-w-7xl mx-auto py-12 sm:py-16 md:py-20 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">
          {/* Loop ring */}
          <div className="relative w-full mx-auto flex items-center justify-center">
            <div className="relative aspect-square w-[min(80vw,28rem)] md:w-[min(42vw,30rem)] lg:w-[min(40vw,34rem)]">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="gradient-cycle" gradientUnits="objectBoundingBox">
                    <stop offset="0%" stopColor="rgb(99,102,241)" />
                    <stop offset="33%" stopColor="rgb(168,85,247)" />
                    <stop offset="66%" stopColor="rgb(236,72,153)" />
                    <stop offset="100%" stopColor="rgb(99,102,241)" />
                    <animateTransform attributeName="gradientTransform" type="rotate" from="0 0.5 0.5" to="360 0.5 0.5" dur="4s" repeatCount="indefinite" />
                  </linearGradient>
                </defs>

                {/* thinner ring (r up, stroke down) */}
                <circle cx="50" cy="50" r="41" stroke="#e5e7eb" strokeWidth="3.2" fill="none" />
                <circle cx="50" cy="50" r="41" stroke="url(#gradient-cycle)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              </svg>

              {/* ∞ */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="text-6xl sm:text-7xl md:text-8xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent select-none">
                  ∞
                </div>
              </div>

              {/* BIGGER pills */}
              <div className="pointer-events-none">
                <div className="absolute top-1.5 sm:top-4 md:top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white
                                px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full shadow-xl
                                text-xs sm:text-sm md:text-base font-semibold">
                  Research
                </div>

                <div className="absolute right-1.5 sm:right-3 md:right-5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-purple-600 text-white
                                px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full shadow-xl
                                text-xs sm:text-sm md:text-base font-semibold">
                  Test
                </div>
                <div className="absolute right-7 sm:right-10 md:right-14 top-1/2 translate-y-8 sm:translate-y-9 md:translate-y-10
                                text-xl sm:text-2xl md:text-3xl text-purple-500 select-none">
                  ↓
                </div>

                <div className="absolute bottom-1.5 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-pink-600 text-white
                                px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full shadow-xl
                                text-xs sm:text-sm md:text-base font-semibold">
                  Prove
                </div>
                <div className="absolute bottom-12 sm:bottom-14 md:bottom-16 left-1/2 -translate-x-1/2 rotate-90
                                text-xl sm:text-2xl md:text-3xl text-purple-500 select-none">
                  ↓
                </div>

                <div className="absolute left-1.5 sm:left-3 md:left-5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white
                                px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full shadow-xl
                                text-xs sm:text-sm md:text-base font-semibold">
                  Refine
                </div>
                <div className="absolute top-10 sm:top-12 md:top-14 left-1/2 -translate-x-1/2 -rotate-90
                                text-xl sm:text-2xl md:text-3xl text-purple-500 select-none">
                  ↓
                </div>
                <div className="absolute left-7 sm:left-10 md:left-14 top-1/2 -translate-y-11 sm:-translate-y-12 md:-translate-y-14
                                text-xl sm:text-2xl md:text-3xl text-fuchsia-500 select-none">
                  ↑
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="text-center md:text-left px-2 sm:px-4 md:px-0 max-w-xl md:max-w-2xl mx-auto md:mx-0">
            <div className="inline-block px-3 sm:px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              Phase 04
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Refine &amp; Repeat
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-5 sm:mb-6">
              Growth is a cycle. We feed every proven win back into updated buyer profiles,
              sharper marketing strategies, and more tailored customer journeys that keep
              customers coming back.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 sm:p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
                <div className="text-sm sm:text-base font-semibold text-indigo-600 mb-1">Continuous</div>
                <div className="text-xs sm:text-sm text-gray-600">Never-ending improvement</div>
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                <div className="text-sm sm:text-base font-semibold text-purple-600 mb-1">Iterative</div>
                <div className="text-xs sm:text-sm text-gray-600">Compound growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
