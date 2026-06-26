import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, ArrowLeftRight, CheckCircle2, XCircle, ShieldCheck, Users, GraduationCap, Sparkles } from 'lucide-react';
import Journey from './Journey';
import ScrollReveal from './ScrollReveal';

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
      whileHover={{ y: -4 }}
      className={`p-5 mobile-m:p-6 laptop:p-7 rounded-sm border text-left min-h-[280px] mobile-m:min-h-[300px] laptop:min-h-[320px] flex flex-col justify-end shadow-premium hover:border-gold transition-all duration-300 ${
        isDark ? 'border-slate-900' : 'border-slate-200/50'
      }`}
    >
      <h3 className={`text-base mobile-m:text-lg font-bold font-sans mb-3 ${
        isDark ? 'text-slate-100' : 'text-slate-900'
      }`}>{card.title}</h3>
      <ul className="space-y-2">
        {card.points.map((point, pIdx) => (
          <li key={pIdx} className="flex items-start gap-2 text-[10px] mobile-m:text-xs leading-relaxed font-sans">
            <span className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${
              isDark ? 'bg-gold' : 'bg-[#1b73ba]'
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
      whileHover={{ y: -4 }}
      className={`p-4 mobile-m:p-5 laptop:p-6 4k:p-8 rounded-sm border text-left shadow-premium flex flex-col justify-between transition-all duration-300 hover:border-gold/30 ${
        isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200/50 bg-white'
      }`}
    >
      <div className="space-y-2 mobile-m:space-y-4">
        <span className="font-serif italic font-extrabold text-4xl mobile-m:text-5xl 4k:text-6xl text-gold opacity-30 select-none block leading-[0]">"</span>
        <p className={`text-[10px] mobile-m:text-xs laptop:text-sm 4k:text-base italic leading-relaxed font-sans mt-2 ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          {test.quote}
        </p>
      </div>
      <div className={`mt-4 mobile-m:mt-6 pt-3 mobile-m:pt-4 border-t flex items-center justify-between ${
        isDark ? 'border-slate-900' : 'border-slate-100'
      }`}>
        <div>
          <h5 className={`text-[10px] mobile-m:text-xs 4k:text-sm font-bold font-sans ${
            isDark ? 'text-slate-100' : 'text-slate-800'
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
  const [missionTab, setMissionTab] = useState<'euroziel' | 'typical'>('euroziel');

  const testimonials = [
    {
      name: "Aditya R.", prog: "M.Sc Computer Science, Germany",
      quote: "EuroZiel didn't just file applications—they explained the entire journey. Speaking directly with seniors already studying in Germany gave me the clarity I needed to make the right choice."
    },
    {
      name: "Keerthana S.", prog: "Mechanical Engineering Student",
      quote: "The honesty was refreshing. Instead of false promises, they told me exactly where my profile stood and how to improve it. That transparent feedback saved me months."
    },
    {
      name: "Vishnu Prasad", prog: "TU Berlin Student",
      quote: "They guided me from APS validation all the way to finding accommodation. Even after landing, their student network helped me avoid the mistakes most newcomers make."
    },
    {
      name: "Nithya M.", prog: "Healthcare Ausbildung Pathway",
      quote: "The Ausbildung visa and language steps were overwhelming. EuroZiel connected me with people already working in Germany, making the entire transition incredibly smooth."
    }
  ];

  const chooseCards = [
    {
      title: "Real People. Real Guidance.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
      points: [
        "1-on-1 contact with TU Munich and RWTH Aachen alumni",
        "Direct feedback from professionals working across Europe"
      ]
    },
    {
      title: "Germany Exclusive Focus",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800",
      points: [
        "Specialized strategy for German public university admissions",
        "Deep knowledge of APS validation and German visa filing"
      ]
    },
    {
      title: "Domain-Based Experts",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800",
      points: [
        "Guidance from seniors who studied in your exact field",
        "Tailored roadmaps for IT, Engineering, and Healthcare"
      ]
    },
    {
      title: "Personalized Strategy",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800",
      points: [
        "Shortlists curated for your specific CGPA and profile",
        "Custom plan tailored to language levels and budget"
      ]
    },
    {
      title: "End-to-End Support",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",
      points: [
        "Assistance from APS submission to visa approval",
        "Ground setup: blocking account, Anmeldung, housing"
      ]
    },
    {
      title: "Language Coaching Support",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
      points: [
        "Preparation support for TestDaF, Goethe-Zertifikat, or DSH",
        "Practical speaking sessions to handle daily life in Germany"
      ]
    }
  ];



  return (
    <div className="w-full">
      {/* SECTION 1: OUR MISSION — stacks over the sticky hero */}
      <section
        ref={section1Ref}
        className={`relative z-30 w-full min-h-screen flex flex-col justify-center py-16 mobile-m:py-20 laptop:py-24 border-b transition-colors duration-300 shadow-[0_-40px_80px_rgba(0,0,0,0.7)] lg:-mt-[100vh] mt-0 ${
          isDark ? 'border-slate-900 bg-[#060814]' : 'border-slate-100 bg-white'
        }`}
      >
       <ScrollReveal variant="fadeUp" delay={0.1}>
        <div className="w-full px-4 mobile-m:px-5 mobile-l:px-6 tablet:px-6 laptop:px-8 laptop-l:px-12 4k:px-20">
          <div className="grid grid-cols-1 laptop:grid-cols-12 gap-8 laptop:gap-12 laptop-l:gap-16 items-center">
            
            {/* Left Column: The Interactive Glassmorphic Compare-Card */}
            <div className="laptop:col-span-5">
              <div className={`relative rounded-2xl overflow-hidden p-6 mobile-m:p-8 border backdrop-blur-md transition-all duration-500 ${
                isDark 
                  ? 'bg-slate-950/65 border-slate-800/80 shadow-[0_0_50px_rgba(27,115,186,0.15)]' 
                  : 'bg-white/80 border-slate-200 shadow-xl'
              }`}>
                {/* Glow Effects */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
                  missionTab === 'euroziel' 
                    ? 'bg-amber-500/20' 
                    : 'bg-red-500/20'
                }`} />
                
                {/* Tab Switcher */}
                <div className={`flex p-1 rounded-lg mb-6 border relative z-10 ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-105 border-slate-200'
                }`}>
                  <button
                    onClick={() => setMissionTab('euroziel')}
                    className={`flex-1 py-2 px-3 rounded-md text-[10px] mobile-m:text-xs font-bold uppercase tracking-wider relative transition-all duration-300 cursor-pointer ${
                      missionTab === 'euroziel'
                        ? 'text-white'
                        : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {missionTab === 'euroziel' && (
                      <motion.div
                        layoutId="activeTabBackground"
                        className="absolute inset-0 bg-navy rounded-md z-0"
                        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 animate-pulse" />
                      EuroZiel Way
                    </span>
                  </button>
                  <button
                    onClick={() => setMissionTab('typical')}
                    className={`flex-1 py-2 px-3 rounded-md text-[10px] mobile-m:text-xs font-bold uppercase tracking-wider relative transition-all duration-300 cursor-pointer ${
                      missionTab === 'typical'
                        ? 'text-white'
                        : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {missionTab === 'typical' && (
                      <motion.div
                        layoutId="activeTabBackground"
                        className="absolute inset-0 bg-red-600 rounded-md z-0"
                        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-1.5">
                      Typical Agencies
                    </span>
                  </button>
                </div>

                {/* Animated Content Section */}
                <AnimatePresence mode="wait">
                  {missionTab === 'euroziel' ? (
                    <motion.div
                      key="euroziel-content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6 text-left relative z-10"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] font-mono block mb-1">
                          A Ground-Level Connection
                        </span>
                        <h4 className={`text-base font-extrabold font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Why our scholars land smoothly
                        </h4>
                      </div>

                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <h5 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                              1-on-1 Native Mentorship
                            </h5>
                            <p className={`text-[11px] leading-relaxed mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              Direct alignment sessions with TU Munich, RWTH Aachen alumni and professionals working in Germany.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <h5 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                              Individually Drafted SOPs
                            </h5>
                            <p className={`text-[11px] leading-relaxed mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              We help you articulate your real story into a compelling proposal. No AI templates, no reused text.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <h5 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                              Roster On-Arrival Support
                            </h5>
                            <p className={`text-[11px] leading-relaxed mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              Our student network supports you with local registration (Anmeldung), housing search, and bank setups.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="typical-content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6 text-left relative z-10"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-[0.2em] font-mono block mb-1">
                          The Volumeist Approach
                        </span>
                        <h4 className={`text-base font-extrabold font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Where standard agencies fall short
                        </h4>
                      </div>

                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                          <div>
                            <h5 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                              Recycled SOP Templates
                            </h5>
                            <p className={`text-[11px] leading-relaxed mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              Generic cover letters that admission committees immediately flag as spam, leading to instant rejections.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                          <div>
                            <h5 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                              Abandonment After Visa
                            </h5>
                            <p className={`text-[11px] leading-relaxed mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              Guidance terminates the moment they receive their consulting fees. No assistance for the tough German housing market.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                          <div>
                            <h5 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                              Pushing Commission Partners
                            </h5>
                            <p className={`text-[11px] leading-relaxed mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              Steering students toward expensive private institutions rather than free public universities to collect sales cuts.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Right Column: Modernized Text & Pillars Grid */}
            <div className="laptop:col-span-7 space-y-8 text-left">
              <div className="space-y-4">

                
                <h2 className={`text-3xl mobile-m:text-4xl laptop:text-5xl font-extrabold tracking-tight font-sans leading-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  More Than a Consultancy.<br />
                  <span className="font-serif italic font-normal text-gold">A Real, Ground-Level Bridge to Germany.</span>
                </h2>

                <p className={`text-xs mobile-m:text-sm leading-relaxed max-w-2xl ${
                  isDark ? 'text-slate-350' : 'text-slate-600'
                }`}>
                  EuroZiel was built to replace volume-driven agency shortcuts with direct ground realities. We connect Indian applicants directly with seniors already studying their fields in top public universities and professionals working in Europe.
                </p>
              </div>

              {/* Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-sm border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-premium ${
                  isDark ? 'border-slate-900 bg-slate-950/40' : 'border-slate-250 bg-slate-50/50'
                }`}>
                  <div className="w-9 h-9 rounded-sm bg-navy/10 text-navy flex items-center justify-center mb-3">
                    <ShieldCheck className="w-5 h-5 text-[#1b73ba]" />
                  </div>
                  <h4 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>98% Visa Success</h4>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    Rigorous mock interview preps and compliant APS filing timelines.
                  </p>
                </div>

                <div className={`p-4 rounded-sm border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-premium ${
                  isDark ? 'border-slate-900 bg-slate-950/40' : 'border-slate-250 bg-slate-50/50'
                }`}>
                  <div className="w-9 h-9 rounded-sm bg-gold/10 text-gold flex items-center justify-center mb-3">
                    <GraduationCap className="w-5 h-5 text-gold" />
                  </div>
                  <h4 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>0€ Tuition Focus</h4>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    We target world-class free public universities, bypassing private fees.
                  </p>
                </div>

                <div className={`p-4 rounded-sm border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-premium ${
                  isDark ? 'border-slate-900 bg-slate-950/40' : 'border-slate-250 bg-slate-50/50'
                }`}>
                  <div className="w-9 h-9 rounded-sm bg-[#10b981]/10 text-[#10b981] flex items-center justify-center mb-3">
                    <Users className="w-5 h-5 text-[#10b981]" />
                  </div>
                  <h4 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>1-on-1 Alumni</h4>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    Ground-level counseling directly linked to active German scholars.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateToTab('about')}
                  className={`group inline-flex items-center gap-2 text-xs mobile-m:text-sm font-bold transition-all duration-300 px-5 py-2.5 rounded-sm border shadow-sm ${
                    isDark 
                      ? 'border-slate-800 hover:border-slate-650 bg-slate-950/40 hover:bg-slate-900 text-gold hover:text-white' 
                      : 'border-slate-250 hover:border-slate-350 bg-white hover:bg-slate-50 text-navy'
                  }`}
                >
                  Read Yuvasri & Sarathkumar's complete story
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
       </ScrollReveal>
      </section>

      {/* SECTION 2: WHY STUDENTS CHOOSE EUROZIEL */}
      <section className={`relative z-30 min-h-screen flex flex-col justify-center py-16 mobile-m:py-20 laptop:py-24 px-4 mobile-m:px-5 mobile-l:px-6 tablet:px-6 laptop:px-8 laptop-l:px-12 4k:px-20 border-b w-full transition-colors duration-300 ${
        isDark ? 'border-slate-900 bg-[#060814]' : 'border-slate-100 bg-white'
      }`}>
        <div className="w-full space-y-8 mobile-m:space-y-10 laptop:space-y-12 4k:space-y-16">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-xl mobile-m:max-w-2xl 4k:max-w-3xl mx-auto space-y-2 mobile-m:space-y-3"
          >

            <h2 className="text-2xl mobile-m:text-3xl laptop:text-4xl 4k:text-5xl font-bold tracking-tight font-sans">
              Why Students Choose Us
            </h2>
            <p className={`text-xs mobile-m:text-sm 4k:text-base ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              We focus on a single European pathway so we can offer deeper, more comprehensive expertise than any generalist agent.
            </p>
          </motion.div>

          <ScrollReveal variant="scaleUp" stagger={0.08} className="grid grid-cols-1 mobile-l:grid-cols-2 lg:grid-cols-3 gap-4 mobile-m:gap-5 laptop:gap-6 4k:gap-8">
            {chooseCards.map((card, idx) => (
              <ChooseCard
                key={idx}
                card={card}
                isDark={isDark}
              />
            ))}
          </ScrollReveal>

        </div>
      </section>

      {/* SECTION 3: DYNAMIC COMPONENT FOR THE 6-STEP PATHWAY */}
      <Journey theme={theme} />

      {/* SECTION 4: TESTIMONIALS */}
      <section className={`relative z-30 min-h-screen flex flex-col justify-center py-16 mobile-m:py-20 laptop:py-24 px-4 mobile-m:px-5 mobile-l:px-6 tablet:px-6 laptop:px-8 laptop-l:px-12 4k:px-20 border-b w-full transition-colors duration-300 ${
        isDark ? 'border-slate-900 bg-[#060814]' : 'border-slate-100 bg-white'
      }`}>
        <div className="w-full space-y-8 mobile-m:space-y-10 laptop:space-y-12 4k:space-y-16">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-xl mobile-m:max-w-2xl 4k:max-w-3xl mx-auto space-y-2 mobile-m:space-y-3"
          >

            <h2 className="text-2xl mobile-m:text-3xl laptop:text-4xl 4k:text-5xl font-bold tracking-tight font-sans">
              What Our Students Say
            </h2>
            <p className={`text-[10px] mobile-m:text-xs laptop:text-sm 4k:text-base ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Real experiences from students who trusted EuroZiel for their Germany journey.
            </p>
          </motion.div>

          <ScrollReveal variant="blurIn" stagger={0.12} className="grid grid-cols-1 mobile-l:grid-cols-2 gap-4 mobile-m:gap-5 laptop:gap-6 4k:gap-8 mx-auto">
            {testimonials.map((test, index) => (
              <TestimonialCard
                key={index}
                test={test}
                isDark={isDark}
              />
            ))}
          </ScrollReveal>

        </div>
      </section>

      {/* SECTION 5: BOTTOM CTA */}
      <div className={`w-full relative z-30 min-h-screen flex flex-col justify-center py-16 ${
        isDark ? 'bg-[#060814]' : 'bg-white'
      }`}>
        <section className="w-full px-4 mobile-m:px-5 mobile-l:px-6 tablet:px-6 laptop:px-8 laptop-l:px-12 4k:px-20 text-center">
         <ScrollReveal variant="flipUp">
          <div className={`relative rounded-sm overflow-hidden py-8 mobile-m:py-10 laptop:py-12 4k:py-20 px-5 mobile-m:px-8 laptop:px-12 4k:px-20 border border-[#e5a800]/20 text-white shadow-premium border-b-4 border-b-gold ${
            isDark ? 'bg-slate-950' : 'bg-slate-900'
          }`}>

            <div className="absolute top-0 right-0 w-24 mobile-m:w-32 4k:w-48 h-24 mobile-m:h-32 4k:h-48 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 mobile-m:w-32 4k:w-48 h-24 mobile-m:h-32 4k:h-48 bg-navy/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4 mobile-m:space-y-5 laptop:space-y-6 4k:space-y-8 max-w-xl mobile-m:max-w-2xl mx-auto">

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