"use client";

import React from "react";

export default function Research() {
  return (
    <section className="relative min-h-[100svh] bg-gray-100 flex justify-center items-center overflow-hidden px-4 sm:px-6">
      <div className="relative w-full max-w-7xl min-h-[500px] sm:h-[480px] md:h-[540px] px-0 sm:px-4">
        <div className="absolute inset-0">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 sm:gap-10 md:gap-16 place-items-center h-full py-8 md:py-0">
            {/* 3D floating data visualization */}
            <div className="relative w-full max-w-md mx-auto h-[350px] sm:h-[380px] md:h-[500px] perspective-1000">
              {/* Floating cards */}
              <div
                className="absolute top-[8%] left-[8%] sm:top-[10%] sm:left-[12%] w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl transform rotate-12 animate-float"
                style={{ animationDelay: "0s" }}
              >
                <div className="p-3 sm:p-4 text-white">
                  <div className="text-[10px] sm:text-xs font-semibold opacity-80">MACRO</div>
                  <div className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">↗ 127%</div>
                  <div className="text-[10px] sm:text-xs mt-1 opacity-70">Market Growth</div>
                </div>
              </div>

              <div
                className="absolute top-[46%] left-[2%] sm:top-[45%] sm:left-[5%] w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-2xl shadow-2xl transform -rotate-6 animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="p-2.5 sm:p-3 text-white">
                  <div className="text-[10px] sm:text-xs font-semibold opacity-80">MICRO</div>
                  <div className="text-lg sm:text-xl font-bold mt-1 sm:mt-2">8.4K</div>
                  <div className="text-[10px] sm:text-xs mt-1 opacity-70">User Signals</div>
                </div>
              </div>

              <div
                className="absolute top-[18%] right-[6%] sm:top-[20%] sm:right-[10%] w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl transform rotate-6 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="p-3 sm:p-4 text-white">
                  <div className="text-[10px] sm:text-xs font-semibold opacity-80">TREND</div>
                  <div className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">🔥</div>
                  <div className="text-[10px] sm:text-xs mt-1 opacity-70">Emerging Pattern</div>
                </div>
              </div>

              <div
                className="absolute bottom-[10%] right-[14%] sm:bottom-[15%] sm:right-[20%] w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-2xl transform -rotate-12 animate-float"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="p-3 sm:p-4 text-white">
                  <div className="text-[10px] sm:text-xs font-semibold opacity-80">INSIGHT</div>
                  <div className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">+42%</div>
                  <div className="text-[10px] sm:text-xs mt-1 opacity-70">Conversion</div>
                </div>
              </div>

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10">
                <line x1="30%" y1="25%" x2="70%" y2="35%" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="5,5" className="animate-dash" />
                <line x1="25%" y1="60%" x2="65%" y2="75%" stroke="url(#gradient2)" strokeWidth="2" strokeDasharray="5,5" className="animate-dash" style={{ animationDelay: "0.5s" }} />
                <line x1="70%" y1="35%" x2="65%" y2="75%" stroke="url(#gradient3)" strokeWidth="2" strokeDasharray="5,5" className="animate-dash" style={{ animationDelay: "1s" }} />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(129,140,248)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(167,139,250)" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(217,70,239)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(192,132,252)" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(6,182,212)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(139,92,246)" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Particles */}
              <div className="absolute top-[35%] left-[40%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-ping opacity-60" />
              <div className="absolute top-[50%] right-[35%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-ping opacity-60" style={{ animationDelay: "0.7s" }} />
              <div className="absolute bottom-[40%] left-[30%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-fuchsia-400 rounded-full animate-ping opacity-60" style={{ animationDelay: "1.2s" }} />
            </div>

            {/* Text */}
            <div className="text-center md:text-left px-4 sm:px-6 md:px-2 max-w-lg mx-auto md:mx-0">
              <div className="inline-block px-3 sm:px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                Phase 01
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Research
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6">
                From the micro details shaping your industry, we listen, learn, and
                dig deep to uncover the insights that truly matter to your growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 p-3 sm:p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                  <div className="text-xs sm:text-sm font-semibold text-indigo-600 mb-1">Macro Trends</div>
                  <div className="text-[11px] sm:text-xs text-gray-600">Industry-wide patterns</div>
                </div>
                <div className="flex-1 p-3 sm:p-4 bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-xl">
                  <div className="text-xs sm:text-sm font-semibold text-fuchsia-600 mb-1">Micro Insights</div>
                  <div className="text-[11px] sm:text-xs text-gray-600">Customer behavior</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(var(--rotate));
          }
          50% {
            transform: translateY(-20px) rotate(var(--rotate));
          }
        }

        @keyframes dash {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 20;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-dash {
          animation: dash 20s linear infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        div[style*="rotate-12"] {
          --rotate: -12deg;
        }

        div[style*="rotate-6"] {
          --rotate: 6deg;
        }

        div[style*="rotate(12deg)"] {
          --rotate: 12deg;
        }
      `}</style>
    </section>
  );
}