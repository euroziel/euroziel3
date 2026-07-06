import React, { useState } from "react";
import { ShieldCheck, Clock, Briefcase, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const brandLogs = [
  "sap",
  "Siemens",
  "Bosch",
  "BMW",
  "Volkswagen",
  "Airbus",
  "Allianz",
  "BASF",
  "Daimler Trucks",
  "Zalando",
  "DeepMind Berlin",
  "N26",
  "Celonis",
];

// Converts "Daimler Trucks" -> "daimler-trucks" so it maps to
// /images/logos/daimler-trucks.png
const slugify = (name: string) =>
  name.toLowerCase().trim().replace(/\s+/g, "-");

const pathwayStats = [
  {
    icon: <TrendingUp className="w-5 h-5" />,
    value: "€52,000",
    accent: "navy",
    label: "Avg. Starting Salary",
    desc: "Across all fields — not a tech-only outlier",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    value: "3.4%",
    accent: "gold",
    label: "Graduate Unemployment",
    desc: "UK is 6%+, US is 5%+",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    value: "18 Months",
    accent: "gold",
    label: "Job Seeker Visa",
    desc: "No pressure countdown to find the right role",
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    value: "1.7M",
    accent: "navy",
    label: "Unfilled Skilled Jobs",
    desc: "Immigration rules easing for non-EU graduates",
  },
];

// ------------------------------------------------------------------
// Single stat tile — icon badge, big value, short label + description.
// Horizontal row (icon left, text right) for easier scanning, with a
// hover lift + icon pop + accent-color value shift for a livelier,
// more tactile feel. Text contrast bumped up for readability.
// ------------------------------------------------------------------

const PathwayStat: React.FC<{
  stat: (typeof pathwayStats)[number];
  dark: boolean;
}> = ({ stat, dark }) => {
  const isGold = stat.accent === "gold";

  return (
    <div
      className={`relative flex items-start gap-3 p-4 rounded-xl border overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-premium hover:scale-[1.02] ${
        dark
          ? "border-slate-800 bg-slate-900/50 hover:border-slate-700"
          : "border-slate-200/60 bg-white hover:border-slate-300"
      }`}
    >
      {/* subtle glow accent in the corner */}
      <div
        className={`pointer-events-none absolute -top-8 -right-8 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isGold ? "bg-gold/20" : "bg-navy/20"
        }`}
      />

      <div
        className={`relative shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${
          isGold ? "bg-gold/10 text-gold" : "bg-navy/10 text-navy"
        }`}
      >
        {stat.icon}
      </div>

      <div className="relative min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className={`text-lg font-bold transition-colors duration-300 ${
              isGold ? "text-gold" : "text-navy"
            }`}
          >
            {stat.value}
          </span>
          <span
            className={`text-[11px] font-bold uppercase tracking-wide ${
              dark ? "text-slate-200" : "text-slate-800"
            }`}
          >
            {stat.label}
          </span>
        </div>
        <p
          className={`text-xs mt-1 font-sans leading-relaxed transition-colors duration-300 ${
            dark
              ? "text-slate-400 group-hover:text-slate-300"
              : "text-slate-500 group-hover:text-slate-600"
          }`}
        >
          {stat.desc}
        </p>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// Logo chip — UNCHANGED (logo scrolling logic left exactly as is)
// ------------------------------------------------------------------

const LogoChip: React.FC<{ brand: string; dark: boolean }> = ({ brand, dark }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const src = `/images/logos/${slugify(brand)}.png`;

  return (
    <span
      className={`px-5 py-3 border rounded-lg text-xs md:text-sm font-bold font-sans whitespace-nowrap transition-colors flex items-center justify-center gap-2 h-12 min-w-[120px] ${
        dark
          ? "bg-slate-900 border-slate-800 text-slate-200 hover:border-gold/40"
          : "bg-white border-slate-200 text-slate-700 hover:border-gold/40"
      }`}
    >
      {imgFailed ? (
        <span className="hover:text-[#e5a800] transition-colors">{brand}</span>
      ) : (
        <img
          src={src}
          alt={brand}
          className="max-h-6 max-w-[100px] object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          onError={() => setImgFailed(true)}
        />
      )}
    </span>
  );
};

// ------------------------------------------------------------------
// Logo marquee — UNCHANGED (scrolling logic left exactly as is)
// ------------------------------------------------------------------

const LogoMarquee: React.FC<{
  dark: boolean;
  logos: string[];
  reverseDirection?: boolean;
  duration?: number;
}> = ({ dark, logos, reverseDirection = false, duration = 28 }) => {
  const loopLogos = [...logos, ...logos];
  const animationName = reverseDirection ? "marquee-scroll-reverse" : "marquee-scroll";

  return (
    <div className="relative overflow-hidden py-1">
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 w-14 z-10 bg-gradient-to-r ${
          dark ? "from-slate-950" : "from-slate-50"
        } to-transparent`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-14 z-10 bg-gradient-to-l ${
          dark ? "from-slate-950" : "from-slate-50"
        } to-transparent`}
      />

      <div
        className="marquee-track flex gap-3 w-max"
        style={{ animation: `${animationName} ${duration}s linear infinite` }}
      >
        {loopLogos.map((brand, bIdx) => (
          <LogoChip key={bIdx} brand={brand} dark={dark} />
        ))}
      </div>

      <style>{`
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

// ------------------------------------------------------------------
// Section component
// ------------------------------------------------------------------

const Companies: React.FC<{ dark?: boolean }> = ({ dark = false }) => {
  const midpoint = Math.ceil(brandLogs.length / 2);
  const rowOne = brandLogs.slice(0, midpoint);
  const rowTwo = brandLogs.slice(midpoint);

  return (
    <section className="max-w-7xl mx-auto px-4 space-y-14">
      {/* ---------------------------------------------------------
          Top content card: eyebrow -> headline -> intro -> stat
          grid -> highlighted callout -> soft CTA.
      --------------------------------------------------------- */}
      <ScrollReveal variant="fadeUp" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1b73ba] uppercase tracking-widest bg-[#1b73ba]/5 border border-[#1b73ba]/20 px-3 py-1 rounded-full transition-all duration-300 hover:bg-[#1b73ba]/10 hover:border-[#1b73ba]/30 hover:scale-105">
            <Sparkles className="w-3 h-3" />
            Post-Graduation Pathways
          </span>
          <h3
            className={`text-2xl md:text-4xl font-black font-sans leading-tight ${
              dark ? "text-white" : "text-gold"
            }`}
          >
            What Happens After You Graduate?
          </h3>
          <p
            className={`text-sm md:text-base leading-relaxed font-sans ${
              dark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            The reason Indian students choose Germany over other European
            countries isn't just the free education — it's what comes after.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {pathwayStats.map((stat, idx) => (
            <PathwayStat key={idx} stat={stat} dark={dark} />
          ))}
        </div>

        <div
          className={`max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between rounded-xl border p-5 transition-all duration-300 hover:shadow-md ${
            dark
              ? "bg-amber-500/5 border-gold/15 hover:border-gold/30"
              : "bg-amber-50/60 border-gold/20 hover:border-gold/40"
          }`}
        >
          <div className="flex gap-3 items-start group">
            <div className="p-1.5 rounded-full bg-gold/10 text-gold shrink-0 transition-transform duration-300 group-hover:scale-110">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div
              className={`text-xs md:text-sm font-sans leading-relaxed ${
                dark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              <strong className={dark ? "text-slate-100" : "text-slate-900"}>
                Deliberate immigration shifts:
              </strong>{" "}
              Germany passed the Skilled Immigration Act in 2023 specifically
              to expand opportunities for non-EU graduates. The door has been
              widened on purpose.
            </div>
          </div>
          <button
            className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-lg border transition-all duration-300 self-start sm:self-center group ${
              dark
                ? "border-gold/30 text-gold hover:bg-gold hover:text-slate-900 hover:border-gold"
                : "border-gold/40 text-gold hover:bg-gold hover:text-white hover:border-gold"
            }`}
          >
            Learn More
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </ScrollReveal>

      {/* ---------------------------------------------------------
          Company logo marquee — logic and scrolling untouched.
      --------------------------------------------------------- */}
      <ScrollReveal variant="fadeUp" delay={0.1} className="space-y-3">
        <div
          className={`p-6 md:p-8 rounded-2xl border shadow-premium space-y-6 transition-colors duration-300 ${
            dark
              ? "border-slate-800 bg-slate-950/80"
              : "border-slate-200/50 bg-white"
          }`}
        >
          <div className="text-center">
            <h4 className="font-bold text-navy uppercase tracking-widest text-[10px] mb-1">
              Global Employers
            </h4>
            <div
              className={`text-lg md:text-xl font-bold ${
                dark ? "text-slate-100" : "text-slate-900"
              }`}
            >
              Where EuroZiel Connected Students Work
            </div>
            <p className={`text-xs mt-1 ${dark ? "text-slate-400" : "text-slate-500"}`}>
              Direct recruitment pipelines with Europe's biggest employers
            </p>
          </div>

          <div className="space-y-3">
            <LogoMarquee dark={dark} logos={rowOne} duration={26} />
            <LogoMarquee dark={dark} logos={rowTwo} reverseDirection duration={26} />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Companies;