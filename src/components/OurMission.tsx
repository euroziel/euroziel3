import React, { useEffect, useRef, useState } from "react";
import { X, Check } from "lucide-react";

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

const paragraphs: string[] = [
  "EuroZiel was founded with a clear purpose to give students access to guidance that is honest, Germany-focused, and built on real experience instead of generic consultancy advice. We saw too many capable students lose opportunities because they were given copied strategies, unrealistic expectations, and little understanding of how the German system actually works.",
  "That is why EuroZiel combines structured consultancy with direct insight from students currently studying at German public universities, Indian professionals working across Europe, and domain-specific mentors who understand your academic and career pathway.",
  "From university applications and APS to visas, accommodation, and settling in Germany, every step is designed to give students clarity, confidence, and practical direction. At EuroZiel, we do not just help you apply to Germany, we help you prepare for life and long-term success there.",
];

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
// Hook: word-by-word typewriter across multiple paragraphs
// ------------------------------------------------------------------

function useMultiParagraphTypewriter(
  paragraphsArr: string[],
  active: boolean,
  speed = 45
) {
  const wordArrays = paragraphsArr.map((p) => p.split(" "));
  const totalWords = wordArrays.reduce((sum, arr) => sum + arr.length, 0);

  const [wordsTyped, setWordsTyped] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;

    let currentIndex = 0;
    setWordsTyped(0);
    setDone(false);

    const interval = setInterval(() => {
      currentIndex++;
      setWordsTyped(currentIndex);

      if (currentIndex >= totalWords) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const displayedParagraphs: string[] = [];
  let remaining = wordsTyped;
  let activeParagraphIndex = -1;

  for (let i = 0; i < wordArrays.length; i++) {
    const wordsInThisParagraph = wordArrays[i].length;
    const take = Math.max(0, Math.min(wordsInThisParagraph, remaining));
    displayedParagraphs.push(wordArrays[i].slice(0, take).join(" "));

    if (take > 0 && take < wordsInThisParagraph && activeParagraphIndex === -1) {
      activeParagraphIndex = i;
    }
    remaining -= take;
  }

  if (activeParagraphIndex === -1 && !done) {
    for (let i = displayedParagraphs.length - 1; i >= 0; i--) {
      if (displayedParagraphs[i].length < paragraphsArr[i].length) {
        activeParagraphIndex = i;
        break;
      }
    }
  }

  return { displayedParagraphs, done, activeParagraphIndex };
}

// ------------------------------------------------------------------
// NEW Hook: scroll progress of this section relative to viewport.
// Drives the "rising over hero" entrance (scale + opacity + shadow)
// as the sticky section approaches and locks to the top of the
// viewport. progress: 0 (not reached yet) -> 1 (fully stacked).
// ------------------------------------------------------------------

function useStackProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = 1 - rect.top / vh;
      const clamped = Math.min(1, Math.max(0, raw));
      setProgress(clamped);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return { ref, progress };
}

// ------------------------------------------------------------------
// Side Card (Consultancy / EuroZiel)
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

  const marginClasses =
    side === "left"
      ? "-ml-10 lg:-ml-14 xl:-ml-8 2xl:-ml-20"
      : "-mr-10 lg:-mr-14 xl:-mr-8 2xl:-mr-20";

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
        hidden lg:block
        w-[260px] lg:w-[260px] xl:w-[280px] 2xl:w-[300px]
        ${marginClasses}
         relative z-40
      `}
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl border ${themeClasses.border} ${themeClasses.glow}
          bg-gradient-to-br ${themeClasses.bgFrom} ${themeClasses.bgTo}
          backdrop-blur-xl p-4 lg:p-5 xl:p-5 2xl:p-6
          transition-transform duration-500 ease-out
          hover:${side === "left" ? "-translate-x-[3%]" : "translate-x-[3%]"}
        `}
      >
        <div
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[9px] lg:text-[10px] font-semibold uppercase tracking-wider mb-2.5 lg:mb-3 ${themeClasses.badge}`}
        >
          {isRed ? <X className="w-2.5 h-2.5" /> : <Check className="w-2.5 h-2.5" />}
          {isRed ? "Typical Consultancy" : "The EuroZiel Way"}
        </div>

        <h3 className="text-base lg:text-lg xl:text-xl font-bold text-white mb-0.5">{title}</h3>
        <p className={`text-[11px] lg:text-xs mb-3 lg:mb-4 ${themeClasses.heading}`}>{subtitle}</p>

        <div className={`h-px w-full mb-3 lg:mb-4 ${themeClasses.line}`} />

        <ul className="space-y-2 lg:space-y-2.5">
          {points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 lg:gap-2.5">
              <span
                className={`flex-shrink-0 mt-0.5 w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-full border flex items-center justify-center ${themeClasses.icon}`}
              >
                {isRed ? (
                  <X className="w-2 h-2 lg:w-2.5 lg:h-2.5" />
                ) : (
                  <Check className="w-2 h-2 lg:w-2.5 lg:h-2.5" />
                )}
              </span>
              <span className="text-[11px] lg:text-xs text-gray-200 leading-snug">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// Mobile / Tablet comparison stack
// ------------------------------------------------------------------

const MobileCompareStack: React.FC<{
  consultancyPoints: string[];
  eurozielPoints: string[];
}> = ({ consultancyPoints, eurozielPoints }) => {
  return (
    <div className="lg:hidden w-full max-w-xl mx-auto mt-6 px-1 overflow-y-auto">
      <div className="relative flex flex-col gap-3">
        <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/95 to-red-900/80 backdrop-blur-xl p-4 shadow-[0_0_40px_-15px_rgba(239,68,68,0.4)]">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/15 text-red-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider mb-3">
            <X className="w-3 h-3" />
            Typical Consultancy
          </div>
          <ul className="space-y-2">
            {consultancyPoints.slice(0, 4).map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 flex items-center justify-center">
                  <X className="w-2.5 h-2.5" />
                </span>
                <span className="text-xs text-gray-200 leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center -my-1 relative z-10">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0a0e17] border border-white/15 shadow-lg">
            <span className="text-[9px] font-bold text-gray-400">VS</span>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/95 to-emerald-900/80 backdrop-blur-xl p-4 shadow-[0_0_40px_-15px_rgba(16,185,129,0.4)]">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider mb-3">
            <Check className="w-3 h-3" />
            The EuroZiel Way
          </div>
          <ul className="space-y-2">
            {eurozielPoints.slice(0, 4).map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span className="text-xs text-gray-200 leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// Main Section — now a STICKY OVERLAY that stacks over the Hero,
// and gets pushed away naturally when the next section scrolls up.
// ------------------------------------------------------------------

const WhyEuroZielSection: React.FC = () => {
  const { ref: centerRef, inView } = useInView<HTMLDivElement>(0.3);
  const { displayedParagraphs, done, activeParagraphIndex } = useMultiParagraphTypewriter(
    paragraphs,
    inView,
    45
  );

  const { ref: stackRef, progress } = useStackProgress<HTMLElement>();

  const consultancyPoints = comparePoints.map((p) => p.consultancy);
  const eurozielPoints = comparePoints.map((p) => p.euroziel);

  const entranceScale = 0.94 + progress * 0.06; // 0.94 -> 1
  const entranceOpacity = 0.4 + progress * 0.6; // 0.4 -> 1
  const shadowOpacity = 0.15 + progress * 0.35;

  return (
    <section
      ref={stackRef}
      className="
        sticky top-0 z-40
        w-full h-screen
        overflow-hidden
        bg-[#0a0e17]
        flex flex-col items-center justify-center
        py-6 sm:py-8 px-4 sm:px-6
      "
      style={{
        boxShadow: `0 -40px 80px -20px rgba(0,0,0,${shadowOpacity})`,
      }}
    >
      {/* Inner wrapper handles the rise/fade entrance so the sticky
          element itself is never transformed (transforms on a sticky
          element can break stickiness in some browsers). */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center py-6 sm:py-8 px-4 sm:px-6"
        style={{
          transform: `scale(${entranceScale})`,
          opacity: entranceOpacity,
          transition: "transform 0.05s linear, opacity 0.05s linear",
        }}
      >
        {/* background ambience */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-red-600/10 rounded-full blur-[100px] sm:blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-600/10 rounded-full blur-[100px] sm:blur-[120px]" />
        </div>

        {/* Big standalone section heading */}
        <h2 className="relative z-20 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white text-center mb-3 sm:mb-4 tracking-tight flex-shrink-0">
          <span className="bg-gradient-to-r from-red-400 via-white to-emerald-400 bg-clip-text text-transparent">
            Why EuroZiel?
          </span>
        </h2>

        <div className="relative z-20 w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-0 flex-1 min-h-0">
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
            className="relative z-20 w-full max-w-[92%] sm:max-w-xl md:max-w-2xl lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto text-center"
          >
            <div
              className="
                relative rounded-3xl
                bg-[#0a0e17]/70 sm:bg-[#0a0e17]/60
                backdrop-blur-md sm:backdrop-blur-lg
                border border-white/5
                shadow-[0_8px_60px_-15px_rgba(0,0,0,0.6)]
                px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-9 lg:px-7 lg:py-7 xl:px-8 xl:py-8
              "
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                More Than a Consultancy.
                <br />
                <span className="text-emerald-300">A Real Bridge to Germany.</span>
              </h3>

              <div className="space-y-3 text-left sm:text-center">
                {displayedParagraphs.map((text, idx) => (
                  <p
                    key={idx}
                    className="text-xs sm:text-sm md:text-base lg:text-xs xl:text-sm 2xl:text-base text-gray-300 leading-relaxed"
                  >
                    {text}
                    {!done && activeParagraphIndex === idx && (
                      <span className="inline-block w-[2px] h-4 bg-emerald-400 ml-1 align-middle animate-pulse" />
                    )}
                  </p>
                ))}
              </div>
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

        {/* Comparison cards for mobile/tablet only */}
        <div className="lg:hidden flex-shrink-0 w-full max-h-[38vh] overflow-y-auto">
          <MobileCompareStack
            consultancyPoints={consultancyPoints}
            eurozielPoints={eurozielPoints}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyEuroZielSection;