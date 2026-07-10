import React from "react";
import { motion } from "motion/react";
import {
  CheckCircle,
  Briefcase,
  TrendingUp,
  Calendar,
  AlertTriangle,
  ShieldCheck,
  Flame,
  Cpu,
  Building2,
  Lightbulb,
  Stethoscope,
  Palette,
  Compass,
  Zap,
  Sun,
  Snowflake,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useState, useEffect, useRef } from "react";
import { useInView } from "motion/react";
import Fields from "./fields";
import Companies from "./companies";

interface StudySectionProps {
  onOpenConsultation: () => void;
  theme: "light" | "dark";
}

export default function StudySection({
  onOpenConsultation,
  theme,
}: StudySectionProps) {
  const dark = theme === "dark";
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef);

  const stats = [
    {
      num: "400,000+",
      label: "International Students",
      desc: "Germany is currently the third-largest destination for Indian students after the US and Canada, and growing faster than both.",
    },
    {
      num: "€0",
      from: 50000,
      label: "Tuition Fees",
      desc: "At public universities in almost all states. Even states with exceptions charge under €3,000/year—less than a semester in private colleges.",
    },
  ];

  // ------------------------------------------------------------------
  // Hook: animated count-up/count-down. Parses a display string like
  // "400,000+" or "€0" into a prefix, numeric target, and suffix, then
  // animates from `from` (default 0) -> target once the element scrolls
  // into view. Passing a `from` greater than the target (e.g. 50000 -> 0)
  // makes it count DOWN instead of up.
  // ------------------------------------------------------------------

  function useCountUp(
    displayValue: string,
    inView: boolean,
    duration = 1600,
    from = 0
  ) {
    const match = displayValue.match(/^([^\d]*)([\d,]+)(.*)$/);
    const prefix = match ? match[1] : "";
    const target = match ? parseInt(match[2].replace(/,/g, ""), 10) : 0;
    const suffix = match ? match[3] : "";
    const hasNumber = !!match;

    const [value, setValue] = useState(from);

    useEffect(() => {
      if (!inView || !hasNumber) return;

      let startTime: number | null = null;
      let frame: number;

      const step = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(1, elapsed / duration);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = from + (target - from) * eased;
        setValue(Math.round(current));

        if (progress < 1) {
          frame = requestAnimationFrame(step);
        }
      };

      frame = requestAnimationFrame(step);
      return () => cancelAnimationFrame(frame);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, target, hasNumber, duration, from]);

    if (!hasNumber) return displayValue;

    const formatted = value.toLocaleString("en-US");
    return `${prefix}${formatted}${suffix}`;
  }

  // ------------------------------------------------------------------
  // Single stat — big centered running number + label + description
  // ------------------------------------------------------------------

  const StatItem: React.FC<{
    num: string;
    from?: number;
    label: string;
    desc: string;
    dark: boolean;
    inView: boolean;
    delay: number;
  }> = ({ num, from = 0, label, desc, dark, inView, delay }) => {
    const animatedNum = useCountUp(num, inView, 1600, from);

    return (
      <div
        className="flex flex-col items-center text-center max-w-xs mx-auto transition-all duration-700"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transitionDelay: `${delay}ms`,
        }}
      >
        <div className="relative mb-3">
          <span className="text-5xl md:text-6xl lg:text-7xl font-black font-sans tracking-tight bg-gradient-to-b from-[#1b73ba] to-[#0f4a7a] bg-clip-text text-transparent tabular-nums">
            {animatedNum}
          </span>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-gradient-to-r from-[#1b73ba] to-emerald-400" />
        </div>

        <h4
          className={`text-sm md:text-base font-bold uppercase tracking-wide mt-4 ${dark ? "text-slate-200" : "text-slate-800"}`}
        >
          {label}
        </h4>
        <p
          className={`text-xs md:text-sm mt-3 leading-relaxed font-sans ${dark ? "text-slate-400" : "text-slate-500"}`}
        >
          {desc}
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-24 md:space-y-36 pb-20 bg-transparent ">
      {/* HERO SECTION FOR STUDY IN GERMANY */}
      {/*
        FIX: previously wrapped in <ScrollReveal variant="clipReveal">.
        ScrollReveal triggers on a scroll-into-view transition, but the
        hero is already in the viewport on first paint (above the fold),
        so that transition never fires and the reveal animation gets
        stuck at its hidden initial state — which is why it appeared to
        "not load". Replaced with a simple mount-triggered fade/scale-in
        using plain state, so it always plays regardless of scroll.
      */}
      <HeroReveal />

      {/* STATISTICS SECTION */}

      <section className="max-w-7xl mx-auto px-4 space-y-12 ">

        <div
          ref={statsRef}
          className={`flex flex-col md:flex-row items-center md:items-start justify-center ${stats.length === 2 ? "gap-14 md:gap-24" : "gap-14 md:gap-16"
            } divide-y md:divide-y-0 md:divide-x divide-slate-200/20`}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="pt-10 md:pt-0 md:px-10 first:pt-0">
              <StatItem
                num={stat.num}
                from={stat.from}
                label={stat.label}
                desc={stat.desc}
                dark={dark}
                inView={statsInView}
                delay={idx * 150}
              />
            </div>
          ))}
        </div>
      </section>

      {/* SEMESTER CALENDAR & URGENCY */}
      <section
        className={`relative py-16 md:py-24 px-4 overflow-hidden ${dark
            ? "bg-[#050b14]"
            : "bg-slate-50"
          }`}
      >
        {/* ambient section-wide glow so it doesn't feel like a flat block */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: dark
              ? "radial-gradient(circle at 20% 10%, rgba(56,189,248,0.08), transparent 45%), radial-gradient(circle at 85% 90%, rgba(251,191,36,0.07), transparent 45%)"
              : "radial-gradient(circle at 20% 10%, rgba(56,189,248,0.10), transparent 45%), radial-gradient(circle at 85% 90%, rgba(251,191,36,0.10), transparent 45%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto text-left space-y-12">
          <div className="space-y-2">
            <h2 className={`text-4xl text-center md:text-3.5xl font-bold tracking-tight font-sans ${dark ? 'text-white' : 'text-slate-900'}`}>
              Semester Academic Calendars
            </h2>
            <p className={`text-xs md:text-sm text-center font-sans ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              German university intakes operate with extremely strict deadlines. Missing a timeline puts you back a full academic year.
            </p>
          </div>

          {/* Two seasonal-themed panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* ── WINTER PANEL ── */}
            <ScrollReveal variant="slideLeft" delay={0.1}>
              <div
                onClick={onOpenConsultation}
                className="relative rounded-4xl shadow-premium border border-sky-400/20 overflow-hidden cursor-pointer group min-h-[440px] p-7 mobile-m:p-9 flex flex-col"
                style={{
                  background:
                    "radial-gradient(circle at 15% 0%, rgba(125,211,252,0.25), transparent 55%), radial-gradient(circle at 90% 100%, rgba(99,179,237,0.20), transparent 55%), linear-gradient(160deg, #0b1c2c 0%, #0e2740 45%, #123453 100%)",
                }}
              >
                {/* frosted top border glow */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-sky-300 to-transparent opacity-70" />

                {/* falling snowflakes */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[
                    { l: "6%", s: 14, d: "0s", dur: "9s" },
                    { l: "18%", s: 8, d: "1.2s", dur: "7s" },
                    { l: "30%", s: 12, d: "2.4s", dur: "10s" },
                    { l: "44%", s: 6, d: "0.6s", dur: "8s" },
                    { l: "58%", s: 16, d: "3s", dur: "11s" },
                    { l: "70%", s: 9, d: "1.8s", dur: "7.5s" },
                    { l: "82%", s: 13, d: "0.3s", dur: "9.5s" },
                    { l: "92%", s: 7, d: "2.1s", dur: "8.5s" },
                  ].map((f, i) => (
                    <span
                      key={i}
                      className="absolute top-[-5%] rounded-full bg-white/70"
                      style={{
                        left: f.l,
                        width: f.s,
                        height: f.s,
                        filter: "blur(0.5px)",
                        animation: `euroziel-snowfall ${f.dur} linear ${f.d} infinite`,
                      }}
                    />
                  ))}
                </div>

                {/* icy corner glyph */}
                <Snowflake
                  className="absolute -right-6 -bottom-6 w-40 h-40 text-sky-300/10"
                  strokeWidth={1}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-sky-300 bg-sky-400/10 border border-sky-400/30 px-3 py-1 rounded-full w-fit">
                    <Snowflake className="w-3.5 h-3.5" strokeWidth={2.5} />
                    Winter Semester — October Start
                  </span>

                  <h3 className="text-2xl mobile-m:text-3xl font-bold text-white tracking-tight leading-snug mt-4">
                    The Main Intake.
                    <br />
                    The Widest Choice.
                  </h3>

                  <p className="text-xs md:text-sm text-sky-100/70 leading-relaxed mt-3">
                    The widest choice of programmes, the most seats, and the most competitive. If you are targeting winter semester, start your APS and language preparation at least 12 months before October.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-5">
                    <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/15 text-white/85 bg-white/5">
                      Opens: January
                    </span>
                    <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-rose-400/30 text-rose-300 bg-rose-500/10">
                      Deadline: July 15
                    </span>
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/10">
                    <p className="text-[11px] md:text-xs text-sky-100/50 italic">
                      Reading this in June and haven't started APS yet? You're applying next year.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* ── SUMMER PANEL ── */}
            <ScrollReveal variant="slideRight" delay={0.2}>
              <div
                onClick={onOpenConsultation}
                className="relative rounded-4xl shadow-premium border border-amber-400/20 overflow-hidden cursor-pointer group min-h-[440px] p-7 mobile-m:p-9 flex flex-col"
                style={{
                  background:
                    "radial-gradient(circle at 85% 0%, rgba(253,224,71,0.30), transparent 55%), radial-gradient(circle at 10% 100%, rgba(251,146,60,0.22), transparent 55%), linear-gradient(160deg, #2c1a0b 0%, #402710 45%, #532f0f 100%)",
                }}
              >
                {/* warm top border glow */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-70" />

                {/* pulsing sunburst */}
                <div
                  className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(253,224,71,0.35) 0%, rgba(251,191,36,0.15) 45%, transparent 70%)",
                    animation: "euroziel-sunpulse 4s ease-in-out infinite",
                  }}
                />

                {/* floating light particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[
                    { l: "10%", b: "20%", s: 5, dl: "0s" },
                    { l: "25%", b: "60%", s: 3, dl: "0.8s" },
                    { l: "40%", b: "15%", s: 6, dl: "1.6s" },
                    { l: "55%", b: "70%", s: 4, dl: "0.4s" },
                    { l: "68%", b: "35%", s: 3, dl: "2s" },
                    { l: "80%", b: "55%", s: 5, dl: "1.1s" },
                  ].map((p, i) => (
                    <span
                      key={i}
                      className="absolute rounded-full bg-amber-200/70"
                      style={{
                        left: p.l,
                        bottom: p.b,
                        width: p.s,
                        height: p.s,
                        boxShadow: "0 0 6px rgba(253,224,71,0.8)",
                        animation: `euroziel-float 5s ease-in-out ${p.dl} infinite`,
                      }}
                    />
                  ))}
                </div>

                {/* sun corner glyph */}
                <Sun
                  className="absolute -right-6 -bottom-6 w-40 h-40 text-amber-300/10"
                  strokeWidth={1}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full w-fit">
                    <Sun className="w-3.5 h-3.5" strokeWidth={2.5} />
                    Summer Semester — April Start
                  </span>

                  <h3 className="text-2xl mobile-m:text-3xl font-bold text-white tracking-tight leading-snug mt-4">
                    Fewer Seats.
                    <br />
                    Lower Competition.
                  </h3>

                  <p className="text-xs md:text-sm text-amber-100/70 leading-relaxed mt-3">
                    Fewer programmes offer a summer intake, but competition is slightly lower because fewer students know about it. A good option if your profile is strong and you don't want to wait a full year.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-5">
                    <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/15 text-white/85 bg-white/5">
                      Opens: July
                    </span>
                    <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-emerald-400/30 text-emerald-300 bg-emerald-500/10">
                      Deadline: January 15
                    </span>
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/10">
                    <p className="text-[11px] md:text-xs text-amber-100/50 italic">
                      Strong profile and don't want to wait a year? Summer intake is your fast track.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div className="p-5 rounded-3xl border border-gold/20 bg-gold/3 text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <span className="font-bold text-gold uppercase tracking-wider font-mono flex items-center gap-1.5">
                <AlertTriangle
                  className="w-4 h-4 text-gold"
                  style={{ strokeWidth: 2.5 }}
                />{" "}
                Ground Advice from Founders:
              </span>
              <p className="font-sans leading-relaxed">
                "Start the process the moment you make the decision. Not when
                your final semester results are out. Not after holidays. The APS
                certification process alone can require **up to 3 months**.
                Language preparation to B2 takes **10 to 14 months minimum**.
                Successful students started earlier than felt necessary."
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Keyframes for the seasonal effects — add once, globally */}
        <style>{`
    @keyframes euroziel-snowfall {
      0% { transform: translateY(-10%) translateX(0); opacity: 0; }
      10% { opacity: 0.9; }
      90% { opacity: 0.9; }
      100% { transform: translateY(480px) translateX(14px); opacity: 0; }
    }
    @keyframes euroziel-sunpulse {
      0%, 100% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.15); opacity: 1; }
    }
    @keyframes euroziel-float {
      0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
      50% { transform: translateY(-18px) scale(1.3); opacity: 1; }
    }
  `}</style>
      </section>

      {/* FIELDS OF STUDY */}

      <Fields dark={dark} />

      {/* COMPANIES */}
      <Companies />

      {/* BOTTOM CTA: INR 100 BOOKING */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <ScrollReveal variant="flipUp">
          <div
            className={`p-8 md:p-12 rounded-sm border shadow-premium space-y-6 border-b-4 border-b-gold ${dark
              ? "border-slate-800 bg-slate-950 text-white"
              : "border-slate-200 bg-white text-slate-800"
              }`}
          >
            {/* <span className={`text-[10px] font-bold text-navy uppercase tracking-[0.2em] border px-3 py-1 rounded-sm ${dark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}>
              Stop Googling. Start Getting Answers.
            </span> */}
            <span
              className={
                "text-3xl laptop:text-4xl sm:text-3xl font-bold text-gold pr-96"
              }
            >
              ₹9
            </span>
            <h3
              className={`text-2xl md:text-3xl font-bold font-sans max-w-xl mx-auto ${dark ? "text-white" : "text-slate-900"}`}
            >
              <span
                style={{
                  background:
                    "linear-gradient(to top left, transparent 47%, currentColor 48%, currentColor 52%, transparent 53%) no-repeat center",
                  padding: "0 4px",
                  display: "inline-block",
                }}
                className="text-base md:text-xl font-normal opacity-80"
              >
                1500
              </span>
              gets you 20 minutes with a credentialed Germany expert
            </h3>

            <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto font-sans leading-relaxed">
              Get an honest review pointing you in the right direction. We will
              tell you exactly where your profile stands. No sugarcoating, no
              false promises.
            </p>
            <div>
              <button
                onClick={onOpenConsultation}
                className="px-8 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest bg-navy hover:bg-opacity-90 text-white border-b-2 border-gold transition-all cursor-pointer shadow-premium"
              >
                Book Your Session
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

// ------------------------------------------------------------------
// HeroReveal: standalone hero wrapper that animates on MOUNT, not on
// scroll-into-view. This guarantees the hero always renders/animates
// in immediately, since it's above the fold and never undergoes a
// "not in view -> in view" transition that ScrollReveal depends on.
// ------------------------------------------------------------------

function HeroReveal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger on next frame so the initial (hidden) state actually
    // paints first, then transitions in — avoids a "pop" with no animation.
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="w-full text-left">
      <div
        className="relative w-full bg-transparent overflow-hidden shadow-premium
          h-[60vh] min-h-[320px]
          sm:h-[65vh] sm:min-h-[380px]
          md:h-[75vh] md:min-h-[450px]
          lg:h-[85vh]
          xl:h-[90vh]
          transition-all duration-700 ease-out"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "scale(1)" : "scale(1.03)",
        }}
      >
        <img
          src="/assets/studyin.png"
          alt="Study in Germany & Europe"
          className="absolute inset-0 w-full h-[100vh] object-contain"
          loading="lazy"
        />

        {/* Optional subtle overlay for text/logo legibility if you ever add content on top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
