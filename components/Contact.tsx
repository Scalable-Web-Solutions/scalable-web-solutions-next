"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Mail,
  Phone,
  CalendarClock,
  Copy,
  Check,
  ShieldCheck,
  X,
} from "lucide-react";

type Props = {
  email?: string;
  phone?: string;
};

const DEFAULT_EMAIL = "contact@scalableweb.solutions";

const CHIP_OPTIONS = [
  "New site",
  "Redesign",
  "CRO / A/B",
  "Shopify",
  "Analytics",
  "Performance",
] as const;

export default function ContactSection({ email = DEFAULT_EMAIL }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggleChip = useCallback((c: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(c) ? next.delete(c) : next.add(c);
      return next;
    });
  }, []);

  const [copied, setCopied] = useState(false);
  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch { }
  }, [email]);

  const selectedList = useMemo(() => Array.from(selected), [selected]);

  const subject = useMemo(
    () => `Project inquiry — ${selectedList.join(", ") || "General"}`,
    [selectedList]
  );

  const body = useMemo(
    () =>
      `Hi Scalable team,

I'm interested in ${selectedList.join(", ") || "a new project"}.
A bit about us / goals:

- Current site / stack:
- Main KPI to improve:
- Timeline / budget range:

Thanks!`,
    [selectedList]
  );

  const mailtoHref = useMemo(() => {
    const q = new URLSearchParams({
      subject,
      body,
    }).toString();
    return `mailto:${email}?${q}`;
  }, [email, subject, body]);

  // modal & simple scheduler UX
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  const tz =
    typeof window !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "UTC";

  const days = useMemo(() => {
    const out: Date[] = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() + i);
      out.push(d);
    }
    return out;
  }, []);

  const fmtDay = useCallback((d: Date) => {
    return d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }, []);

  const times = useMemo(() => {
    const out: string[] = [];
    let mins = 9 * 60; // 09:00
    const end = 17 * 60; // 17:00
    while (mins <= end - 20) {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      out.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      mins += 30;
    }
    return out;
  }, []);

  const fmtISODateTime = useCallback((date: Date, time: string) => {
    const [h, m] = time.split(":").map(Number);
    const d = new Date(date);
    d.setHours(h, m, 0, 0);
    return d;
  }, []);

  const fmtPretty = useCallback(
    (date: Date, time: string) => {
      const dt = fmtISODateTime(date, time);
      return dt.toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    },
    [fmtISODateTime]
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (!selectedDate) setSelectedDate(days[0] ?? null);
  }, [open, selectedDate, days]);

  const mailtoConsult = useMemo(() => {
    if (!selectedDate || !selectedTime) return "#";
    const pretty = fmtPretty(selectedDate, selectedTime);
    const sub = `20-min consult — ${pretty} (${tz})`;
    const b = `Hi Scalable team,

I'd like to book a call.

Proposed time:
• ${pretty} (${tz})

Context: ${selectedList.join(", ") || "General"}

Thanks!`;
    const q = new URLSearchParams({ subject: sub, body: b }).toString();
    return `mailto:${email}?${q}`;
  }, [selectedDate, selectedTime, fmtPretty, tz, selectedList, email]);

  // ESC to close modal
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeModal]);

  // backdrop click close
  const onBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) closeModal();
    },
    [closeModal]
  );

  return (
    <section id="contact" className="relative z-[10000] w-full bg-[#0B0D14] py-10">
      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr] gap-8">
          <div className="rounded-2xl backdrop-blur p-6 md:p-8 bg-gray-900/20 border border-gray-700/30">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-medium text-white">Contact Us</h2>
                <p className="mt-2 text-gray-300">
                  One click and we'll take it from there. Avg reply time:{" "}
                  <span className="font-medium text-white">~1 hour</span>.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 rounded-full bg-emerald-900/30 text-emerald-300 px-3 py-1 text-sm border border-emerald-700/30">
                <ShieldCheck className="w-4 h-4" /> No spam. Ever.
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-800 text-white px-6 py-4 font-medium hover:bg-gray-700 active:scale-[0.99] transition border border-gray-600"
                href={mailtoHref}
                data-cta="contact_email_oneclick"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5" /> Email us
              </a>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c870ff] text-white px-6 py-4 font-medium hover:bg-[#b55eef] active:scale-[0.99] transition"
                onClick={openModal}
                data-cta="contact_book_consult"
                aria-haspopup="dialog"
                aria-expanded={open}
              >
                <CalendarClock className="w-5 h-5" /> Book a Call
              </button>
            </div>

            {/* Copy row */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1 rounded-xl border border-gray-600 bg-gray-800/50 px-4 py-3 text-gray-200">
                {email}
              </div>
              <button
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-600 bg-gray-800/30 text-gray-200 px-4 py-3 hover:bg-gray-700/50 active:scale-[0.99] transition"
                onClick={copyEmail}
                data-cta="contact_copy_email"
                aria-live="polite"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CALENDAR MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-[100000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          onClick={onBackdropClick}
        >
          <div className="relative w-full h-full sm:h-[400px] sm:max-w-4xl bg-white sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200">
            <button
              className="absolute top-3 right-3 inline-flex items-center gap-2 bg-gray-900 px-3 py-2 rounded-md text-white hover:bg-gray-800 z-10"
              onClick={closeModal}
              aria-label="Close"
            >
              <X className="w-4 h-4" /> Close
            </button>

            {/* Simple inline scheduler helpers (optional UI above iframe) */}
            <div className="hidden sm:block border-b border-gray-200 p-4">
              <div className="flex flex-wrap gap-3 items-center">
                {/* Days */}
                <div className="flex gap-2 overflow-x-auto">
                  {days.map((d, idx) => {
                    const active = selectedDate?.toDateString() === d.toDateString();
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDate(d)}
                        className={[
                          "px-3 py-1.5 rounded-full text-xs whitespace-nowrap border",
                          active
                            ? "bg-[#c870ff] text-white border-[#c870ff]"
                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50",
                        ].join(" ")}
                      >
                        {fmtDay(d)}
                      </button>
                    );
                  })}
                </div>

                {/* Times */}
                <div className="flex gap-2 ml-auto overflow-x-auto">
                  {times.map((t) => {
                    const active = selectedTime === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={[
                          "px-3 py-1.5 rounded-full text-xs whitespace-nowrap border",
                          active
                            ? "bg-indigo-100 text-indigo-800 border-indigo-300"
                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50",
                        ].join(" ")}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>

                <a
                  href={mailtoConsult}
                  className={[
                    "ml-auto inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
                    selectedDate && selectedTime
                      ? "bg-[#c870ff] text-white hover:bg-[#b55eef]"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed",
                  ].join(" ")}
                  aria-disabled={!selectedDate || !selectedTime}
                >
                  <Mail className="w-4 h-4" />
                  Email proposed time ({tz})
                </a>
              </div>
            </div>

            {/* Embedded Google Appointments */}
            <div className="flex-1 min-h-0">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ397Z41W23PqTONRXOh9M0daImk-unGhYlQqM37Cqj0Gc2pJQA398agJAhf8SWWWo_8fX1GaLKH?gv=true"
                style={{ border: 0, zIndex: "100" }}
                width="100%"
                height="100%"
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}