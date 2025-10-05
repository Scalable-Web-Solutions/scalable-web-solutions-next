import Image from "next/image";
import ShineSplash from "./components/LoadingAnimation";
import Hero from "./components/Hero";
import PartnerStrip from "./components/PartnerStrip";
import AboutSection from "./components/AboutSection";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <ShineSplash text="Scalable"/>

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-[#EBEEFA]"></div>
        <div className="absolute z-[1] right-[-140px] top-1/3 w-[620px] h-[620px] bg-indigo-300/30 blur-[120px] rounded-full"></div>
        <div className="absolute z-[1] left-[-160px] bottom-[12%] w-[520px] h-[520px] bg-fuchsia-300/30 blur-[120px] rounded-full"></div>
        <div className="absolute z-[1] right-[15%] top-[-120px] w-[420px] h-[420px] bg-purple-300/25 blur-[110px] rounded-full"></div>
      </div>
      <Hero/>
      <PartnerStrip/>
      <AboutSection/>
    </div>
  );
}
