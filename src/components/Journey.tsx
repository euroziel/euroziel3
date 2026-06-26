import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "motion/react";
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

/* ─── Walking Student SVG ───────────────────────────────── */
const StudentChar = () => (
  <svg width="56" height="56" viewBox="0 0 48 48" fill="none" className="w-14 h-14 drop-shadow-lg">
    <line x1="20" y1="34" x2="17" y2="44" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <line x1="28" y1="34" x2="31" y2="44" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <rect x="17" y="20" width="14" height="14" rx="3" fill="#1b73ba" />
    <rect x="14" y="22" width="3" height="8" rx="1.5" fill="#ef4444" />
    <line x1="17" y1="23" x2="12" y2="29" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="31" y1="23" x2="36" y2="17" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="24" cy="13" r="6" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1" />
    <circle cx="22" cy="12.5" r="0.8" fill="#1e293b" />
    <circle cx="26" cy="12.5" r="0.8" fill="#1e293b" />
    <path d="M22 15C22.5 16 25.5 16 26 15" stroke="#1e293b" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M14 9L24 5L34 9L24 13L14 9Z" fill="#1e293b" />
    <path d="M24 13V17M30 11.5L31 14.5" stroke="#e5a800" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/* ─── Single Step Card ──────────────────────────────────── */
function StepCard({ step, isActive, dark }: { step: typeof steps[0]; isActive: boolean; dark: boolean }) {
  const colors = accentColors[step.accent] || accentColors.navy;
  return (
    <motion.div
      animate={{
        scale: isActive ? 1 : 0.88,
        opacity: isActive ? 1 : 0.4,
      }}
      transition={{ type: "spring", damping: 22, stiffness: 120 }}
      className="flex-shrink-0 w-[85vw] mobile-m:w-[80vw] mobile-l:w-[70vw] md:w-[45vw] laptop:w-[380px] 4k:w-[480px]"
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

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
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

  // Determine active step
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(5, Math.floor(v * 6));
    setActiveIndex(Math.max(0, idx));
  });

  // ─── Horizontal Translation ──────────────────────────
  // Total strip width ≈ 6 cards × card width + gaps
  // We translate from 0% (showing card 1) to roughly -83% (showing card 6)
  // The exact value = (numCards - 1) / numCards * 100
  const translateX = useTransform(smoothProgress, [0, 1], ["0%", "-83.33%"]);

  // ─── Progress bar width ──────────────────────────────
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // ─── Walking character position ──────────────────────
  const charLeft = useTransform(smoothProgress, [0, 1], ["4%", "92%"]);

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
            <div className="max-w-3xl laptop:max-w-5xl 4k:max-w-7xl mx-auto relative">
              {/* Track background */}
              <div className={`h-1.5 rounded-full ${dark ? "bg-slate-800" : "bg-slate-200"}`}>
                <motion.div
                  style={{ width: progressWidth }}
                  className="h-full rounded-full bg-gradient-to-r from-[#1b73ba] via-[#4f46e5] to-[#e5a800]"
                />
              </div>

              {/* Step markers */}
              <div className="flex justify-between mt-3">
                {steps.map((s, idx) => {
                  const active = activeIndex === idx;
                  const past = idx < activeIndex;
                  const colors = accentColors[s.accent] || accentColors.navy;
                  return (
                    <div key={s.number} className="flex flex-col items-center">
                      <motion.div
                        animate={{
                          scale: active ? 1.4 : 1,
                          backgroundColor: active ? colors.bg : past ? colors.bg : (dark ? "#334155" : "#cbd5e1"),
                          boxShadow: active ? `0 0 16px ${colors.glow}` : "none",
                        }}
                        transition={{ type: "spring", damping: 18 }}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      >
                        {past ? "✓" : idx + 1}
                      </motion.div>
                      <span
                        className={`text-[8px] mobile-m:text-[9px] laptop:text-[11px] font-bold uppercase tracking-wider mt-1.5 transition-colors duration-200 ${
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

              {/* Walking student character */}
              <motion.div
                style={{ left: charLeft }}
                className="absolute -top-5 pointer-events-none z-20"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <StudentChar />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* ─── Horizontal Card Strip ─── */}
          <div className="flex-1 flex items-center overflow-hidden">
            <motion.div
              style={{ x: translateX }}
              className="flex gap-6 mobile-m:gap-8 laptop:gap-10 pl-[8vw] pr-[20vw]"
            >
              {steps.map((step, i) => (
                <StepCard
                  key={step.number}
                  step={step}
                  isActive={activeIndex === i}
                  dark={dark}
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