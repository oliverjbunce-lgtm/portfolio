import "./globals.css";

export const metadata = {
  title: "Oliver Bunce — Web Designer, Developer & AI Builder",
  description: "Oliver Bunce is a New Zealand-based web designer, developer, digital marketer and AI workflow builder helping businesses grow their digital presence.",
  keywords: "web design New Zealand, web developer NZ, AI automation, digital marketing, Oliver Bunce",
  openGraph: {
    title: "Oliver Bunce — Web Designer, Developer & AI Builder",
    description: "Premium web design, AI automation, and digital marketing for NZ businesses.",
    url: "https://oliverbunce.com",
    siteName: "Oliver Bunce",
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oliver Bunce — Web Designer, Developer & AI Builder",
    description: "Premium web design, AI automation, and digital marketing for NZ businesses.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans antialiased">{children}</body>
    </html>
  );
}
