import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import ThemeToggle from "./components/ThemeToggle";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MSH Sounds - Car Audio Fittment",
    template: "%s | MSH Sounds",
  },
  description: "Professional car audio installation and sound system services in Mamelodi, Gauteng. Transform your driving experience with premium sound quality.",
  keywords: ["car audio", "car sound system", "subwoofer installation", "car audio fitment", "Mamelodi", "Gauteng", "South Africa"],
  authors: [{ name: "MSH Sounds" }],
  creator: "MSH Sounds",
  metadataBase: new URL("https://mshsounds.co.za"),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://mshsounds.co.za",
    siteName: "MSH Sounds",
    title: "MSH Sounds - Car Audio Fittment",
    description: "Professional car audio installation and sound system services in Mamelodi, Gauteng.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MSH Sounds - Professional Car Audio Installation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MSH Sounds - Car Audio Fittment",
    description: "Professional car audio installation and sound system services in Mamelodi, Gauteng.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${lato.variable} antialiased min-h-screen flex flex-col`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>
          <ThemeToggle />
          <Navbar />
          <main id="main-content" className="flex-grow">{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
