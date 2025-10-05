import Link from "next/link";
import TiltStatsCard from "./reuasble/TiltStatsCard";

function scrollToId(id: string) {
    return () => {
        if (typeof window === "undefined") return;
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
}

export default function Hero() {
    // SSR-friendly: content renders on the server; interactive bits (tilt, countup) hydrate client-side.
    return (
        <section className="relative z-20 w-full min-h-screen flex items-center md:mt-5 mt-10 pb-5">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] items-center gap-12">
                    {/* Left */}
                    <div>
                        <h2 className="text-4xl md:text-[48px] font-medium leading-tight">
                            We{" "}
                            <span className="bg-gradient-to-r from-[#32155c] via-[#c870ff] to-[#32155c] text-transparent bg-clip-text font-semibold">
                                transform
                            </span>{" "}
                            your{" "}
                            <span className="bg-gradient-to-r from-[#32155c] via-[#c870ff] to-[#32155c] text-transparent bg-clip-text font-semibold">
                                store
                            </span>{" "}
                            into a{" "}
                            <span className="bg-gradient-to-r from-[#32155c] via-[#c870ff] to-[#32155c] text-transparent bg-clip-text font-semibold">
                                scalable
                            </span>{" "}
                            <span className="bg-gradient-to-r from-[#32155c] via-[#c870ff] to-[#32155c] text-transparent bg-clip-text font-semibold">
                                growth engine
                            </span>
                        </h2>

                        <p className="mt-4 text-gray-700 max-w-xl">
                            Turning high-intent traffic into lifetime customers to give Shopify brands the{" "}
                            <b>clarity</b>, <b>control</b>, and <b>compounding revenue</b> streams that create{" "}
                            <b>category leaders</b>.
                        </p>

                        <div className="flex gap-2 items-center pt-[10px]">
                            <span className="bg-green-500 size-3 rounded-full block animate-pulse" />
                            <span className="uppercase text-sm">Accepting new clients</span>
                        </div>

                        <button
                            className="bg-[#1D2939] text-white px-5 py-3 w-full rounded-full mt-5 hover:scale-105 transition-all"
                        >
                            <span className="text-lg">Free 20-minute consultation</span>
                        </button>
                    </div>

                    {/* Right (tilt + stats) */}
                    <TiltStatsCard />
                </div>
            </div>
        </section>
    );
}