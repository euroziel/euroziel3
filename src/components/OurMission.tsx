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

  const positionClasses =
    side === "left"
      ? "left-0 -translate-x-[5%] lg:-translate-x-[5%]"
      : "right-0 translate-x-[5%] lg:translate-x-[5%]";

  const themeClasses = isRed
    ? {
        border: "border-red-500/30",
        glow: "shadow-[0_0_60px_-15px_rgba(239,68,68,0.45)]",
        bgFrom: "from-red-950/90",
        bgTo: "to-red-900/70",
        badge: "bg-red-500/15 text-red-400 border-red-500/30",
        icon: "text-red-400 bg-red-500/10 border-red-500/30",
        heading: "text-red-300",
        line: "bg-red-500/20",
      }
    : {
        border: "border-emerald-500/30",
        glow: "shadow-[0_0_60px_-15px_rgba(16,185,129,0.45)]",
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
        hidden md:block
        absolute top-1/2 -translate-y-1/2 ${positionClasses}
        w-[280px] sm:w-[320px] lg:w-[360px]
        z-10
      `}
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl border ${themeClasses.border} ${themeClasses.glow}
          bg-gradient-to-br ${themeClasses.bgFrom} ${themeClasses.bgTo}
          backdrop-blur-xl p-6 sm:p-7
          transition-transform duration-500 ease-out
          hover:${side === "left" ? "-translate-x-[2%]" : "translate-x-[2%]"}
        `}
      >
        {/* badge */}
        <div
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider mb-4 ${themeClasses.badge}`}
        >
          {isRed ? <X className="w-3 h-3" /> : <Check className="w-3 h-3" />}
          {isRed ? "Typical Consultancy" : "The EuroZiel Way"}
        </div>

        <h3 className={`text-xl sm:text-2xl font-bold text-white mb-1`}>{title}</h3>
        <p className={`text-sm mb-5 ${themeClasses.heading}`}>{subtitle}</p>

        <div className={`h-px w-full mb-5 ${themeClasses.line}`} />

        <ul className="space-y-3.5">
          {points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span
                className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center ${themeClasses.icon}`}
              >
                {isRed ? <X className="w-3 h-3" /> : <Check className="w-3 h-3" />}
              </span>
              <span className="text-sm text-gray-200 leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// Main Section
// ------------------------------------------------------------------

const WhyEuroZielSection: React.FC = () => {
  const { ref: centerRef, inView } = useInView<HTMLDivElement>(0.35);
  const { displayed, done } = useTypewriter(centerParagraph, inView, 50);

  const consultancyPoints = comparePoints.map((p) => p.consultancy);
  const eurozielPoints = comparePoints.map((p) => p.euroziel);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0a0e17] flex items-center justify-center py-20 px-4">
      {/* background ambience */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Left Card - Consultancy (Red) */}
      <SideCard
        side="left"
        theme="red"
        title="Typical Consultancy"
        subtitle="What most students go through"
        points={consultancyPoints}
      />

      {/* Right Card - EuroZiel (Green) */}
      <SideCard
        side="right"
        theme="green"
        title="EuroZiel"
        subtitle="What we actually deliver"
        points={eurozielPoints}
      />

      {/* Center Content */}
      <div
        ref={centerRef}
        className="relative z-20 max-w-3xl mx-auto text-center px-4 sm:px-8"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">
            Why EuroZiel?
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
          More Than a Consultancy.
          <br />
          <span className="bg-gradient-to-r from-red-400 via-white to-emerald-400 bg-clip-text text-transparent">
            A Real Bridge to Germany.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-gray-300 leading-relaxed min-h-[220px] sm:min-h-[180px] text-left sm:text-center">
          {displayed}
          {!done && (
            <span className="inline-block w-[2px] h-5 bg-emerald-400 ml-1 align-middle animate-pulse" />
          )}
        </p>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default WhyEuroZielSection;