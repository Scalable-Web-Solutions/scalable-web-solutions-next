"use client";

import { useEffect, useRef } from "react";
import CountUp from "./CountUp";

export default function TiltStatsCard() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const maxTilt = 12;   // deg
  const maxLift = 18;   // px translateZ
  const scale = 1.02;
  const lerpAmt = 0.12;

  let targetRX = 0, targetRY = 0, targetTZ = 0;
  let curRX = 0, curRY = 0, curTZ = 0;
  let rafId: number | null = null;

  const ensureRAF = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(tick);
  };

  const tick = () => {
    curRX += (targetRX - curRX) * lerpAmt;
    curRY += (targetRY - curRY) * lerpAmt;
    curTZ += (targetTZ - curTZ) * lerpAmt;

    if (cardRef.current) {
      cardRef.current.style.transform = `translateZ(${curTZ}px) rotateX(${curRX}deg) rotateY(${curRY}deg) scale(${scale})`;
    }

    const done =
      Math.abs(curRX - targetRX) < 0.05 &&
      Math.abs(curRY - targetRY) < 0.05 &&
      Math.abs(curTZ - targetTZ) < 0.15;

    if (!done) {
      rafId = requestAnimationFrame(tick);
    } else {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const nx = (x / rect.width) * 2 - 1;
    const ny = (y / rect.height) * 2 - 1;
    targetRX = -ny * maxTilt;
    targetRY = nx * maxTilt;
    targetTZ = maxLift;
    ensureRAF();
  };

  const onLeave = () => {
    targetRX = 0; targetRY = 0; targetTZ = 0;
    ensureRAF();
  };

  useEffect(() => () => { if (rafId) cancelAnimationFrame(rafId); }, []);

  return (
    <div className="hidden md:flex md:justify-end">
      <div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative"
        style={{
          perspective: "900px",
          perspectiveOrigin: "50% 50%",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          ref={cardRef}
          className="w-[550px] h-[350px] bg-white/5 rounded-2xl relative border border-gray-200 overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] will-change-transform"
          style={{ transformStyle: "preserve-3d", transition: "transform 120ms ease-out" }}
        >
          {/* Top bar */}
          <div
            className="absolute top-0 left-0 w-full h-12 bg-gray-100/10 border-b border-gray-200 flex items-center px-5"
            style={{ transform: "translateZ(8px)" }}
          >
            <div className="flex space-x-2">
              <div className="size-4 bg-red-500 rounded-full" />
              <div className="size-4 bg-yellow-400 rounded-full" />
              <div className="size-4 bg-green-500 rounded-full" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white border border-gray-300 rounded-md px-3 py-[2px] shadow-inner">
                <p className="font-mono text-xs text-gray-700">scalableweb.solutions/portal</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="absolute inset-x-0 top-12 bottom-0 p-4" style={{ transform: "translateZ(12px)" }}>
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-indigo-50 border border-gray-200 p-4" style={{ transform: "translateZ(10px)" }}>
                <div className="text-sm text-indigo-800">Monthly Visitors</div>
                <div className="text-2xl font-bold text-indigo-900">
                  <CountUp to={272.76} decimals={2} suffix="K" />
                </div>
                <div className="mt-1 text-xs text-emerald-600">↗ +<CountUp to={24} decimals={1} suffix="%" /></div>
              </div>
              <div className="rounded-xl bg-emerald-50 border border-gray-200 p-4" style={{ transform: "translateZ(10px)" }}>
                <div className="text-sm text-emerald-800">Uptime</div>
                <div className="text-2xl font-bold text-emerald-900"><CountUp to={98.2} decimals={1} suffix="%" /></div>
                <div className="mt-1 text-xs text-emerald-600">↗ <CountUp to={0.3} decimals={1} suffix="%" /></div>
              </div>
            </div>

            {/* Performance */}
            <div className="mt-3" style={{ transform: "translateZ(8px)" }}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold text-gray-800">Performance</h3>
                <span className="text-[11px] text-gray-500">Last 30 days</span>
              </div>

              <div className="mt-2 space-y-2.5">
                {[
                  { label: "Load Time", pct: 89, bar: "bg-indigo-500" },
                  { label: "SEO Score", pct: 96, bar: "bg-emerald-500" },
                  { label: "Accessibility", pct: 94, bar: "bg-violet-500" },
                  { label: "Best Practices", pct: 92, bar: "bg-orange-500" },
                ].map(({ label, pct, bar }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-gray-700">
                      <span>{label}</span><span>{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200">
                      <div className={`h-2 rounded-full ${bar}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Deployments */}
            <div className="mt-3" style={{ transform: "translateZ(6px)" }}>
              <h3 className="text-sm font-semibold text-gray-800">Recent Deployments</h3>
              <ul className="mt-2 space-y-2">
                {[
                  { name: "E-commerce Platform", time: "2 min ago" },
                  { name: "Marketing Site", time: "1 hour ago" },
                ].map((d) => (
                  <li
                    key={d.name}
                    className="flex items-center justify-between rounded-xl bg-white border border-gray-200 px-3 py-2 shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-500" />
                      <div>
                        <div className="text-sm font-medium text-gray-800">{d.name}</div>
                        <div className="text-[11px] text-gray-500">{d.time}</div>
                      </div>
                    </div>
                    <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">success</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* soft floating shadow */}
        <div
          className="absolute -inset-2 rounded-[28px] -z-10 blur-2xl opacity-40"
          style={{ background: "radial-gradient(40% 50% at 50% 65%, rgba(50,21,92,0.35), transparent 70%)" }}
        />
      </div>

      {/* reduced-motion helper */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          [style*="translateZ"] { transform: none !important; }
        }
      `}</style>
    </div>
  );
}
