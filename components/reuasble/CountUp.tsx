"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  duration?: number;     // ms
  decimals?: number;
  suffix?: string;
};

export default function CountUp({ to, duration = 1200, decimals = 0, suffix = "" }: Props) {
  const [val, setVal] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const progress = Math.min(1, (t - startRef.current) / duration);
      setVal(to * (1 - Math.pow(1 - progress, 3))); // easeOutCubic
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [to, duration]);

  return <>{val.toFixed(decimals)}{suffix}</>;
}
