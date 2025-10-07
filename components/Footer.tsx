"use client";

import React, { useEffect, useRef } from "react";

export default function Footer() {
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 100;
      const y = (e.clientY / innerHeight) * 100;
      text.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, #32155c, #c870ff, #32155c)`;
    };

    document.addEventListener("mousemove", handleMove);
    return () => document.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <footer className="relative z-20 bg-gray-50 py-10 text-center">
      {/* Social links */}
      <div className="flex justify-center items-center gap-4 mb-10 text-gray-700 text-sm sm:text-base">
        <a
          href="https://github.com/Scalable-Web-Solutions"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/company/scalable-web-solutions"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://www.instagram.com/scalablewebsolutions/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 transition-colors"
        >
          Instagram
        </a>
      </div>

      {/* Gradient text */}
      <h1
        ref={textRef}
        className="text-[75px] font-medium lg:text-[260px] text-center bg-clip-text text-transparent transition-all duration-300 select-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #32155c, #c870ff, #32155c)",
          backgroundSize: "200% 200%",
        }}
      >
        Scalable
      </h1>
    </footer>
  );
}
