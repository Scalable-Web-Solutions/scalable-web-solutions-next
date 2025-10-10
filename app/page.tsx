import ShineSplash from "../components/LoadingAnimation";
import Hero from "../components/Hero";
import ContactSection from "../components/Contact";
import ProcessSection from "@/components/ProcessSection";
import { Book, FlaskConical, Globe, Repeat, Search, ShieldCheck, Users } from "lucide-react";
import PartnerLogos from "@/components/PartnerLogos";

export default function Home() {

  const items = [
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw2AVQT86t0lmeV5rJ8-t-JDAsGiX4nG6lFAomAtT8ALPNacTPMBstG66UXGgfIuC_Ew0&usqp=CAU',
      link: 'https://www.klaviyo.com/',
      title: 'Klaviyo',
      description: 'Partnered with Klaviyo.'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGluJhW7I1NYU7jF77E-9K9I46_ib_DUNHw&s',
      link: 'https://stripe.com',
      title: 'Stripe',
      description: 'Partnered with Stripe.'
    },
    {
      image: 'https://cdn.shopify.com/app-store/listing_images/63fb68ea6dcc0f2694c656e6dd5a895f/icon/CMeOqL2y3Y8DEAE=.png',
      link: 'https://intelligems.io/',
      title: 'Intelligems',
      description: 'Partnered with Intelligems.'
    },
    {
      image: 'https://ultimatemember.com/wp-content/uploads/edd/2025/02/woo-logo.png',
      link: 'https://woocommerce.com/',
      title: 'Woo',
      description: 'Partnered with WooCommerce.'
    },
    {
      image: 'https://cdn.worldvectorlogo.com/logos/shopify.svg',
      link: 'https://shopify.com',
      title: 'Shopify',
      description: 'Partnered with Shopify.'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQdGKVSorFbqB6xbrzYz3Zvueic3pWjIqhT_XqoYZWyaGWFTMOM_RF_IXF4MFteMDNf1s&usqp=CAU',
      link: 'https://bigcommerce.com',
      title: 'Big Commerce',
      description: "big"
    }
  ];

  return (
    <div className="relative min-h-screen w-full">
      <ShineSplash text="Scalable" />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-[#EBEEFA]"></div>
        <div className="absolute z-[1] right-[-140px] top-1/3 w-[620px] h-[620px] bg-indigo-300/30 blur-[120px] rounded-full"></div>
        <div className="absolute z-[1] left-[-160px] bottom-[12%] w-[520px] h-[520px] bg-fuchsia-300/30 blur-[120px] rounded-full"></div>
        <div className="absolute z-[1] right-[15%] top-[-120px] w-[420px] h-[420px] bg-purple-300/25 blur-[110px] rounded-full"></div>
      </div>
      <Hero />
      <PartnerLogos items={items} />
      <ProcessSection
        id="how-we-do-it"
        disableBelowPx={900}
        snap
        steps={[
          {
            title: "Phase 1: Research",
            body: "We start by doing macro and micro research on your market vertical to ensure we have an understanding for the specific industry you work in.",
            kpi: "Built ICP within 30 days",
            icon: <Search className="w-10 h-10 text-white/90" />,
          },
          {
            title: "Phase 2: Testing",
            body: "We start by rolling small A/B tests to figure out what works for your specific site. Tests occur every week.",
            kpi: "Varies based on the test size.",
            icon: <FlaskConical className="w-10 h-10 text-white/90" />,
          },
          {
            title: "Phase 3: Prove",
            body: "Once results are validated, we roll out more tests that are data-backed and proven to increase KPI's.",
            kpi: "Improved KPI's",
            icon: <Book className="w-10 h-10 text-white/90" />,
          },
          {
            title: "Phase 4: Refine and Repeat",
            body: "Growth is a cycle. We feed every proven win back into updated buyer profiles, sharper GTM strategy, and tailored customer journeys that ensure they are repeat buyers.",
            kpi: "Improved KPI's",
            icon: <Repeat className="w-10 h-10 text-white/90" />,
          },
        ]}
        className="bg-[#0B0D14]"
      />
      <ContactSection />
    </div>
  );
}
