import React from "react";
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
// Comparison Card (static — no growth/animation logic)
// ------------------------------------------------------------------

interface SideCardProps {
  theme: "red" | "green";
  title: string;
  subtitle: string;
  points: string[];
}

const SideCard: React.FC<SideCardProps> = ({ theme, title, subtitle, points }) => {
  const isRed = theme === "red";

  const themeClasses = isRed
    ? {
        border: "border-red-500/30",
        badge: "bg-red-500/15 text-red-400 border-red-500/30",
        icon: "text-red-400 bg-red-500/10 border-red-500/30",
        heading: "text-red-300",
        line: "bg-red-500/20",
      }
    : {
        border: "border-emerald-500/30",
        badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        icon: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
        heading: "text-emerald-300",
        line: "bg-emerald-500/20",
      };

  return (
    <div
      className={`w-full rounded-2xl border ${themeClasses.border} bg-transparent p-6 sm:p-7`}
    >
      <div
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider mb-3 ${themeClasses.badge}`}
      >
        {isRed ? <X className="w-2.5 h-2.5" /> : <Check className="w-2.5 h-2.5" />}
        {isRed ? "Typical Consultancy" : "The EuroZiel Way"}
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-white mb-0.5">{title}</h3>
      <p className={`text-xs sm:text-sm mb-4 ${themeClasses.heading}`}>{subtitle}</p>

      <div className={`h-px w-full mb-4 ${themeClasses.line}`} />

      <ul className="space-y-3">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span
              className={`flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${themeClasses.icon}`}
            >
              {isRed ? <X className="w-2.5 h-2.5" /> : <Check className="w-2.5 h-2.5" />}
            </span>
            <span className="text-sm text-gray-200 leading-snug">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ------------------------------------------------------------------
// Main Section
// ------------------------------------------------------------------

const WhyEuroZielSection: React.FC = () => {
  const consultancyPoints = comparePoints.map((p) => p.consultancy);
  const eurozielPoints = comparePoints.map((p) => p.euroziel);

  return (
    <section className="relative w-full bg-transparent py-16 sm:py-20 px-4 sm:px-6">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-red-400 via-white to-emerald-400 bg-clip-text text-transparent">
            Why EuroZiel?
          </span>
        </h2>
        <p className="text-center text-sm sm:text-base text-gray-400 mb-12 max-w-xl mx-auto">
          More than a consultancy — a real bridge to Germany.
        </p>

        {/* Three paragraph cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {paragraphCards.map((card, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-transparent p-6 hover:border-emerald-500/30 transition-colors"
            >
              <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-emerald-400/80 mb-3">
                0{idx + 1}
              </span>
              <h4 className="text-lg font-semibold text-white mb-3">{card.title}</h4>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-5 lg:gap-6 items-start">
          <SideCard
            theme="red"
            title="Typical Consultancy"
            subtitle="What most students go through"
            points={consultancyPoints}
          />

          <div className="hidden lg:flex items-center justify-center h-full">
            <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/15 bg-transparent">
              <span className="text-xs font-bold text-gray-300 tracking-wider">VS</span>
            </div>
          </div>

          <SideCard
            theme="green"
            title="EuroZiel"
            subtitle="What we actually deliver"
            points={eurozielPoints}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyEuroZielSection;