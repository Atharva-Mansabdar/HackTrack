import type { Metadata } from "next";
import { Courier_Prime, Syne } from "next/font/google";
import "./globals.css";

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

const syne = Syne({
  weight: ["800"],
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "HackTrack — Find Every Hackathon",
  description: "One place for all upcoming hackathons. Updated daily from Devpost and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${courierPrime.variable} ${syne.variable} h-full`}>
      <body className="h-full antialiased" style={{ fontFamily: "var(--font-body)" }}>
        {children}
      </body>
    </html>
  );
}
