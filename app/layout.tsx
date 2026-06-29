import type { Metadata } from "next";
import { Faculty_Glyphic, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const facultyGlyphic = Faculty_Glyphic({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vendora — Luxury Fragrances",
  description:
    "Vendora — Let captivating fragrances define your confident, vibrant lifestyle. Discover luxury perfumes and premium scents.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${facultyGlyphic.variable} ${poppins.variable}`}>
      <body className="font-body bg-white text-body antialiased">
        <Providers>
          <AnnouncementBar />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
