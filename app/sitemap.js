export default function sitemap() {
  const base = "https://oliverbunce.com";
  const projects = [
    "door-ai",
    "basketball-nz",
    "global-dairy-trade",
    "round-the-bays",
    "summer-of-tech",
  ];

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/start`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((slug) => ({
      url: `${base}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
