import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, } from 'motion/react';
import { ArrowRight, Star, ArrowLeftRight, Quote, CheckCircle2, Pause, Play } from 'lucide-react';
import Journey from './Journey';
import ScrollReveal from './ScrollReveal';
import OurMission from './OurMission';

interface HomeSectionProps {
  onOpenConsultation: () => void;
  onNavigateToTab: (tab: string) => void;
  theme: 'light' | 'dark';
}

interface ChooseCardProps {
  card: { title: string; image: string; points: string[] };
  isDark: boolean;
}

function ChooseCard({ card, isDark }: ChooseCardProps) {
  return (
    <motion.div
      style={{
        transformStyle: "preserve-3d",
        backgroundImage: isDark
          ? `linear-gradient(180deg, rgba(6, 8, 20, 0.3) 0%, rgba(6, 8, 20, 0.96) 100%), url(${card.image})`
          : `linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.98) 100%), url(${card.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      whileHover={{ y: -17 }}
      className={`p-5 mobile-m:p-6 laptop:p-7 rounded-sm border text-left min-h-[280px] mobile-m:min-h-[300px] laptop:min-h-[320px] flex flex-col justify-end shadow-premium hover:border-blue-500 transition-all duration-100 ${isDark ? 'border-slate-900' : 'border-slate-200/50'
        }`}
    >
      <h3 className={`text-base mobile-m:text-lg font-bold font-sans mb-3 ${isDark ? 'text-slate-100' : 'text-slate-900'
        }`}>{card.title}</h3>
      <ul className="space-y-2">
        {card.points.map((point, pIdx) => (
          <li key={pIdx} className="flex items-start gap-2 text-[10px] mobile-m:text-xs leading-relaxed font-sans">
            <span className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${isDark ? 'bg-gold' : 'bg-[#1b73ba]'
              }`} />
            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              {point}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

interface TestimonialCardProps {
  test: { name: string; prog: string; quote: string };
  isDark: boolean;
}

function TestimonialCard({ test, isDark }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -14 }}
      className={`p-4 mobile-m:p-5 laptop:p-6 4k:p-8 rounded-sm border text-left shadow-premium flex flex-col justify-between transition-all duration-300 hover:border-gold/30 ${isDark ? 'border-slate-800 bg-transparent' : 'border-slate-200/50 bg-transparent'
        }`}
    >
      <div className="space-y-2 mobile-m:space-y-4">
        <span className="font-serif italic font-extrabold text-4xl mobile-m:text-5xl 4k:text-6xl text-gold opacity-30 select-none block leading-[0]">"</span>
        <p className={`text-[10px] mobile-m:text-xs laptop:text-sm 4k:text-base italic leading-relaxed font-sans mt-2 ${isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
          {test.quote}
        </p>
      </div>
      <div className={`mt-4 mobile-m:mt-6 pt-3 mobile-m:pt-4 border-t flex items-center justify-between ${isDark ? 'border-slate-900' : 'border-slate-100'
        }`}>
        <div>
          <h5 className={`text-[10px] mobile-m:text-xs 4k:text-sm font-bold font-sans ${isDark ? 'text-slate-100' : 'text-slate-800'
            }`}>{test.name}</h5>
          <p className="text-[10px] mobile-m:text-[11px] 4k:text-xs text-gold mt-0.5 font-sans font-medium">{test.prog}</p>
        </div>
        <div className="flex gap-0.5 mobile-m:gap-1 text-gold">
          {[1, 2, 3, 4, 5].map(star => (
            <Star key={star} className="w-2.5 h-2.5 mobile-m:w-3 mobile-m:h-3 4k:w-4 4k:h-4 fill-current" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function HomeSection({ onOpenConsultation, onNavigateToTab, theme }: HomeSectionProps) {
  const isDark = theme === 'dark';
  const section1Ref = useRef<HTMLDivElement>(null);

  /* ────────────────────────────────────────────────────────────
   DATA — add a `photo` (optional) and `rating`; falls back to
   an initials avatar if no photo is supplied
   ──────────────────────────────────────────────────────────── */
  const testimonials = [
    {
      name: "Aditya R.",
      prog: "M.Sc Computer Science, Germany",
      quote:
        "EuroZiel didn't just file applications—they explained the entire journey. Speaking directly with seniors already studying in Germany gave me the clarity I needed to make the right choice.",
      photo: "", // e.g. "/students/aditya.jpg"
      rating: 5,
    },
    {
      name: "Keerthana S.",
      prog: "Mechanical Engineering Student",
      quote:
        "The honesty was refreshing. Instead of false promises, they told me exactly where my profile stood and how to improve it. That transparent feedback saved me months.",
      photo: "",
      rating: 5,
    },
    {
      name: "Vishnu Prasad",
      prog: "TU Berlin Student",
      quote:
        "They guided me from APS validation all the way to finding accommodation. Even after landing, their student network helped me avoid the mistakes most newcomers make.",
      photo: "",
      rating: 5,
    },
    {
      name: "Nithya M.",
      prog: "Healthcare Ausbildung Pathway",
      quote:
        "The Ausbildung visa and language steps were overwhelming. EuroZiel connected me with people already working in Germany, making the entire transition incredibly smooth.",
      photo: "",
      rating: 5,
    },
  ];

  const testimonialCount = testimonials.length;

  /* accent used for the quote mark, dots, and avatar-ring per card */
  const ACCENTS = ["#3b82c4", "#e5a800", "#1fae7a", "#8b6fd8"];

  /* ────────────────────────────────────────────────────────────
     PHOTO PANEL — slides in from the direction of travel
     ──────────────────────────────────────────────────────────── */
  function PhotoPanel({ test, dir, accent, side }: { test: { name: string; prog?: string; quote?: string; photo?: string; rating?: number }; dir: number; accent: string; side: 'left' | 'right' }) {
    const initials = test.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <motion.div
        key={`photo-${test.name}`}
        initial={{ x: side === "left" ? -dir * 60 : dir * 60, opacity: 0, scale: 0.92 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: side === "left" ? -dir * 60 : dir * 60, opacity: 0, scale: 0.92 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="relative flex items-center justify-center"
      >
        <div
          className="relative w-40 h-40 mobile-m:w-48 mobile-m:h-48 laptop:w-56 laptop:h-56 rounded-full overflow-hidden flex items-center justify-center"
          style={{
            boxShadow: `0 0 0 4px ${accent}33, 0 0 0 1px ${accent}, 0 25px 50px -12px ${accent}55`,
          }}
        >
          {test.photo ? (
            <img
              src={test.photo}
              alt={test.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-4xl mobile-m:text-5xl font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${accent}, ${accent}99)`,
              }}
            >
              {initials}
            </div>
          )}
        </div>

        {/* orbiting ring accent */}
        <motion.div
          className="absolute w-48 h-48 mobile-m:w-56 mobile-m:h-56 laptop:w-64 laptop:h-64 rounded-full pointer-events-none"
          style={{ border: `1px dashed ${accent}66` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    );
  }

  /* ────────────────────────────────────────────────────────────
     QUOTE PANEL — slides in from the opposite side of the photo
     ──────────────────────────────────────────────────────────── */
  function QuotePanel({ test, dir, accent, side, isDark }: { test: { name: string; prog?: string; quote?: string; photo?: string; rating?: number }; dir: number; accent: string; side: 'left' | 'right'; isDark: boolean }) {
    return (
      <motion.div
        key={`quote-${test.name}`}
        initial={{ x: side === "left" ? -dir * 60 : dir * 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: side === "left" ? -dir * 60 : dir * 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.05 }}
        className="relative"
      >
        <Quote
          className="w-10 h-10 mobile-m:w-12 mobile-m:h-12 mb-3 opacity-90"
          style={{ color: accent, fill: accent, fillOpacity: 0.15 }}
        />

        <p
          className={`text-base mobile-m:text-lg laptop:text-xl leading-relaxed font-medium ${isDark ? "text-slate-100" : "text-slate-800"
            }`}
        >
          “{test.quote}”
        </p>

        <div className="flex items-center gap-1 mt-5">
          {Array.from({ length: test.rating ?? 0 }).map((_, i) => (
            <Star key={i} className="w-4 h-4" style={{ color: accent, fill: accent }} />
          ))}
        </div>

        <div className="mt-3">
          <div className={`font-bold text-sm mobile-m:text-base ${isDark ? "text-white" : "text-slate-900"}`}>
            {test.name}
          </div>
          <div className={`text-xs mobile-m:text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {test.prog}
          </div>
        </div>
      </motion.div>
    );
  }

  /* ────────────────────────────────────────────────────────────
     SCROLL-DRIVEN TESTIMONIAL SWAPPER
     ──────────────────────────────────────────────────────────── */
  function ScrollingTestimonials({ isDark }: { isDark: boolean }) {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [active, setActive] = useState(0);
    const [dir, setDir] = useState(1);
    const prevActive = useRef(0);

    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (v) => {
      const idx = Math.min(testimonialCount - 1, Math.max(0, Math.round(v * (testimonialCount - 1))));
      if (idx !== prevActive.current) {
        setDir(idx > prevActive.current ? 1 : -1);
        prevActive.current = idx;
        setActive(idx);
      }
    });

    const test = testimonials[active];
    const accent = ACCENTS[active % ACCENTS.length];
    const photoSide = active % 2 === 0 ? "left" : "right"; // alternates every testimonial

    return (
      <div ref={sectionRef} className="relative" style={{ height: `${testimonialCount * 100}vh` }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="w-full max-w-6xl mx-auto px-4 mobile-m:px-6 laptop:px-10">
            <div className="relative grid grid-cols-1 mobile-l:grid-cols-2 gap-10 mobile-m:gap-14 items-center min-h-[380px]">
              {/* Photo column */}
              <div className={`flex justify-center ${photoSide === "right" ? "mobile-l:order-2" : "mobile-l:order-1"}`}>
                <AnimatePresence mode="wait" custom={dir}>
                  <PhotoPanel test={test} dir={dir} accent={accent} side={photoSide} />
                </AnimatePresence>
              </div>

              {/* Quote column */}
              <div className={`${photoSide === "right" ? "mobile-l:order-1" : "mobile-l:order-2"}`}>
                <AnimatePresence mode="wait" custom={dir}>
                  <QuotePanel
                    test={test}
                    dir={dir}
                    accent={accent}
                    side={photoSide === "right" ? "right" : "left"}
                    isDark={isDark}
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* progress dots + counter */}
            <div className="flex items-center justify-center gap-4 mt-10 mobile-m:mt-14">
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      width: i === active ? 26 : 8,
                      backgroundColor: i === active ? ACCENTS[i % ACCENTS.length] : isDark ? "#334155" : "#cbd5e1",
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                    className="h-2 rounded-full"
                  />
                ))}
              </div>
              <span className={`text-xs font-semibold tabular-nums ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                {String(active + 1).padStart(2, "0")} / {String(testimonialCount).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }



  /* ────────────────────────────────────────────────────────────
     DATA — unchanged
     ──────────────────────────────────────────────────────────── */

  const chooseCards = [
    {
      title: "Real People. Real Guidance.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
      points: [
        "1-on-1 contact with TU Munich and RWTH Aachen alumni",
        "Direct feedback from professionals working across Europe",
      ],
    },
    {
      title: "Germany Exclusive Focus",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800",
      points: [
        "Specialized strategy for German public university admissions",
        "Deep knowledge of APS validation and German visa filing",
      ],
    },
    {
      title: "Domain-Based Experts",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800",
      points: [
        "Guidance from seniors who studied in your exact field",
        "Tailored roadmaps for IT, Engineering, and Healthcare",
      ],
    },
    {
      title: "Personalized Strategy",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800",
      points: [
        "Shortlists curated for your specific CGPA and profile",
        "Custom plan tailored to language levels and budget",
      ],
    },
    {
      title: "End-to-End Support",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",
      points: [
        "Assistance from APS submission to visa approval",
        "Ground setup: blocking account, Anmeldung, housing",
      ],
    },
    {
      title: "Target Exam Training",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
      points: [
        "Preparation support for IELTS, GRE, or DSH",
        "Practical exam strategies from alumni who aced the tests",
      ],
    },
  ];

  const cardCount = chooseCards.length;
  const N = cardCount;
  const STEP = 360 / cardCount;

  const GRADIENTS = [
    ["#3b82c4", "#1fae7a"],
    ["#e5a800", "#e08a3c"],
    ["#8b6fd8", "#3b82c4"],
    ["#2bb3ab", "#1fae7a"],
    ["#e08a3c", "#e5a800"],
    ["#1fae7a", "#8b6fd8"],
  ];

  function normalizeAngle(angle: number): number {
    let a = angle % 360;
    if (a > 180) a -= 360;
    if (a < -180) a += 360;
    return a;
  }

  function ChooseCarousel({ isDark }: { isDark: boolean }) {
    const [active, setActive] = useState(0);
    const [radius, setRadius] = useState(360);
    const [vhPerCard, setVhPerCard] = useState(100);
    const [sideScale, setSideScale] = useState(0.82); // only affects non-front cards
    const containerRef = useRef<HTMLDivElement>(null);

    // responsive ring radius + scroll distance per card + side-card scale
    useEffect(() => {
      const setR = () => {
        const w = window.innerWidth;
        if (w < 480) {
          setRadius(130);
          setVhPerCard(65);
          setSideScale(0.55); // smaller side cards on small mobile
        } else if (w < 768) {
          setRadius(190);
          setVhPerCard(75);
          setSideScale(0.62); // smaller side cards on mobile
        } else if (w < 1024) {
          setRadius(290);
          setVhPerCard(90);
          setSideScale(0.82); // unchanged from before
        } else {
          setRadius(400);
          setVhPerCard(100);
          setSideScale(0.82); // unchanged from before
        }
      };
      setR();
      window.addEventListener("resize", setR);
      return () => window.removeEventListener("resize", setR);
    }, []);

    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
      const idx = Math.min(N - 1, Math.max(0, Math.round(latest * (N - 1))));
      setActive((prev) => (prev !== idx ? idx : prev));
    });

    const rotation = -active * STEP;
    const [g1, g2] = GRADIENTS[active % GRADIENTS.length];

    return (
      <div ref={containerRef} style={{ height: `${N * vhPerCard}vh` }} className="relative">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
          <div
            className="absolute inset-0 opacity-25 blur-3xl transition-all duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${g1}, ${g2}, transparent 70%)`,
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
            className="relative z-10 text-center max-w-xl mobile-m:max-w-2xl 4k:max-w-3xl mx-auto space-y-2 mobile-m:space-y-3 mb-6 mobile-m:mb-8 laptop:mb-10"
          >
            <h2 className="text-2xl mobile-m:text-3xl pb-0 laptop:text-4xl 4k:text-5xl font-bold tracking-tight font-sans">
              Why Students Choose EuroZiel
            </h2>
            <p className={`text-xs pb-14 mobile-m:text-sm 4k:text-base ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              We focus on a single European pathway so we can offer deeper, more comprehensive expertise than any generalist agent.
            </p>
          </motion.div>

          <div
            className="relative flex items-center justify-center w-full"
            style={{
              perspective: "1200px",
              height: "min(60vw, 400px)",
              maxWidth: "900px",
            }}
          >
            <motion.div
              className="relative w-full h-full mx-auto"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: rotation }}
              transition={{ type: "spring", stiffness: 60, damping: 18 }}
            >
              {chooseCards.map((card, i) => {
                const base = i * STEP;
                const effectiveAngle = normalizeAngle(base + rotation);
                const absAngle = Math.abs(effectiveAngle);
                const isFront = absAngle < STEP / 2;
                const opacity = absAngle > 100 ? 0 : isFront ? 1 : 0.35;
                // front card scale is always 1 (unchanged), side cards use responsive sideScale
                const scale = isFront ? 1 : sideScale;
                const [cg1, cg2] = GRADIENTS[i % GRADIENTS.length];

                return (
                  <div
                    key={card.title}
                    className="absolute top-1/2 left-1/2 w-[210px] mobile-m:w-[240px] mobile-l:w-[260px] laptop:w-[300px]"
                    style={{
                      transform: `translate(-50%, -50%) rotateY(${base}deg) translateZ(${radius}px) scale(${scale})`,
                      opacity,
                      transition: "opacity 0.5s ease, transform 0.5s ease",
                      pointerEvents: isFront ? "auto" : "none",
                    }}
                  >
                    <div
                      className="rounded-2xl p-[2px] shadow-xl"
                      style={{
                        background: `linear-gradient(135deg, ${cg1}, ${cg2})`,
                      }}
                    >
                      <div
                        className={`rounded-[14px] overflow-hidden backdrop-blur-sm ${isDark ? "bg-slate-950/90" : "bg-white/95"
                          }`}
                      >
                        <div className="w-full aspect-[4/3] overflow-hidden">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover"
                            draggable={false}
                          />
                        </div>
                        <div className="p-3 mobile-m:p-4 laptop:p-5 space-y-2">
                          <h3
                            className={`text-xs mobile-m:text-sm laptop:text-base font-semibold ${isDark ? "text-white" : "text-slate-900"
                              }`}
                          >
                            {card.title}
                          </h3>
                          <ul className="space-y-1.5">
                            {card.points.map((point, pi) => (
                              <li key={pi} className="flex items-start gap-1.5">
                                <CheckCircle2
                                  className="w-3.5 h-3.5 mobile-m:w-4 mobile-m:h-4 shrink-0 mt-[1px]"
                                  style={{ color: cg1 }}
                                  strokeWidth={2.5}
                                />
                                <span
                                  className={`text-[10px] mobile-m:text-xs leading-snug ${isDark ? "text-slate-400" : "text-slate-500"
                                    }`}
                                >
                                  {point}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          

          <div className="flex gap-1.5 mobile-m:gap-2 mt-6 pt-12 mobile-m:mt-8 laptop:mt-10 relative z-10">
            {chooseCards.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6" : "w-1.5 opacity-30"
                  }`}
                style={{
                  background: i === active ? `linear-gradient(90deg, ${g1}, ${g2})` : isDark ? "#fff" : "#0f172a",
                }}
              />
            ))}
          </div>

          <p
            className={`mt-3 mobile-m:mt-4 text-[10px] mobile-m:text-xs relative z-10 tracking-wide uppercase ${isDark ? "text-slate-500" : "text-slate-400"
              }`}
          >
            {active === N - 1 ? "Keep scrolling" : "Scroll to explore"}
          </p>
        </div>
      </div>
    );
  }







  return (
    <div className="pb-12 mobile-m:pb-16 laptop:pb-20 4k:pb-32">


      <OurMission />


      {/* SECTION 2: WHY STUDENTS CHOOSE EUROZIEL */}
      <section
        className={`relative z-40 py-16 mobile-m:py-20 laptop:py-24 px-4 mobile-m:px-5 mobile-l:px-6 laptop:px-8 4k:px-16 border-b w-full transition-colors duration-600 ${isDark ? "border-slate-900 bg-transparent" : "border-slate-100 bg-transparent"
          }`}
      >
        <div className="w-full max-w-7xl mx-auto">
          <ChooseCarousel isDark={isDark} />
        </div>
      </section>

      {/* SECTION 3: DYNAMIC COMPONENT FOR THE 6-STEP PATHWAY */}
      <Journey theme={theme} />

      {/* SECTION 4: TESTIMONIALS — scroll-driven swapper with photo + quote panels */}
      <section
        className={`relative z-40 pt-[30px] pb-[10px] py-16 mobile-m:py-20 laptop:py-24 px-4 mobile-m:px-5 mobile-l:px-6 laptop:px-8 4k:px-16 w-full transition-colors duration-300 ${isDark ? "border-slate-900 bg-transparent" : "border-slate-100 bg-transparent"
          }`}
      >
        <div className="w-full space-y-8 mobile-m:space-y-10 laptop:space-y-12 4k:space-y-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-xl mobile-m:max-w-2xl 4k:max-w-3xl mx-auto space-y-2 mobile-m:space-y-3"
          >
            {/* <span
              className={`text-[9px] mobile-m:text-[10px] 4k:text-xs font-bold text-navy uppercase tracking-[0.2em] px-2.5 mobile-m:px-3 py-1 rounded-sm border ${isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"
                }`}
            >
              SUCCESS STORIES
            </span> */}
            <h2 className="text-2xl mobile-m:text-3xl laptop:text-4xl 4k:text-5xl font-bold tracking-tight font-sans">
              What Our Students Say
            </h2>
            <p className={`text-[10px] mobile-m:text-xs laptop:text-sm 4k:text-base ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Real experiences from students who trusted EuroZiel for their Germany journey.
            </p>
          </motion.div>

          <ScrollingTestimonials isDark={isDark} />
        </div>
      </section>

      {/* SECTION 5: BOTTOM CTA */}
      <div className={`w-full relative z-40 py-16 ${isDark ? 'bg-transparent' : 'bg-transparent'
        }`}>
        <section className="max-w-7xl mx-auto px-4 mobile-m:px-5 laptop:px-8 4k:px-16 text-center">
          <ScrollReveal variant="flipUp">
            <div className={`relative rounded-sm overflow-hidden py-8 mobile-m:py-10 laptop:py-12 4k:py-20 px-5 mobile-m:px-8 laptop:px-12 4k:px-20 border border-[#e5a800]/20 text-white shadow-premium border-b-4 border-b-gold ${isDark ? 'bg-slate-950' : 'bg-slate-900'
              }`}>

              <div className="absolute top-0 right-0 w-24 mobile-m:w-32 4k:w-48 h-24 mobile-m:h-32 4k:h-48 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 mobile-m:w-32 4k:w-48 h-24 mobile-m:h-32 4k:h-48 bg-navy/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-4 mobile-m:space-y-5 laptop:space-y-6 4k:space-y-8 max-w-xl mobile-m:max-w-2xl mx-auto">
                <span className="text-[9px] mobile-m:text-[10px] 4k:text-xs font-bold tracking-[0.15em] text-gold uppercase bg-gold/5 border border-gold/30 px-2.5 mobile-m:px-3 py-1 rounded-sm">
                  Germany Is A Big Move
                </span>
                <h3 className="text-xl mobile-m:text-2xl laptop:text-3xl 4k:text-4xl font-bold font-sans leading-tight">
                  You Should Not Have To Figure It Out Alone.
                </h3>
                <p className="text-slate-400 text-[10px] mobile-m:text-sm 4k:text-base font-sans">
                  Get honest, real connections, and a step-by-step pathway built specifically for your academic profile. Stop searching randomly and talk to experts on the ground.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mobile-m:gap-4 pt-2 mobile-m:pt-4">
                  <button
                    onClick={onOpenConsultation}
                    className="w-full sm:w-auto px-6 mobile-m:px-8 4k:px-10 py-3 mobile-m:py-3.5 4k:py-5 rounded-sm font-bold text-[10px] mobile-m:text-xs 4k:text-sm uppercase tracking-widest bg-navy text-white hover:bg-opacity-90 border-b-2 border-gold transition-all cursor-pointer shadow-premium"
                  >
                    Start Your Germany Journey
                  </button>
                  <button
                    onClick={() => onNavigateToTab('study')}
                    className="w-full sm:w-auto px-5 mobile-m:px-6 4k:px-8 py-3 mobile-m:py-3.5 4k:py-5 rounded-sm font-bold text-[10px] mobile-m:text-xs 4k:text-sm uppercase tracking-widest border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-300 transition-all cursor-pointer"
                  >
                    Verify €0 Tuition Fields &rarr;
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>

    </div>
  );
}