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
      label: "Tuition Fees",
      desc: "At public universities in almost all states. Even states with exceptions charge under €3,000/year—less than a semester in private colleges.",
    },
    // {
    //   num: "18 Months",
    //   label: "Post-Study Job Seeker Visa",
    //   desc: "No pressure countdown. Germany gives you a full year and a half after graduation to find the right role without leaving."
    // },
    // {
    //   num: "1.7 Million",
    //   label: "Unfilled Skilled Jobs",
    //   desc: "Active immigration changes are rolling out right now to make it easier for qualified non-EU graduates to stay and work."
    // }
  ];

  // ------------------------------------------------------------------
  // Hook: animated count-up. Parses a display string like "400,000+"
  // or "€0" into a prefix, numeric target, and suffix, then counts up
  // from 0 -> target once the element scrolls into view.
  // ------------------------------------------------------------------

  function useCountUp(displayValue: string, inView: boolean, duration = 1600) {
    const match = displayValue.match(/^([^\d]*)([\d,]+)(.*)$/);
    const prefix = match ? match[1] : "";
    const target = match ? parseInt(match[2].replace(/,/g, ""), 10) : 0;
    const suffix = match ? match[3] : "";
    const hasNumber = !!match;

    const [value, setValue] = useState(0);

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
        setValue(Math.round(eased * target));

        if (progress < 1) {
          frame = requestAnimationFrame(step);
        }
      };

      frame = requestAnimationFrame(step);
      return () => cancelAnimationFrame(frame);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, target, hasNumber, duration]);

    if (!hasNumber) return displayValue;

    const formatted = value.toLocaleString("en-US");
    return `${prefix}${formatted}${suffix}`;
  }

  // ------------------------------------------------------------------
  // Single stat — big centered running number + label + description
  // ------------------------------------------------------------------

  const StatItem: React.FC<{
    num: string;
    label: string;
    desc: string;
    dark: boolean;
    inView: boolean;
    delay: number;
  }> = ({ num, label, desc, dark, inView, delay }) => {
    const animatedNum = useCountUp(num, inView);

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
    <div className="space-y-24 md:space-y-36 pb-20 bg-slate-950/50 border-slate-100">
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

      <section className="max-w-7xl mx-auto px-4 space-y-12 ">
        {/* <div className="text-left max-w-2xl">
          <span className="text-xs font-bold text-[#1b73ba] uppercase tracking-widest block mb-2">
            By the Numbers
          </span>
          <h3
            className={`text-2xl md:text-3xl font-extrabold font-sans ${dark ? "text-white" : "text-slate-900"}`}
          >
            Facts That Matter
          </h3>
        </div> */}

        <div
          ref={statsRef}
          className={`flex flex-col md:flex-row items-center md:items-start justify-center ${
            stats.length === 2 ? "gap-14 md:gap-24" : "gap-14 md:gap-16"
          } divide-y md:divide-y-0 md:divide-x divide-slate-200/20`}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="pt-10 md:pt-0 md:px-10 first:pt-0">
              <StatItem
                num={stat.num}
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
        className={`py-10 px-4 ${
          dark
            ? "bg-transparent border-slate-900"
            : "bg-transparent border-slate-100"
        }`}
      >
        <div className="max-w-5xl mx-auto text-left space-y-12">
          {/* <div className="space-y-2">
            <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-sm uppercase tracking-wide inline-block">
              Important Urgency
            </span>
            <h2 className={`text-2xl md:text-3.5xl font-bold tracking-tight font-sans ${dark ? 'text-white' : 'text-slate-900'}`}>
              Semester Academic Calendars
            </h2>
            <p className={`text-xs md:text-sm font-sans ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              German university intakes operate with extremely strict deadlines. Missing a timeline puts you back a full academic year.
            </p>
          </div> */}

          {/* Two images, stacked one below the other */}
          <div className="flex flex-col gap-22">
            {/* Winter Semester Image */}
            <ScrollReveal z-40 variant="slideLeft" delay={0.1}>
              <div
                onClick={onOpenConsultation}
                className={`rounded-4xl shadow-premium border-b-4 border-b-rose-500 overflow-hidden z-40 ${
                  dark
                    ? "border-slate-800 bg-transparent"
                    : "border-slate-200 bg-transparent"
                }`}
              >
                <img
                  src="/assets/winter.png"
                  alt="Winter Intake - October Start"
                  className="w-full h-auto object-cover"
                  
                />
              </div>
            </ScrollReveal>

            {/* Summer Semester Image */}
            <ScrollReveal variant="slideRight" delay={0.2}>
              <div
                className={`rounded-4xl shadow-premium border-b-4 border-b-emerald-500 overflow-hidden ${
                  dark
                    ? "border-slate-800 bg-transparent"
                    : "border-slate-200 bg-transparent"
                }`}
              >
                <img
                  src="/assets/summer1.png"
                  alt="Summer Intake - April Start"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div className="p-5 rounded-3xl border border-gold/20 bg-gold/5 text-xs text-slate-600 dark:text-slate-400 space-y-2">
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
      </section>

      {/* FIELDS OF STUDY */}

      <Fields dark={dark} />

      {/* COMPANIES */}
      <Companies />

      {/* BOTTOM CTA: INR 100 BOOKING */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <ScrollReveal variant="flipUp">
          <div
            className={`p-8 md:p-12 rounded-sm border shadow-premium space-y-6 border-b-4 border-b-gold ${
              dark
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
                Book Your Evaluation Session
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
          className="absolute inset-0 w-full h-full object-contain"
          loading="eager"
        />

        {/* Optional subtle overlay for text/logo legibility if you ever add content on top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
