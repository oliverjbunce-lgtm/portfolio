import "./globals.css";

const siteUrl = "https://oliverbunce.com";
const title = "Oliver Bunce — AI Automation, Web Design & Digital Systems | New Zealand";
const description =
  "Oliver Bunce builds custom AI systems, websites, and digital marketing tools for NZ businesses. Specialising in AI automation, computer vision, web design, and lead generation. 60+ clients across New Zealand.";

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
        alt: "Oliver Bunce — AI Automation & Web Design NZ",
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
  other: {
    "google-site-verification": "",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-NZ">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Oliver Bunce",
              url: siteUrl,
              jobTitle: "AI Automation Specialist & Web Designer",
              description:
                "Oliver Bunce is a New Zealand-based AI systems builder, web designer, and digital marketer helping businesses automate workflows and grow online.",
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
              sameAs: [
                "https://github.com/oliverjbunce-lgtm",
              ],
              offers: {
                "@type": "Offer",
                description:
                  "Custom AI systems, web design, and digital marketing for New Zealand businesses.",
              },
            }),
          }}
        />
      </head>
      <body className="bg-white text-gray-900 font-sans antialiased">{children}</body>
    </html>
  );
}
