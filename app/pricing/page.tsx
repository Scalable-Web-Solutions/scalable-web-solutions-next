// app/pricing/page.tsx
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

// ---------- SEO ----------
export const metadata: Metadata = {
  title: "Pricing — Scalable",
};

// ---------- Types ----------
type Billing = "monthly" | "annually";

// ---------- Data ----------
const plan = {
  name: "RPV Growth",
  badge: "Most popular",
  highlight: true,
  description: "For brands ready to scale & optimize conversions.",
  prices: { monthly: 10000 as number | null, annually: null as number | null },
  cta: "Get Started",
  datacta: "premium_pkg",
  features: [
    "Trust building layout",
    "Data backed A/B testing",
    "RPV optimization",
    "Advanced analytics dashboard",
    "Cancel anytime",
    "No hidden fees",
    "Dedicated account manager",
  ],
};

function fmt(n: number | null) {
  return n === null ? "Custom" : `$${n.toLocaleString()}`;
}

function computePriceLabel(billing: Billing, price: number | null) {
  if (price === null) return "";
  return billing === "monthly"
    ? "billed monthly"
    : "per month — total billed annually";
}

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ billing?: Billing }>;
}) {
  const resolvedSearchParams = await searchParams;
  const hasAnnual = plan.prices.annually !== null;

  // SSR billing selection via query param (defaults to 'monthly')
  const billing: Billing =
    hasAnnual && (resolvedSearchParams.billing === "annually" || resolvedSearchParams.billing === "monthly")
      ? resolvedSearchParams.billing
      : "monthly";

  const price =
    billing === "monthly" ? plan.prices.monthly : plan.prices.annually;

  const priceLabel = computePriceLabel(billing, price);

  // Prebuild URLs for SSR "toggle"
  const basePath = "/pricing";
  const monthlyHref = `${basePath}?billing=monthly`;
  const annuallyHref = `${basePath}?billing=annually`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0D14]">
      <div className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[#c870ff]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#c870ff]/15 blur-3xl" />

      <main className="mx-auto max-w-7xl px-6 pt-28 pb-20">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Simple, flat-rate{" "}
            <span className="bg-gradient-to-r from-white via-[#c870ff] to-white text-transparent bg-clip-text">
              pricing
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300 text-lg">
            RPV growth with data-backed A/B testing, trust building layouts, and{" "}
            <b className="text-white">deep</b> analytics.
            <br />
            <b className="text-white">Cancel anytime</b>, <b className="text-white">no hidden fees</b>, and{" "}
            <b className="text-white">a dedicated account manager</b>.
          </p>

          {/* Billing toggle (SSR via links) */}
          {hasAnnual && (
            <div className="mt-8 inline-flex items-center rounded-full bg-gray-800/80 backdrop-blur border border-gray-600 p-1 shadow-sm">
              <Link
                href={monthlyHref}
                className="rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition data-[active=true]:bg-[#c870ff] data-[active=true]:text-white"
                data-active={billing === "monthly"}
              >
                Monthly
              </Link>
              <Link
                href={annuallyHref}
                className="rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition data-[active=true]:bg-[#c870ff] data-[active=true]:text-white"
                data-active={billing === "annually"}
              >
                Annually
              </Link>
            </div>
          )}
        </section>

        {/* Trust mini-bar */}
        <section className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#c870ff]" /> 14-day average turnaround
          </span>
          <span className="h-1 w-1 rounded-full bg-gray-600" />
          <span>No long-term contracts</span>
          <span className="h-1 w-1 rounded-full bg-gray-600" />
          <span>Cancel anytime</span>
        </section>

        {/* Single pricing card */}
        <section className="mt-12 max-w-3xl mx-auto">
          <article
            className={`group relative rounded-3xl p-[1px] ${
              plan.highlight
                ? "bg-gradient-to-b from-[#c870ff]/50 to-[#c870ff]/20"
                : "bg-gradient-to-b from-gray-700 to-gray-800"
            } shadow-xl`}
            aria-label={`${plan.name} plan`}
          >
            <div className="flex h-full flex-col rounded-[calc(theme(borderRadius.3xl)-1px)] bg-gray-900/90 backdrop-blur border border-gray-700 p-7">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                {plan.badge && (
                  <span className="rounded-full bg-[#c870ff] px-3 py-1 text-xs font-medium text-white shadow-sm">
                    {plan.badge}
                  </span>
                )}
              </div>

              <p className="mt-2 text-gray-300">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">{fmt(price)}</span>
                <span className="text-gray-400">{priceLabel}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-gray-200">
                    <Check className="h-5 w-5 text-[#c870ff] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="mailto:contact@scalablewebsolutions.com"
                data-cta={plan.datacta}
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-medium transition ${
                  plan.highlight
                    ? "bg-[#c870ff] text-white hover:bg-[#b55eef]"
                    : "border border-gray-600 text-gray-200 hover:bg-[#c870ff] hover:text-white hover:border-[#c870ff]"
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        </section>

        {/* Secondary CTA */}
        <section className="mt-16 text-center">
          <p className="text-gray-300">
            Not sure which fit is best? We’ll recommend one in a 10-minute call.
          </p>
          <Link
            href="/#contact"
            className="mt-4 inline-block rounded-full border border-gray-600 px-5 py-3 text-gray-200 hover:bg-[#c870ff] hover:text-white hover:border-[#c870ff] transition"
          >
            Contact Us
          </Link>
        </section>

        {/* Tiny FAQ */}
        <section className="mt-14 grid gap-4 md:max-w-3xl md:mx-auto">
          <details className="group rounded-2xl border border-gray-700 bg-gray-900/80 p-5">
            <summary className="cursor-pointer list-none font-medium text-white">
              Why Scalable Web Solutions?
            </summary>
            <p className="mt-3 text-gray-300">
              We help businesses grow by providing the tools and support they
              need to succeed. Our team of experts are here to help you every
              step of the way.
            </p>
          </details>
          <details className="group rounded-2xl border border-gray-700 bg-gray-900/80 p-5">
            <summary className="cursor-pointer list-none font-medium text-white">
              Yearly vs. Monthly
            </summary>
            <p className="mt-3 text-gray-300">
              We offer both monthly and annual plans. The monthly plan is a
              great way to get started, and the annual plan is a great way to
              save money.
            </p>
          </details>
        </section>
      </main>
    </div>
  );
}
