"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// ─── Detect touch device ──────────────────────────────────────────────────────
function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => { setTouch(window.matchMedia("(hover: none)").matches); }, []);
  return touch;
}

// ─── Custom Cursor (desktop only) ─────────────────────────────────────────────
function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [big, setBig] = useState(false);
  useEffect(() => {
    const move = (e) => {
      if (dot.current) dot.current.style.transform = `translate(${e.clientX - 4}px,${e.clientY - 4}px)`;
      if (ring.current) ring.current.style.transform = `translate(${e.clientX - 20}px,${e.clientY - 20}px)`;
    };
    const on = (e) => e.target.closest("a,button,[data-hover]") && setBig(true);
    const off = () => setBig(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", on);
    window.addEventListener("mouseout", off);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", on); window.removeEventListener("mouseout", off); };
  }, []);
  return (
    <>
      <div ref={dot} className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-sky-500 rounded-full z-[9999] pointer-events-none" />
      <div ref={ring} className={`hidden md:block fixed top-0 left-0 rounded-full z-[9998] pointer-events-none border-2 border-sky-400/50 transition-all duration-150 ${big ? "w-12 h-12 -translate-x-1 -translate-y-1 bg-sky-50/50" : "w-10 h-10 bg-transparent"}`} />
    </>
  );
}

// ─── Mobile Nav ───────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["Services", "Work", "Clients", "Contact"];
  return (
    <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <span className="font-bold text-sm tracking-tight text-gray-900">Oliver Bunce</span>
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
          {links.slice(0, 3).map(l => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-gray-900 transition-colors">{l}</a>)}
          <a href="/start" className="bg-sky-500 text-white px-5 py-2 rounded-full font-medium hover:bg-sky-600 transition-colors text-sm">Let's talk</a>
        </div>
        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2 text-gray-600" aria-label="Menu">
          <div className="w-5 space-y-1.5">
            <motion.div animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="h-0.5 bg-current" />
            <motion.div animate={open ? { opacity: 0 } : { opacity: 1 }} className="h-0.5 bg-current" />
            <motion.div animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="h-0.5 bg-current" />
          </div>
        </button>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 px-5 pb-6">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                className="block py-3.5 text-base text-gray-700 border-b border-gray-50 last:border-0">{l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Typewriter ───────────────────────────────────────────────────────────────
const roles = ["Web Designer", "AI Builder", "Digital Marketer", "Growth Partner", "Developer"];
function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      const w = roles[idx];
      if (!del) {
        if (sub < w.length) setSub(s => s + 1);
        else setTimeout(() => setDel(true), 1400);
      } else {
        if (sub > 0) setSub(s => s - 1);
        else { setDel(false); setIdx(i => (i + 1) % roles.length); }
      }
    }, del ? 45 : 85);
    return () => clearTimeout(t);
  }, [sub, del, idx]);
  return <span className="text-sky-500">{roles[idx].slice(0, sub)}<span className="animate-pulse ml-0.5">|</span></span>;
}

// ─── Fade Up ──────────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Tilt Card (desktop only) ─────────────────────────────────────────────────
function TiltCard({ children, className = "" }) {
  const isTouch = useIsTouch();
  const ref = useRef(null);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  if (isTouch) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => { const r = ref.current.getBoundingClientRect(); rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10); ry.set(((e.clientX - r.left) / r.width - 0.5) * 10); }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      className={className}>{children}</motion.div>
  );
}

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ value, suffix = "" }) {
  const [n, setN] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });
  useEffect(() => {
    if (!inView) return;
    let s = null;
    const step = (ts) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / 1200, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// ─── Infinite Marquee ─────────────────────────────────────────────────────────
const clientNames = ["Basketball New Zealand","Independent Doors","Round the Bays","Manor Build","BPM","Global Dairy Trade","Shelving Depot","Smith BioMed","ASEAN NZ Business Council","Permagroup","ICNZ","FrostBoss","Anglers Lodge","Europlan","StuffEvents","Advantage Business","Summer of Tech","Island Cow Cuddles","Betacraft","Nectar"];

// Direct logo URLs sourced from each client's website — more reliable than Clearbit for NZ businesses
const clientLogos = {
  "Round the Bays":       { url: "https://cdn.prod.website-files.com/668b175ce9412bf59c696f59/689e97ae7a7d4b8b1cabb2a2_Horizontal.svg" },
  "Manor Build":          { url: "https://cdn.prod.website-files.com/690c0792ccabd9c0a853b5ad/691cec071bfbb392127eb94c_Logo.svg" },
  "Global Dairy Trade":   { url: "https://cdn.globaldairytrade.info/ps/static-ss4/img/primary-logo.20f4cce6.svg" },
  "Shelving Depot":       { url: "https://shelvingdepot.co.nz/wp-content/uploads/2021/11/shelving-depot-racking-shelving-solutions-logo-white.svg", white: true },
  "Smith BioMed":         { url: "https://www.smithbiomed.com/wp-content/uploads/2015/11/SBM-logo-v2.png" },
  "Permagroup":           { url: "https://cdn.prod.website-files.com/65d2685948fded0472043333/65d33457a9dc3d7e085f18a6_permagroup-logo.svg" },
  "ICNZ":                 { url: "https://www.icnz.org.nz/wp-content/uploads/2022/12/ICNZ_Logo_Orange.png" },
  "FrostBoss":            { url: "https://cdn.prod.website-files.com/6227d1cf78da29ada668d2ef/6509534e07af84ef459ebc91_Frost%20Boss%20Logo%20Navy%20Stacked.png" },
  "Europlan":            { url: "https://europlan.nz/assets/themes/europlan-theme/images/logo.png" },
  "StuffEvents":          { url: "https://images.squarespace-cdn.com/content/v1/5cd4abb511f78404abe0e33a/d0e2e9bd-5eea-4397-a64d-8dfbea76bced/STUFF+Logo_BLK.png" },
  "Advantage Business":   { url: "https://www.advantagebusiness.co.nz/wp-content/uploads/2020/09/AB-Logo-Black-4.png" },
  "Summer of Tech":       { url: "https://images.squarespace-cdn.com/content/v1/60cfd646701da4034512a1c5/1625639692760-IOVPJDH7CY7O3IFUEEFN/Summer-of-Tech_Logo_H.png?format=300w" },
  "Island Cow Cuddles":   { url: "https://cdn.prod.website-files.com/6958eea141a6f98e26f2a36e/696328b1103fbdabca8f978a_logotypesmall.png" },
  "Betacraft":            { url: "https://betacraftworkwear.com/cdn/shop/files/Betacraft_logo_white-800.png?v=1667443326&width=600", white: true },
  "Basketball New Zealand": { url: "https://www.basketball.org.nz/wp-content/uploads/logo.svg" },
  "Independent Doors":      { url: "https://iddoors.co.nz/wp-content/uploads/2023/11/logo.svg" },
  "BPM":                    { url: "https://images.squarespace-cdn.com/content/v1/6150f24166823d0e2dfd48fe/43816fae-80b4-4821-b61c-32b75abf53fc/bpm_logo+pos.png?format=300w" },
  "Nectar":                 { url: "https://nectar.co.nz/wp-content/themes/nectar-wp/public/img/nectar_money_2024/24_Nectar_Logo_Money_v1_White.png", white: true },
  "Anglers Lodge":          { url: "https://cdn.prod.website-files.com/650d073b70af691cf4e21590/65441c5a68b4d18bf8c3c945_Anglers_Primary%20Coromandel%20Reverse.svg", white: true },
  "ASEAN NZ Business Council": { url: "https://asean.org.nz/sites/default/files/ASEAN_NZ_BC_Logo%20%C6%92_Landscape.png" },
};

// Client metadata for tap-to-reveal mobile cards
const clientInfo = {
  "Basketball New Zealand": {
    industry: "Sports / National Body",
    work: "Website redesign & digital strategy for NZ's national basketball organisation.",
    img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=80",
  },
  "Independent Doors": {
    industry: "Construction / Manufacturing",
    work: "Website, digital marketing, and an AI system that reads floor plans and auto-classifies door types for quoting.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
  },
  "Round the Bays": {
    industry: "Events",
    work: "Digital presence and marketing for NZ's most iconic fun run event.",
    img: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=900&q=80",
  },
  "Manor Build": {
    industry: "Construction",
    work: "Website design and development for a premium residential building company.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80",
  },
  "BPM": {
    industry: "Project Management",
    work: "Website and digital presence for an independent construction project management consultancy.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
  },
  "Global Dairy Trade": {
    industry: "Agriculture / Commodities",
    work: "Digital marketing and web strategy for the world's leading dairy trading platform.",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80",
  },
  "Shelving Depot": {
    industry: "Retail / Storage",
    work: "Website design and SEO for NZ's leading shelving and racking solutions provider.",
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80",
  },
  "Smith BioMed": {
    industry: "Biomedical",
    work: "Website and digital presence for a biomedical technology company.",
    img: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=900&q=80",
  },
  "ASEAN NZ Business Council": {
    industry: "Trade / Business Council",
    work: "Website and digital strategy for the ASEAN New Zealand Business Council.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
  },
  "Permagroup": {
    industry: "Building Products",
    work: "Website design and digital marketing for a NZ building products company.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
  },
  "ICNZ": {
    industry: "Insurance",
    work: "Web presence and digital strategy for the Insurance Council of New Zealand.",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80",
  },
  "FrostBoss": {
    industry: "AgriTech",
    work: "Website and digital marketing for a frost protection technology company.",
    img: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=80",
  },
  "Anglers Lodge": {
    industry: "Tourism / Hospitality",
    work: "Website and brand presence for a premier fishing lodge in the Coromandel.",
    img: "https://images.unsplash.com/photo-1500402448245-d49c5229c564?w=900&q=80",
  },
  "Europlan": {
    industry: "Interior Design",
    work: "Website and digital marketing for a premium kitchen and furniture design studio.",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80",
  },
  "StuffEvents": {
    industry: "Media / Events",
    work: "Website and event marketing for Stuff's NZ events platform.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80",
  },
  "Advantage Business": {
    industry: "Business Consulting",
    work: "Website and digital presence for a NZ business consultancy.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
  },
  "Summer of Tech": {
    industry: "Tech / Education",
    work: "Website and marketing strategy for NZ's premier tech internship programme.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80",
  },
  "Island Cow Cuddles": {
    industry: "Tourism / Agriculture",
    work: "Website and marketing for a unique cow-hugging tourism experience in Hawaii.",
    img: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80",
  },
  "Betacraft": {
    industry: "Workwear / Retail",
    work: "Digital marketing and web strategy for a leading NZ workwear brand.",
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80",
  },
  "Nectar": {
    industry: "Fintech",
    work: "Website and marketing for a NZ financial services app.",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80",
  },
};

// Deterministic gradient colours for letter-avatar fallbacks
function avatarGradient(name) {
  const palettes = [
    ["#0ea5e9","#2563eb"], // sky→blue
    ["#8b5cf6","#7c3aed"], // violet→purple
    ["#10b981","#059669"], // emerald→green
    ["#f97316","#ef4444"], // orange→red
    ["#ec4899","#f43f5e"], // pink→rose
    ["#f59e0b","#d97706"], // amber→yellow
    ["#14b8a6","#0891b2"], // teal→cyan
    ["#6366f1","#4f46e5"], // indigo→blue
  ];
  const idx = (name.charCodeAt(0) + name.length) % palettes.length;
  return palettes[idx];
}

// Circular orb card for the clients grid
function ClientOrb({ name, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [failed, setFailed] = useState(false);
  const entry = clientLogos[name];
  const [c1, c2] = avatarGradient(name);

  const SIZE = 76;
  const STROKE = 3;
  const RADIUS = (SIZE - STROKE * 2) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  return (
    <FadeUp delay={index * 0.025}>
      <motion.button
        className="flex flex-col items-center gap-2.5 cursor-default select-none bg-transparent border-0 p-0"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => onClick && onClick(name)}
        data-hover
      >
        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          <svg
            width={SIZE} height={SIZE}
            className="absolute inset-0 pointer-events-none"
            style={{ transform: 'rotate(-90deg)' }}
          >
            <circle cx={SIZE/2} cy={SIZE/2} r={RADIUS} fill="none" stroke={`${c1}25`} strokeWidth={STROKE} />
            <motion.circle
              cx={SIZE/2} cy={SIZE/2} r={RADIUS}
              fill="none"
              stroke={c1}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              animate={hovered
                ? { strokeDashoffset: CIRCUMFERENCE * 0.22, opacity: 1 }
                : { strokeDashoffset: CIRCUMFERENCE, opacity: 0 }
              }
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <motion.div
            animate={hovered ? { scale: 1.06 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="absolute rounded-full overflow-hidden flex items-center justify-center"
            style={{
              inset: STROKE + 1,
              background: (!entry || failed) ? `linear-gradient(135deg, ${c1}, ${c2})` : (entry.white ? '#1a2235' : 'white'),
              boxShadow: hovered ? `0 8px 28px ${c1}45, 0 2px 8px rgba(0,0,0,0.08)` : '0 2px 8px rgba(0,0,0,0.07)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            {entry && !failed ? (
              <img
                src={entry.url}
                alt={name}
                className="object-contain transition-all duration-300"
                style={{
                  width: '62%',
                  height: '62%',
                  filter: hovered ? 'none' : (entry.white ? 'opacity(0.55)' : 'grayscale(1) opacity(0.5)'),
                }}
                onError={() => setFailed(true)}
              />
            ) : (
              <span className="text-xl font-bold text-white">{name.charAt(0)}</span>
            )}
          </motion.div>
        </div>
        <motion.span
          animate={{ color: hovered ? '#0ea5e9' : '#9ca3af' }}
          transition={{ duration: 0.2 }}
          className="text-[10px] sm:text-[11px] font-medium text-center leading-tight"
          style={{ maxWidth: SIZE }}
        >
          {name}
        </motion.span>
      </motion.button>
    </FadeUp>
  );
}

// ─── Client Modal ─────────────────────────────────────────────────────────────
function ClientModal({ client, onClose }) {
  const entry = clientLogos[client];
  const info = clientInfo[client];
  if (!client || !info) return null;
  return (
    <AnimatePresence>
      {client && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            onClick={e => e.stopPropagation()}
          >
            <img src={info.img} alt={client} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.95) 100%)' }} />
            <div className="relative z-10 flex flex-col items-center justify-end min-h-[420px] p-6 pb-8">
              {entry && (
                <img
                  src={entry.url}
                  alt={client}
                  className="h-12 max-w-[150px] object-contain mb-5"
                  style={{ filter: entry.white ? 'none' : 'brightness(0) invert(1)' }}
                />
              )}
              <h3 className="text-2xl font-bold text-white text-center mb-2">{client}</h3>
              <span className="text-xs px-3 py-1 rounded-full mb-4 text-white" style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)' }}>{info.industry}</span>
              <p className="text-sm text-center leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>{info.work}</p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white text-lg"
              style={{ background: 'rgba(0,0,0,0.45)' }}
            >×</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Client Grid ─────────────────────────────────────────────────────────────
function ClientGrid({ onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-10">
      {clientNames.map((name, i) => (
        <ClientOrb key={name} name={name} index={i} onClick={onSelect} />
      ))}
    </div>
  );
}

function ClientLogo({ name, size = "md" }) {
  const [failed, setFailed] = useState(false);
  const entry = clientLogos[name];
  const dims = size === "sm" ? { img: "w-4 h-4", box: "w-5 h-5", text: "text-[9px]" }
                             : { img: "w-7 h-7", box: "w-10 h-10", text: "text-xs" };

  if (!entry || failed) {
    const [c1, c2] = avatarGradient(name);
    return (
      <div className={`${dims.box} rounded-lg flex items-center justify-center flex-shrink-0`}
        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}>
        <span className={`font-bold text-white ${dims.text}`}>{name.charAt(0)}</span>
      </div>
    );
  }

  return (
    <div className={`${dims.box} rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 ${entry.white ? "bg-gray-800" : "bg-gray-100"}`}>
      <img src={entry.url} alt={name}
        className={`${dims.img} object-contain`}
        style={entry.white ? {} : { filter: "grayscale(1) opacity(0.65)" }}
        onError={() => setFailed(true)} />
    </div>
  );
}

function Marquee() {
  const doubled = [...clientNames, ...clientNames];
  return (
    <div className="relative overflow-hidden py-5 bg-gray-50 border-y border-gray-100">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((c, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-6 text-gray-400 text-sm">
            <ClientLogo name={c} size="sm" />
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── AI Demo ──────────────────────────────────────────────────────────────────
const chat = [
  { r: "user", t: "Can you build me an AI tool to process building plans and generate quotes?" },
  { r: "ai", t: "Absolutely. I'll train a computer vision model on your floor plans — it'll detect door types, count them, and output a quote automatically. Usually 1–2 weeks to build." },
  { r: "user", t: "How much would something like that cost?" },
  { r: "ai", t: "For a complete system with web portal — $8,000–$12,000 NZD. Saves your team hours per quote. Want to see an example I've already built?" },
];
function AIDemo() {
  const [vis, setVis] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });
  useEffect(() => {
    if (!inView) return;
    chat.forEach((_, i) => setTimeout(() => setVis(i + 1), i * 1800));
  }, [inView]);
  return (
    <div ref={ref} className="bg-white rounded-2xl border border-gray-200 shadow-xl p-5 w-full max-w-sm">
      <div className="flex items-center gap-1.5 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="text-xs text-gray-400 ml-2 font-mono">oliver-ai · live demo</span>
      </div>
      <div className="space-y-3 min-h-[200px]">
        {chat.slice(0, vis).map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.r === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${m.r === "user" ? "bg-sky-500 text-white rounded-br-sm" : "bg-gray-50 text-gray-800 border border-gray-100 rounded-bl-sm"}`}>
              {m.r === "ai" && <p className="text-sky-500 text-[10px] font-bold mb-1 uppercase tracking-wide">✦ Oliver Bunce AI</p>}
              {m.t}
            </div>
          </motion.div>
        ))}
        {vis < chat.length && vis > 0 && (
          <div className="flex justify-start">
            <div className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                {[0,1,2].map(i => <motion.div key={i} animate={{ y: [0,-3,0] }} transition={{ repeat: Infinity, delay: i*0.15, duration: 0.5 }} className="w-1.5 h-1.5 bg-sky-400 rounded-full" />)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
const services = [
  { icon: "✦", title: "AI Automation", desc: "Custom AI systems that save time and money. From document processing to intelligent workflows — real leverage for your business.", color: "bg-sky-500 text-white", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80", big: true },
  { icon: "◻", title: "Web Design & Dev", desc: "Fast, beautiful, conversion-focused websites built with Next.js and React.", color: "bg-white border border-gray-200", img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80" },
  { icon: "↗", title: "Digital Marketing", desc: "SEO, content strategy, and growth systems that compound over time.", color: "bg-white border border-gray-200", img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80" },
  { icon: "◈", title: "Brand & Strategy", desc: "Positioning, messaging, and visual identity built to last.", color: "bg-white border border-gray-200", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&q=80" },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
const projects = [
  { title: "Door AI", sub: "Independent Doors", desc: "AI that reads building floor plans and generates door quotes automatically. YOLOv8 model trained on 1,400+ architectural drawings — replaced a 2-day manual process with 30 seconds.", tags: ["AI", "Computer Vision"], img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80", hero: true, slug: "door-ai" },
  { title: "Basketball New Zealand", sub: "National Body · Tall Blacks", desc: "Digital presence for NZ basketball.", tags: ["Web Design", "Sports"], img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80", slug: "basketball-nz" },
  { title: "Global Dairy Trade", sub: "Enterprise", desc: "World's leading dairy commodity platform.", tags: ["Enterprise", "Web"], img: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80", slug: "global-dairy-trade" },
  { title: "Round the Bays", sub: "NZ Events", desc: "NZ's most iconic fun run event.", tags: ["Events", "Marketing"], img: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=800&q=80", slug: "round-the-bays" },
  { title: "Summer of Tech", sub: "Education · Tech", desc: "NZ's premier tech internship platform.", tags: ["Education", "Web"], img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", slug: "summer-of-tech" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeClient, setActiveClient] = useState(null);
  return (
    <main className="bg-white text-gray-900 min-h-screen overflow-x-hidden" style={{ cursor: "none" }}>
      <CustomCursor />
      <Nav />

      {/* ── Hero */}
      <section className="relative min-h-screen flex items-center pt-14 overflow-hidden">
        <div className="absolute inset-0 -z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/80 via-white to-white" />
          <motion.div animate={{ scale: [1,1.15,1], opacity: [0.4,0.6,0.4] }} transition={{ duration: 9, repeat: Infinity }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/50 rounded-full blur-[80px] -translate-y-1/4 translate-x-1/4" />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #00000008 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 py-16 w-full">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-600 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                <motion.span animate={{ opacity: [1,0,1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
                Available for projects · NZ & worldwide
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: [0.22,1,0.36,1] }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
                I build digital<br />systems that<br />make you a<br /><Typewriter />
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-sm">
                60+ NZ clients. Web design, AI automation, and digital marketing that drives real growth.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3 mb-10">
                <a href="#work" className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-700 transition-colors active:scale-95">
                  View my work
                </a>
                <a href="#contact" className="border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium text-sm hover:border-gray-400 transition-colors active:scale-95">
                  Start a project →
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
                className="flex gap-8">
                {[{v:60,s:"+",l:"Clients"},{v:8,s:"+",l:"Years"},{v:15,s:"+",l:"Industries"}].map(s => (
                  <div key={s.l}>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900"><Counter value={s.v} suffix={s.s} /></p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-0.5">{s.l}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — AI Demo (hidden on small mobile, shown md+) */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
              className="flex justify-center md:justify-end mt-6 md:mt-0">
              <div className="relative">
                <div className="absolute -inset-3 bg-sky-100 rounded-3xl blur-xl opacity-60" />
                <AIDemo />
                <div className="absolute -bottom-3 -right-3 bg-sky-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  ✦ AI-powered
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Marquee */}
      <Marquee />

      {/* ── Services */}
      <section id="services" className="py-20 md:py-32 px-5 max-w-6xl mx-auto">
        <FadeUp><p className="text-sky-500 text-xs font-bold tracking-widest uppercase mb-2">What I do</p></FadeUp>
        <FadeUp delay={0.1}><h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-12">Services</h2></FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.08}>
              <TiltCard className="h-full">
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}
                  className={`h-full rounded-2xl overflow-hidden group ${s.big ? "sm:col-span-2" : ""}`}>
                  <div className="relative h-40 overflow-hidden">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className={`absolute inset-0 ${s.big ? "bg-sky-500/80" : "bg-gray-900/50"}`} />
                    <span className="absolute top-4 left-4 text-white text-xl">{s.icon}</span>
                  </div>
                  <div className="p-5 bg-white border border-gray-100 border-t-0 rounded-b-2xl">
                    <h3 className="font-bold text-base mb-1.5">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              </TiltCard>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Projects */}
      <section id="work" className="py-20 md:py-32 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <FadeUp><p className="text-sky-500 text-xs font-bold tracking-widest uppercase mb-2">Selected work</p></FadeUp>
          <FadeUp delay={0.1}><h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-12">Projects</h2></FadeUp>
          <div className="space-y-4">
            {projects.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.07}>
                <TiltCard className="w-full">
                  <a href={`/projects/${p.slug}`} className="block">
                    <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}
                      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${p.hero ? "h-64 sm:h-80 md:h-96" : "h-48 sm:h-56"}`}>
                      <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {p.tags.map(t => <span key={t} className="text-xs bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/10">{t}</span>)}
                        </div>
                        <p className="text-gray-300 text-xs mb-0.5">{p.sub}</p>
                        <h3 className={`font-bold text-white ${p.hero ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}>{p.title}</h3>
                        {p.hero && <p className="text-gray-300 text-sm mt-1.5 leading-relaxed max-w-xl hidden sm:block">{p.desc}</p>}
                      </div>
                    </motion.div>
                  </a>
                </TiltCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clients */}
      <section id="clients" className="py-20 md:py-32 px-5 max-w-6xl mx-auto">
        <FadeUp><p className="text-sky-500 text-xs font-bold tracking-widest uppercase mb-2">Who I've worked with</p></FadeUp>
        <FadeUp delay={0.1}><h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">60+ clients<br className="sm:hidden" /> across industries</h2></FadeUp>
        <FadeUp delay={0.15}><p className="text-gray-400 text-sm sm:text-base mb-12 max-w-lg">From national sporting bodies and enterprise platforms to tourism, trades, and everything in between.</p></FadeUp>
        <FadeUp delay={0.2}>
          <ClientGrid onSelect={setActiveClient} />
        </FadeUp>
        <ClientModal client={activeClient} onClose={() => setActiveClient(null)} />
      </section>

      {/* ── Contact */}
      <section id="contact" className="py-20 md:py-32 px-5">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 to-blue-600 px-8 py-16 sm:p-16 md:p-20 text-center">
              <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #ffffff15 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
              <motion.div animate={{ scale: [1,1.3,1] }} transition={{ duration: 7, repeat: Infinity }}
                className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full" />
              <div className="relative z-10">
                <p className="text-white/70 text-xs font-bold tracking-widest uppercase mb-3">Get in touch</p>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">Ready to grow?</h2>
                <p className="text-white/75 text-base sm:text-lg max-w-md mx-auto mb-8">Website, AI system, or full digital strategy — let's talk about what you need.</p>
                <motion.a href="mailto:oliverjbunce@gmail.com" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-block bg-white text-sky-600 font-bold text-base sm:text-lg px-8 sm:px-10 py-4 rounded-full hover:bg-sky-50 transition-colors shadow-xl">
                  oliverjbunce@gmail.com
                </motion.a>
                <p className="text-white/40 text-xs mt-5">New Zealand · Working worldwide</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-6 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} Oliver Bunce · New Zealand</span>
          <span>Built by Vela ✦</span>
        </div>
      </footer>
    </main>
  );
}
