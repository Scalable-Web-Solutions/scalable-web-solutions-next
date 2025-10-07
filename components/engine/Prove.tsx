"use client";

import React from "react";

export default function Prove() {
  return (
    <section className="relative min-h-[100svh] bg-gray-100 flex justify-center items-center overflow-hidden px-4 sm:px-6">

      <div className="relative w-full max-w-7xl h-[420px] sm:h-[480px] md:h-[540px] px-0 sm:px-4">
        <div className="absolute inset-0">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 sm:gap-10 md:gap-16 place-items-center h-full">
            {/* Trophy + stats */}
            <div className="relative w-full h-[300px] sm:h-[380px] md:h-[500px] flex items-center justify-center">
              <div className="relative z-10">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow">
                  <div className="text-5xl sm:text-7xl md:text-8xl">🏆</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full blur-2xl md:blur-3xl opacity-40 sm:opacity-50 animate-pulse" />
              </div>

              {/* Orbiting stat cards */}
              <div className="absolute top-[10%] left-[6%] sm:top-[12%] sm:left-[8%] bg-white rounded-2xl shadow-xl p-3 sm:p-4 w-28 sm:w-32 md:w-36 animate-orbit-1">
                <div className="text-[10px] sm:text-xs font-semibold text-gray-500">Revenue</div>
                <div className="text-2xl sm:text-3xl font-bold text-green-600">+156%</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-1">↑ Increase</div>
              </div>

              <div className="absolute top-[10%] right-[6%] sm:top-[12%] sm:right-[8%] bg-white rounded-2xl shadow-xl p-3 sm:p-4 w-28 sm:w-32 md:w-36 animate-orbit-2">
                <div className="text-[10px] sm:text-xs font-semibold text-gray-500">Users</div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">42K</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-1">↑ Active</div>
              </div>

              <div className="absolute bottom-[12%] left-[8%] sm:bottom-[15%] sm:left-[10%] bg-white rounded-2xl shadow-xl p-3 sm:p-4 w-28 sm:w-32 md:w-36 animate-orbit-3">
                <div className="text-[10px] sm:text-xs font-semibold text-gray-500">Retention</div>
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">89%</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-1">↑ Rate</div>
              </div>

              <div className="absolute bottom-[12%] right-[8%] sm:bottom-[15%] sm:right-[10%] bg-white rounded-2xl shadow-xl p-3 sm:p-4 w-28 sm:w-32 md:w-36 animate-orbit-4">
                <div className="text-[10px] sm:text-xs font-semibold text-gray-500">ROI</div>
                <div className="text-2xl sm:text-3xl font-bold text-orange-600">12.4x</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-1">↑ Return</div>
              </div>

              {/* Particles */}
              <div className="hidden sm:block absolute top-[25%] left-[45%] text-xl sm:text-2xl animate-float-up">⭐</div>
              <div className="hidden sm:block absolute top-[35%] right-[35%] text-xl sm:text-2xl animate-float-up" style={{ animationDelay: "0.5s" }}>✨</div>
              <div className="hidden sm:block absolute bottom-[30%] left-[40%] text-xl sm:text-2xl animate-float-up" style={{ animationDelay: "1s" }}>💫</div>
            </div>

            {/* Text */}
            <div className="text-center md:text-left px-1 sm:px-2">
              <div className="inline-block px-3 sm:px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                Phase 03
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Prove
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6">
                Once results are validated, we roll out proven wins with confidence.
                Every implementation is rooted in the data, ensuring that what goes
                live creates a positive measurable impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <div className="text-xs sm:text-sm font-semibold text-green-600 mb-1">Validated</div>
                  <div className="text-[11px] sm:text-xs text-gray-600">Data-backed wins</div>
                </div>
                <div className="flex-1 p-3 sm:p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
                  <div className="text-xs sm:text-sm font-semibold text-orange-600 mb-1">Measurable</div>
                  <div className="text-[11px] sm:text-xs text-gray-600">Real impact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
