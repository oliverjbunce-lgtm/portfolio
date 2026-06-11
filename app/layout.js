import "./globals.css";
import { Inter, Instrument_Serif } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const siteUrl = "https://oliverbunce.com";
const title = "Oliver Bunce — Web Designer, AI Builder & Digital Marketer | New Zealand";
const description =
  "Oliver Bunce builds websites, AI systems, and digital marketing strategies for businesses worldwide. 60+ clients. New Zealand based.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Oliver Bunce",
  },
  description,
  keywords: [
    "AI automation New Zealand",
    "AI systems NZ",
    "AI developer New Zealand",
    "custom AI solutions NZ",
    "AI workflow builder",
    "machine learning New Zealand",
    "computer vision NZ",
    "web design New Zealand",
    "web developer NZ",
    "Next.js developer New Zealand",
    "digital marketing NZ",
    "AI for business New Zealand",
    "Oliver Bunce",
    "AI floor plan analysis",
    "lead generation NZ",
    "conversion optimisation New Zealand",
  ],
  authors: [{ name: "Oliver Bunce", url: siteUrl }],
  creator: "Oliver Bunce",
  publisher: "Oliver Bunce",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: siteUrl,
    siteName: "Oliver Bunce",
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Oliver Bunce — Web Designer & AI Builder, New Zealand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
    creator: "@oliverbunce",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-NZ" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Oliver Bunce",
              url: siteUrl,
              jobTitle: "Web Designer, AI Builder & Digital Marketer",
              description:
                "Oliver Bunce is a New Zealand-based web designer, AI systems builder, and digital marketer helping businesses grow online.",
              knowsAbout: [
                "AI Automation",
                "Machine Learning",
                "Computer Vision",
                "Web Design",
                "Next.js",
                "Digital Marketing",
                "Lead Generation",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "NZ",
                addressRegion: "Wellington",
              },
              sameAs: ["https://github.com/oliverjbunce-lgtm"],
              offers: {
                "@type": "Offer",
                description:
                  "Custom AI systems, web design, and digital marketing for businesses worldwide.",
              },
            }),
          }}
        />
      </head>
      <body
        className="antialiased"
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          backgroundColor: "#FAFAF7",
          color: "#0A0A0A",
        }}
      >
        {children}
      </body>
    </html>
  );
}
