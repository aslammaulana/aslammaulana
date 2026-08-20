import type { Metadata } from "next";
import { Geist, Geist_Mono, Croissant_One } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/theme/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const krinkes = localFont({
  src: "../font/KrinkesRegular.ttf",
  variable: "--font-krinkes",
  display: "swap",
});

const croissantOne = Croissant_One({
  weight: "400",
  variable: "--font-croissant",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aslam Maulana — Ai Web Developer",
  description:
    "Crafting meaningful digital experiences that move your business forward. Portfolio of Aslam Maulana, Front-End Developer & CMS Specialist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${krinkes.variable} ${croissantOne.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
