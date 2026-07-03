import React, { useEffect, useRef, useState } from "react";
import { X, Check, Sparkles } from "lucide-react";

// ------------------------------------------------------------------
// Data
// ------------------------------------------------------------------

interface ComparePoint {
  id: number;
  consultancy: string;
  euroziel: string;
}

const comparePoints: ComparePoint[] = [
  {
    id: 1,
    consultancy: "Generic, copy-paste strategies for every student",
    euroziel: "Personalized strategy built around your profile & goals",
  },
  {
    id: 2,
    consultancy: "No real insight into how German universities actually work",
    euroziel: "Direct insight from students currently studying in Germany",
  },
  {
    id: 3,
    consultancy: "Support disappears the moment your visa is stamped",
    euroziel: "End-to-end support until you're settled in Germany",
  },
  {
    id: 4,
    consultancy: "Mentors with little to no real Germany experience",
    euroziel: "Mentors who are Indian professionals working across Europe",
  },
  {
    id: 5,
    consultancy: "Slow, vague, and inconsistent communication",
    euroziel: "Fast, transparent, and honest communication — always",
  },
  {
    id: 6,
    consultancy: "One-size-fits-all applications and unrealistic promises",
    euroziel: "Tailored academic & career pathway guidance, grounded in reality",
  },
];

const centerParagraph =
  "EuroZiel was founded with a clear purpose to give students access to guidance that is honest, Germany-focused, and built on real experience instead of generic consultancy advice. We saw too many capable students lose opportunities because they were given copied strategies, unrealistic expectations, and little understanding of how the German system actually works. That is why EuroZiel combines structured consultancy with direct insight from students currently studying at German public universities, Indian professionals working across Europe, and domain-specific mentors who understand your academic and career pathway. From university applications and APS to visas, accommodation, and settling in Germany, every step is designed to give students clarity, confidence, and practical direction. At EuroZiel, we do not just help you apply to Germany, we help you prepare for life and long-term success there.";

// ------------------------------------------------------------------
// Hook: trigger once when element scrolls into view
// ------------------------------------------------------------------

function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ------------------------------------------------------------------
// Hook: word-by-word typewriter effect
// ------------------------------------------------------------------

function useTypewriter(text: string, active: boolean, speed = 60) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;

    const words = text.split(" ");
    let currentIndex = 0;
    setDisplayed("");
    setDone(false);

    const interval = setInterval(() => {
      currentIndex++;
      setDisplayed(words.slice(0, currentIndex).join(" "));

      if (currentIndex >= words.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return { displayed, done };
}

// ------------------------------------------------------------------
// Side Card (Consultancy / EuroZiel)
// Sits in normal flex flow (NOT absolute) so it can never overlap
// the center content — negative margin + section overflow-hidden
// creates the "peeking off-screen" effect instead.
// ------------------------------------------------------------------

interface SideCardProps {
  side: "left" | "right";
  theme: "red" | "green";
  title: string;
  subtitle: string;
  points: string[];
}

const SideCard: React.FC<SideCardProps> = ({ side, theme, title, subtitle, points }) => {
  const isRed = theme === "red";

  // Negative margin pulls ~25% of the card past the section edge,
  // which then gets clipped by overflow-hidden on the section —
  // giving the "75% visible" peek without absolute/overlap risk.
  const marginClasses =
    side === "left"
      ? "-ml-14 lg:-ml-8 xl:-ml-10 2xl:-ml-24"
      : "-mr-14 lg:-mr-8 xl:-mr-10 2xl:-mr-24";

  const themeClasses = isRed
    ? {
      border: "border-red-500/30",
      glow: "shadow-[0_0_50px_-15px_rgba(239,68,68,0.4)]",
      bgFrom: "from-red-950/90",
      bgTo: "to-red-900/70",
      badge: "bg-red-500/15 text-red-400 border-red-500/30",
      icon: "text-red-400 bg-red-500/10 border-red-500/30",
      heading: "text-red-300",
      line: "bg-red-500/20",
    }
    : {
      border: "border-emerald-500/30",
      glow: "shadow-[0_0_50px_-15px_rgba(16,185,129,0.4)]",
      bgFrom: "from-emerald-950/90",
      bgTo: "to-emerald-900/70",
      badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      icon: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      heading: "text-emerald-300",
      line: "bg-emerald-500/20",
    };

  return (
    <div
      className={`
        hidden lg:block flex-shrink-0
        w-[190px] lg:w-[190px] xl:w-[230px] 2xl:w-[260px]
        ${marginClasses}
        z-10
      `}
    >
      <div
        className={`
          relative overflow-hidden rounded-xl border ${themeClasses.border} ${themeClasses.glow}
          bg-gradient-to-br ${themeClasses.bgFrom} ${themeClasses.bgTo}
          backdrop-blur-xl p-3.5 lg:p-3.5 xl:p-4.5 2xl:p-5
          transition-transform duration-500 ease-out
          hover:${side === "left" ? "-translate-x-[3%]" : "translate-x-[3%]"}
        `}
      >
        {/* badge */}
        <div
          className={`inline-flex items-center gap-1 rounded-full border px-2 lg:px-2 xl:px-2.5 py-0.5 text-[8px] lg:text-[8px] xl:text-[10px] font-semibold uppercase tracking-wider mb-2 xl:mb-2.5 ${themeClasses.badge}`}
        >
          {isRed ? <X className="w-2.5 h-2.5" /> : <Check className="w-2.5 h-2.5" />}
          {isRed ? "Typical Consultancy" : "The EuroZiel Way"}
        </div>

        <h3 className="text-xs lg:text-xs xl:text-base font-bold text-white mb-0.5">{title}</h3>
        <p className={`text-[9px] lg:text-[9px] xl:text-xs mb-2.5 xl:mb-3 ${themeClasses.heading}`}>
          {subtitle}
        </p>

        <div className={`h-px w-full mb-2.5 xl:mb-3 ${themeClasses.line}`} />

        <ul className="space-y-1.5 xl:space-y-2.5">
          {points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-1.5 xl:gap-2">
              <span
                className={`flex-shrink-0 mt-0.5 w-3 h-3 xl:w-3.5 xl:h-3.5 rounded-full border flex items-center justify-center ${themeClasses.icon}`}
              >
                {isRed ? <X className="w-1.5 h-1.5 xl:w-2 xl:h-2" /> : <Check className="w-1.5 h-1.5 xl:w-2 xl:h-2" />}
              </span>
              <span className="text-[9px] lg:text-[9px] xl:text-xs text-gray-200 leading-snug">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// Mobile / Tablet comparison — clean, mobile-friendly two-card layout
// Shown only below lg, where side-by-side peek cards don't fit
// ------------------------------------------------------------------

const MobileCompareStack: React.FC<{
  consultancyPoints: string[];
  eurozielPoints: string[];
}> = ({ consultancyPoints, eurozielPoints }) => {
  return (
    <div className="lg:hidden w-full max-w-xl mx-auto mt-10 sm:mt-12 px-1">
      <div className="relative flex flex-col gap-4 sm:gap-5">
        {/* Consultancy - Red */}
        <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/95 to-red-900/80 backdrop-blur-xl p-5 sm:p-6 shadow-[0_0_40px_-15px_rgba(239,68,68,0.4)]">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/15 text-red-400 px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-4">
            <X className="w-3 h-3" />
            Typical Consultancy
          </div>
          <ul className="space-y-3">
            {consultancyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 flex items-center justify-center">
                  <X className="w-3 h-3" />
                </span>
                <span className="text-sm text-gray-200 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* VS divider */}
        <div className="flex items-center justify-center -my-1 sm:-my-1.5 relative z-10">
          <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0a0e17] border border-white/15 shadow-lg">
            <span className="text-[10px] font-bold text-gray-400">VS</span>
          </div>
        </div>

        {/* EuroZiel - Green */}
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/95 to-emerald-900/80 backdrop-blur-xl p-5 sm:p-6 shadow-[0_0_40px_-15px_rgba(16,185,129,0.4)]">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-4">
            <Check className="w-3 h-3" />
            The EuroZiel Way
          </div>
          <ul className="space-y-3">
            {eurozielPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </span>
                <span className="text-sm text-gray-200 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// Main Section
// ------------------------------------------------------------------

const WhyEuroZielSection: React.FC = () => {
  const { ref: centerRef, inView } = useInView<HTMLDivElement>(0.3);
  const { displayed, done } = useTypewriter(centerParagraph, inView, 45);

  const consultancyPoints = comparePoints.map((p) => p.consultancy);
  const eurozielPoints = comparePoints.map((p) => p.euroziel);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0a0e17] flex flex-col items-center justify-center py-14 sm:py-20 px-4 sm:px-6">
      {/* background ambience */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-red-600/10 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-600/10 rounded-full blur-[100px] sm:blur-[120px]" />
      </div>

      {/* Desktop/laptop row: left card | center content | right card — normal flex flow, never overlaps */}
      <div className="relative z-20 w-full flex items-center justify-center lg:justify-between max-w-[1440px] mx-auto">
        {/* Left Card - Consultancy (Red) */}
        <SideCard
          side="left"
          theme="red"
          title="Typical Consultancy"
          subtitle="What most students go through"
          points={consultancyPoints}
        />

        {/* Center Content */}
        <div
          ref={centerRef}
          className="relative z-20 w-full max-w-[92%] sm:max-w-xl md:max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl mx-auto text-center"
        >
          {/* Glass overlay panel behind text for readability */}
          <div
            className="
              relative rounded-3xl
              bg-[#0a0e17]/70 sm:bg-[#0a0e17]/60
              backdrop-blur-md sm:backdrop-blur-lg
              border border-white/5
              shadow-[0_8px_60px_-15px_rgba(0,0,0,0.6)]
              px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-6 lg:py-8 xl:px-8 xl:py-10
            "
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 mb-5 sm:mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-gray-300">
                Why EuroZiel?
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold text-white mb-4 sm:mb-5 leading-tight">
              More Than a Consultancy.
              <br />
              <span className="bg-gradient-to-r from-red-400 via-white to-emerald-400 bg-clip-text text-transparent">
                A Real Bridge to Germany.
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg lg:text-sm xl:text-base 2xl:text-lg text-gray-300 leading-relaxed min-h-[180px] sm:min-h-[160px] md:min-h-[150px] text-left sm:text-center">
              {displayed}
              {!done && (
                <span className="inline-block w-[2px] h-4 sm:h-5 bg-emerald-400 ml-1 align-middle animate-pulse" />
              )}
            </p>
          </div>
        </div>

        {/* Right Card - EuroZiel (Green) */}
        <SideCard
          side="right"
          theme="green"
          title="EuroZiel"
          subtitle="What we actually deliver"
          points={eurozielPoints}
        />
      </div>

      {/* Comparison cards for mobile/tablet only — below lg */}
      <MobileCompareStack
        consultancyPoints={consultancyPoints}
        eurozielPoints={eurozielPoints}
      />
    </section>
  );
};

export default WhyEuroZielSection;