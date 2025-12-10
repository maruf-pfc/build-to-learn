import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "../providers/providers";
import RootProvider from "@/providers/RootProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ==========================
//        SEO METADATA
// ==========================
export const metadata = {
  title: {
    default: "Build to Learn — Modern LMS Platform",
    template: "%s | Build to Learn",
  },

  description:
    "Build to Learn is a modern, full-featured LMS designed for Bangladeshi students and instructors. Create courses, manage tasks, monitor progress, and grow your learning community.",
  
  keywords: [
    "LMS Bangladesh",
    "online learning platform",
    "Bangladesh education",
    "e-learning",
    "course management",
    "Build to Learn",
  ],

  authors: [{ name: "Build to Learn Team" }],

  creator: "Build to Learn",
  publisher: "Build to Learn",

  metadataBase: new URL("https://build-to-learn.vercel.app"),

  alternates: {
    canonical: "https://build-to-learn.vercel.app",
  },

  openGraph: {
    title: "Build to Learn — Modern LMS Platform",
    description:
      "A powerful e-learning system built for Bangladeshi creators, instructors, and students.",
    url: "https://buildtolearn.xyz",
    siteName: "Build to Learn",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Build to Learn LMS Platform",
      },
    ],
    locale: "en_BD",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Build to Learn — Modern LMS Platform",
    description:
      "A powerful LMS and e-learning system for Bangladeshi students.",
    images: ["/og-image.png"],
    creator: "@buildtolearn",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },

  themeColor: "#4f46e5",
  colorScheme: "light",

  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// ==========================
//        ROOT LAYOUT
// ==========================
export default function RootLayout({ children }) {
  return (
    <html lang="en-BD">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <Providers>
          <RootProvider>{children}</RootProvider>
        </Providers>
      </body>
    </html>
  );
}
