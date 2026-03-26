"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const projects = {
  "door-ai": {
    title: "Door AI",
    client: "Independent Doors",
    location: "Christchurch, New Zealand",
    category: "AI / Computer Vision",
    year: "2024–2025",
    tags: ["AI", "Computer Vision", "Python", "React"],
    heroImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
    summary: "An AI system that reads architectural floor plans and automatically detects, classifies, and counts every door — outputting a complete quote in under 30 seconds.",
    challenge: "Independent Doors' estimators were spending 1–2 full days manually reviewing floor plans for every large project — counting doors, identifying types (hinged, bi-fold, sliding, cavity), and pricing each one. With dozens of quotes per month, this was a serious bottleneck and a source of human error.",
    solution: "We built a full-stack AI pipeline: a YOLOv8 computer vision model trained on 1,400+ annotated architectural drawings, capable of detecting 12 distinct door types. A web portal lets estimators upload a PDF floor plan, see every door highlighted and classified on-screen, and receive an auto-generated itemised quote. The backend runs on Hugging Face, frontend on Vercel.",
    results: ["Automated a 1–2 day manual process down to ~30 seconds","Detects 12 door types with ~65% accuracy (targeting 85%+ with ongoing training)","Web portal built and deployed for production use","Roadmap: direct integration with Infusion accounting software for one-click quoting"],
    stack: ["Python", "YOLOv8 / Ultralytics", "React", "Next.js", "Vercel", "Hugging Face", "Node.js"],
  },
  "basketball-nz": {
    title: "Basketball New Zealand",
    client: "Basketball New Zealand",
    location: "New Zealand (National)",
    category: "Web Design & Development",
    year: "2023",
    tags: ["Web Design", "Sports", "WordPress"],
    heroImg: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1400&q=80",
    summary: "Digital presence for New Zealand's national basketball federation — governing body for the Tall Blacks, Tall Ferns, and grassroots basketball across the country.",
    challenge: "Basketball New Zealand needed a modern, high-energy digital home that could serve multiple audiences: elite players, coaches, clubs, fans, and sponsors — all under one roof.",
    solution: "Designed and built a clean, high-performance website that reflects the energy of the sport while clearly communicating pathways for players at every level, from junior clubs to national teams.",
    results: ["Modernised the digital presence for New Zealand's national basketball body","Clear user journeys for players, coaches, clubs and fans","Fast, mobile-first design built for performance"],
    stack: ["WordPress", "Custom Theme", "Web Design", "SEO"],
  },
  "global-dairy-trade": {
    title: "Global Dairy Trade",
    client: "Global Dairy Trade",
    location: "New Zealand (Global)",
    category: "Enterprise Web",
    year: "2022–2023",
    tags: ["Enterprise", "Web Design", "Development"],
    heroImg: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1400&q=80",
    summary: "Web design and development for the world's leading dairy commodity auction platform — processing billions of dollars in trade across 80+ countries.",
    challenge: "Global Dairy Trade required an enterprise-grade web presence that reflects the scale and credibility of the world's most important dairy pricing benchmark, while remaining accessible to a diverse global audience.",
    solution: "Delivered clean, professional web design and development work meeting the stringent requirements of a global enterprise platform. Focused on clarity, credibility, and performance across international markets.",
    results: ["Delivered enterprise-grade web work for a global platform","Served an international audience across 80+ countries","Maintained platform credibility and trust signals"],
    stack: ["Web Design", "Development", "Enterprise CMS", "Performance Optimisation"],
  },
  "round-the-bays": {
    title: "Round the Bays",
    client: "Round the Bays",
    location: "New Zealand",
    category: "Events & Marketing",
    year: "2023",
    tags: ["Events", "Web Design", "Marketing"],
    heroImg: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=1400&q=80",
    summary: "Digital work for New Zealand's most iconic fun run — a beloved annual event that brings thousands of participants together across scenic coastal routes.",
    challenge: "Round the Bays needed a digital presence that could handle high-traffic registration periods, communicate the event's community spirit, and drive participation year after year.",
    solution: "Designed and developed a website that captures the energy and inclusivity of the event — clear registration flows, event information, and a design that gets people excited to participate.",
    results: ["High-performance website built to handle peak registration traffic","Clear, conversion-focused registration journey","Design that reflects the community spirit of the event"],
    stack: ["Web Design", "Development", "Marketing", "Conversion Optimisation"],
  },
  "summer-of-tech": {
    title: "Summer of Tech",
    client: "Summer of Tech",
    location: "New Zealand",
    category: "Education & Tech",
    year: "2022",
    tags: ["Education", "Web Design", "Tech"],
    heroImg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80",
    summary: "Web work for NZ's premier tech internship matching platform — connecting New Zealand's top tech companies with emerging student talent.",
    challenge: "Summer of Tech needed a digital platform serving two distinct audiences simultaneously — companies seeking interns and students seeking their first tech opportunity — with clear, separate user journeys.",
    solution: "Designed and developed a clean, modern web presence that clearly communicates value to both sides of the marketplace, with intuitive navigation and strong calls-to-action for both students and employers.",
    results: ["Clear dual-audience design serving both companies and students","Strong conversion pathways for internship applications and company sign-ups","Modern, credible design that reflects the quality of NZ's tech ecosystem"],
    stack: ["Web Design", "Development", "UX Strategy"],
  },
};

export default function ProjectPage({ params }) {
  const project = projects[params.slug];

  if (!project) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h1>
          <Link href="/" className="text-sky-500 hover:text-sky-600">← Back home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/#work" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <span>←</span> <span>Back</span>
          </Link>
          <span className="text-sm font-medium text-gray-400">{project.client}</span>
        </div>
      </div>

      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={project.heroImg} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map(t => (
                <span key={t} className="text-xs bg-white/15 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/15">{t}</span>
              ))}
            </div>
            <p className="text-gray-300 text-sm mb-1">{project.client} · {project.year}</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">{project.title}</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          <div className="md:col-span-2 space-y-12">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">{project.summary}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-xs font-bold tracking-widest uppercase text-sky-500 mb-3">The Challenge</h2>
              <p className="text-gray-600 leading-relaxed">{project.challenge}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <h2 className="text-xs font-bold tracking-widest uppercase text-sky-500 mb-3">The Solution</h2>
              <p className="text-gray-600 leading-relaxed">{project.solution}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h2 className="text-xs font-bold tracking-widest uppercase text-sky-500 mb-4">Results</h2>
              <ul className="space-y-3">
                {project.results.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-sky-500 mt-0.5 flex-shrink-0">✦</span>
                    <span className="text-gray-600 leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
            className="space-y-8">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Details</p>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Client", value: project.client },
                  { label: "Category", value: project.category },
                  { label: "Location", value: project.location },
                  { label: "Year", value: project.year },
                ].map(d => (
                  <div key={d.label} className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-400">{d.label}</span>
                    <span className="text-gray-900 font-medium text-right max-w-[55%]">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map(s => (
                  <span key={s} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-5 text-white">
              <p className="text-xs font-bold tracking-widest uppercase text-white/70 mb-2">Work together</p>
              <p className="text-sm leading-relaxed text-white/90 mb-4">Have a project in mind? Let's talk.</p>
              <a href="mailto:oliverjbunce@gmail.com"
                className="inline-block bg-white text-sky-600 font-bold text-sm px-4 py-2.5 rounded-full hover:bg-sky-50 transition-colors">
                Get in touch →
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="border-t border-gray-100 py-6 px-5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} Oliver Bunce · New Zealand</span>
          <span>Built by Vela ✦</span>
        </div>
      </footer>
    </main>
  );
}
