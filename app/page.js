"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// ─── Brand colours ─────────────────────────────────────────────────────────────
const C = {
  bg: "#FAFAF7",
  ink: "#0A0A0A",
  muted: "#666666",
  rule: "#E5E5E5",
  white: "#FFFFFF",
};

// ─── Fade In (opacity only, very subtle) ──────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const clientNames = [
  "Basketball New Zealand",
  "Independent Doors",
  "Round the Bays",
  "Manor Build",
  "BPM",
  "Global Dairy Trade",
  "Shelving Depot",
  "Smith BioMed",
  "ASEAN NZ Business Council",
  "Permagroup",
  "ICNZ",
  "FrostBoss",
  "Anglers Lodge",
  "Europlan",
  "StuffEvents",
  "Advantage Business",
  "Summer of Tech",
  "Island Cow Cuddles",
  "Betacraft",
  "Nectar",
];

const clientLogos = {
  "Round the Bays": { url: "https://cdn.prod.website-files.com/668b175ce9412bf59c696f59/689e97ae7a7d4b8b1cabb2a2_Horizontal.svg" },
  "Manor Build": { url: "https://cdn.prod.website-files.com/690c0792ccabd9c0a853b5ad/691cec071bfbb392127eb94c_Logo.svg" },
  "Global Dairy Trade": { url: "https://cdn.globaldairytrade.info/ps/static-ss4/img/primary-logo.20f4cce6.svg" },
  "Shelving Depot": { url: "https://shelvingdepot.co.nz/wp-content/uploads/2021/11/shelving-depot-racking-shelving-solutions-logo-white.svg", white: true },
  "Smith BioMed": { url: "https://www.smithbiomed.com/wp-content/uploads/2015/11/SBM-logo-v2.png" },
  "Permagroup": { url: "https://cdn.prod.website-files.com/65d2685948fded0472043333/65d33457a9dc3d7e085f18a6_permagroup-logo.svg" },
  "ICNZ": { url: "https://www.icnz.org.nz/wp-content/uploads/2022/12/ICNZ_Logo_Orange.png" },
  "FrostBoss": { url: "https://cdn.prod.website-files.com/6227d1cf78da29ada668d2ef/6509534e07af84ef459ebc91_Frost%20Boss%20Logo%20Navy%20Stacked.png" },
  "Europlan": { url: "https://europlan.nz/assets/themes/europlan-theme/images/logo.png" },
  "StuffEvents": { url: "https://images.squarespace-cdn.com/content/v1/5cd4abb511f78404abe0e33a/d0e2e9bd-5eea-4397-a64d-8dfbea76bced/STUFF+Logo_BLK.png" },
  "Advantage Business": { url: "https://www.advantagebusiness.co.nz/wp-content/uploads/2020/09/AB-Logo-Black-4.png" },
  "Summer of Tech": { url: "https://images.squarespace-cdn.com/content/v1/60cfd646701da4034512a1c5/1625639692760-IOVPJDH7CY7O3IFUEEFN/Summer-of-Tech_Logo_H.png?format=300w" },
  "Island Cow Cuddles": { url: "https://cdn.prod.website-files.com/6958eea141a6f98e26f2a36e/696328b1103fbdabca8f978a_logotypesmall.png" },
  "Betacraft": { url: "https://betacraftworkwear.com/cdn/shop/files/Betacraft_logo_white-800.png?v=1667443326&width=600", white: true },
  "Basketball New Zealand": { url: "https://www.basketball.org.nz/wp-content/uploads/logo.svg" },
  "Independent Doors": { url: "https://iddoors.co.nz/wp-content/uploads/2023/11/logo.svg" },
  "BPM": { url: "https://images.squarespace-cdn.com/content/v1/6150f24166823d0e2dfd48fe/43816fae-80b4-4821-b61c-32b75abf53fc/bpm_logo+pos.png?format=300w" },
  "Nectar": { url: "https://nectar.co.nz/wp-content/themes/nectar-wp/public/img/nectar_money_2024/24_Nectar_Logo_Money_v1_White.png", white: true },
  "Anglers Lodge": { url: "https://cdn.prod.website-files.com/650d073b70af691cf4e21590/65441c5a68b4d18bf8c3c945_Anglers_Primary%20Coromandel%20Reverse.svg", white: true },
  "ASEAN NZ Business Council": { url: "https://asean.org.nz/sites/default/files/ASEAN_NZ_BC_Logo%20%C6%92_Landscape.png" },
};

const clientInfo = {
  "Basketball New Zealand": { industry: "Sports / National Body", work: "Website redesign & digital strategy for NZ's national basketball organisation." },
  "Independent Doors": { industry: "Construction / Manufacturing", work: "Website, digital marketing, and an AI system that reads floor plans and auto-classifies door types for quoting." },
  "Round the Bays": { industry: "Events", work: "Digital presence and marketing for NZ's most iconic fun run event." },
  "Manor Build": { industry: "Construction", work: "Website design and development for a premium residential building company." },
  "BPM": { industry: "Project Management", work: "Website and digital presence for an independent construction project management consultancy." },
  "Global Dairy Trade": { industry: "Agriculture / Commodities", work: "Digital marketing and web strategy for the world's leading dairy trading platform." },
  "Shelving Depot": { industry: "Retail / Storage", work: "Website design and SEO for NZ's leading shelving and racking solutions provider." },
  "Smith BioMed": { industry: "Biomedical", work: "Website and digital presence for a biomedical technology company." },
  "ASEAN NZ Business Council": { industry: "Trade / Business Council", work: "Website and digital strategy for the ASEAN New Zealand Business Council." },
  "Permagroup": { industry: "Building Products", work: "Website design and digital marketing for a NZ building products company." },
  "ICNZ": { industry: "Insurance", work: "Web presence and digital strategy for the Insurance Council of New Zealand." },
  "FrostBoss": { industry: "AgriTech", work: "Website and digital marketing for a frost protection technology company." },
  "Anglers Lodge": { industry: "Tourism / Hospitality", work: "Website and brand presence for a premier fishing lodge in the Coromandel." },
  "Europlan": { industry: "Interior Design", work: "Website and digital marketing for a premium kitchen and furniture design studio." },
  "StuffEvents": { industry: "Media / Events", work: "Website and event marketing for Stuff's NZ events platform." },
  "Advantage Business": { industry: "Business Consulting", work: "Website and digital presence for a NZ business consultancy." },
  "Summer of Tech": { industry: "Tech / Education", work: "Website and marketing strategy for NZ's premier tech internship programme." },
  "Island Cow Cuddles": { industry: "Tourism / Agriculture", work: "Website and marketing for a unique cow-hugging tourism experience in Hawaii." },
  "Betacraft": { industry: "Workwear / Retail", work: "Digital marketing and web strategy for a leading NZ workwear brand." },
  "Nectar": { industry: "Fintech", work: "Website and marketing for a NZ financial services app." },
};

const services = [
  { icon: "01", title: "AI Automation", desc: "Custom AI systems that save time and money. From document processing to intelligent workflows — real leverage for your business." },
  { icon: "02", title: "Web Design & Dev", desc: "Fast, beautiful, conversion-focused websites built with Next.js and React." },
  { icon: "03", title: "Digital Marketing", desc: "SEO, content strategy, and growth systems that compound over time." },
  { icon: "04", title: "Brand & Strategy", desc: "Positioning, messaging, and visual identity built to last." },
];

const projects = [
  { title: "Door AI", sub: "Independent Doors", desc: "AI that reads building floor plans and generates door quotes automatically. YOLOv8 model trained on 1,400+ architectural drawings — replaced a 2-day manual process with 30 seconds.", tags: ["AI", "Computer Vision"], slug: "door-ai" },
  { title: "Basketball New Zealand", sub: "National Body · Tall Blacks", desc: "Digital presence for NZ basketball.", tags: ["Web Design", "Sports"], slug: "basketball-nz" },
  { title: "Global Dairy Trade", sub: "Enterprise", desc: "World's leading dairy commodity platform.", tags: ["Enterprise", "Web"], slug: "global-dairy-trade" },
  { title: "Round the Bays", sub: "NZ Events", desc: "NZ's most iconic fun run event.", tags: ["Events", "Marketing"], slug: "round-the-bays" },
  { title: "Summer of Tech", sub: "Education · Tech", desc: "NZ's premier tech internship platform.", tags: ["Education", "Web"], slug: "summer-of-tech" },
];

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        borderBottom: `1px solid ${C.rule}`,
        backgroundColor: C.bg,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left */}
        <a
          href="/"
          style={{
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: "-0.01em",
            color: C.ink,
            textDecoration: "none",
          }}
        >
          Oliver Bunce
        </a>

        {/* Right — desktop */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: 32 }}
        >
          <a
            href="mailto:oliver@oliverbunce.com"
            style={{
              fontSize: 13,
              color: C.muted,
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.target.style.color = C.ink)}
            onMouseLeave={(e) => (e.target.style.color = C.muted)}
          >
            oliver@oliverbunce.com
          </a>
          <a
            href="#work"
            style={{
              fontSize: 13,
              color: C.ink,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            Work <span style={{ opacity: 0.5 }}>↗</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            color: C.ink,
          }}
          aria-label="Menu"
        >
          <div style={{ width: 20, display: "flex", flexDirection: "column", gap: 5 }}>
            <motion.div
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              style={{ height: 1, backgroundColor: C.ink }}
            />
            <motion.div
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{ height: 1, backgroundColor: C.ink }}
            />
            <motion.div
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              style={{ height: 1, backgroundColor: C.ink }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            borderTop: `1px solid ${C.rule}`,
            backgroundColor: C.bg,
            padding: "12px 24px 20px",
          }}
          className="md:hidden"
        >
          {["Services", "Work", "Clients", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                fontSize: 16,
                color: C.ink,
                textDecoration: "none",
                borderBottom: `1px solid ${C.rule}`,
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Section Rule ─────────────────────────────────────────────────────────────
function SectionRule({ number, label }) {
  return (
    <div
      style={{
        borderTop: `1px solid ${C.rule}`,
        paddingTop: 20,
        marginBottom: 64,
        display: "flex",
        alignItems: "baseline",
        gap: 16,
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 500,
          color: C.muted,
          letterSpacing: "0.08em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {number}
      </span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 500,
          color: C.muted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [expandedClient, setExpandedClient] = useState(null);

  return (
    <main
      style={{
        backgroundColor: C.bg,
        color: C.ink,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Nav />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 120,
          paddingBottom: 100,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "120px 24px 100px",
        }}
      >
        {/* Available status */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: 12,
            color: C.muted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#0A0A0A",
            }}
          />
          Available for projects
        </motion.p>

        {/* Giant headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(52px, 10vw, 120px)",
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: C.ink,
            marginBottom: 48,
            maxWidth: 900,
          }}
        >
          Oliver Bunce.
          <br />
          <span style={{ fontStyle: "italic" }}>Web Designer.</span>
          <br />
          AI Builder.
          <br />
          <span style={{ fontStyle: "italic" }}>Digital Marketer.</span>
        </motion.h1>

        {/* Sub + CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 560,
          }}
        >
          <p
            style={{
              fontSize: 16,
              color: C.muted,
              lineHeight: 1.6,
            }}
          >
            New Zealand — Working worldwide.
            <br />
            60+ clients. AI systems, websites, and digital marketing built to last.
          </p>

          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <a
              href="#work"
              style={{
                display: "inline-block",
                backgroundColor: C.ink,
                color: C.white,
                fontSize: 13,
                fontWeight: 500,
                padding: "12px 24px",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              View work
            </a>
            <a
              href="#contact"
              style={{
                fontSize: 13,
                color: C.ink,
                textDecoration: "none",
                borderBottom: `1px solid ${C.ink}`,
                paddingBottom: 1,
                letterSpacing: "0.02em",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Start a project →
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── 01 Services ─────────────────────────────────────────────────────── */}
      <section
        id="services"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <FadeUp>
          <SectionRule number="01" label="Services" />
        </FadeUp>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 0,
          }}
        >
          {services.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.06}>
              <div
                style={{
                  padding: "32px 32px 40px 0",
                  borderRight: i < services.length - 1 ? `1px solid ${C.rule}` : "none",
                  paddingRight: i < services.length - 1 ? 32 : 0,
                  paddingLeft: i > 0 ? 32 : 0,
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: C.muted,
                    letterSpacing: "0.08em",
                    marginBottom: 20,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {s.icon}
                </p>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: C.ink,
                    marginBottom: 12,
                    lineHeight: 1.2,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: C.muted,
                    lineHeight: 1.65,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── 02 Selected Work ─────────────────────────────────────────────────── */}
      <section
        id="work"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <FadeUp>
          <SectionRule number="02" label="Selected Work" />
        </FadeUp>

        <div>
          {projects.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.05}>
              <a
                href={`/projects/${p.slug}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "baseline",
                  gap: 24,
                  padding: "24px 0",
                  borderBottom: `1px solid ${C.rule}`,
                  textDecoration: "none",
                  color: "inherit",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
                    <h3
                      style={{
                        fontSize: "clamp(20px, 3vw, 28px)",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        color: C.ink,
                        lineHeight: 1.2,
                      }}
                    >
                      {p.title}
                    </h3>
                    <span
                      style={{
                        fontSize: 13,
                        color: C.muted,
                        fontWeight: 400,
                      }}
                    >
                      {p.sub}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: C.muted,
                      marginTop: 6,
                      lineHeight: 1.5,
                      maxWidth: 560,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                  }}
                >
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 11,
                        color: C.muted,
                        border: `1px solid ${C.rule}`,
                        padding: "3px 10px",
                        letterSpacing: "0.04em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── 03 Clients ───────────────────────────────────────────────────────── */}
      <section
        id="clients"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <FadeUp>
          <SectionRule number="03" label="Clients" />
        </FadeUp>

        <FadeUp delay={0.05}>
          <p
            style={{
              fontSize: "clamp(28px, 5vw, 52px)",
              fontFamily: "var(--font-display), Georgia, serif",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: 56,
              maxWidth: 640,
            }}
          >
            60+ clients across
            <br />
            <span style={{ fontStyle: "italic" }}>New Zealand</span> and beyond.
          </p>
        </FadeUp>

        {/* Client name grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 0,
          }}
        >
          {clientNames.map((name, i) => (
            <FadeUp key={name} delay={i * 0.02}>
              <button
                onClick={() =>
                  setExpandedClient(expandedClient === name ? null : name)
                }
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  borderBottom: `1px solid ${C.rule}`,
                  borderRight: `1px solid ${C.rule}`,
                  padding: "20px 16px",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: C.ink,
                    lineHeight: 1.3,
                    marginBottom: 4,
                  }}
                >
                  {name}
                </p>
                {expandedClient === name && clientInfo[name] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p
                      style={{
                        fontSize: 11,
                        color: C.muted,
                        lineHeight: 1.5,
                        marginTop: 6,
                        fontStyle: "italic",
                      }}
                    >
                      {clientInfo[name].industry}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: C.muted,
                        lineHeight: 1.55,
                        marginTop: 4,
                      }}
                    >
                      {clientInfo[name].work}
                    </p>
                  </motion.div>
                )}
              </button>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <p
            style={{
              fontSize: 12,
              color: C.muted,
              marginTop: 20,
              letterSpacing: "0.04em",
            }}
          >
            Click any client to learn more.
          </p>
        </FadeUp>
      </section>

      {/* ── 04 Contact ───────────────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 24px 120px",
        }}
      >
        <FadeUp>
          <SectionRule number="04" label="Contact" />
        </FadeUp>

        <FadeUp delay={0.05}>
          <div style={{ maxWidth: 720 }}>
            <p
              style={{
                fontSize: "clamp(32px, 6vw, 64px)",
                fontFamily: "var(--font-display), Georgia, serif",
                fontWeight: 400,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                marginBottom: 40,
              }}
            >
              Have a project in mind?
              <br />
              <span style={{ fontStyle: "italic" }}>Let's talk.</span>
            </p>

            <a
              href="mailto:oliver@oliverbunce.com"
              style={{
                display: "inline-block",
                fontSize: "clamp(18px, 3vw, 28px)",
                fontWeight: 500,
                color: C.ink,
                textDecoration: "none",
                borderBottom: `1px solid ${C.ink}`,
                paddingBottom: 2,
                marginBottom: 40,
                letterSpacing: "-0.01em",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              oliver@oliverbunce.com
            </a>

            <div style={{ display: "block", marginTop: 8 }}>
              <a
                href="mailto:oliver@oliverbunce.com"
                style={{
                  display: "inline-block",
                  backgroundColor: C.ink,
                  color: C.white,
                  fontSize: 13,
                  fontWeight: 500,
                  padding: "14px 28px",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Send a message →
              </a>
            </div>

            <p
              style={{
                fontSize: 12,
                color: C.muted,
                marginTop: 32,
                letterSpacing: "0.04em",
              }}
            >
              New Zealand · Working worldwide · Fast response guaranteed
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: `1px solid ${C.rule}`,
          padding: "20px 24px",
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 12, color: C.muted }}>
          © {new Date().getFullYear()} Oliver Bunce · New Zealand
        </span>
        <span style={{ fontSize: 12, color: C.muted }}>
          Built by Vela ✦
        </span>
      </footer>
    </main>
  );
}
