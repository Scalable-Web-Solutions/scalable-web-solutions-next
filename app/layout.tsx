import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import sws from '@/public/sws.png'
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import SmoothScroll from "@/components/SmoothScroll";

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  subsets: ["latin"],
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Scalable Web Solutions",
  description: "Scalable Web Solutions - Scale your E-commerce platform with ease. Say no to hassle and let us handle the rest.",
  authors: [{ name: "Scalable Web Solutions, LLC" }],
  keywords: "Scalable Web Solutions, E-commerce, Scalability, Web Development, Technology",
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/sws.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/sws.png',
    apple: '/sws.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/sws.png',
      },
    ],
  },
};

export default function RootLayout(
  
{
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

{
  return (
    <html className={poppins.variable} lang="en">
      <body
        className={`${poppins.className} antialiased bg-[#0B0D14]`}
      >
        <SmoothScroll/>
        <Navbar logo={sws.src} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
