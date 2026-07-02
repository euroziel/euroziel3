/* ────────────────────────────────────────────────────────────
   IMPORTS — add these to your existing imports
   ──────────────────────────────────────────────────────────── */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/* ────────────────────────────────────────────────────────────
   HIGHLIGHT — wraps key phrases with an accent underline/glow
   ──────────────────────────────────────────────────────────── */
function Hi({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline font-semibold text-gold whitespace-normal">
      {children}
      <span
        aria-hidden
        className="absolute left-0 right-0 -bottom-0.5 h-[6px] rounded-full bg-gold/25 -z-10"
      />
    </span>
  );
}

/* ────────────────────────────────────────────────────────────
   MISSION CONTENT — broken into ordered chunks that reveal
   as you scroll, arranged around the rover
   ──────────────────────────────────────────────────────────── */
const MISSION_CHUNKS = [
  {
    pos: "laptop:col-start-1 laptop:row-start-1 laptop:text-left",
    content: (
      <>
        EuroZiel was founded with a clear purpose — to give students access to
        guidance that is <Hi>honest, Germany-focused, and built on real
        experience</Hi> instead of generic consultancy advice.
      </>
    ),
  },
  {
    pos: "laptop:col-start-3 laptop:row-start-1 laptop:text-right",
    content: (
      <>
        We saw too many capable students lose opportunities because they were
        given <Hi>copied strategies, unrealistic expectations</Hi>, and
        little understanding of how the German system actually works.
      </>
    ),
  },
  {
    pos: "laptop:col-start-1 laptop:row-start-2 laptop:text-left",
    content: (
      <>
        That is why EuroZiel combines structured consultancy with{" "}
        <Hi>direct insight from students currently studying at German
        public universities</Hi>, Indian professionals working across
        Europe, and domain-specific mentors who understand your academic
        and career pathway.
      </>
    ),
  },
  {
    pos: "laptop:col-start-3 laptop:row-start-2 laptop:text-right",
    content: (
      <>
        From <Hi>university applications and APS</Hi> to{" "}
        <Hi>visas, accommodation, and settling in Germany</Hi>, every step
        is designed to give students clarity, confidence, and practical
        direction.
      </>
    ),
  },
  {
    pos: "laptop:col-start-2 laptop:row-start-3 laptop:text-center",
    content: (
      <>
        At EuroZiel, we do not just help you apply to Germany — we help you{" "}
        <Hi>prepare for life and long-term success there</Hi>.
      </>
    ),
  },
];

/* ────────────────────────────────────────────────────────────
   SECTION: WHY EUROZIEL
   ──────────────────────────────────────────────────────────── */
function WhyEuroziel({ isDark }: { isDark: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.25"],
  });

  /* rover — starts small/high/transparent, lands centered as background */
  const roverY = useTransform(scrollYProgress, [0, 0.4], [-140, 0]);
  const roverScale = useTransform(scrollYProgress, [0, 0.4], [0.55, 1]);
  const roverOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 1],
    [0, 0.5, 0.22, 0.22]
  );
  const roverRotate = useTransform(scrollYProgress, [0, 0.4], [-8, 0]);

  /* each mission chunk gets its own scrubbed window, revealing in order */
  const chunkRanges = MISSION_CHUNKS.map((_, i) => {
    const start = 0.3 + i * 0.11;
    const end = start + 0.22;
    return [Math.min(start, 0.9), Math.min(end, 1)] as [number, number];
  });

  return (
    <section
      ref={sectionRef}
      className={`relative z-30 overflow-hidden py-16 mobile-m:py-20 laptop:py-28 4k:py-36 px-4 mobile-m:px-5 mobile-l:px-6 laptop:px-8 4k:px-16 border-b w-full transition-colors duration-300 ${
        isDark ? "border-slate-900 bg-[#060814]" : "border-slate-100 bg-white"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* ── Eyebrow + Heading, plain text with entrance transition ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-10 mobile-m:mb-14 laptop:mb-20"
        >
          <span
            className={`inline-block text-[9px] mobile-m:text-[10px] 4k:text-xs font-bold uppercase tracking-[0.25em] px-2.5 mobile-m:px-3 py-1 rounded-sm border mb-3 ${
              isDark
                ? "bg-slate-900 border-slate-800 text-gold"
                : "bg-slate-100 border-slate-200 text-navy"
            }`}
          >
            Why EuroZiel?
          </span>
          <h2 className="text-2xl mobile-m:text-3xl laptop:text-4xl 4k:text-5xl font-bold tracking-tight font-sans">
            More Than a Consultancy.{" "}
            <span className="font-serif italic text-gold">
              A Real Bridge to Germany.
            </span>
          </h2>
        </motion.div>

        {/* ── Intro row: side image + short lead-in, stacks on mobile ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="flex flex-col mobile-l:flex-row-reverse items-center gap-6 mobile-m:gap-8 laptop:gap-14 mb-14 mobile-m:mb-16 laptop:mb-24"
        >
          {/* Replace this block's inner content with your <img /> */}
          <div className="w-full mobile-l:w-2/5 flex-shrink-0">
            <div
              className={`relative aspect-[4/3] rounded-3xl overflow-hidden border ${
                isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-slate-100"
              }`}
            >
              {/* ── IMAGE SLOT — drop your <img src="..." className="w-full h-full object-cover" /> here ── */}
              <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-widest text-slate-500">
                Image
              </div>
            </div>
          </div>

          <div className="w-full mobile-l:w-3/5 text-center mobile-l:text-left">
            <p
              className={`text-sm mobile-m:text-base laptop:text-lg leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              A mission built on <Hi>honesty</Hi>, shaped by{" "}
              <Hi>real experience</Hi>, and focused on one goal — helping you
              succeed in Germany, not just apply to it.
            </p>
          </div>
        </motion.div>

        {/* ── Rover landing zone + mission chunks arranged around it ── */}
        <div className="relative min-h-[560px] mobile-m:min-h-[620px] laptop:min-h-[640px] flex items-center justify-center">
          {/* ROVER ASSET — parallax-lands centered, sits behind the text */}
          <motion.div
            style={{
              y: roverY,
              scale: roverScale,
              opacity: roverOpacity,
              rotate: roverRotate,
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          >
            <div className="relative w-[220px] h-[220px] mobile-m:w-[300px] mobile-m:h-[300px] laptop:w-[420px] laptop:h-[420px] 4k:w-[520px] 4k:h-[520px]">
              {/* ── ROVER IMAGE SLOT ──
                  Replace with: <img src="/assets/rover.png" alt="" className="w-full h-full object-contain" />
              */}
              <div
                className={`w-full h-full rounded-full ${
                  isDark ? "bg-gold/5" : "bg-gold/10"
                }`}
                style={{
                  boxShadow: isDark
                    ? "0 0 120px 40px rgba(229,168,0,0.08)"
                    : "0 0 120px 40px rgba(229,168,0,0.12)",
                }}
              />
            </div>
          </motion.div>

          {/* MISSION TEXT — reveals in order, arranged around the rover */}
          <div className="relative z-10 w-full laptop:grid laptop:grid-cols-3 laptop:grid-rows-3 laptop:gap-x-10 laptop:gap-y-8 flex flex-col gap-6 mobile-m:gap-7">
            {MISSION_CHUNKS.map((chunk, i) => {
              const [start, end] = chunkRanges[i];
              const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
              const y = useTransform(scrollYProgress, [start, end], [26, 0]);
              const blur = useTransform(scrollYProgress, [start, end], [6, 0]);

              return (
                <motion.p
                  key={i}
                  style={{
                    opacity,
                    y,
                    filter: useTransform(blur, (v) => `blur(${v}px)`),
                  }}
                  className={`text-sm mobile-m:text-base laptop:text-[15px] 4k:text-lg leading-relaxed max-w-md mx-auto laptop:mx-0 text-center ${chunk.pos} ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {chunk.content}
                </motion.p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyEuroziel;