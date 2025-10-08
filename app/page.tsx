import ShineSplash from "../components/LoadingAnimation";
import Hero from "../components/Hero";
import PartnerStrip, { LogoLoop } from "../components/PartnerStrip";
import AboutSection from "../components/AboutSection.server";
import Research from "../components/engine/Research";
import Test from "../components/engine/Test";
import Prove from "../components/engine/Prove";
import Refine from "../components/engine/Refine";
import SeamlessPager from "../components/reuasble/SeamlessPager";
import ContactSection from "../components/Contact";

export default function Home() {
  const imageLogos = [
  {
    src: "https://play-lh.googleusercontent.com/aPsA6vS25mrocOJqZhTZyxm7sntS_IZuHh4oLBI6v-70A_mLV0Fe0spqSDTbK_Fy8As",
    alt: "WooCommerce",
    href: "https://woocommerce.com/",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYZyqmtqSYlC6DpFKfKYxy4bw_N8Itrv3wFg&s",
    alt: "BigCommerce",
    href: "https://www.bigcommerce.com/",
  },
  {
    src: "https://play-lh.googleusercontent.com/lQYxSdISBENwWO7RCF1j_AzjzdOaa1LUgRckYPFVvDkSWdD8P6jqCZebmAyZfufGpIY",
    alt: "Shopify",
    href: "https://www.shopify.com/",
  },
  {
    src: "https://static.wixstatic.com/media/2293e6_da97e8ea3719441d97b3b47e4b2d7534~mv2.png",
    alt: "Klaviyo",
    href: "https://klaviyo.com/",
  },
  {
    src: "https://cdn.iconscout.com/icon/free/png-256/free-stripe-logo-icon-svg-download-png-2945188.png",
    alt: "Stripe",
    href: "https://stripe.com/",
  },
  {
    src: "https://cdn.shopify.com/app-store/listing_images/63fb68ea6dcc0f2694c656e6dd5a895f/icon/CMeOqL2y3Y8DEAE=.png",
    alt: "Intelligems",
    href: "https://www.intelligems.io/",
  },
];

const sections = [
    <Research key="0" />,
    <Test key="1" />,
    <Prove key="2" />,
    <Refine key="3" />,
  ];

  return (
    <div className="relative min-h-screen w-full">
      <ShineSplash text="Scalable"/>

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-[#EBEEFA]"></div>
        <div className="absolute z-[1] right-[-140px] top-1/3 w-[620px] h-[620px] bg-indigo-300/30 blur-[120px] rounded-full"></div>
        <div className="absolute z-[1] left-[-160px] bottom-[12%] w-[520px] h-[520px] bg-fuchsia-300/30 blur-[120px] rounded-full"></div>
        <div className="absolute z-[1] right-[15%] top-[-120px] w-[420px] h-[420px] bg-purple-300/25 blur-[110px] rounded-full"></div>
      </div>
      <div className="mt-15">
        <Hero/>
      </div>
      <div className="pb-10 -mt-10">
        <h1 className="md:text-3xl text-xl text-center font-semibold py-4">Partnered with brands you know</h1>
        <LogoLoop
        logos={imageLogos}
        speed={38}
        direction="left"
        logoHeight={65}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff00"
        ariaLabel="Technology partners"
      />
      </div>
      <AboutSection/>
      <SeamlessPager 
        id="growth-engine-pager"
        className="w-screen z-0 bg-gray-100" 
        sections={sections} 
        transition="slide" 
        stiffness={0.1} 
        gain={2} 
        releaseOverlapRatio={2.6}
      />
      <ContactSection/>
    </div>
  );
}
