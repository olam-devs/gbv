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
    default: "GI-Desk | Stop Gender-Based Violence in Tanzania",
    template: "%s | GI-Desk",
  },
  description:
    "GI-Desk (Gender Based and Intimate) is a nonpartisan, nonreligious non-profit supporting survivors of gender-based and intimate partner violence in Tanzania.",
  metadataBase: new URL("https://gbvdesk.org"),
  openGraph: {
    title: "GI-Desk — Stop Violence",
    description:
      "Supporting survivors of gender-based and intimate partner violence in Tanzania.",
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
      <body className="min-h-full flex flex-col bg-[var(--background)] text-zinc-950 selection:bg-violet-200/70 selection:text-violet-950">
        {children}
      </body>
    </html>
  );
}
