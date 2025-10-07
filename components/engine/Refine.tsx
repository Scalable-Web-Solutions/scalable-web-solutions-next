"use client";

import React from "react";

export default function Refine() {
  return (
    <section className="relative min-h-[100svh] bg-gray-100 flex justify-center items-center overflow-hidden px-4 sm:px-6">
      <div className="relative w-full max-w-7xl h-[420px] sm:h-[480px] md:h-[540px] px-0 sm:px-4">
        <div className="absolute inset-0">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 sm:gap-10 md:gap-16 place-items-center h-full">
            {/* Loop ring */}
            <div className="relative w-full h-[300px] sm:h-[380px] md:h-[500px] flex items-center justify-center">
              <svg className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 -rotate-90">
                <defs>
                  <linearGradient id="gradient-cycle" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(99,102,241)" />
                    <stop offset="50%" stopColor="rgb(168,85,247)" />
                    <stop offset="100%" stopColor="rgb(236,72,153)" />
                  </linearGradient>
                </defs>
                <circle cx="192" cy="192" r="160" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                <circle cx="192" cy="192" r="160" stroke="url(#gradient-cycle)" strokeWidth="12" fill="none" strokeLinecap="round" />
              </svg>

              <div className="relative z-10 text-5xl sm:text-7xl md:text-8xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                ∞
              </div>

              {/* Badges */}
              <div className="absolute top-4 sm:top-6 md:top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl">
                <div className="text-[10px] sm:text-xs font-semibold">Research</div>
              </div>

              <div className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl">
                <div className="text-[10px] sm:text-xs font-semibold">Test</div>
              </div>
              <div className="absolute right-[40px] sm:right-[54px] md:right-[63px] top-1/2 translate-y-[30px] sm:translate-y-[36px] md:translate-y-[42px] text-lg sm:text-xl md:text-2xl text-purple-500 select-none">
                ↓
              </div>

              <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl">
                <div className="text-[10px] sm:text-xs font-semibold">Prove</div>
              </div>
              <div className="absolute bottom-0 rotate-90 text-lg sm:text-xl md:text-2xl text-purple-500 select-none">↓</div>

              <div className="absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl">
                <div className="text-[10px] sm:text-xs font-semibold">Refine</div>
              </div>
              <div className="absolute top-0 -rotate-90 text-lg sm:text-xl md:text-2xl text-purple-500 select-none">↓</div>
              <div className="absolute left-[48px] sm:left-[62px] md:left-[70px] top-1/2 -translate-y-[42px] sm:-translate-y-[50px] md:-translate-y-[58px] text-lg sm:text-xl md:text-2xl text-fuchsia-500 select-none">
                ↑
              </div>
            </div>

            {/* Text */}
            <div className="text-center md:text-left px-1 sm:px-2">
              <div className="inline-block px-3 sm:px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                Phase 04
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Refine &amp; Repeat
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6">
                Growth is a cycle. We feed every proven win back into updated buyer
                profiles, sharper marketing strategies, and more tailored customer
                journeys that keep customers coming back.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 p-3 sm:p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                  <div className="text-xs sm:text-sm font-semibold text-indigo-600 mb-1">Continuous</div>
                  <div className="text-[11px] sm:text-xs text-gray-600">Never-ending improvement</div>
                </div>
                <div className="flex-1 p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-xs sm:text-sm font-semibold text-purple-600 mb-1">Iterative</div>
                  <div className="text-[11px] sm:text-xs text-gray-600">Compound growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
