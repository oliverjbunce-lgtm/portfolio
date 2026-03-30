const projects = {
  "door-ai": {
    title: "Door AI — Floor Plan Analysis",
    description: "AI system using YOLOv8 computer vision to read building floor plans and auto-detect door types. Replaced a 2-day manual process with 30 seconds for Independent Doors NZ.",
  },
  "basketball-nz": {
    title: "Basketball New Zealand",
    description: "Digital presence and web strategy for New Zealand's national basketball body.",
  },
  "global-dairy-trade": {
    title: "Global Dairy Trade",
    description: "Enterprise web strategy for the world's leading dairy commodity platform.",
  },
  "round-the-bays": {
    title: "Round the Bays",
    description: "Web design and digital marketing for NZ's most iconic fun run event.",
  },
  "summer-of-tech": {
    title: "Summer of Tech",
    description: "Web design and digital systems for New Zealand's leading tech internship programme.",
  },
};

export function generateMetadata({ params }) {
  const p = projects[params.slug];
  if (!p) return {};
  return {
    title: `${p.title} | Oliver Bunce`,
    description: p.description,
    alternates: { canonical: `https://oliverbunce.com/projects/${params.slug}` },
    openGraph: {
      title: `${p.title} | Oliver Bunce`,
      description: p.description,
      url: `https://oliverbunce.com/projects/${params.slug}`,
    },
  };
}
