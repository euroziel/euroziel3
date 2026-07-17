import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass, Laptop, FileCode, Landmark, ShieldCheck, HelpCircle, ArrowRight, ClipboardCheck, Scroll, FileCheck, Award, GraduationCap, ChevronDown, CheckCircle, Check, Lock
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ServicesSectionProps {
  onOpenConsultation: () => void;
  theme: 'light' | 'dark';
}

export default function ServicesSection({ onOpenConsultation, theme }: ServicesSectionProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const dark = theme === 'dark';

  const mainServices = [

    {
      step: "01",
      title: "Bachelor's Programmes",
      tag: "Undergraduate Entry",
      icon: "🎓",
      desc: "Applying as an Indian student requires specific routing, since Class 12 certificates alone are usually insufficient for direct university entry. Depending on your stream and score, we analyze whether you need Studienkolleg (foundation year) or Indian university bridging first.",
      highlights: [
        "Tuition-free or low cost public universities",
        "English or German taught degree options",
        "Clear roadmap no guesswork on eligibility"
      ],
      rules: "We help you find world-class, tuition free English or German taught pathways with clear upfront route advice.",
      align: "right"
    },
    {
      step: "02",
      title: "Master's Programmes",
      tag: "Strategic Post-Graduation",
      icon: "📈",
      desc: "This is where most Indian students either fail or succeed. Common mistakes include targeting wrong university tiers for their CGPA, templated SOPs, late APS applications, or wrong portal submissions. We map your specific profile and shortlist universities across 3 tiers Ambitious, Realistic, and Safe.",
      highlights: [
        "3 tier university shortlisting strategy",
        "100% customized SOPs & documents",
        "Avoid the common rejection traps"
      ],
      rules: "100% customized profiles. We build real, compelling academic documents that stand out.",
      align: "left"
    },
    {
      step: "03",
      title: "Ausbildung (Vocational Training)",
      tag: "Dual System Trainee",
      icon: "🛠️",
      desc: "Germany's dual vocational training system where you split your time between a real company and a vocational school. You are not an intern you are a registered trainee earning a contractual monthly salary between €600 and €1,200. Trusted by industry leaders like Bosch, BMW, and Siemens.",
      highlights: [
        "Earn while you learn real salary from day one",
        "Direct placement with top German companies",
        "High chance of full time job offer after completion"
      ],
      rules: "Requires solid German language skills (B1 to B2 level target). We assist in school mapping and securing local training contracts.",
      align: "right"
    },
  ];

  // Layout constants — the SVG path is generated FROM these,
  // so the curve can never drift out of sync with the cards.
  const ROW_HEIGHT = 460;   // px height reserved per card row
  const ROW_GAP = 80;       // px vertical gap between rows
  const LEFT_NODE_X = 460;  // node x position (out of 1000) when card is on the left
  const RIGHT_NODE_X = 540; // node x position (out of 1000) when card is on the right

  const TOTAL_HEIGHT =
    mainServices.length * ROW_HEIGHT + (mainServices.length - 1) * ROW_GAP;

  // Builds a smooth zigzag bezier path through each row's node position
  function buildZigzagPath(services: typeof mainServices) {
    const points = services.map((s, i) => {
      const x = s.align === "right" ? RIGHT_NODE_X : LEFT_NODE_X;
      const y = i * (ROW_HEIGHT + ROW_GAP) + ROW_HEIGHT / 2;
      return { x, y };
    });

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const midY = (curr.y + next.y) / 2;
      d += ` C ${curr.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`;
    }
    return d;
  }

  const blockSteps = [
    {
      id: "01",
      title: "Profile Verification",
      short: "CGPA, backlogs, gaps, goals",
      full: "Before we talk universities, we talk about you. Your CGPA, your backlog history if any, your gap year if there is one, your actual dream, and most importantly which stream matches your long-term roadmap. We have seen students with 6.2 CGPA get into TU Munich and students with 8.5 struggle because their profile was pointed in the wrong direction. No sugarcoating, no false promises."
    },
    {
      id: "02",
      title: "University & Course Selection",
      short: "TU Munich & beyond matching",
      full: "Choosing a university in Germany is not about picking the most famous name. We match you to universities where your CGPA is competitive and where Indian students have succeeded. We shortlist across three tiers: ambitious, realistic, and safe, so you always have a strong option waiting."
    },
    {
      id: "03",
      title: "APS Application",
      short: "Academic Evaluation Centre verification",
      full: "The Academic Evaluation Centre verifies the authenticity of every academic document you have. APS can take anywhere from 6 to 12 weeks. We make sure you begin APS at the right time so the certificate is in your hand long before your first university deadline, not after."
    },
    {
      id: "04",
      title: "SOP / LOR / CV Creation",
      short: "Individually drafted stories",
      full: "A German professor reading your SOP has read five hundred others that week. They know within the first paragraph whether you actually wrote it. We do not write it for you and hand it over. We help you shape your own story into something that is genuinely compelling. Same goes for LORs and European-format styled CVs."
    },
    {
      id: "05",
      title: "IELTS / GRE / German Prep",
      short: "Language and assessment coaching",
      full: "IELTS is not just about the overall band score—a 5.5 in Writing will get you rejected. For German language elements, B1 can feel like a whole new language compared to A1/A2. We structure target batches exactly where students slow down. EuroZiel students receive these courses at half the standard market rate."
    },
    {
      id: "06",
      title: "University Application",
      short: "Uni-assist and direct portals",
      full: "German university applications are not a single form. Every university has its own portal and uni-assist has separate processes. One wrong file format, one missing document, and your application disappears with no second chances until the next intake. We manage every application end-to-end, tracking every deadline."
    },
    {
      id: "07",
      title: "Offer Letter",
      short: "Handling conditional admits",
      full: "Getting your offer letter is when everything becomes real. But it is also when students make expensive mistakes—accepting the wrong offer too quickly or missing acceptance deadlines. We read every offer letter with you, explain exactly what it means, and guide your final choice."
    },
    {
      id: "08",
      title: "Loan Assistance",
      short: "Working with Indian banks",
      full: "German university loan applications are harder than they should be because most Indian bank officers have never processed one. They ask for documents that do not exist in the German system. We know which banks process Germany loans without complications and how to present your offer letter to a loan officer."
    },
    {
      id: "09",
      title: "Blocked Account Opening",
      short: "Securing the monthly payout",
      full: "The blocked account is not just a visa formality. It is the €992 that gets released into your German account every single month (totaling €11,904/year from 2025/26) to cover living expenses. We handle setup timing with Expatrio or Fintiba to ensure your confirmation is ready before your visa appointment."
    },
    {
      id: "10",
      title: "Insurance Assistance",
      short: "Registering with TK, AOK or Barmer",
      full: "The moment you land in Germany, your insurance is active, and you need to know how to use it. Which clinics take walk-ins, what requires prior approval, etc. We help you enroll with TK, AOK, or Barmer from India itself so your confirmation letter is ready without any last-minute panic."
    },
    {
      id: "11",
      title: "Visa Guidance",
      short: "National Visa Type D interview prep",
      full: "The German student visa interview is not a rubber stamp. The consulate officer will ask detailed questions about your programme, post-graduation plans, funding, and return plans. We conduct complete mock embassy interviews with you covering every likely question until your answers are consistent."
    },
    {
      id: "12",
      title: "Flight to Germany",
      short: "Pre-departure luggage lists",
      full: "Where most consultancies stop, we do not. Which city to fly into, baggage limits, direct vs. connecting flights, what to pack in your cabin bag in case checked luggage is delayed. We provide a full pre-departure checklist and run a raw, real conversation before you take off."
    },
    {
      id: "13",
      title: "On-Arrival Pickup",
      short: "WhatsApp coordinators waiting for you",
      full: "You land after a long flight with 30kg of baggage and no local SIM card. Our Germany-based student network coordinates arrival support on the ground. You have someone who has already been through this waiting for you or reachable on WhatsApp the instant you touch down."
    },
    {
      id: "14",
      title: "Accommodation",
      short: "WG-Gesucht and Studentenwerk rosters",
      full: "University dorm waiting lists in Germany run anywhere from 6 months to over a year. WG-Gesucht listings in Munich and Frankfurt disappear within hours. We help you apply to your university Studentenwerk the right way, build a strong WG profile, and hook you up with active student peer databases."
    },
    {
      id: "15",
      title: "Settling in Germany",
      short: "Anmeldung, transport pass, groceries",
      full: "The first few weeks involve Anmeldung at the Bürgeramt, opening your German bank account, activating your health card, and understanding local recycling rules (your neighbors will notice if you get it wrong!). Our connected network is reachable throughout. You are never navigating it alone."
    }
  ];

  // ── Add these inside your component, near your other useState hooks ──
  const FREE_STEPS = 3; // first 3 steps are open for everyone

  const [paidSteps, setPaidSteps] = useState<Set<number>>(new Set()); // indices unlocked via successful payment
  const [lockedPopup, setLockedPopup] = useState<number | null>(null); // index of step showing the "unlock" popup
  const [paymentLoadingStep, setPaymentLoadingStep] = useState<number | null>(null); // step currently "processing" payment

  const isStepUnlocked = (idx: number) => idx < FREE_STEPS || paidSteps.has(idx);
  const totalUnlocked = FREE_STEPS + paidSteps.size;

  const handleStepClick = (idx: number) => {
    if (!isStepUnlocked(idx)) {
      // Locked step clicked → show the fade-in unlock popup, do NOT open it
      setLockedPopup(idx);
      return;
    }
    setLockedPopup(null);
    setExpandedStep(expandedStep === idx ? null : idx);
  };

  // PLACEHOLDER: Razorpay is not wired up yet.
  // This only simulates "opening the payment gateway" — it does NOT unlock the step.
  // Once Razorpay is integrated, call setPaidSteps(...) ONLY inside the actual
  // payment success callback (e.g. handler.on('payment.success', ...)), not here.
  const handleUnlockPay = (idx: number) => {
    setPaymentLoadingStep(idx);

    // Simulated gateway redirect delay — replace this entire block with real Razorpay checkout.open()
    setTimeout(() => {
      setPaymentLoadingStep(null);
      // Intentionally NOT unlocking or expanding the step here.
      // Step remains locked and closed until real payment confirms.
    }, 1500);
  };

  return (
    <div className="space-y-24 md:space-y-36 pb-0">

      {/* SERVICES HERO */}
      <section className="relative top-0 m-0 py-0 left-0 w-full min-h-screen z-0 bg-transparent overflow-hidden flex items-center justify-center">
        <ScrollReveal variant="glideUp">
          <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
            {/* Decorative background glows */}
            <div className="absolute top-1/4 -translate-y-1/2 -right-32 w-[30rem] h-[30rem] bg-navy/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-3xl mx-auto space-y-6 text-center flex flex-col items-center">
              {/* <span
          className={`inline-block text-[10px] font-bold text-navy uppercase tracking-[0.2em] border px-4 py-1.5 rounded-full backdrop-blur-sm ${
            dark
              ? 'bg-slate-900/40 border-slate-800'
              : 'bg-slate-100/40 border-slate-200'
          }`}
        >
          ✦ OUR GUIDANCE SERVICES ✦
        </span> */}

              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-bold font-sans leading-tight ${dark ? 'text-white' : 'text-slate-900'
                  }`}
              >
                Complete support <br />
                <span className="font-serif italic font-medium text-gold">
                  zero gaps
                </span>
              </h1>

              <p
                className={`text-sm md:text-lg font-sans leading-relaxed max-w-xl mx-auto ${dark ? 'text-slate-300' : 'text-slate-600'
                  }`}
              >
                From your first enquiry to your first day on a German campus EuroZiel
                covers every aspect of your study abroad journey. Guided by mentors
                currently studying your fields in Germany.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="bg-navy text-white text-sm font-semibold px-8 py-3.5 rounded-sm hover:bg-navy/90 hover:scale-[1.02] transition-all shadow-premium">
                  Book Your Session
                </button>
                {/* <button
                  className={`text-sm font-semibold px-8 py-3.5 rounded-sm border transition-colors ${dark
                    ? 'border-slate-700 text-white hover:bg-slate-800/60'
                    : 'border-slate-300 text-slate-900 hover:bg-slate-100/60'
                    }`}
                >
                  Explore Services
                </button> */}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 pt-6 text-xs font-sans">
                <div className={dark ? 'text-slate-400' : 'text-slate-500'}>
                  <span className="text-gold font-bold text-base">500+</span> Students Guided
                </div>
                <div className={`w-px h-4 ${dark ? 'bg-slate-700' : 'bg-slate-300'}`} />
                <div className={dark ? 'text-slate-400' : 'text-slate-500'}>
                  <span className="text-gold font-bold text-base">98%</span> Visa Success Rate
                </div>
                <div className={`w-px h-4 ${dark ? 'bg-slate-700' : 'bg-slate-300'}`} />
                <div className={dark ? 'text-slate-400' : 'text-slate-500'}>
                  <span className="text-gold font-bold text-base">50+</span> Partner Universities
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* THREE PATHWAYS */}
      <section className="max-w-6xl mx-auto px-4 m-0 py-0 relative">

        {/* Section heading */}
        <ScrollReveal variant="fadeUp" className="text-center mb-1 relative z-10">
          <span className="text-[11px] font-bold text-gold uppercase tracking-widest">
            Your Journey to Germany
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold font-sans mt-3 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>
            Three Pathways, One Destination
          </h2>
          <p className={`text-sm mt-4 max-w-xl mx-auto font-sans ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            Whichever stage you're at, there's a clear, proven route mapped out for you step by step.
          </p>
        </ScrollReveal>

        {/* Zigzag curvy path container — height is driven by the same constants as the SVG path */}
        <div
          className="relative hidden md:block"
          style={{ height: TOTAL_HEIGHT }}
        >
          {/* Curvy connecting SVG path — coordinates generated programmatically, always in sync */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            viewBox={`0 0 1000 ${TOTAL_HEIGHT}`}
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d={buildZigzagPath(mainServices)}
              stroke={dark ? "#3f3f46" : "#e2e8f0"}
              strokeWidth="2.5"
              strokeDasharray="8 8"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <circle r="6" fill="#D4AF37">
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                path={buildZigzagPath(mainServices)}
              />
            </circle>
          </svg>

          {/* Cards positioned in fixed-height rows matching the path's row math exactly */}
          <div className="relative">
            {mainServices.map((service, sIdx) => (
              <ScrollReveal key={sIdx} variant="scaleUp" delay={sIdx * 0.15} className="w-full block">
                {/* style prop moved to this plain div since ScrollReveal doesn't accept it */}
                <div
                  className="w-full flex"
                  style={{
                    height: ROW_HEIGHT,
                    marginBottom: sIdx === mainServices.length - 1 ? 0 : ROW_GAP,
                  }}
                >
                  <div
                    className={`w-full flex ${service.align === "right" ? "justify-end" : "justify-start"
                      } items-center`}
                  >
                    <div className="relative w-[46%]">

                      {/* Step number node — vertically centered on the row, sitting on the path */}
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center text-xl border-4 z-20 shadow-lg ${service.align === "right" ? "-left-7" : "-right-7"
                          } ${dark ? 'bg-slate-950 border-gold text-gold' : 'bg-white border-gold text-gold'
                          }`}
                      >
                        {service.icon}
                      </div>

                      {/* Card */}
                      <div
                        className={`p-7 rounded-sm border text-left space-y-5 relative shadow-premium hover:border-gold hover:-translate-y-1 transition-all duration-300 w-full overflow-y-auto ${dark ? 'border-slate-900 bg-slate-950' : 'border-slate-100 bg-white'
                          }`}
                        style={{ maxHeight: ROW_HEIGHT }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-gold/60 tracking-widest">
                            STEP {service.step}
                          </span>
                          <div className="text-[9px] font-bold text-gold uppercase bg-gold/5 border border-gold/20 px-2 py-0.5 rounded-sm">
                            {service.tag}
                          </div>
                        </div>

                        <h3 className={`text-lg font-bold font-sans border-b pb-3 ${dark ? 'border-slate-900 text-slate-100' : 'border-slate-100 text-slate-800'
                          }`}>
                          {service.title}
                        </h3>

                        <p className={`text-xs leading-relaxed font-sans ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {service.desc}
                        </p>

                        <ul className="space-y-2">
                          {service.highlights.map((point, hIdx) => (
                            <li key={hIdx} className={`flex items-start gap-2 text-xs font-sans ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                              <span className="text-gold mt-0.5">✓</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        <div className={`p-4 rounded-sm border text-xs font-sans leading-relaxed ${dark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-600'
                          }`}>
                          <strong className="text-gold">Ground Rule:</strong> {service.rules}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mobile: simple vertical timeline (curvy zigzag doesn't work well on narrow screens) */}
        <div className="md:hidden relative">
          <div className={`absolute left-6 top-8 bottom-8 w-[2px] border-l-2 border-dashed ${dark ? 'border-slate-800' : 'border-slate-200'}`} />
          <div className="flex flex-col gap-10">
            {mainServices.map((service, sIdx) => (
              <ScrollReveal key={sIdx} variant="scaleUp" delay={sIdx * 0.15} className="relative pl-16 block">
                <div className={`absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center text-lg border-4 z-20 shadow-lg ${dark ? 'bg-slate-950 border-gold text-gold' : 'bg-white border-gold text-gold'
                  }`}>
                  {service.icon}
                </div>

                <div className={`p-7 rounded-sm border text-left space-y-5 relative shadow-premium hover:border-gold transition-all duration-300 ${dark ? 'border-slate-900 bg-slate-950' : 'border-slate-100 bg-white'
                  }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gold/60 tracking-widest">
                      STEP {service.step}
                    </span>
                    <div className="text-[9px] font-bold text-gold uppercase bg-gold/5 border border-gold/20 px-2 py-0.5 rounded-sm">
                      {service.tag}
                    </div>
                  </div>

                  <h3 className={`text-lg font-bold font-sans border-b pb-3 ${dark ? 'border-slate-900 text-slate-100' : 'border-slate-100 text-slate-800'
                    }`}>
                    {service.title}
                  </h3>

                  <p className={`text-xs leading-relaxed font-sans ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {service.desc}
                  </p>

                  <ul className="space-y-2">
                    {service.highlights.map((point, hIdx) => (
                      <li key={hIdx} className={`flex items-start gap-2 text-xs font-sans ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                        <span className="text-gold mt-0.5">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`p-4 rounded-sm border text-xs font-sans leading-relaxed ${dark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-600'
                    }`}>
                    <strong className="text-gold">Ground Rule:</strong> {service.rules}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 15 STEPS DIARY DIRECTORY */}
      <section className="max-w-4xl mx-auto px-4 mt-15 space-y-12 relative">
        <ScrollReveal variant="fadeUp">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] bg-gold/5 border border-gold/30 px-3 py-1 rounded-sm">
              {totalUnlocked} of {blockSteps.length} Steps Unlocked
            </span>
            <h2 className="text-2xl md:text-3.5xl font-bold tracking-tight font-sans">
              Our 15-Step End-To-End Support
            </h2>
            <p className={`text-xs md:text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              The first 3 steps are open to explore. Unlock the rest for just ₹9 per step.
            </p>

            {/* Overall progress bar */}
            <div className={`w-full max-w-md mx-auto h-1.5 rounded-full overflow-hidden mt-4 ${dark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <motion.div
                className="h-full bg-gold rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(totalUnlocked / blockSteps.length) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Vertical timeline design */}
          <div className="relative">
            {/* Base connecting line */}
            <div className={`absolute left-6 top-2 bottom-2 w-[2px] ${dark ? 'bg-slate-800' : 'bg-slate-200'}`} />
            {/* Progress-filled connecting line */}
            <motion.div
              className="absolute left-6 top-2 w-[2px] bg-gold"
              initial={{ height: 0 }}
              animate={{
                height: `${((totalUnlocked - 1) / (blockSteps.length - 1)) * 100}%`
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />

            <div className="space-y-3 relative">
              {blockSteps.map((step, idx) => {
                const isUnlocked = isStepUnlocked(idx);
                const isPaidUnlock = paidSteps.has(idx);
                const isExpanded = expandedStep === idx;
                const isPaying = paymentLoadingStep === idx;

                return (
                  <div key={idx} className="relative pl-16">
                    {/* Node */}
                    <div
                      className={`absolute left-0 top-3 w-12 h-12 rounded-full flex items-center justify-center border-4 z-10 transition-colors ${isUnlocked
                        ? isPaidUnlock
                          ? 'bg-gold border-gold text-slate-950'
                          : dark
                            ? 'bg-slate-950 border-gold text-gold'
                            : 'bg-white border-gold text-gold'
                        : dark
                          ? 'bg-slate-900 border-slate-800 text-slate-600'
                          : 'bg-slate-100 border-slate-200 text-slate-400'
                        }`}
                    >
                      {isUnlocked ? (
                        <span className="font-extrabold text-sm">{step.id}</span>
                      ) : (
                        <Lock className="w-4 h-4" strokeWidth={2.5} />
                      )}
                    </div>

                    {/* Card */}
                    <div
                      className={`rounded-sm border overflow-hidden transition-all shadow-premium ${isUnlocked
                        ? dark
                          ? 'border-slate-800 bg-slate-950/65'
                          : 'border-slate-200/60 bg-white'
                        : dark
                          ? 'border-slate-900 bg-slate-950/30 opacity-60'
                          : 'border-slate-100 bg-slate-50/60 opacity-70'
                        } ${isExpanded ? (dark ? 'bg-slate-900/20' : 'bg-slate-50/50') : ''}`}
                    >
                      <button
                        onClick={() => handleStepClick(idx)}
                        className={`w-full px-5 py-4 flex items-center justify-between text-left transition-colors cursor-pointer ${isUnlocked
                          ? dark ? 'hover:bg-slate-900/40' : 'hover:bg-slate-100/40'
                          : ''
                          }`}
                      >
                        <div>
                          <h4 className={`font-extrabold text-sm flex items-center gap-2 ${isUnlocked
                            ? dark ? 'text-slate-200' : 'text-slate-800'
                            : dark ? 'text-slate-600' : 'text-slate-400'
                            }`}>
                            {step.title}
                            {!isUnlocked && (
                              <span className="text-[9px] font-bold uppercase bg-gold/10 border border-gold/30 text-gold px-1.5 py-0.5 rounded-sm">
                                Locked
                              </span>
                            )}
                          </h4>
                          <p className={`text-[10px] mt-0.5 ${isUnlocked ? 'text-slate-400' : 'text-slate-500'}`}>
                            {step.short}
                          </p>
                        </div>

                        {isUnlocked ? (
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                        ) : (
                          <Lock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && isUnlocked && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className={`px-8 pb-5 pt-1 text-xs md:text-sm leading-relaxed font-sans border-l-2 border-[#1b73ba] ml-2 ${dark ? 'text-slate-300' : 'text-slate-600'
                              }`}>
                              {step.full}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Fade popup: shown when a locked step is clicked */}
                    <AnimatePresence>
                      {lockedPopup === idx && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.97 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute left-16 right-0 top-full mt-2 z-30 rounded-sm border p-5 shadow-premium ${dark ? 'bg-slate-950 border-gold/30' : 'bg-white border-gold/30'
                            }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                              <Lock className="w-5 h-5 text-gold" strokeWidth={2.5} />
                            </div>
                            <div className="flex-1">
                              <h5 className={`font-extrabold text-sm mb-1 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>
                                Step {step.id} is locked
                              </h5>
                              <p className={`text-xs leading-relaxed mb-4 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                                This step stays locked until payment is complete. Unlock it instantly for just ₹9.
                              </p>

                              {isPaying ? (
                                <div className="flex items-center gap-2 text-xs font-semibold text-gold">
                                  <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                                    className="inline-block w-3.5 h-3.5 border-2 border-gold border-t-transparent rounded-full"
                                  />
                                  Opening payment gateway...
                                </div>
                              ) : (
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => handleUnlockPay(idx)}
                                    className="flex items-center gap-2 text-xs font-bold bg-gold text-slate-950 px-4 py-2 rounded-sm hover:brightness-95 transition-all"
                                  >
                                    <Lock className="w-3.5 h-3.5" strokeWidth={3} />
                                    Unlock for ₹9
                                  </button>
                                  <button
                                    onClick={() => setLockedPopup(null)}
                                    className={`text-xs font-semibold px-3 py-2 rounded-sm transition-colors ${dark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
                                      }`}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 mb-30 text-center">
        <ScrollReveal variant="clipReveal">
          <div className={`p-8 md:p-12 rounded-sm border shadow-premium space-y-6 border-b-4 border-b-gold ${dark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'
            }`}>
            <span className={`text-[10px] font-bold text-navy uppercase tracking-[0.2em] border px-3 py-1 rounded-sm ${dark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}>
              Need Expert Input?
            </span>
            <h3 className={`text-2xl font-bold font-sans leading-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
              Stop Guessing and Connect with Students Already Living Your Dream
            </h3>
            <p className={`text-xs max-w-md mx-auto leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              Our mentors are not sitting in an office in India guessing what Germany is like. They are there. Right now. And they are part of your team.
            </p>
            <div>
              <button
                onClick={onOpenConsultation}
                className="px-8 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest bg-navy hover:bg-opacity-90 text-white border-b-2 border-gold transition-all cursor-pointer shadow-premium"
              >
                Schedule a Meeting
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}