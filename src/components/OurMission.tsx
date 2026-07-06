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

interface ParagraphCard {
  title: string;
  text: string;
}

const paragraphCards: ParagraphCard[] = [
  {
    title: "Our Purpose",
    text: "EuroZiel was founded with a clear purpose to give students access to guidance that is honest, Germany-focused, and built on real experience instead of generic consultancy advice. We saw too many capable students lose opportunities because they were given copied strategies, unrealistic expectations, and little understanding of how the German system actually works.",
  },
  {
    title: "Our Approach",
    text: "That is why EuroZiel combines structured consultancy with direct insight from students currently studying at German public universities, Indian professionals working across Europe, and domain-specific mentors who understand your academic and career pathway.",
  },
  {
    title: "Our Promise",
    text: "From university applications and APS to visas, accommodation, and settling in Germany, every step is designed to give students clarity, confidence, and practical direction. At EuroZiel, we do not just help you apply to Germany, we help you prepare for life and long-term success there.",
  },
];

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

// ------------------------------------------------------------------
// Hook: trigger once when element scrolls into view
// ------------------------------------------------------------------

function useInView<T extends HTMLElement>(threshold = 0.2) {
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
// Hook: pinned-scroll progress (0 -> 1) across a tall wrapper.
// The wrapper is much taller than 100vh; the inner section is
// `sticky top-0 h-screen`. As the user scrolls through the tall
// wrapper, this returns how far through that scroll distance we are.
// We use this single value to drive: entrance -> horizontal card
// carousel -> center fade-out -> big comparison overlay, in sequence.
// ------------------------------------------------------------------

function usePinnedProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableDistance = el.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) {
        setProgress(0);
        return;
      }

      const scrolled = -rect.top;
      const frac = scrolled / scrollableDistance;
      setProgress(clamp(frac, 0, 1));
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
// Side Card (Consultancy / EuroZiel) — grows bigger & moves inward
// as `growth` (0 -> 1) increases, ending as a large final comparison
// card once the center card has faded away.
// ------------------------------------------------------------------

interface SideCardProps {
  theme: "red" | "green";
  title: string;
  subtitle: string;
  points: string[];
  growth: number;
}

const SideCard: React.FC<SideCardProps> = ({ theme, title, subtitle, points, growth }) => {
  const isRed = theme === "red";

  const themeClasses = isRed
    ? {
      border: "border-red-500/40",
      glow: "shadow-[0_0_70px_-10px_rgba(239,68,68,0.6)]",
      bgFrom: "from-red-950/95",
      bgTo: "to-red-900/80",
      badge: "bg-red-500/15 text-red-400 border-red-500/30",
      icon: "text-red-400 bg-red-500/10 border-red-500/30",
      heading: "text-red-300",
      line: "bg-red-500/20",
      ring: "ring-1 ring-red-500/20",
    }
    : {
      border: "border-emerald-500/40",
      glow: "shadow-[0_0_70px_-10px_rgba(16,185,129,0.6)]",
      bgFrom: "from-emerald-950/95",
      bgTo: "to-emerald-900/80",
      badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      icon: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      heading: "text-emerald-300",
      line: "bg-emerald-500/20",
      ring: "ring-1 ring-emerald-500/20",
    };

  // Font/spacing scale up slightly as the card grows into its final,
  // prominent comparison-card size.
  const titleSize = growth > 0.6 ? "text-xl lg:text-2xl xl:text-3xl" : "text-base lg:text-lg xl:text-xl";
  const pointSize = growth > 0.6 ? "text-[13px] lg:text-sm xl:text-base" : "text-[11px] lg:text-xs";
  const padding = growth > 0.6 ? "p-5 lg:p-7 xl:p-8" : "p-4 lg:p-5 xl:p-5 2xl:p-6";

  return (
    <div
      className={`
        w-[240px] lg:w-[250px] xl:w-[270px] 2xl:w-[290px]
        relative overflow-hidden rounded-2xl border ${themeClasses.border} ${themeClasses.glow} ${themeClasses.ring}
        bg-gradient-to-br ${themeClasses.bgFrom} ${themeClasses.bgTo}
        backdrop-blur-xl ${padding}
        transition-[width,padding] duration-300 ease-out
      `}
      style={{
        width: `${240 + growth * 160}px`,
      }}
    >
      {/* inner glow accent */}
      <div
        className={`pointer-events-none absolute -top-10 -right-10 rounded-full blur-2xl ${
          isRed ? "bg-red-500/20" : "bg-emerald-500/20"
        }`}
        style={{ width: `${128 + growth * 60}px`, height: `${128 + growth * 60}px` }}
      />

      <div
        className={`relative inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[9px] lg:text-[10px] font-semibold uppercase tracking-wider mb-2.5 lg:mb-3 ${themeClasses.badge}`}
      >
        {isRed ? <X className="w-2.5 h-2.5" /> : <Check className="w-2.5 h-2.5" />}
        {isRed ? "Typical Consultancy" : "The EuroZiel Way"}
      </div>

      <h3 className={`relative font-bold text-white mb-0.5 transition-all duration-300 ${titleSize}`}>
        {title}
      </h3>
      <p className={`relative text-[11px] lg:text-xs mb-3 lg:mb-4 ${themeClasses.heading}`}>
        {subtitle}
      </p>

      <div className={`relative h-px w-full mb-3 lg:mb-4 ${themeClasses.line}`} />

      <ul className="relative space-y-2 lg:space-y-2.5">
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
            <span className={`${pointSize} text-gray-200 leading-snug transition-all duration-300`}>
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ------------------------------------------------------------------
// Mobile / Tablet comparison stack
// ------------------------------------------------------------------

const MobileCompareStack: React.FC<{
  consultancyPoints: string[];
  eurozielPoints: string[];
  opacity: number;
}> = ({ consultancyPoints, eurozielPoints, opacity }) => {
  return (
    <div
      className="lg:hidden w-full max-w-xl mx-auto mt-4 px-1 overflow-y-auto transition-opacity duration-700"
      style={{ opacity }}
    >
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
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#05070d] border border-white/15 shadow-lg">
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
// Main Section
// ------------------------------------------------------------------

const WhyEuroZielSection: React.FC = () => {
  const { ref: viewRef, inView } = useInView<HTMLDivElement>(0.15);
  const { ref: pinRef, progress } = usePinnedProgress<HTMLDivElement>();

  const consultancyPoints = comparePoints.map((p) => p.consultancy);
  const eurozielPoints = comparePoints.map((p) => p.euroziel);
  const numCards = paragraphCards.length;

  // ---- Phase breakdown of the single `progress` value (0 -> 1) ----
  // 1) Entrance rise-in
  const entranceP = clamp(progress / 0.1, 0, 1);
  // 2) Horizontal carousel through the 3 paragraph cards.
  //    Side cards are fully hidden throughout this phase.
  const cardsP = clamp((progress - 0.1) / 0.5, 0, 1);
  // 3) Center card fades/shrinks away while the two comparison
  //    cards grow bigger and move inward, with a blurred backdrop.
  const overlayP = clamp((progress - 0.66) / 0.34, 0, 1);

  const activeCardIndex = Math.min(
    numCards - 1,
    Math.round(cardsP * (numCards - 1))
  );

  // ---- Per-card typewriter (types the active card's paragraph once) ----
  const completedRef = useRef<boolean[]>(paragraphCards.map(() => false));
  const [typedText, setTypedText] = useState<string[]>(
    paragraphCards.map(() => "")
  );

  useEffect(() => {
    if (!inView) return;
    if (completedRef.current[activeCardIndex]) return;

    const words = paragraphCards[activeCardIndex].text.split(" ");
    let i = 0;

    const interval = setInterval(() => {
      i++;
      setTypedText((prev) => {
        const next = [...prev];
        next[activeCardIndex] = words.slice(0, i).join(" ");
        return next;
      });
      if (i >= words.length) {
        clearInterval(interval);
        completedRef.current[activeCardIndex] = true;
      }
    }, 32);

    return () => clearInterval(interval);
  }, [activeCardIndex, inView]);

  const getCardText = (idx: number) =>
    completedRef.current[idx] ? paragraphCards[idx].text : typedText[idx];

  // ---- Derived visual values ----
  const entranceScale = 0.94 + entranceP * 0.06;
  const entranceOpacity = 0.35 + entranceP * 0.65;
  const trackTranslate = cardsP * ((numCards - 1) / numCards) * 100;
  const showScrollHint = progress > 0.02 && cardsP < 0.9 && overlayP < 0.05;

  // Center card fades and shrinks away during the overlay phase
  const centerOpacity = 1 - overlayP;
  const centerScale = 1 - overlayP * 0.2;
  const centerPointerEvents = overlayP > 0.4 ? "none" : "auto";

  // Side cards slide inward and grow as overlayP -> 1
  const sideOpacity = overlayP;
  const sidePointerEvents = overlayP > 0.5 ? "auto" : "none";
  const leftTranslate = (1 - overlayP) * -140;
  const rightTranslate = (1 - overlayP) * 140;

  return (
    // Tall pin wrapper — controls how much page-scroll distance the
    // whole sequence (entrance -> carousel -> big comparison) takes up.
    <div ref={pinRef} className="relative" style={{ height: "320vh" }}>
      <section
        ref={viewRef}
        className="sticky top-0 z-40 w-full h-screen overflow-hidden bg-[#05070d] flex flex-col items-center justify-center py-6 sm:py-8 px-4 sm:px-6"
        style={{
          boxShadow: `0 -40px 90px -20px rgba(0,0,0,${0.2 + overlayP * 0.35})`,
        }}
      >
        {/* Inner wrapper handles the rise/fade entrance */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center py-6 sm:py-8 px-4 sm:px-6"
          style={{
            transform: `scale(${entranceScale})`,
            opacity: entranceOpacity,
            transition: "transform 0.05s linear, opacity 0.05s linear",
          }}
        >
          {/* ---------------- background ambience ---------------- */}
          <div className="pointer-events-none absolute inset-0">
            {/* faint grid texture */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div
              className="absolute top-1/4 left-1/4 rounded-full blur-[110px] sm:blur-[140px] bg-red-600/15 animate-pulse transition-all duration-500"
              style={{
                width: `${320 + overlayP * 120}px`,
                height: `${320 + overlayP * 120}px`,
              }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 rounded-full blur-[110px] sm:blur-[140px] bg-emerald-600/15 animate-pulse transition-all duration-500"
              style={{
                width: `${320 + overlayP * 120}px`,
                height: `${320 + overlayP * 120}px`,
                animationDelay: "1.2s",
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-indigo-500/5 rounded-full blur-[130px]" />

            {/* full backdrop blur/dim once the comparison takes over */}
            <div
              className="absolute inset-0 bg-black/60 transition-opacity duration-500"
              style={{
                opacity: overlayP,
                backdropFilter: `blur(${overlayP * 18}px)`,
                WebkitBackdropFilter: `blur(${overlayP * 18}px)`,
              }}
            />
          </div>

          {/* Big standalone section heading */}
          <h2 className="relative z-20 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white text-center mb-3 sm:mb-4 tracking-tight flex-shrink-0 transition-opacity duration-300"
            style={{ opacity: 1 - overlayP * 0.4 }}
          >
            <span className="bg-gradient-to-r from-red-400 via-white to-emerald-400 bg-clip-text text-transparent">
              Why EuroZiel?
            </span>
          </h2>

          {overlayP > 0.15 && (
            <p
              className="relative z-20 text-center text-xs sm:text-sm text-gray-400 mb-4 max-w-md transition-opacity duration-300"
              style={{ opacity: overlayP }}
            >
              See the difference for yourself
            </p>
          )}

          <div className="relative z-20 w-full max-w-[1500px] mx-auto flex items-center justify-center flex-1 min-h-0">
            {/* --------- Left comparison card (hidden during carousel, grows in at the end) --------- */}
            <div
              className="hidden lg:block absolute left-0 xl:left-8 2xl:left-20 z-30"
              style={{
                top: "50%",
                opacity: sideOpacity,
                transform: `translateY(-50%) translateX(${leftTranslate}px)`,
                transition: "transform 0.4s ease-out, opacity 0.4s ease-out",
                pointerEvents: sidePointerEvents,
              }}
            >
              <SideCard
                theme="red"
                title="Typical Consultancy"
                subtitle="What most students go through"
                points={consultancyPoints}
                growth={overlayP}
              />
            </div>

            {/* --------------------- Center carousel card --------------------- */}
            <div
              className="relative z-20 w-full max-w-[94%] sm:max-w-2xl md:max-w-3xl lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto"
              style={{
                opacity: centerOpacity,
                transform: `scale(${centerScale})`,
                transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
                pointerEvents: centerPointerEvents,
              }}
            >
              <div className="relative rounded-3xl bg-[#0a0e17]/80 sm:bg-[#0a0e17]/70 backdrop-blur-md sm:backdrop-blur-lg border border-white/10 shadow-[0_10px_70px_-15px_rgba(0,0,0,0.7)] overflow-hidden">
                {/* top gradient accent line */}
                <div className="h-[3px] w-full bg-gradient-to-r from-red-500 via-white/40 to-emerald-500" />

                <div className="px-6 pt-7 sm:px-10 sm:pt-10 md:px-12 md:pt-11 lg:px-9 lg:pt-9 xl:px-10 xl:pt-10">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold text-white mb-1.5 leading-tight text-center">
                    More Than a Consultancy.
                    <br />
                    <span className="text-emerald-300">A Real Bridge to Germany.</span>
                  </h3>
                  <p className="text-center text-xs sm:text-sm text-gray-500 mb-5">
                    Card {activeCardIndex + 1} of {numCards}
                  </p>
                </div>

                {/* horizontal scrolling track, driven by scroll progress */}
                <div className="relative overflow-hidden px-6 sm:px-10 md:px-12 lg:px-9 xl:px-10 pb-2">
                  <div
                    className="flex"
                    style={{
                      width: `${numCards * 100}%`,
                      transform: `translateX(-${trackTranslate}%)`,
                      transition: "transform 0.15s linear",
                    }}
                  >
                    {paragraphCards.map((card, idx) => {
                      const isActive = idx === activeCardIndex;
                      return (
                        <div
                          key={idx}
                          className="flex-shrink-0 px-2"
                          style={{ width: `${100 / numCards}%` }}
                        >
                          <div
                            className={`h-full flex flex-col items-center justify-center text-center rounded-2xl border p-6 sm:p-7 md:p-8 transition-all duration-300 ${
                              isActive
                                ? "border-emerald-500/30 bg-white/[0.04] shadow-[0_0_50px_-20px_rgba(16,185,129,0.6)]"
                                : "border-white/5 bg-white/[0.015] opacity-40"
                            }`}
                            style={{ minHeight: "240px" }}
                          >
                            <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-emerald-400/80 mb-3">
                              0{idx + 1}
                            </span>
                            <h4 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3">
                              {card.title}
                            </h4>
                            <p className="text-sm sm:text-base md:text-lg lg:text-sm xl:text-base text-gray-300 leading-relaxed text-center max-w-md">
                              {getCardText(idx)}
                              {isActive && !completedRef.current[idx] && (
                                <span className="inline-block w-[2px] h-4 bg-emerald-400 ml-1 align-middle animate-pulse" />
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* progress dots */}
                <div className="flex items-center justify-center gap-2 pb-6 pt-1">
                  {paragraphCards.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeCardIndex
                          ? "w-7 bg-gradient-to-r from-red-400 to-emerald-400"
                          : "w-1.5 bg-white/15"
                      }`}
                    />
                  ))}
                </div>

                {showScrollHint && (
                  <p className="text-center text-[11px] text-gray-500 pb-5 animate-pulse">
                    Keep scrolling ↓
                  </p>
                )}
              </div>
            </div>

            {/* --------- Right comparison card (hidden during carousel, grows in at the end) --------- */}
            <div
              className="hidden lg:block absolute right-0 xl:right-8 2xl:right-20 z-30"
              style={{
                top: "50%",
                opacity: sideOpacity,
                transform: `translateY(-50%) translateX(${rightTranslate}px)`,
                transition: "transform 1s ease-out, opacity 1s ease-out",
                pointerEvents: sidePointerEvents,
              }}
            >
              <SideCard
                theme="green"
                title="EuroZiel"
                subtitle="What we actually deliver"
                points={eurozielPoints}
                growth={overlayP}
              />
            </div>

            {/* --------------------- "VS" badge for the final comparison --------------------- */}
            <div
              className="hidden lg:flex absolute z-40 items-center justify-center w-14 h-14 rounded-full bg-[#05070d] border border-white/15 shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: overlayP > 0.55 ? (overlayP - 0.55) / 0.45 : 0,
                pointerEvents: "none",
              }}
            >
              <span className="text-xs font-bold text-gray-300 tracking-wider">VS</span>
            </div>
          </div>

          {/* Comparison cards for mobile/tablet only */}
          <div className="lg:hidden flex-shrink-0 w-full max-h-[36vh] overflow-y-auto">
            <MobileCompareStack
              consultancyPoints={consultancyPoints}
              eurozielPoints={eurozielPoints}
              opacity={clamp(0.25 + overlayP * 0.75, 0, 1)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyEuroZielSection;