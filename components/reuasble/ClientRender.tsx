"use client";

import dynamic from "next/dynamic";

// Keep types local to avoid importing from a Server Component:
export type Step = {
  id: number;
  tag: string;
  title: string;
  body: string;
  icon: "globe" | "shield" | "users";
};

type Props = {
  steps: Step[];
  hostSelector?: string;
};

const AboutCarousel = dynamic(() => import("../AboutCarousel.client"), {
  ssr: false,
  loading: () => null,
});

export default function ClientRender(props: Props) {
  return <AboutCarousel {...props} />;
}
