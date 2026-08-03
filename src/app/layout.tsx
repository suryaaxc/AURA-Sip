import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteProvider } from "@/components/SiteContext";
import CustomCursor from "@/components/CustomCursor";
import NavBar from "@/components/NavBar";
import ReserveModal from "@/components/ReserveModal";

const displayFont = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURA-SIP — Organic Botanicals & Fermented Tonic",
  description:
    "AURA-SIP is an ultra-luxury fermented botanical tonic. A ritual in a bottle — citrus, mint, and adaptogenic calm.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="font-sans antialiased">
        <SiteProvider>
          <CustomCursor />
          <NavBar />
          {children}
          <ReserveModal />
        </SiteProvider>
      </body>
    </html>
  );
}
