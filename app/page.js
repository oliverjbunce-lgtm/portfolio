"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function AnimatedSection({ children, className }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

function AnimatedItem({ children, className }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const services = [
  {
    title: "AI Workflow Automation",
    description: "Custom AI systems that automate the complex — from document processing and quoting engines to intelligent lead generation and business workflows.",
    icon: "✦",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    color: "from-sky-500/20 to-blue-600/10",
  },
  {
    title: "Web Design & Development",
    description: "Clean, fast, conversion-focused websites built with Next.js, React, and Tailwind. Designed to look exceptional and perform even better.",
    icon: "◻",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
    color: "from-violet-500/20 to-purple-600/10",
  },
  {
    title: "Digital Marketing",
    description: "SEO strategy, content marketing, and growth systems that compound over time. Built for businesses that want sustainable, measurable results.",
    icon: "↗",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80",
    color: "from-emerald-500/20 to-teal-600/10",
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
    description: "AI system that reads building floor plans, auto-detects and classifies 12 door types, and generates accurate quotes. YOLOv8 model trained on 1,400+ floor plan images.",
    tags: ["AI", "Computer Vision", "Web Portal"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    accent: "sky",
  },
  {
    title: "Basketball New Zealand",
    description: "Digital presence for Basketball New Zealand, home of the Tall Blacks and national basketball programmes.",
    tags: ["Web Design", "Sports"],
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
    accent: "orange",
  },
  {
    title: "Global Dairy Trade",
    description: "Web design and digital work for the world's leading online dairy commodity trading platform.",
    tags: ["Web Design", "Enterprise"],
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80",
    accent: "green",
  },
  {
    title: "Round the Bays",
    description: "Web and digital work for one of New Zealand's most iconic fun run events.",
    tags: ["Web Design", "Events"],
    image: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=800&q=80",
    accent: "red",
  },
  {
    title: "Summer of Tech",
    description: "Digital presence for NZ's premier tech internship programme connecting students with top employers.",
    tags: ["Web Design", "Tech", "Education"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    accent: "violet",
  },
];

const accentMap = {
  sky: "bg-sky-100 text-sky-700",
  orange: "bg-orange-100 text-orange-700",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  violet: "bg-violet-100 text-violet-700",
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* Nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100"
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold text-sm tracking-tight">Oliver Bunce</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#services" className="hover:text-gray-900 transition-colors">Services</a>
            <a href="#work" className="hover:text-gray-900 transition-colors">Work</a>
            <a href="#clients" className="hover:text-gray-900 transition-colors">Clients</a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-sky-500 text-white px-4 py-1.5 rounded-full hover:bg-sky-600 transition-colors"
            >
              Get in touch
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-sky-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-600 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse" />
              Web Design · AI · Digital Marketing · NZ
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-8"
          >
            Building digital<br />
            <span className="text-sky-500">systems</span> that<br />
            actually work.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-xl text-gray-500 max-w-xl leading-relaxed mb-10"
          >
            I'm Oliver — a New Zealand-based designer, developer, and AI builder helping businesses grow their digital presence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gray-900 text-white px-7 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg"
            >
              Start a project
            </motion.a>
            <motion.a
              href="#work"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="border border-gray-200 text-gray-700 px-7 py-3.5 rounded-full font-medium hover:border-gray-400 transition-colors"
            >
              See my work ↓
            </motion.a>
          </motion.div>

          {/* Floating stat cards */}
          <div className="mt-20 flex flex-wrap gap-4">
            {[
              { label: "Clients delivered", value: 60, suffix: "+" },
              { label: "Years experience", value: 8, suffix: "+" },
              { label: "Industries", value: 15, suffix: "+" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm"
              >
                <p className="text-3xl font-bold text-gray-900">
                  <CountUp target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 bg-gray-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <AnimatedItem>
            <p className="text-sky-500 text-sm font-semibold tracking-widest uppercase mb-3">What I do</p>
            <h2 className="text-5xl font-bold tracking-tight mb-16">Services</h2>
          </AnimatedItem>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <AnimatedItem key={s.title}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-3xl overflow-hidden group cursor-default border border-gray-100 shadow-sm hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" />
                    <span className="absolute top-4 left-4 text-2xl text-white">{s.icon}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
                  </div>
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Projects */}
      <section id="work" className="py-32 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">Selected work</p>
              <h2 className="text-5xl font-bold tracking-tight text-white mb-16">Projects</h2>
            </AnimatedItem>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((p, i) => (
                <AnimatedItem key={p.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`rounded-3xl overflow-hidden group cursor-default ${i === 0 ? "md:col-span-2" : ""}`}
                  >
                    <div className={`relative overflow-hidden ${i === 0 ? "h-72" : "h-48"}`}>
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {p.tags.map((tag) => (
                            <span key={tag} className={`text-xs px-3 py-1 rounded-full font-medium ${accentMap[p.accent]}`}>{tag}</span>
                          ))}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-1">{p.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{p.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedItem>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className="py-32 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <AnimatedItem>
            <p className="text-sky-500 text-sm font-semibold tracking-widest uppercase mb-3">Who I've worked with</p>
            <h2 className="text-5xl font-bold tracking-tight mb-4">60+ clients across<br />New Zealand</h2>
            <p className="text-gray-500 mb-16 max-w-xl">From national sporting bodies to startups, I've helped businesses across every industry build better digital presences.</p>
          </AnimatedItem>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {clients.map((c, i) => (
              <AnimatedItem key={c.name}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 hover:shadow-md transition-all group cursor-default border border-transparent hover:border-gray-100"
                >
                  <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://logo.clearbit.com/${c.domain}`}
                      alt={c.name}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = `<span class='text-sm font-bold text-gray-400'>${c.name.charAt(0)}</span>`;
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 text-center leading-tight font-medium">{c.name}</span>
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6">
        <AnimatedSection>
          <AnimatedItem>
            <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl bg-sky-500 p-16 text-center">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Let's build something great.</h2>
                <p className="text-sky-100 mb-8 text-lg max-w-xl mx-auto">Whether it's a website, an AI system, or a full digital strategy — I'd love to hear about your project.</p>
                <motion.a
                  href="mailto:oliverjbunce@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block bg-white text-sky-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-sky-50 transition-colors shadow-lg"
                >
                  oliverjbunce@gmail.com
                </motion.a>
              </div>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Oliver Bunce · Wellington, NZ</span>
          <span>Built by Vela ✦</span>
        </div>
      </footer>
    </main>
  );
}
