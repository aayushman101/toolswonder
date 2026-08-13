import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/layout/ThemeProvider";
import AdSenseScript from "@/components/ads/AdSenseScript";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://toolswonder.com"),
  title: {
    default: "ToolsWonder – Free Online Calculators, Converters & Tools",
    template: "%s | ToolsWonder",
  },
  description:
    "Free online calculators and tools for finance, agriculture, construction, and more. Accurate results, expert formulas, always free. No signup required.",
  keywords: [
    "online calculator",
    "free tools",
    "inflation calculator",
    "fertilizer calculator",
    "tile calculator",
    "unit converter",
    "finance tools",
    "construction calculator",
  ],
  authors: [{ name: "ToolsWonder" }],
  creator: "ToolsWonder",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolswonder.com",
    siteName: "ToolsWonder",
    title: "ToolsWonder – Free Online Calculators, Converters & Tools",
    description:
      "1000+ free online tools for finance, agriculture, construction, health, and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolsWonder - One Place for Every Useful Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolsWonder – Free Online Calculators & Tools",
    description: "1000+ free online tools for every need.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/png' },
      { url: '/icon', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
  verification: {
    google: "a6b7Ncm9HJyoPbAed9CNdAaY6D18tPp653WHn802sm8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="google-adsense-account" content="ca-pub-4076619037767871" />
      </head>
      <body className="flex min-h-screen flex-col bg-white dark:bg-gray-950" suppressHydrationWarning>
        <AdSenseScript />
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>

        {/* Google Analytics — replace with real ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KZQ9CPW343" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KZQ9CPW343');
            `,
          }}
        />
      </body>
    </html>
  );
}
