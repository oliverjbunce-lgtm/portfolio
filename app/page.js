"use client";

const services = [
  {
    title: "AI Workflow Automation",
    description: "Custom AI systems that automate the complex — from document processing and quoting engines to intelligent lead generation and business workflows. This is where real leverage lives.",
    icon: "✦",
  },
  {
    title: "Web Design & Development",
    description: "Clean, fast, conversion-focused websites built with Next.js, React, and Tailwind. Designed to look exceptional and perform even better.",
    icon: "◻",
  },
  {
    title: "Digital Marketing",
    description: "SEO strategy, content marketing, and growth systems that compound over time. Built for businesses that want sustainable, measurable results.",
    icon: "↗",
  },
];

const clients = [
  { name: "Basketball New Zealand", domain: "basketballnz.co.nz" },
  { name: "Independent Doors", domain: "independentdoors.co.nz" },
  { name: "Round the Bays", domain: "roundthebays.co.nz" },
  { name: "Manor Build", domain: "manorbuild.co.nz" },
  { name: "BPM", domain: "bpm.co.nz" },
  { name: "Global Dairy Trade", domain: "globaldairytrade.info" },
  { name: "Shelving Depot", domain: "shelvingdepot.co.nz" },
  { name: "Smith BioMed", domain: "smithbiomed.com" },
  { name: "ASEAN NZ Business Council", domain: "aseannz.org" },
  { name: "Permagroup", domain: "permagroup.co.nz" },
  { name: "ICNZ", domain: "icnz.org.nz" },
  { name: "Coping with Loss", domain: "copingwithloss.co.nz" },
  { name: "FrostBoss", domain: "frostboss.com" },
  { name: "Anglers Lodge", domain: "anglerslodge.co.nz" },
  { name: "Europlan", domain: "europlan.co.nz" },
  { name: "StuffEvents", domain: "stuffevents.co.nz" },
  { name: "Advantage Business", domain: "advantagebusiness.co.nz" },
  { name: "Summer of Tech", domain: "summeroftech.co.nz" },
  { name: "Island Cow Cuddles", domain: "islandcowcuddles.com" },
  { name: "Betacraft", domain: "betacraft.co.nz" },
  { name: "Nectar", domain: "nectar.nz" },
];

const projects = [
  {
    title: "Door AI — Independent Doors",
    description: "AI system that reads building floor plans and automatically detects and classifies 12 door types to generate accurate quotes. YOLOv8 model trained on 1,400+ floor plan images.",
    tags: ["AI", "Computer Vision", "Web Portal"],
  },
  {
    title: "Basketball New Zealand",
    description: "Digital presence and web work for Basketball New Zealand, home of the Tall Blacks and national basketball programmes.",
    tags: ["Web Design", "Sports"],
  },
  {
    title: "Global Dairy Trade",
    description: "Web design and digital work for the world's leading online dairy commodity trading platform.",
    tags: ["Web Design", "Enterprise"],
  },
  {
    title: "Round the Bays",
    description: "Web and digital work for one of New Zealand's most iconic fun run events.",
    tags: ["Web Design", "Events"],
  },
  {
    title: "Summer of Tech",
    description: "Digital presence for NZ's premier tech internship programme connecting students with top employers.",
    tags: ["Web Design", "Tech", "Education"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold text-sm tracking-tight">Oliver Bunce</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#services" className="hover:text-gray-900 transition-colors">Services</a>
            <a href="#work" className="hover:text-gray-900 transition-colors">Work</a>
            <a href="#clients" className="hover:text-gray-900 transition-colors">Clients</a>
            <a href="#contact" className="bg-sky-500 text-white px-4 py-1.5 rounded-full hover:bg-sky-600 transition-colors">Get in touch</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-sky-500 text-sm font-medium tracking-wide uppercase mb-4">Web Design · AI · Digital Marketing</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">
            Building digital systems that actually work.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-10">
            I'm Oliver Bunce — a New Zealand-based designer, developer, and AI builder. I help businesses build exceptional digital presences and intelligent systems that drive real growth.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="bg-sky-500 text-white px-6 py-3 rounded-full font-medium hover:bg-sky-600 transition-colors">
              Start a project
            </a>
            <a href="#work" className="border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-400 transition-colors">
              See my work
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-gray-900">60+</p>
            <p className="text-sm text-gray-500 mt-1">Clients delivered</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900">8+</p>
            <p className="text-sm text-gray-500 mt-1">Years experience</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900">NZ</p>
            <p className="text-sm text-gray-500 mt-1">Based in Wellington</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 max-w-6xl mx-auto">
        <p className="text-sky-500 text-sm font-medium tracking-wide uppercase mb-3">What I do</p>
        <h2 className="text-4xl font-bold tracking-tight mb-16">Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="p-8 rounded-2xl bg-gray-50 hover:bg-sky-50 transition-colors group">
              <span className="text-2xl text-sky-500 mb-4 block">{s.icon}</span>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-sky-500 text-sm font-medium tracking-wide uppercase mb-3">Selected work</p>
          <h2 className="text-4xl font-bold tracking-tight mb-16">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-8 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-sky-50 text-sky-600 px-3 py-1 rounded-full font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className="py-24 px-6 max-w-6xl mx-auto">
        <p className="text-sky-500 text-sm font-medium tracking-wide uppercase mb-3">Who I've worked with</p>
        <h2 className="text-4xl font-bold tracking-tight mb-16">Clients</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {clients.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={`https://logo.clearbit.com/${c.domain}`}
                  alt={c.name}
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.innerHTML = `<span class='text-xs font-semibold text-gray-400 text-center px-2'>${c.name.charAt(0)}</span>`;
                  }}
                />
              </div>
              <span className="text-xs text-gray-500 text-center leading-tight font-medium">{c.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-gray-950 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sky-400 text-sm font-medium tracking-wide uppercase mb-3">Let's build something</p>
          <h2 className="text-4xl font-bold tracking-tight mb-4">Ready to get started?</h2>
          <p className="text-gray-400 mb-10 text-lg">Whether it's a new website, an AI system, or a full digital strategy — let's talk about what you need.</p>
          <a
            href="mailto:oliverjbunce@gmail.com"
            className="inline-block bg-sky-500 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-sky-400 transition-colors"
          >
            oliverjbunce@gmail.com
          </a>
          <p className="text-gray-600 text-sm mt-6">Based in New Zealand · Working globally</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-6 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-gray-600">
          <span>© {new Date().getFullYear()} Oliver Bunce</span>
          <span>Built by Vela ✦</span>
        </div>
      </footer>
    </main>
  );
}
