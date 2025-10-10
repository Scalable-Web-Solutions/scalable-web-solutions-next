import TiltStatsCard from "./reuasble/TiltStatsCard";
import ClientOnly from "./reuasble/ClientOnly";
import { HeroButton } from "./reuasble/HeroButton";
import AvailabilityStatus from "./reuasble/AvailabilityStatus";

export default function Hero() {
    // SSR-friendly: content renders on the server; interactive bits (tilt, countup) hydrate client-side.
    return (
        <section className="relative z-20 w-full min-h-[100vh] flex items-center md:mt-10 mt-[-17px] bg-[#0B0D14] text-white overflow-hidden">
            {/* Ambient gradient blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top left purple blob */}
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-600/20 via-violet-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
                
                {/* Top right blue blob */}
                <div className="absolute -top-20 -right-32 w-96 h-96 bg-gradient-to-bl from-blue-500/15 via-indigo-600/8 to-transparent rounded-full blur-3xl" />
                
                {/* Bottom left pink blob */}
                <div className="absolute -bottom-32 -left-20 w-72 h-72 bg-gradient-to-tr from-pink-500/12 via-purple-400/8 to-transparent rounded-full blur-3xl" />
                
                {/* Center right accent */}
                <div className="absolute top-1/2 -right-20 w-64 h-64 bg-gradient-to-l from-[#c870ff]/10 via-violet-600/5 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
                
                {/* Bottom center subtle glow */}
                <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-indigo-500/8 to-transparent rounded-full blur-3xl" />
            </div>

            <div
    className="pointer-events-none absolute inset-0 -z-10"
    style={{
      background:
        "radial-gradient(120% 90% at 60% -10%, rgba(15,18,26,0) 0%, rgba(15,18,26,0.65) 50%, rgba(11,13,20,1) 80%)",
    }}
  />

  <div
    className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
    }}
  />
            
            <div className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] items-center gap-12">
                    <div>
                        <h2 className="text-[34px] md:text-[48px] font-medium tracking-[-0.01em] leading-[1.05]">
                            We transform your store into <span className="text-[#c870ff]">a scalable growth engine.</span>
                        </h2>

                        <p className="mt-4 text-gray-300 max-w-[60ch]">
                            <span className="hidden md:inline">Turning</span> <span className="md:hidden">Helping Shopify brands turn </span> high-intent traffic into lifetime customers<span className="md:hidden">, one test at a time.</span>

                            <span className="md:inline hidden">
                                {" "}to give Shopify brands the{" "}
                                <b>clarity</b>, <b>control</b>, and <b>compounding revenue</b> streams that create{" "}
                                <b>category leaders</b>.
                            </span>
                        </p>

                        <AvailabilityStatus />
                        <ClientOnly>
                            <HeroButton />
                        </ClientOnly>
                    </div>

                    {/* Right (tilt + stats) */}
                    <TiltStatsCard />
                </div>
            </div>
        </section>
    );
}