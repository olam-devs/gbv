import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const revalidate = 60;

export const metadata: Metadata = {
  title: {
    default: "PASADA Tanzania | Care, Hope & Community Impact",
    template: "%s | PASADA Tanzania",
  },
  description:
    "PASADA (T) provides quality, caring, compassionate services and support to people infected and affected by HIV and AIDS in Tanzania—prioritizing the poorest and neediest through a holistic approach.",
  metadataBase: new URL("https://pasada.or.tz"),
  openGraph: {
    title: "PASADA Tanzania",
    description:
      "Care, hope, and community impact—supporting people infected and affected by HIV and AIDS in Tanzania.",
    type: "website",
  },
  icons: [{ rel: "icon", url: "/brand/logo.jpg" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-950 selection:bg-emerald-200/70 selection:text-emerald-950">
        {children}
      </body>
    </html>
  );
}
