"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// ─── Custom Cursor ───────────────────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => {
      const { clientX: x, clientY: y } = e;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${x - 20}px, ${y - 20}px)`;
      }
    };
    const over = (e) => e.target.closest("a,button,[data-hover]") && setHovered(true);
    const out = () => setHovered(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); window.removeEventListener("mouseout", out); };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-sky-400 rounded-full z-[9999] pointer-events-none transition-transform duration-[10ms]" />
      <div ref={followerRef} className={`fixed top-0 left-0 rounded-full z-[9998] pointer-events-none border border-sky-400/60 transition-all duration-200 ${hovered ? "w-14 h-14 bg-sky-400/10" : "w-10 h-10 bg-transparent"}`} style={{ transition: "width 0.2s, height 0.2s, background 0.2s, transform 0.12s" }} />
    </>
  );
}

// ─── Text Scramble ────────────────────────────────────────────────────────────
function ScrambleText({ text, className }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const scramble = useCallback(() => {
    let iter = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((c, i) => {
        if (c === " ") return " ";
        if (i < iter) return text[i];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      if (iter >= text.length) clearInterval(interval);
      iter += 1.5;
    }, 40);
  }, [text]);
  return <span className={className} onMouseEnter={scramble}>{display}</span>;
}

// ─── Typewriter ────────────────────────────────────────────────────────────────
const roles = ["Web Designer", "AI Builder", "Digital Marketer", "Front-End Developer", "Growth Partner"];
function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const word = roles[idx];
      if (!del) {
        if (sub < word.length) setSub(s => s + 1);
        else setTimeout(() => setDel(true), 1200);
      } else {
        if (sub > 0) setSub(s => s - 1);
        else { setDel(false); setIdx(i => (i + 1) % roles.length); }
      }
    }, del ? 50 : 80);
    return () => clearTimeout(timeout);
  }, [sub, del, idx]);
  return (
    <span className="text-sky-400">
      {roles[idx].slice(0, sub)}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticButton({ children, className, href }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });
  const handle = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.a ref={ref} href={href} style={{ x, y }} onMouseMove={handle} onMouseLeave={reset}
      whileTap={{ scale: 0.95 }} className={className}>
      {children}
    </motion.a>
  );
}

// ─── Tilt Card ────────────────────────────────────────────────────────────────
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });
  const handle = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 12);
    rotateY.set(x * 12);
  };
  const reset = () => { rotateX.set(0); rotateY.set(0); };
  return (
    <motion.div ref={ref} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handle} onMouseLeave={reset} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Infinite Marquee ─────────────────────────────────────────────────────────
const clients = [
  "Basketball New Zealand", "Independent Doors", "Round the Bays", "Manor Build",
  "BPM", "Global Dairy Trade", "Shelving Depot", "Smith BioMed",
  "ASEAN NZ Business Council", "Permagroup", "ICNZ", "Coping with Loss",
  "FrostBoss", "Anglers Lodge", "Europlan", "StuffEvents",
  "Advantage Business", "Summer of Tech", "Island Cow Cuddles", "Betacraft", "Nectar"
];

function Marquee() {
  const doubled = [...clients, ...clients];
  return (
    <div className="relative overflow-hidden py-4 bg-gray-950 border-y border-white/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((c, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-6 text-gray-500 text-sm font-medium">
            <span className="w-1 h-1 bg-sky-500 rounded-full" />{c}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── AI Demo Widget ───────────────────────────────────────────────────────────
const chatScript = [
  { role: "user", text: "Can you analyse my website and tell me what's holding back my conversions?" },
  { role: "ai", text: "Analysing oliverbunce.com... Found 3 critical issues: slow LCP (4.2s), no clear CTA above the fold, and missing structured data for local SEO." },
  { role: "user", text: "How quickly can you fix that?" },
  { role: "ai", text: "Image optimisation and CTA restructure — 2 days. Full SEO schema + Core Web Vitals fix — 1 week. Want me to start?" },
];

function AIDemo() {
  const [visible, setVisible] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });
  useEffect(() => {
    if (!inView) return;
    const timers = chatScript.map((_, i) => setTimeout(() => setVisible(i + 1), i * 1800));
    return () => timers.forEach(clearTimeout);
  }, [inView]);
  return (
    <div ref={ref} className="bg-gray-900 rounded-3xl p-6 border border-white/10 max-w-md w-full">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-xs text-gray-500 ml-2 font-mono">oliver-ai-assistant</span>
      </div>
      <div className="space-y-3 min-h-[220px]">
        {chatScript.slice(0, visible).map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-sky-500 text-white rounded-br-sm" : "bg-white/10 text-gray-200 rounded-bl-sm"}`}>
              {msg.role === "ai" && <span className="text-sky-400 text-xs font-semibold block mb-1">✦ Vela AI</span>}
              {msg.text}
            </div>
          </motion.div>
        ))}
        {visible < chatScript.length && visible > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, delay: i * 0.15, duration: 0.6 }} className="w-1.5 h-1.5 bg-sky-400 rounded-full" />)}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ value, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// ─── Fade Up ─────────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const projects = [
  { title: "Door AI", sub: "Independent Doors", desc: "YOLOv8 model trained on 1,400+ floor plans. Reads architectural drawings, classifies 12 door types, generates quotes instantly. Replaced a 2-day manual process with a 30-second AI pipeline.", tags: ["AI", "Computer Vision", "YOLOv8"], img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80", span: "full" },
  { title: "Basketball NZ", sub: "Tall Blacks & National Programmes", desc: "Digital presence for NZ's national basketball body.", tags: ["Web Design", "Sports"], img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80" },
  { title: "Global Dairy Trade", sub: "Enterprise Platform", desc: "World's leading dairy commodity trading platform.", tags: ["Enterprise", "Web"], img: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80" },
  { title: "Round the Bays", sub: "NZ's Iconic Fun Run", desc: "Event digital presence, registration flow, and marketing.", tags: ["Events", "Marketing"], img: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=800&q=80" },
  { title: "Summer of Tech", sub: "NZ Tech Internship Programme", desc: "Platform connecting students to NZ's top tech employers.", tags: ["Education", "Web"], img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80" },
];

const services = [
  { title: "AI Automation", desc: "Custom AI systems — from document intelligence to automated lead generation. Real leverage, measurable ROI.", icon: "✦", bg: "bg-sky-500" },
  { title: "Web Design & Dev", desc: "Next.js, React, Tailwind. Fast, beautiful, conversion-focused.", icon: "◻", bg: "bg-gray-900" },
  { title: "Digital Marketing", desc: "SEO, content, growth systems. Built to compound.", icon: "↗", bg: "bg-violet-600" },
  { title: "Brand & Strategy", desc: "Positioning, messaging, visual identity. Built to last.", icon: "◈", bg: "bg-emerald-600" },
];

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden" style={{ cursor: "none" }}>
      <CustomCursor />

      {/* ── Nav */}
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <ScrambleText text="OLIVER BUNCE" className="text-sm font-bold tracking-widest text-white" />
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            {["Services", "Work", "Clients"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a>
            ))}
            <MagneticButton href="#contact" className="bg-sky-500 text-white px-5 py-2 rounded-full font-medium hover:bg-sky-400 transition-colors text-sm">
              Let's talk
            </MagneticButton>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sky-600/20 rounded-full blur-[100px]" />
          <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" />
          {/* Dot grid */}
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #ffffff08 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <motion.div style={{ y: heroY }} className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24 w-full grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 bg-sky-400 rounded-full" />
              Available for projects · Wellington, NZ
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-7xl font-bold tracking-tight leading-[0.92] mb-6">
              I build digital<br />
              systems that<br />
              <Typewriter />
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
              60+ clients across New Zealand. Web design, AI automation, and digital marketing that actually moves the needle.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
              className="flex flex-wrap gap-4">
              <MagneticButton href="#work" className="bg-white text-gray-900 px-7 py-3.5 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                View my work
              </MagneticButton>
              <MagneticButton href="#contact" className="border border-white/20 text-white px-7 py-3.5 rounded-full font-medium hover:border-white/50 transition-colors">
                Start a project →
              </MagneticButton>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="flex gap-10 mt-14">
              {[{ v: 60, s: "+", l: "Clients" }, { v: 8, s: "+", l: "Years" }, { v: 15, s: "+", l: "Industries" }].map(s => (
                <div key={s.l}>
                  <p className="text-3xl font-bold"><Counter value={s.v} suffix={s.s} /></p>
                  <p className="text-gray-500 text-sm mt-0.5">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: AI Demo */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-sky-500/10 rounded-[2rem] blur-xl" />
              <AIDemo />
              <div className="absolute -bottom-4 -right-4 bg-sky-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                ✦ AI-powered services
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Client Ticker */}
      <Marquee />

      {/* ── Services Bento */}
      <section id="services" className="py-32 px-6 max-w-7xl mx-auto">
        <FadeUp><p className="text-sky-400 text-xs font-semibold tracking-widest uppercase mb-3">What I do</p></FadeUp>
        <FadeUp delay={0.1}><h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-16">Services</h2></FadeUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px]">
          {/* Large AI card */}
          <FadeUp delay={0.15} className="col-span-2 row-span-2">
            <TiltCard className="h-full">
              <div className="relative h-full bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-8 overflow-hidden flex flex-col justify-between group">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 70%, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -right-8 -top-8 w-40 h-40 border border-white/20 rounded-full" />
                <motion.div animate={{ rotate: [360, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -right-4 -top-4 w-24 h-24 border border-white/30 rounded-full" />
                <span className="text-4xl">✦</span>
                <div>
                  <h3 className="text-2xl font-bold mb-2">AI Workflow Automation</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Custom AI systems that automate the complex. Real leverage, measurable ROI.</p>
                </div>
              </div>
            </TiltCard>
          </FadeUp>
          {/* Web Design */}
          <FadeUp delay={0.2} className="col-span-2">
            <TiltCard className="h-full">
              <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded-3xl p-6 flex items-center gap-6 overflow-hidden group relative">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 overflow-hidden opacity-20">
                  <div className="text-[8px] font-mono text-sky-400 leading-tight p-3">
                    {`const site = await build({\n  framework: 'nextjs',\n  style: 'tailwind',\n  perf: 100\n})`}
                  </div>
                </div>
                <span className="text-3xl">◻</span>
                <div>
                  <h3 className="text-lg font-bold mb-1">Web Design & Dev</h3>
                  <p className="text-gray-400 text-sm">Next.js · React · Tailwind. Fast, beautiful, conversion-focused.</p>
                </div>
              </div>
            </TiltCard>
          </FadeUp>
          {/* Marketing */}
          <FadeUp delay={0.25}>
            <TiltCard className="h-full">
              <div className="h-full bg-gradient-to-br from-violet-900 to-purple-900 border border-violet-500/20 rounded-3xl p-6 flex flex-col justify-between group">
                <span className="text-2xl">↗</span>
                <div>
                  <h3 className="font-bold mb-1">Digital Marketing</h3>
                  <p className="text-gray-400 text-xs">SEO · Content · Growth systems</p>
                </div>
              </div>
            </TiltCard>
          </FadeUp>
          {/* Brand */}
          <FadeUp delay={0.3}>
            <TiltCard className="h-full">
              <div className="h-full bg-gradient-to-br from-emerald-900 to-teal-900 border border-emerald-500/20 rounded-3xl p-6 flex flex-col justify-between">
                <span className="text-2xl">◈</span>
                <div>
                  <h3 className="font-bold mb-1">Brand & Strategy</h3>
                  <p className="text-gray-400 text-xs">Identity · Positioning · Messaging</p>
                </div>
              </div>
            </TiltCard>
          </FadeUp>
        </div>
      </section>

      {/* ── Projects */}
      <section id="work" className="py-32 px-6 max-w-7xl mx-auto">
        <FadeUp><p className="text-sky-400 text-xs font-semibold tracking-widest uppercase mb-3">Selected work</p></FadeUp>
        <FadeUp delay={0.1}><h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-16">Projects</h2></FadeUp>
        <div className="space-y-6">
          {projects.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.08}>
              <TiltCard className="w-full">
                <div className={`relative overflow-hidden rounded-3xl group cursor-default ${p.span === "full" ? "h-[480px]" : "h-64"}`}>
                  <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-sky-900/0 group-hover:bg-sky-900/10 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {p.tags.map(t => <span key={t} className="text-xs bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/10">{t}</span>)}
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">{p.sub}</p>
                        <h3 className={`font-bold text-white ${p.span === "full" ? "text-4xl" : "text-2xl"}`}>{p.title}</h3>
                        {p.span === "full" && <p className="text-gray-300 mt-2 max-w-xl text-sm leading-relaxed">{p.desc}</p>}
                      </div>
                      <motion.div whileHover={{ x: 4 }} className="text-white/50 text-2xl group-hover:text-white transition-colors">→</motion.div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Clients Grid */}
      <section id="clients" className="py-32 px-6 bg-gray-950/50">
        <div className="max-w-7xl mx-auto">
          <FadeUp><p className="text-sky-400 text-xs font-semibold tracking-widest uppercase mb-3">Who I've worked with</p></FadeUp>
          <FadeUp delay={0.1}><h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">60+ clients across NZ</h2></FadeUp>
          <FadeUp delay={0.2}><p className="text-gray-500 mb-16 max-w-xl">From national sporting bodies and government-linked organisations to startups and local businesses.</p></FadeUp>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
            {clients.map((c, i) => {
              const domains = { "Basketball New Zealand": "basketballnz.co.nz", "Independent Doors": "independentdoors.co.nz", "Round the Bays": "roundthebays.co.nz", "Manor Build": "manorbuild.co.nz", "BPM": "bpm.co.nz", "Global Dairy Trade": "globaldairytrade.info", "Shelving Depot": "shelvingdepot.co.nz", "Smith BioMed": "smithbiomed.com", "ASEAN NZ Business Council": "aseannz.org", "Permagroup": "permagroup.co.nz", "ICNZ": "icnz.org.nz", "Coping with Loss": "copingwithloss.co.nz", "FrostBoss": "frostboss.com", "Anglers Lodge": "anglerslodge.co.nz", "Europlan": "europlan.co.nz", "StuffEvents": "stuffevents.co.nz", "Advantage Business": "advantagebusiness.co.nz", "Summer of Tech": "summeroftech.co.nz", "Island Cow Cuddles": "islandcowcuddles.com", "Betacraft": "betacraft.co.nz", "Nectar": "nectar.nz" };
              return (
                <FadeUp key={c} delay={i * 0.03}>
                  <motion.div whileHover={{ y: -4, scale: 1.06 }} transition={{ type: "spring", stiffness: 400 }}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-colors group cursor-default" data-hover>
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
                      <img src={`https://logo.clearbit.com/${domains[c]}`} alt={c} className="w-8 h-8 object-contain"
                        onError={e => { e.target.style.display = "none"; e.target.parentNode.innerHTML = `<span class='text-xs font-bold text-gray-400'>${c.charAt(0)}</span>`; }} />
                    </div>
                    <span className="text-[10px] text-gray-500 text-center leading-tight">{c}</span>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Contact */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-500 via-blue-500 to-blue-600 p-16 md:p-24">
              <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #ffffff12 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 6, repeat: Infinity }}
                className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full" />
              <div className="relative z-10 text-center">
                <p className="text-white/70 text-sm font-semibold tracking-widest uppercase mb-4">Let's build something</p>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">Ready to grow?</h2>
                <p className="text-white/80 text-xl max-w-xl mx-auto mb-10">Website, AI system, or full digital strategy — let's talk about what you need.</p>
                <MagneticButton href="mailto:oliverjbunce@gmail.com"
                  className="inline-block bg-white text-sky-600 font-bold text-xl px-10 py-5 rounded-full hover:bg-sky-50 transition-colors shadow-2xl">
                  oliverjbunce@gmail.com
                </MagneticButton>
                <p className="text-white/50 text-sm mt-6">Wellington, New Zealand · Working globally</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-600">
          <span>© {new Date().getFullYear()} Oliver Bunce</span>
          <span>Built by Vela ✦</span>
        </div>
      </footer>
    </main>
  );
}
