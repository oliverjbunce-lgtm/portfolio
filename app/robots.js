export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://oliverbunce.com/sitemap.xml",
    host: "https://oliverbunce.com",
  };
}
