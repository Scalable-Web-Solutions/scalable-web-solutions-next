"use client";

import { useState } from "react";

type Item = {
    image: string;
    link: string;
    title: string;
    description?: string;
};

export default function PartnerLogos({ items }: { items: Item[] }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    return (
        <section className="bg-[#13161f]">
            <div className="mx-auto max-w-6xl px-6 py-16">
                <div className="mx-auto mb-10 flex w-full flex-col items-center text-center">
                    <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                        Trusted by industry leaders
                    </span>
                    <h2 className="text-2xl font-semibold text-white md:text-3xl">
                        Partners & Platforms
                    </h2>
                    <p className="mt-3 text-sm text-white/60 max-w-md">
                        We integrate and ship with the tools your brand already runs on.
                    </p>
                </div>

                <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {items.map((i, index) => (
                        <li key={i.title} className="flex items-center justify-center">
                            <a
                                href={i.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                  group relative flex h-auto py-4 w-full select-none
                                  items-center justify-center rounded-xl border border-white/10
                                  bg-white/[0.03] px-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
                                  ring-1 ring-transparent transition-all duration-200
                                  hover:bg-white/[0.08] hover:ring-white/20 hover:scale-105
                                "
                                aria-label={i.title}
                                title={i.description ?? i.title}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <img
                                    src={i.image}
                                    alt={i.title}
                                    className={`
                                        size-[100px] max-w-full object-contain
                                        opacity-60 transition-all duration-200
                                        group-hover:opacity-90 group-hover:scale-110
                                        ${hoveredIndex === index ? 'animate-pulse-grayscale' : ''}
                                    `}
                                    style={{
                                        filter: hoveredIndex === index ? undefined : 'grayscale(1)'
                                    }}
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes pulse-grayscale {
                        0%, 100% { 
                            filter: grayscale(1);
                        }
                        50% { 
                            filter: grayscale(0);
                        }
                    }
                    
                    .animate-pulse-grayscale {
                        animation: pulse-grayscale 1.5s ease-in-out infinite;
                    }
                `
            }} />
        </section>
    );
}
