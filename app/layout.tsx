import type { Metadata } from "next";
import { Inter, Fraunces, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-instrument", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Learn — sinhaankur",
  description:
    "Understand the code AI wrote for me — this website, Vera, the rag-engine, the games — read line by line, from a C/C++ and HTML starting point. A learning tool built to grow into.",
  metadataBase: new URL("https://learn.sinhaankur.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} ${instrument.variable} ${jetbrains.variable}`}>
        {children}
      </body>
    </html>
  );
}
