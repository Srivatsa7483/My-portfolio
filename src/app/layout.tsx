import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Srivas — Creative Developer & Interface Designer",
  description: "Creative developer portfolio specializing in bespoke web experiences, fluid motion, and high-performance interactive interfaces.",
  keywords: ["creative developer", "web designer", "react", "next.js", "gsap", "lenis", "smooth scroll", "frontend engineer"],
  authors: [{ name: "Srivas" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceGrotesk.variable} h-full scroll-smooth antialiased`}
    >
      <body className="bg-[#080808] text-[#F5F5F7] font-sans min-h-full flex flex-col selection:bg-red-500 selection:text-white overflow-x-hidden">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
