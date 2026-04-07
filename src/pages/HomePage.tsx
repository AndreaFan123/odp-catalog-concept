/**
 * HomePage — Full-page dark landing experience.
 *
 * Design decisions: DD-26 (persona routing), DD-27 (IA problem framing), DD-28 (always dark)
 * Wireframe: design/wireframes/home-page.md
 *
 * Does NOT use AppShell. Owns its own fixed navbar and scroll state.
 * Background is always #0d1117 — intentional per DD-28.
 *
 * Four sections:
 *   1. Hero       — what is this
 *   2. Categories — what data is available
 *   3. Personas   — who starts where (DD-26)
 *   4. Footer     — concept disclaimer
 */

import { useEffect, useState, useCallback, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getCollections } from "../lib/stac";
import { CATEGORIES, matchesCategory } from "../lib/categories";

// ─── Partners marquee ─────────────────────────────────────────────────────────

const COLLABORATORS = [
  'UNESCO',
  'UN Ocean Decade',
  'IMR Norway',
  'NOAA',
  'SINTEF',
  'NTNU',
  'NORCE',
  'NOC',
  'UiT Arctic University',
  'Woods Hole Oceanographic Institution',
  'Iliad Digital Twin of the Ocean',
  'Blue Cloud 2026',
]

function HomePartnersMarquee() {
  const [paused, setPaused] = useState(false)
  const items = [...COLLABORATORS, ...COLLABORATORS]

  return (
    <section
      aria-label="Science collaborators"
      style={{
        padding: '96px 0',
        overflow: 'hidden',
        background: '#0d1117',
      }}
    >
      <p
        style={{
          fontSize: 'clamp(24px, 4vw, 48px)',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#03FFD1',
          textAlign: 'center',
          marginBottom: 32,
        }}
      >
        SCIENCE COLLABORATORS
      </p>

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0, top: 0, bottom: 0,
            width: 120,
            background: 'linear-gradient(to right, #0d1117, transparent)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 0, top: 0, bottom: 0,
            width: 120,
            background: 'linear-gradient(to left, #0d1117, transparent)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        <div
          className="marquee-track"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee 60s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {items.map((name, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                padding: '0 16px',
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(14px, 2vw, 18px)',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.85)',
                  letterSpacing: '0.02em',
                }}
              >
                {name}
              </span>
              {/* <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  margin: '0 24px',
                  verticalAlign: 'middle',
                  flexShrink: 0,
                }}
              /> */}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Category icons — same paths as AppShell sidebar ─────────────────────────

function IconBiodiversity() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8c0-2.5 2-4.5 5-4.5S13 5.5 13 8s-2 4.5-5 4.5S3 10.5 3 8z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M13 5l2-2M13 11l2 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="6" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

function IconOceanPhysics() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 8c1-2 2-2 3 0s2 2 3 0 2-2 3 0 2 2 3 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconAcoustics() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="2" fill="currentColor" />
      <path
        d="M4.5 11.5a5 5 0 000-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11.5 4.5a5 5 0 010 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMPA() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 2L3 4v4c0 3 2.5 5 5 6 2.5-1 5-3 5-6V4L8 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconIndustry() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.3 3.3l1.4 1.4M11.3 11.3l1.4 1.4M12.7 3.3l-1.4 1.4M4.7 11.3l-1.4 1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCoral() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 14V8M8 8l-3-3M8 8l3-3M5 5l-2-2M11 5l2-2M5 5V3M11 5V3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

type CategoryId =
  | "biodiversity"
  | "ocean-physics"
  | "acoustics"
  | "mpa"
  | "industry"
  | "coral";

const CATEGORY_ICONS: Record<CategoryId, ReactNode> = {
  biodiversity: <IconBiodiversity />,
  "ocean-physics": <IconOceanPhysics />,
  acoustics: <IconAcoustics />,
  mpa: <IconMPA />,
  industry: <IconIndustry />,
  coral: <IconCoral />,
};

// ─── Persona card data ────────────────────────────────────────────────────────

interface PersonaCard {
  title: string;
  description: string;
  cta: string;
  icon: ReactNode;
  action: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HomePage() {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [ctaHovered, setCtaHovered] = useState(false);

  // ── Scroll listener for navbar ──────────────────────────────────────────────
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Category counts from STAC API ───────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    getCollections()
      .then((collections) => {
        if (cancelled) return;
        const c: Record<string, number> = {};
        CATEGORIES.forEach((cat) => {
          c[cat.id] = collections.filter((col) =>
            matchesCategory(col, cat),
          ).length;
        });
        setCounts(c);
      })
      .catch(() => {
        // Silently degrade — counts show '—' when unavailable
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Fade-up IntersectionObserver ────────────────────────────────────────────
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ── Persona actions — navigate to sector landing pages ──────────────────────
  const goToScience = useCallback(
    () => navigate({ to: "/solutions/science" }),
    [navigate],
  );
  const goToIndustry = useCallback(
    () => navigate({ to: "/solutions/industry" }),
    [navigate],
  );
  const goToGovernance = useCallback(
    () => navigate({ to: "/solutions/governance" }),
    [navigate],
  );
  const goToCitizen = useCallback(
    () => navigate({ to: "/solutions/citizen" }),
    [navigate],
  );

  const personaCards: PersonaCard[] = [
    {
      title: "Marine Researchers",
      description:
        "Find FAIR-standard datasets with spatial and temporal coverage. Connect via Python or R SDK.",
      cta: "Explore scientific data",
      action: goToScience,
      icon: (
        <svg
          width={32}
          height={32}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 18h8M3 22h18M14 22a7 7 0 1 0 0-14h-1" />
          <path d="M9 14V4l3 3-3 3" />
          <path d="M9 4h6" />
        </svg>
      ),
    },
    {
      title: "Ocean Industry",
      description:
        "Access metocean, acoustic, and environmental monitoring data for operations and ESG reporting.",
      cta: "Explore industry data",
      action: goToIndustry,
      icon: (
        <svg
          width={32}
          height={32}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 21h18M3 7v14M3 7l9-4 9 4M3 7h18v14M9 21V12h6v9" />
        </svg>
      ),
    },
    {
      title: "ESG & Finance",
      description:
        "Assess nature-related risks with TNFD-aligned ocean data. Map operations against sensitive marine habitats.",
      cta: "Explore nature risk data",
      action: goToGovernance,
      icon: (
        <svg
          width={32}
          height={32}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Data Contributors",
      description:
        "Share your company's ocean data. Hub Ocean transforms it to FAIR standards and makes it discoverable.",
      cta: "Learn about sharing",
      action: goToCitizen,
      icon: (
        <svg
          width={32}
          height={32}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#0d1117",
        minHeight: "100vh",
        color: "#ffffff",
      }}
    >
      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          padding: "0 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 100,
          transition: "background 0.3s, backdrop-filter 0.3s",
          background: scrolled ? "rgba(13,17,23,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
        className="home-navbar"
      >
        {/* Left — Hub Ocean logo */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate({ to: "/" })}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") navigate({ to: "/" });
          }}
          aria-label="Hub Ocean, go to homepage"
          style={{ cursor: "pointer" }}
        >
          <img
            src="/assets/HUB-Ocean-logo.webp"
            alt="Hub Ocean"
            style={{ height: 28, display: "block" }}
          />
        </div>

        {/* Right — Browse Catalog CTA */}
        <NavCatalogButton onClick={() => navigate({ to: "/catalog" })} />
      </nav>

      {/* ── SECTION 1: HERO ────────────────────────────────────────────────── */}
      <section
        id="main-content"
        aria-label="Hero"
        style={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d1117",
        }}
      >
        {/* Background video — muted, autoplay, no controls, decorative */}
        <video
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            // Slight desaturation so the video doesn't compete with text
            filter: "saturate(0.7) brightness(0.55)",
          }}
        >
          <source src="/assets/wave.mp4" type="video/mp4" />
        </video>

        {/* Layer 1 — overall dark base so text always reads */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(13,17,23,0.55)",
          }}
        />

        {/* Layer 1b — centre radial: darken edges further */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 0%, rgba(13,17,23,0.4) 60%, rgba(13,17,23,0.75) 100%)",
          }}
        />

        {/* Layer 2 — bottom-left corner: deep shadow to hide watermark */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 65% 55% at 0% 100%, rgba(13,17,23,1) 0%, rgba(13,17,23,0.85) 40%, transparent 75%)",
          }}
        />

        {/* Layer 3 — bottom-right corner: matching deep shadow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 65% 55% at 100% 100%, rgba(13,17,23,1) 0%, rgba(13,17,23,0.85) 40%, transparent 75%)",
          }}
        />

        {/* Layer 4 — top fade so navbar area reads cleanly */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(13,17,23,0.6) 0%, transparent 30%)",
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: 1000,
            padding: "0 24px",
          }}
        >
          <p
            className="fade-up"
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#03FFD1",
              marginBottom: 20,
            }}
          >
            OCEAN DATA PLATFORM · CONCEPT REDESIGN
          </p>

          <h1
            className="fade-up"
            style={{
              fontSize: "clamp(50px, 10vw, 90px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              marginBottom: 24,
              transitionDelay: "0.08s",
            }}
          >
            The world&rsquo;s ocean data,
            <br />
            made usable.
          </h1>

          <p
            className="fade-up"
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 auto 40px",
              transitionDelay: "0.16s",
            }}
          >
            38 public collections. Open, FAIR, and ready to explore.
          </p>

          <HeroCTA
            onClick={() => navigate({ to: "/catalog" })}
            hovered={ctaHovered}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
          />
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            color: "rgba(255,255,255,0.2)",
            fontSize: 16,
            letterSpacing: "0.15em",
          }}
        >
          <span>SCROLL</span>
          <svg
            width={14}
            height={14}
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animation: "bounce 1.5s ease-in-out infinite" }}
          >
            <path d="M2 5l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* ── SECTION 3: PERSONA ROUTING ─────────────────────────────────────── */}
      <section
        aria-label="Who explores ocean data"
        style={{ background: "#0d1117", padding: "96px 48px" }}
        className="home-section"
      >
        <h2
          className="fade-up"
          style={{
            fontSize: "clamp(24px, 4vw, 48px)",
            fontWeight: 700,
            color: "#FFFFFF",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Who explores ocean data?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            maxWidth: 1100,
            margin: "0 auto",
          }}
          className="persona-grid"
        >
          {personaCards.map((card, i) => (
            <PersonaCardItem key={card.title} card={card} delay={i * 0.08} />
          ))}
        </div>
      </section>

      <HomePartnersMarquee />

      {/* ── SECTION 2: BROWSE BY CATEGORY ──────────────────────────────────── */}
      <section
        aria-label="Browse by category"
        style={{ background: "#111827", padding: "96px 48px" }}
        className="home-section"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            maxWidth: 1100,
            margin: "0 auto 40px",
          }}
        >
          <h2
            className="fade-up"
            style={{
              fontSize: "clamp(24px, 4vw, 48px)",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            Browse by category
          </h2>
          <button
            type="button"
            onClick={() => navigate({ to: "/catalog" })}
            style={{
              fontSize: 16,
              color: "#03FFD1",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              whiteSpace: "nowrap",
            }}
          >
            View all 38 collections &rarr;
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
            maxWidth: 1100,
            margin: "0 auto",
          }}
          className="category-grid"
        >
          {CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              label={cat.label}
              count={counts[cat.id]}
              icon={CATEGORY_ICONS[cat.id as CategoryId] ?? null}
              delay={i * 0.08}
              onClick={() =>
                navigate({ to: "/catalog", search: { category: cat.id } })
              }
            />
          ))}
        </div>
      </section>

      {/* ── SECTION 4: FOOTER ───────────────────────────────────────────────── */}
      <footer
        aria-label="Site footer"
        style={{
          background: "#060a0f",
          padding: "48px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
        className="home-footer"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 24,
            maxWidth: 1100,
            margin: "0 auto",
          }}
          className="footer-inner"
        >
          {/* Left */}
          <div>
            <img
              src="/assets/HUB-Ocean-logo.webp"
              alt="Hub Ocean"
              style={{ height: 24, display: "block", marginBottom: 8, opacity: 0.7 }}
            />
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.25)",
                marginTop: 4,
                lineHeight: 1.6,
              }}
            >
              A concept redesign of the Hub Ocean Ocean Data Platform.
              <br />
              Built with AI-assisted development.
            </div>
          </div>

          {/* Right — links */}
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <FooterLink href="https://app.hubocean.earth" label="Hub Ocean" />
            <FooterLink href="#" label="GitHub" />
            <FooterLink
              href="https://api.hubocean.earth/api/stac/collections"
              label="STAC API"
            />
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            maxWidth: 1100,
            margin: "32px auto 0",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.04)",
            fontSize: 11,
            color: "rgba(255,255,255,0.15)",
            textAlign: "center",
          }}
        >
          Data via Hub Ocean public STAC API &middot; Not an official Hub Ocean
          product &middot; Andrea Fan &middot; 2026
        </div>
      </footer>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavCatalogButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#03FFD1",
        color: "#0d1117",
        padding: "8px 20px",
        borderRadius: 99,
        fontSize: 14,
        fontWeight: 600,
        border: "none",
        cursor: "pointer",
        opacity: hovered ? 0.85 : 1,
        transition: "opacity 0.2s",
      }}
    >
      Browse Catalog
    </button>
  );
}

function HeroCTA({
  onClick,
  hovered,
  onMouseEnter,
  onMouseLeave,
}: {
  onClick: () => void;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <button
      type="button"
      className="fade-up"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        background: "#03FFD1",
        color: "#0d1117",
        padding: "14px 32px",
        borderRadius: 99,
        fontSize: 16,
        fontWeight: 700,
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 8px 24px rgba(3,255,209,0.25)" : "none",
        transitionDelay: "0.24s",
      }}
    >
      Browse the Catalog &rarr;
    </button>
  );
}

interface CategoryCardProps {
  label: string;
  count: number | undefined;
  icon: ReactNode;
  delay: number;
  onClick: () => void;
}

function CategoryCard({
  label,
  count,
  icon,
  delay,
  onClick,
}: CategoryCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      role="button"
      tabIndex={0}
      className="fade-up"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Browse ${label} datasets`}
      style={{
        background: hovered
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.03)",
        border: hovered
          ? "1px solid rgba(3,255,209,0.3)"
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 12,
        padding: "24px 20px",
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transform: hovered ? "translateY(-2px)" : "none",
        transitionDelay: `${delay}s`,
      }}
    >
      <div style={{ color: "#03FFD1" }}>{icon}</div>
      <div style={{ fontSize: 24, fontWeight: 600, color: "#ffffff" }}>
        {label}
      </div>
      <div
        style={{
          fontSize: 16,
          color: "rgba(255,255,255,0.35)",
          fontFamily: "Roboto Mono, monospace",
        }}
      >
        {count !== undefined ? `${count} collections` : "— collections"}
      </div>
    </div>
  );
}

interface PersonaCardItemProps {
  card: PersonaCard;
  delay: number;
}

function PersonaCardItem({ card, delay }: PersonaCardItemProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      role="button"
      tabIndex={0}
      className="fade-up"
      onClick={card.action}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") card.action();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${card.title}: ${card.cta}`}
      style={{
        background: hovered ? "rgba(3,255,209,0.03)" : "rgba(255,255,255,0.03)",
        border: hovered
          ? "1px solid rgba(3,255,209,0.25)"
          : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        transition: "all 0.2s",
        cursor: "pointer",
        transform: hovered ? "translateY(-2px)" : "none",
        transitionDelay: `${delay}s`,
      }}
    >
      <div style={{ color: "#03FFD1", width: 32, height: 32 }}>{card.icon}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: "#ffffff" }}>
        {card.title}
      </div>
      <div
        style={{
          fontSize: 16,
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.7,
          flexGrow: 1,
        }}
      >
        {card.description}
      </div>
      <div
        style={{
          fontSize: 16,
          color: "#03FFD1",
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {card.cta} &rarr;
      </div>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 13,
        color: hovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
        textDecoration: "none",
        transition: "color 0.2s",
      }}
    >
      {label} &#8599;
    </a>
  );
}
 