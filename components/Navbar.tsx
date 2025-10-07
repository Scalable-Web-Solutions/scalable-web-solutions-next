"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

type Props = { logo: string };

export default function Navbar({ logo }: Props) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const scrollToId = useCallback(
    (id: string) => {
      // If we're already on the homepage, smooth-scroll. Otherwise push a hash route.
      if (typeof window !== "undefined" && (pathname === "/" || pathname?.startsWith("/#"))) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        setOpen(false);
      } else {
        router.push(`/#${id}`);
        setOpen(false);
      }
    },
    [pathname, router]
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setVisible(false);
        setOpen(false); // Close mobile menu when hiding
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`z-50 fixed top-0 left-0 right-0 bg-gradient-to-b from-violet-900/40 to-transparent overflow-x-hidden transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 flex items-center justify-between">
        {/* Logo/Title */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-3 min-w-0 cursor-pointer"
          aria-label="Go to home"
        >
          <img src={logo} className="w-10 h-10 rounded-lg flex-shrink-0" alt="Scalable logo" />
          <span className="text-3xl md:text-5xl truncate bg-gradient-to-b from-[#131313] to-[#5f5f5f] text-transparent bg-clip-text">
            Scalable
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#about">About</Link>
          <Link href="/#process">Process</Link>
          <Link href="/pricing">Pricing</Link>

          <button
            onClick={() => scrollToId("contact")}
            data-cta="navbar_contact_us"
            className="bg-[#1D2939] text-white px-5 py-3 rounded-full hover:scale-105 transition-all cursor-pointer"
          >
            Contact Us
          </button>
          <button
            onClick={() => scrollToId("contact")}
            data-cta="navbar_request_demo"
            className="bg-indigo-600 text-white px-5 py-3 rounded-full -ml-2 hover:scale-105 transition-all cursor-pointer"
          >
            Book a Call
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg flex-shrink-0"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className="md:hidden transition-[max-height,opacity] duration-300 ease-out overflow-hidden fixed w-full"
        style={{ maxHeight: open ? 500 : 0, opacity: open ? 1 : 0 }}
      >
        <div className="mx-auto max-w-7xl px-6 pb-6">
          <div className="flex flex-col gap-4 bg-white/80 backdrop-blur rounded-2xl p-5 shadow-sm border border-gray-200">
            <button className="text-left" onClick={() => scrollToId("results")}>
              Results
            </button>
            <button className="text-left" onClick={() => scrollToId("about")}>
              About
            </button>
            <button className="text-left" onClick={() => router.push("/pricing")}>
              Pricing
            </button>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => scrollToId("contact")}
                className="bg-[#1D2939] text-white px-5 py-3 rounded-full w-full sm:w-auto"
              >
                Contact Us
              </button>
              <button
                onClick={() => scrollToId("contact")}
                className="bg-gray-200 text-black px-5 py-3 rounded-full w-full sm:w-auto sm:-ml-2"
              >
                Request a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}