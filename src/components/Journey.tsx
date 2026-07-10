import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import {
  Search,
  Map,
  FileText,
  Plane,
  Home,
  Rocket,
  CheckCircle2,
  Footprints,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   CONTENT — six steps, straight from the EuroZiel roadmap
   ──────────────────────────────────────────────────────────── */
const STEPS: Step[] = [
  {
    number: "01",
    label: "Discovery",
    title: "Your German Dream Begins",
    description:
      "Start with a personalized consultation designed around your academic background, career goals, and future plans in Germany.",
    bullets: [
      "Free 30-Minute Consultation",
      "Profile Evaluation",
      "Goal & Career Mapping",
      "University Shortlisting",
    ],
    stats: ["98% Student Satisfaction", "< 24 Hours Initial Response"],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    Icon: Search,
    accent: "steel",
  },
  {
    number: "02",
    label: "Strategy",
    title: "Building Your Germany Roadmap",
    description:
      "We create a customized application and admission strategy tailored specifically to your profile and target universities.",
    bullets: [
      "Personalized Application Strategy",
      "Domain-Based Expert Guidance",
      "Course & University Matching",
      "Application Timeline Planning",
    ],
    stats: ["Germany-Focused Guidance", "Tailored for Your Profile"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    Icon: Map,
    accent: "gold",
  },
  {
    number: "03",
    label: "Applications",
    title: "Turning Plans Into Offers",
    description:
      "From SOPs to uni-assist submissions, we handle every critical step with accuracy and clarity.",
    bullets: [
      "SOP & LOR Guidance",
      "Application Submission Support",
      "APS Documentation Assistance",
      "University Portal Handling",
    ],
    stats: ["Error-Free Documentation", "End-to-End Support"],
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
    Icon: FileText,
    accent: "emerald",
  },
  {
    number: "04",
    label: "Visa & Pre-Departure",
    title: "Preparing You for Germany",
    description:
      "We guide you through every major requirement before departure so nothing feels overwhelming.",
    bullets: [
      "Blocked Account Guidance",
      "Visa Documentation Support",
      "Accommodation Assistance",
      "Travel & Pre-Departure Preparation",
    ],
    stats: ["Step-by-Step Visa Support", "Complete Pre-Arrival Guidance"],
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
    Icon: Plane,
    accent: "violet",
  },
  {
    number: "05",
    label: "Arrival & Settlement",
    title: "Settling Into Your New Life",
    description:
      "Our support continues even after you land in Germany through our peer and professional network.",
    bullets: [
      "Anmeldung Guidance",
      "Health Insurance Support",
      "Bank Account Setup",
      "Student Community Connections",
    ],
    stats: ["On-Ground Student Support", "Real Guidance From Germany"],
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80",
    Icon: Home,
    accent: "teal",
  },
  {
    number: "06",
    label: "Growth & Career",
    title: "Beyond Admission. Toward Your Future.",
    description:
      "EuroZiel helps students adapt, network, and understand long-term opportunities in Germany and Europe.",
    bullets: [
      "Career & Networking Support",
      "Industry Insights From Professionals",
      "Internship & Job Market Guidance",
      "Long-Term Growth Mentorship",
    ],
    stats: ["Built for Long-Term Success", "Germany to Career Pathway"],
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80",
    Icon: Rocket,
    accent: "amber",
  },
];

const N = STEPS.length;

/* ────────────────────────────────────────────────────────────
   ACCENTS — one signature color per stage of the journey
   ──────────────────────────────────────────────────────────── */
const ACCENTS = {
  steel: { bg: "#3b82c4", glow: "rgba(59,130,196,0.55)", soft: "rgba(59,130,196,0.16)" },
  gold: { bg: "#e5a800", glow: "rgba(229,168,0,0.55)", soft: "rgba(229,168,0,0.16)" },
  emerald: { bg: "#1fae7a", glow: "rgba(31,174,122,0.55)", soft: "rgba(31,174,122,0.16)" },
  violet: { bg: "#8b6fd8", glow: "rgba(139,111,216,0.55)", soft: "rgba(139,111,216,0.16)" },
  teal: { bg: "#2bb3ab", glow: "rgba(43,179,171,0.55)", soft: "rgba(43,179,171,0.16)" },
  amber: { bg: "#e08a3c", glow: "rgba(224,138,60,0.55)", soft: "rgba(224,138,60,0.16)" },
};

/* Direction-aware slide-and-fade for the single visible card */
const cardVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 70 : -70, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -70 : 70, opacity: 0, scale: 0.97 }),
};

/* ────────────────────────────────────────────────────────────
   SINGLE STEP CARD
   ──────────────────────────────────────────────────────────── */
interface Step {
  number: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  stats: string[];
  image: string;
  Icon: React.ComponentType<any>;
  accent: keyof typeof ACCENTS;
}

function StepCard({ step, dir, dark }: { step: Step; dir: number; dark: boolean }) {
  const c = ACCENTS[step.accent];
  return (
    <motion.div
      key={step.number}
      custom={dir}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
      style={{ willChange: "transform, opacity" }}
      className="absolute inset-0"
    >
      <div
        className="relative w-full h-full rounded-[20px] mobile-m:rounded-[28px] overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(100deg, rgba(6,12,22,.97) 0%, rgba(6,12,22,.86) 38%, rgba(6,12,22,.35) 72%, rgba(6,12,22,.15) 100%), url(${step.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: `0 30px 70px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06), 0 0 60px ${c.glow}`,
        }}
      >
        {/* mobile-only scrim — guarantees text contrast regardless of image crop on narrow/tall screens */}
        <div
          className="absolute inset-0 mobile-l:hidden pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,12,22,.55) 0%, rgba(6,12,22,.90) 55%, rgba(6,12,22,.97) 100%)",
          }}
        />

        {/* watermark step number */}
        <span className="pointer-events-none select-none absolute -right-1 -top-3 mobile-m:-right-2 mobile-m:-top-6 text-[90px] mobile-m:text-[130px] laptop:text-[170px] leading-none font-black text-white/[0.05]">
          {step.number}
        </span>

        <div className="relative h-full flex flex-col justify-center gap-3 mobile-m:gap-5 px-5 py-6 mobile-m:px-10 mobile-m:py-10 laptop:px-16 laptop:py-14 max-w-2xl overflow-y-auto">
          {/* eyebrow */}
          <div className="flex items-center gap-2.5 mobile-m:gap-3">
            <div
              className="w-9 h-9 mobile-m:w-11 mobile-m:h-11 rounded-xl flex items-center justify-center border border-white/10 flex-shrink-0"
              style={{ backgroundColor: c.soft }}
            >
              <step.Icon className="w-4 h-4 mobile-m:w-5 mobile-m:h-5" style={{ color: c.bg }} />
            </div>
            <span
              className="text-[9px] mobile-m:text-[11px] font-bold uppercase tracking-[0.2em] mobile-m:tracking-[0.25em]"
              style={{ color: c.bg }}
            >
              Step {step.number} — {step.label}
            </span>
          </div>

          {/* title */}
          <h3 className="text-xl mobile-m:text-3xl laptop:text-4xl font-bold text-white leading-[1.15] tracking-tight">
            {step.title}
          </h3>

          {/* description */}
          <p className="text-xs mobile-m:text-base text-white/65 leading-relaxed max-w-xl">
            {step.description}
          </p>

          {/* bullets */}
          <ul className="grid grid-cols-1 mobile-m:grid-cols-2 gap-x-6 gap-y-2 mobile-m:gap-y-2.5 mt-1">
            {step.bullets.map((b: string) => (
              <li key={b} className="flex items-start gap-2 text-xs mobile-m:text-sm text-white/85">
                <CheckCircle2
                  className="w-3.5 h-3.5 mobile-m:w-4 mobile-m:h-4 mt-0.5 flex-shrink-0"
                  style={{ color: c.bg }}
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* stat strip */}
          <div className="flex flex-wrap gap-2 mobile-m:gap-3 mt-1 mobile-m:mt-2">
            {step.stats.map((s: string) => (
              <span
                key={s}
                className="text-[9px] mobile-m:text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 mobile-m:px-3 mobile-m:py-1.5 rounded-full border border-white/10 text-white/75"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* accent edge glow */}
        <div
          className="absolute inset-0 rounded-[20px] mobile-m:rounded-[28px] pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1.5px ${c.bg}55` }}
        />
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────
   MAIN JOURNEY SECTION
   ──────────────────────────────────────────────────────────── */
export default function GermanyJourney({ theme = "dark" }) {
  const dark = theme === "dark";
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const prevActive = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(N - 1, Math.max(0, Math.round(v * (N - 1))));
    if (idx !== prevActive.current) {
      setDir(idx > prevActive.current ? 1 : -1);
      prevActive.current = idx;
      setActive(idx);
    }
  });

  const activeStep = STEPS[active];
  const activeColor = ACCENTS[activeStep.accent];
  const progressPct = (active / (N - 1)) * 100;

  return (
    <div
      ref={sectionRef}
      className="relative z-40"
      style={{ height: "620vh" }}
    >
      <div
        className={`sticky top-0 h-screen w-full flex flex-col overflow-hidden ${dark ? "bg-transparent" : "bg-transparent"
          }`}
      >
        {/* ambient backdrop glow — plain CSS transition instead of per-frame JS color animation (removes the main source of scroll jank) */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[140px] opacity-30"
          style={{
            backgroundColor: activeColor.bg,
            transition: "background-color 0.6s ease",
            willChange: "background-color",
          }}
        />

        {/* ── Heading ── */}
        <div className="relative pt-16 mobile-m:pt-0 pb-2 text-center px-6 flex-shrink-0">
          <span
            className={`text-xs font-semibold uppercase tracking-[0.3em] ${dark ? "text-white/40" : "text-slate-500"
              }`}
          >
            Your Complete Journey With EuroZiel
          </span>
          <h2
            className={`mt-1 font-bold text-3xl mobile-m:text-4xl laptop:text-5xl tracking-tight ${dark ? "text-slate-100" : "text-slate-900"
              }`}
          >
            Six Steps To{" "}
            <span
              className="font-serif italic"
              style={{ color: activeColor.bg, transition: "color .4s" }}
            >
              Germany
            </span>
          </h2>
        </div>

        {/* ── Progress rail + walking student ── */}
        <div className="relative px-6 mobile-m:px-10 laptop:px-20 4k:px-32 pt-10 pb-6 flex-shrink-0">
          <div className="max-w-3xl laptop:max-w-5xl 4k:max-w-7xl mx-auto relative">
            {/* track */}
            <div
              className={`h-1.5 rounded-full overflow-hidden ${dark ? "bg-white/10" : "bg-slate-200"
                }`}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #3b82c4, #e5a800, #1fae7a, #8b6fd8, #2bb3ab, #e08a3c)",
                  backgroundSize: "600% 100%",
                  willChange: "width",
                }}
                animate={{ width: `${Math.max(4, progressPct)}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 26 }}
              />
            </div>

            {/* markers */}
            <div className="flex justify-between mt-3">
              {STEPS.map((s, i) => {
                const isActive = i === active;
                const isPast = i < active;
                const c = ACCENTS[s.accent];
                return (
                  <div key={s.number} className="flex flex-col items-center w-8">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.35 : 1,
                        backgroundColor:
                          isActive || isPast ? c.bg : dark ? "#1e293b" : "#e2e8f0",
                        boxShadow: isActive ? `0 0 18px ${c.glow}` : "none",
                      }}
                      transition={{ type: "spring", damping: 20, stiffness: 260 }}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    >
                      {isPast ? "✓" : i + 1}
                    </motion.div>
                    <span
                      className={`hidden mobile-m:block text-[9px] laptop:text-[10px] font-semibold uppercase tracking-wider mt-1.5 text-center leading-tight ${isActive
                          ? dark
                            ? "text-white"
                            : "text-slate-900"
                          : dark
                            ? "text-white/35"
                            : "text-slate-400"
                        }`}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* walking student badge, tracks progress along the rail */}
            <motion.div
              className="absolute -top-9 pointer-events-none"
              animate={{ left: `calc(${progressPct}% )` }}
              transition={{ type: "spring", stiffness: 120, damping: 26 }}
              style={{ translateX: "-50%", willChange: "left" }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex flex-col items-center"
                style={{ willChange: "transform" }}
              >
                <div
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: activeColor.bg,
                    backgroundColor: dark ? "#0b1220" : "#ffffff",
                    boxShadow: `0 0 14px ${activeColor.glow}`,
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 30, scale: 0.5 }}
                      transition={{ duration: 0.25 }}
                    >
                      <activeStep.Icon
                        className="w-4.5 h-4.5"
                        style={{ color: activeColor.bg, width: 18, height: 18 }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <Footprints
                  className="w-3.5 h-3.5 mt-0.5 opacity-60"
                  style={{ color: activeColor.bg }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── Single active card, swaps on scroll ── */}
        <div className="relative flex-1 px-4 mobile-m:px-10 laptop:px-20 4k:px-32 pb-6 mobile-m:pb-10">
          <div className="relative max-w-4xl laptop:max-w-5xl mx-auto h-full min-h-[520px] mobile-m:min-h-[440px] laptop:min-h-[480px]">
            <AnimatePresence custom={dir} initial={false} mode="popLayout">
              <StepCard key={activeStep.number} step={activeStep} dir={dir} dark={dark} />
            </AnimatePresence>
          </div>
        </div>

        {/* scroll hint */}
        <div
          className={`flex-shrink-0 text-center pb-6 text-[11px] font-medium uppercase tracking-[0.2em] ${dark ? "text-white/30" : "text-slate-400"
            }`}
        >
          {active < N - 1 ? "Keep scrolling to continue the journey" : "You've reached the end of the journey"}
        </div>
      </div>
    </div>
  );
}