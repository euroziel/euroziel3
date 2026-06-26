import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from "motion/react";
import { Search, Map, FileText, Plane, Home, TrendingUp } from "lucide-react";

/* ─── Step Data ─────────────────────────────────────────── */
const steps = [
  {
    number: "01", label: "Discovery", title: "Your German Dream Begins",
    description: "Start with a personalized consultation to map your unique path to Germany.",
    Icon: Search,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
    accent: "navy",
  },
  {
    number: "02", label: "Strategy", title: "Building Your Germany Roadmap",
    description: "Customized university and career strategy based on your profile.",
    Icon: Map,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    accent: "gold",
  },
  {
    number: "03", label: "Applications", title: "Turning Plans Into Offers",
    description: "Complete SOP, APS and university application support.",
    Icon: FileText,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
    accent: "emerald",
  },
  {
    number: "04", label: "Visa", title: "Preparing You For Germany",
    description: "Visa, blocked account and pre departure guidance.",
    Icon: Plane,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",
    accent: "purple",
  },
  {
    number: "05", label: "Settlement", title: "Your New Life Starts",
    description: "Support after landing in Germany.",
    Icon: Home,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800",
    accent: "teal",
  },
  {
    number: "06", label: "Career", title: "Beyond Admission",
    description: "Career and long term mentorship.",
    Icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
    accent: "navy",
  },
];

const accentColors: Record<string, { bg: string; glow: string; iconBg: string; iconText: string }> = {
  navy:    { bg: "#4f46e5", glow: "rgba(79,70,229,0.5)",  iconBg: "rgba(79,70,229,0.15)",  iconText: "#818cf8" },
  gold:    { bg: "#f59e0b", glow: "rgba(245,158,11,0.5)", iconBg: "rgba(245,158,11,0.15)", iconText: "#fbbf24" },
  emerald: { bg: "#10b981", glow: "rgba(16,185,129,0.5)", iconBg: "rgba(16,185,129,0.15)", iconText: "#34d399" },
  purple:  { bg: "#a855f7", glow: "rgba(168,85,247,0.5)", iconBg: "rgba(168,85,247,0.15)", iconText: "#c084fc" },
  teal:    { bg: "#14b8a6", glow: "rgba(20,184,166,0.5)", iconBg: "rgba(20,184,166,0.15)", iconText: "#2dd4bf" },
};

/* ─── Step-Specific Student SVG Characters ─────────────── */

/** Step 01 — Discovery: Boy with magnifying glass, curious pose */
const StudentDiscovery = () => (
  <svg width="56" height="56" viewBox="0 0 48 48" fill="none" className="w-14 h-14 drop-shadow-lg">
    {/* Legs — standing still, curious */}
    <line x1="20" y1="34" x2="18" y2="44" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <line x1="28" y1="34" x2="30" y2="44" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    {/* Body (shirt) */}
    <rect x="17" y="20" width="14" height="14" rx="3" fill="#1b73ba" />
    {/* Backpack strap */}
    <rect x="14" y="22" width="3" height="8" rx="1.5" fill="#ef4444" />
    {/* Left arm — holding magnifying glass */}
    <line x1="17" y1="23" x2="10" y2="18" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    {/* Magnifying glass */}
    <circle cx="8" cy="15" r="4" stroke="#f59e0b" strokeWidth="1.8" fill="none" />
    <line x1="11" y1="18" x2="13" y2="20" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
    {/* Right arm — by side */}
    <line x1="31" y1="23" x2="35" y2="30" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    {/* Head */}
    <circle cx="24" cy="13" r="6" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1" />
    {/* Eyes — looking curious (wider) */}
    <circle cx="22" cy="12" r="1" fill="#1e293b" />
    <circle cx="26" cy="12" r="1" fill="#1e293b" />
    {/* Mouth — open, curious */}
    <ellipse cx="24" cy="15.5" rx="1.2" ry="0.8" fill="#1e293b" />
    {/* Graduation cap */}
    <path d="M14 9L24 5L34 9L24 13L14 9Z" fill="#1e293b" />
    <path d="M24 13V17M30 11.5L31 14.5" stroke="#e5a800" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/** Step 02 — Strategy: Boy thinking, hand on chin */
const StudentStrategy = () => (
  <svg width="56" height="56" viewBox="0 0 48 48" fill="none" className="w-14 h-14 drop-shadow-lg">
    {/* Legs */}
    <line x1="20" y1="34" x2="19" y2="44" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <line x1="28" y1="34" x2="29" y2="44" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    {/* Body */}
    <rect x="17" y="20" width="14" height="14" rx="3" fill="#1b73ba" />
    <rect x="14" y="22" width="3" height="8" rx="1.5" fill="#ef4444" />
    {/* Left arm — resting */}
    <line x1="17" y1="23" x2="12" y2="29" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    {/* Right arm — hand on chin (thinking) */}
    <line x1="31" y1="23" x2="28" y2="16" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    {/* Head */}
    <circle cx="24" cy="13" r="6" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1" />
    {/* Eyes — looking up, thinking */}
    <circle cx="22" cy="11.5" r="0.8" fill="#1e293b" />
    <circle cx="26" cy="11.5" r="0.8" fill="#1e293b" />
    {/* Eyebrows — raised */}
    <line x1="20.5" y1="10" x2="23" y2="9.8" stroke="#1e293b" strokeWidth="0.7" strokeLinecap="round" />
    <line x1="25" y1="9.8" x2="27.5" y2="10" stroke="#1e293b" strokeWidth="0.7" strokeLinecap="round" />
    {/* Mouth — thinking, slight pout */}
    <path d="M23 15.5C23.3 15 24.7 15 25 15.5" stroke="#1e293b" strokeWidth="0.8" strokeLinecap="round" />
    {/* Thought bubble */}
    <circle cx="36" cy="6" r="3.5" fill="white" stroke="#cbd5e1" strokeWidth="0.8" />
    <circle cx="33" cy="10" r="1.5" fill="white" stroke="#cbd5e1" strokeWidth="0.6" />
    <circle cx="31" cy="12" r="0.8" fill="white" stroke="#cbd5e1" strokeWidth="0.4" />
    {/* Lightbulb inside thought bubble */}
    <path d="M35 4.5C35 3.5 36 3 36 3C37.5 3 37.5 5 36.5 5.5L36 7" stroke="#f59e0b" strokeWidth="0.8" strokeLinecap="round" />
    <line x1="35.5" y1="7.5" x2="36.5" y2="7.5" stroke="#f59e0b" strokeWidth="0.6" strokeLinecap="round" />
    {/* Graduation cap */}
    <path d="M14 9L24 5L34 9L24 13L14 9Z" fill="#1e293b" />
    <path d="M24 13V17M30 11.5L31 14.5" stroke="#e5a800" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/** Step 03 — Applications: Boy holding documents */
const StudentApplications = () => (
  <svg width="56" height="56" viewBox="0 0 48 48" fill="none" className="w-14 h-14 drop-shadow-lg">
    {/* Legs */}
    <line x1="20" y1="34" x2="18" y2="44" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <line x1="28" y1="34" x2="30" y2="44" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    {/* Body */}
    <rect x="17" y="20" width="14" height="14" rx="3" fill="#1b73ba" />
    <rect x="14" y="22" width="3" height="8" rx="1.5" fill="#ef4444" />
    {/* Left arm — holding documents up */}
    <line x1="17" y1="24" x2="10" y2="20" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    {/* Documents / papers stack */}
    <rect x="5" y="13" width="9" height="7" rx="1" fill="white" stroke="#94a3b8" strokeWidth="0.8" />
    <line x1="7" y1="15.5" x2="12" y2="15.5" stroke="#94a3b8" strokeWidth="0.5" />
    <line x1="7" y1="17" x2="11" y2="17" stroke="#94a3b8" strokeWidth="0.5" />
    <line x1="7" y1="18.5" x2="10" y2="18.5" stroke="#94a3b8" strokeWidth="0.5" />
    {/* Checkmark on doc */}
    <path d="M8 14.5L9 15.5L11 13.5" stroke="#10b981" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
    {/* Right arm — by side */}
    <line x1="31" y1="23" x2="35" y2="29" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    {/* Head */}
    <circle cx="24" cy="13" r="6" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1" />
    <circle cx="22" cy="12.5" r="0.8" fill="#1e293b" />
    <circle cx="26" cy="12.5" r="0.8" fill="#1e293b" />
    {/* Smile — confident */}
    <path d="M22 15C22.5 16 25.5 16 26 15" stroke="#1e293b" strokeWidth="0.8" strokeLinecap="round" />
    {/* Graduation cap */}
    <path d="M14 9L24 5L34 9L24 13L14 9Z" fill="#1e293b" />
    <path d="M24 13V17M30 11.5L31 14.5" stroke="#e5a800" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/** Step 04 — Visa: Boy holding passport */
const StudentVisa = () => (
  <svg width="56" height="56" viewBox="0 0 48 48" fill="none" className="w-14 h-14 drop-shadow-lg">
    {/* Legs */}
    <line x1="20" y1="34" x2="19" y2="44" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <line x1="28" y1="34" x2="29" y2="44" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    {/* Body */}
    <rect x="17" y="20" width="14" height="14" rx="3" fill="#1b73ba" />
    <rect x="14" y="22" width="3" height="8" rx="1.5" fill="#ef4444" />
    {/* Left arm — down */}
    <line x1="17" y1="23" x2="12" y2="29" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    {/* Right arm — holding up passport proudly */}
    <line x1="31" y1="22" x2="37" y2="14" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    {/* Passport */}
    <rect x="34" y="8" width="7" height="10" rx="1" fill="#1e3a5f" stroke="#2563eb" strokeWidth="0.8" />
    {/* Passport details — German flag stripe */}
    <rect x="35.5" y="10" width="4" height="1" rx="0.2" fill="#000000" />
    <rect x="35.5" y="11" width="4" height="1" rx="0.2" fill="#dc2626" />
    <rect x="35.5" y="12" width="4" height="1" rx="0.2" fill="#eab308" />
    {/* Passport text lines */}
    <line x1="35.5" y1="14.5" x2="39.5" y2="14.5" stroke="#94a3b8" strokeWidth="0.4" />
    <line x1="36" y1="15.5" x2="39" y2="15.5" stroke="#94a3b8" strokeWidth="0.4" />
    {/* Head */}
    <circle cx="24" cy="13" r="6" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1" />
    <circle cx="22" cy="12.5" r="0.8" fill="#1e293b" />
    <circle cx="26" cy="12.5" r="0.8" fill="#1e293b" />
    {/* Big proud smile */}
    <path d="M21.5 15C22.5 16.5 25.5 16.5 26.5 15" stroke="#1e293b" strokeWidth="0.8" strokeLinecap="round" />
    {/* Graduation cap */}
    <path d="M14 9L24 5L34 9L24 13L14 9Z" fill="#1e293b" />
    <path d="M24 13V17M30 11.5L31 14.5" stroke="#e5a800" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/** Step 05 — Settlement: Boy with suitcase */
const StudentSettlement = () => (
  <svg width="56" height="56" viewBox="0 0 48 48" fill="none" className="w-14 h-14 drop-shadow-lg">
    {/* Legs — walking */}
    <line x1="20" y1="34" x2="17" y2="44" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <line x1="28" y1="34" x2="31" y2="44" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    {/* Body */}
    <rect x="17" y="20" width="14" height="14" rx="3" fill="#1b73ba" />
    <rect x="14" y="22" width="3" height="8" rx="1.5" fill="#ef4444" />
    {/* Left arm — waving hello */}
    <line x1="17" y1="23" x2="10" y2="16" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    {/* Wave lines */}
    <line x1="7" y1="13" x2="9" y2="14" stroke="#f59e0b" strokeWidth="0.8" strokeLinecap="round" />
    <line x1="6" y1="15" x2="8" y2="15.5" stroke="#f59e0b" strokeWidth="0.8" strokeLinecap="round" />
    {/* Right arm — pulling suitcase */}
    <line x1="31" y1="25" x2="38" y2="30" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    {/* Suitcase */}
    <rect x="35" y="30" width="8" height="10" rx="1.5" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="0.8" />
    <line x1="37" y1="30" x2="37" y2="28" stroke="#7c3aed" strokeWidth="1" strokeLinecap="round" />
    <line x1="41" y1="30" x2="41" y2="28" stroke="#7c3aed" strokeWidth="1" strokeLinecap="round" />
    {/* Suitcase handle */}
    <line x1="37" y1="28" x2="41" y2="28" stroke="#7c3aed" strokeWidth="1" strokeLinecap="round" />
    {/* Suitcase wheels */}
    <circle cx="37" cy="41" r="1" fill="#475569" />
    <circle cx="41" cy="41" r="1" fill="#475569" />
    {/* Suitcase strap */}
    <line x1="36" y1="34" x2="42" y2="34" stroke="#7c3aed" strokeWidth="0.6" />
    {/* Head */}
    <circle cx="24" cy="13" r="6" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1" />
    <circle cx="22" cy="12.5" r="0.8" fill="#1e293b" />
    <circle cx="26" cy="12.5" r="0.8" fill="#1e293b" />
    <path d="M22 15C22.5 16 25.5 16 26 15" stroke="#1e293b" strokeWidth="0.8" strokeLinecap="round" />
    {/* Graduation cap */}
    <path d="M14 9L24 5L34 9L24 13L14 9Z" fill="#1e293b" />
    <path d="M24 13V17M30 11.5L31 14.5" stroke="#e5a800" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/** Step 06 — Career: Boy celebrating, arms up */
const StudentCareer = () => (
  <svg width="56" height="56" viewBox="0 0 48 48" fill="none" className="w-14 h-14 drop-shadow-lg">
    {/* Legs — power stance */}
    <line x1="20" y1="34" x2="16" y2="44" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <line x1="28" y1="34" x2="32" y2="44" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    {/* Body */}
    <rect x="17" y="20" width="14" height="14" rx="3" fill="#1b73ba" />
    <rect x="14" y="22" width="3" height="8" rx="1.5" fill="#ef4444" />
    {/* Left arm — raised celebrating */}
    <line x1="17" y1="23" x2="9" y2="14" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    {/* Right arm — raised celebrating */}
    <line x1="31" y1="23" x2="39" y2="14" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    {/* Sparkles / celebration marks */}
    <line x1="6" y1="11" x2="8" y2="13" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" />
    <line x1="7" y1="14" x2="5" y2="13" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" />
    <line x1="42" y1="11" x2="40" y2="13" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" />
    <line x1="41" y1="14" x2="43" y2="13" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" />
    {/* Star sparks */}
    <circle cx="8" cy="8" r="1" fill="#f59e0b" />
    <circle cx="40" cy="8" r="1" fill="#f59e0b" />
    <circle cx="24" cy="2" r="1.2" fill="#10b981" />
    {/* Head */}
    <circle cx="24" cy="13" r="6" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1" />
    <circle cx="22" cy="12" r="0.8" fill="#1e293b" />
    <circle cx="26" cy="12" r="0.8" fill="#1e293b" />
    {/* Big happy grin */}
    <path d="M21 15C22 17 26 17 27 15" stroke="#1e293b" strokeWidth="0.9" strokeLinecap="round" />
    {/* Graduation cap */}
    <path d="M14 9L24 5L34 9L24 13L14 9Z" fill="#1e293b" />
    <path d="M24 13V17M30 11.5L31 14.5" stroke="#e5a800" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/** Maps step index to the matching character pose */
const stepCharacters = [
  StudentDiscovery,    // Step 01
  StudentStrategy,     // Step 02
  StudentApplications, // Step 03
  StudentVisa,         // Step 04
  StudentSettlement,   // Step 05
  StudentCareer,       // Step 06
];

/* ─── Single Step Card ──────────────────────────────────── */
function StepCard({ step, isActive, dark, width }: { step: typeof steps[0]; isActive: boolean; dark: boolean; width: number }) {
  const colors = accentColors[step.accent] || accentColors.navy;
  return (
    <motion.div
      animate={{
        scale: isActive ? 1 : 0.88,
        opacity: isActive ? 1 : 0.4,
      }}
      transition={{ type: "spring", damping: 22, stiffness: 120 }}
      className="flex-shrink-0"
      style={{ width }}
    >
      <div
        className="relative rounded-3xl overflow-hidden h-[340px] mobile-m:h-[380px] laptop:h-[420px] shadow-2xl"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(4,17,31,.15) 0%, rgba(4,17,31,.92) 100%), url(${step.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: isActive
            ? `0 25px 60px -12px rgba(0,0,0,0.4), 0 0 40px ${colors.glow}`
            : "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        {/* Step number watermark */}
        <div className="absolute top-4 right-5 text-[80px] font-black text-white/[0.06] leading-none select-none">
          {step.number}
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          {/* Icon badge */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-xl border border-white/10"
            style={{ backgroundColor: colors.iconBg }}
          >
            <step.Icon className="w-5 h-5" style={{ color: colors.iconText }} />
          </div>

          {/* Label */}
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block"
            style={{ color: colors.iconText }}
          >
            Step {step.number} — {step.label}
          </span>

          {/* Title */}
          <h3 className="text-xl mobile-m:text-2xl font-bold text-white leading-tight mb-2">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/60 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Active glow border */}
        {isActive && (
          <motion.div
            layoutId="activeGlow"
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              border: `2px solid ${colors.bg}`,
              boxShadow: `inset 0 0 30px ${colors.glow}`,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          />
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main Journey Component ────────────────────────────── */
interface JourneyProps { theme: "light" | "dark"; }

export default function Journey({ theme }: JourneyProps) {
  const dark = theme === "dark";

  // Ref for the tall outer container that creates scroll distance
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({ cardWidth: 380, gap: 40 });

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      
      let cardWidth = 380;
      let gap = 40;
      if (w < 375) {
        cardWidth = w * 0.85;
        gap = 24;
      } else if (w < 425) {
        cardWidth = w * 0.80;
        gap = 32;
      } else if (w < 768) {
        cardWidth = w * 0.70;
        gap = 32;
      } else if (w < 1024) {
        cardWidth = w * 0.45;
        gap = 32;
      } else if (w >= 2560) {
        cardWidth = 480;
        gap = 40;
      }
      setDimensions({ cardWidth, gap });
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Track scroll progress through the tall container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 80 });

  // Determine active step based on smooth progress (to match the card motion perfectly)
  useMotionValueEvent(smoothProgress, "change", (v) => {
    const idx = Math.round(v * 5);
    setActiveIndex(Math.min(5, Math.max(0, idx)));
  });

  // ─── Horizontal Translation ──────────────────────────
  // Total translation centers each active card dynamically
  const totalTranslation = -5 * (dimensions.cardWidth + dimensions.gap);
  const translateX = useTransform(smoothProgress, [0, 1], [0, totalTranslation]);

  // ─── Progress bar width ──────────────────────────────
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // ─── Walking character position ──────────────────────
  const charLeft = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* 
        Tall outer container — creates vertical scroll distance.
        height = 400vh means the user scrolls 4 screens to traverse all 6 steps.
        NO overflow-hidden here so sticky works!
      */}
      <div
        ref={sectionRef}
        className="relative z-40"
        style={{ height: "400vh" }}
      >
        {/*
          Sticky inner viewport — pins to screen while scrolling through the tall container.
          This is the visible "section" that fills the viewport.
        */}
        <div
          className={`sticky top-0 h-screen flex flex-col ${
            dark ? "bg-[#060814]" : "bg-white"
          }`}
          style={{
            boxShadow: "0 -30px 60px rgba(0,0,0,0.55)",
          }}
        >
          {/* ─── Section Title ─── */}
          <div className="pt-20 pb-4 text-center px-4 flex-shrink-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`font-bold text-3xl mobile-m:text-4xl laptop:text-5xl ${
                dark ? "text-slate-100" : "text-slate-900"
              }`}
            >
              Six Steps To{" "}
              <span className={dark ? "font-serif italic text-amber-400" : "font-serif italic text-indigo-600"}>
                Germany
              </span>
            </motion.h2>
          </div>

          {/* ─── Progress Bar + Walking Character ─── */}
          <div className="px-6 mobile-m:px-8 laptop:px-16 4k:px-24 py-4 flex-shrink-0">
            {/* Taller container to fit walking student and label without overlap */}
            <div className="w-full relative pt-12 pb-16">
              
              {/* Track line */}
              <div className={`absolute top-16 left-0 right-0 h-1.5 rounded-full ${dark ? "bg-slate-800" : "bg-slate-200"}`}>
                <motion.div
                  style={{ width: progressWidth }}
                  className="h-full rounded-full bg-gradient-to-r from-[#1b73ba] via-[#4f46e5] to-[#e5a800]"
                />
              </div>

              {/* Walking student character — changes per step */}
              <motion.div
                style={{ left: charLeft }}
                className="absolute top-0 -translate-x-1/2 pointer-events-none z-20"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {(() => {
                        const CharComponent = stepCharacters[activeIndex] || stepCharacters[0];
                        return <CharComponent />;
                      })()}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              {/* Step markers (circles + labels) positioned absolutely to line up mathematically */}
              <div className="absolute top-[50px] left-0 right-0">
                {steps.map((s, idx) => {
                  const active = activeIndex === idx;
                  const past = idx < activeIndex;
                  const colors = accentColors[s.accent] || accentColors.navy;
                  return (
                    <div
                      key={s.number}
                      className="absolute -translate-x-1/2 flex flex-col items-center"
                      style={{ left: `${idx * 20}%` }}
                    >
                      <motion.div
                        animate={{
                          scale: active ? 1.4 : 1,
                          backgroundColor: active ? colors.bg : past ? colors.bg : (dark ? "#334155" : "#cbd5e1"),
                          boxShadow: active ? `0 0 16px ${colors.glow}` : "none",
                        }}
                        transition={{ type: "spring", damping: 18 }}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-slate-900"
                      >
                        {past ? "✓" : idx + 1}
                      </motion.div>
                      <span
                        className={`text-[8px] mobile-m:text-[9px] laptop:text-[11px] font-bold uppercase tracking-wider mt-2.5 transition-colors duration-200 ${
                          active
                            ? (dark ? "text-amber-400" : "text-indigo-600")
                            : past
                            ? (dark ? "text-slate-400" : "text-slate-600")
                            : "text-slate-500"
                        }`}
                      >
                        {isMobile ? s.number : s.label}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* ─── Horizontal Card Strip ─── */}
          <div className="flex-1 flex items-center overflow-hidden">
            <motion.div
              style={{
                x: translateX,
                gap: dimensions.gap,
                paddingLeft: `calc(50vw - ${dimensions.cardWidth / 2}px)`,
                paddingRight: `calc(50vw - ${dimensions.cardWidth / 2}px)`,
              }}
              className="flex flex-row items-center"
            >
              {steps.map((step, i) => (
                <StepCard
                  key={step.number}
                  step={step}
                  isActive={activeIndex === i}
                  dark={dark}
                  width={dimensions.cardWidth}
                />
              ))}
            </motion.div>
          </div>

          {/* ─── Bottom fade edge ─── */}
          <div
            className="h-12 flex-shrink-0"
            style={{
              background: dark
                ? "linear-gradient(to bottom, transparent, #060814)"
                : "linear-gradient(to bottom, transparent, white)",
            }}
          />
        </div>
      </div>
    </>
  );
}