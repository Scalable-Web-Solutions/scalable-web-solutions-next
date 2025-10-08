"use client";

import React from "react";

export default function Test() {
  return (
    <section className="relative min-h-[100svh] bg-gray-100 flex justify-center items-center overflow-hidden px-4 sm:px-6">
      <div className="relative w-full max-w-7xl h-[420px] sm:h-[480px] md:h-[540px] px-0 sm:px-4">
        <div className="absolute inset-0">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 sm:gap-10 md:gap-16 place-items-center h-full">
            {/* Split variants */}
            <div className="relative w-full h-[300px] sm:h-[380px] md:h-[500px]">
              <div className="absolute inset-0 flex flex-col md:flex-row gap-3 sm:gap-4">
                {/* Variant A */}
                <div className="flex-1 relative bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-pulse-slow min-h-[160px]">
                  <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-white text-[10px] sm:text-xs font-bold">
                    VARIANT A
                  </div>
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <div className="bg-white/90 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <span className="text-[10px] sm:text-xs font-semibold text-gray-600">Conversion</span>
                        <span className="text-lg sm:text-2xl font-bold text-blue-600">3.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div className="h-1.5 sm:h-2 rounded-full animate-width-grow" style={{ width: "32%", animationDelay: "0s" }} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-16 right-6 w-10 h-10 sm:w-16 sm:h-16 bg-white/30 backdrop-blur rounded-2xl animate-float-slow" />
                  <div className="absolute top-40 left-6 w-8 h-8 sm:w-12 sm:h-12 bg-white/30 backdrop-blur rounded-xl animate-float-slow" style={{ animationDelay: "0.5s" }} />
                </div>

                {/* VS badge */}
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-2xl animate-pulse">
                    VS
                  </div>
                </div>

                {/* Variant B */}
                <div className="flex-1 relative bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-pulse-slow min-h-[160px]" style={{ animationDelay: "0.5s" }}>
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-white text-[10px] sm:text-xs font-bold">
                    VARIANT B
                  </div>
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <div className="bg-white/90 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <span className="text-[10px] sm:text-xs font-semibold text-gray-600">Conversion</span>
                        <span className="text-lg sm:text-2xl font-bold text-purple-600">4.8%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div className="h-1.5 sm:h-2 rounded-full animate-width-grow" style={{ width: "48%", animationDelay: "0.3s" }} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-24 right-8 w-10 h-10 sm:w-14 sm:h-14 bg-white/30 backdrop-blur rounded-2xl animate-float-slow" style={{ animationDelay: "0.7s" }} />
                  <div className="absolute top-40 left-8 w-8 h-8 sm:w-10 sm:h-10 bg-white/30 backdrop-blur rounded-xl animate-float-slow" style={{ animationDelay: "1s" }} />
                </div>
              </div>

              {/* Particles between variants */}
              <div className="absolute top-[30%] left-[48%] w-2 h-2 bg-yellow-400 rounded-full animate-ping hidden md:block" />
              <div className="absolute top-[50%] left-[48%] w-2 h-2 bg-green-400 rounded-full animate-ping hidden md:block" style={{ animationDelay: "0.5s" }} />
              <div className="absolute top-[70%] left-[48%] w-2 h-2 bg-blue-400 rounded-full animate-ping hidden md:block" style={{ animationDelay: "1s" }} />
            </div>

            {/* Text */}
            <div className="text-center md:text-left px-1 sm:px-2 py-10">
              <div className="inline-block px-3 sm:px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                Phase 02
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Test
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6">
                With the right foundation in place, we design controlled site tests
                backed by data to reveal exactly what drives growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                  <div className="text-xs sm:text-sm font-semibold text-blue-600 mb-1">A/B Testing</div>
                  <div className="text-[11px] sm:text-xs text-gray-600">Compare variants</div>
                </div>
                <div className="flex-1 p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-xs sm:text-sm font-semibold text-purple-600 mb-1">Data-Driven</div>
                  <div className="text-[11px] sm:text-xs text-gray-600">Real results</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
