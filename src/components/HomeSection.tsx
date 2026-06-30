import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, ArrowLeftRight } from 'lucide-react';
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
      whileHover={{ y: -27 }}
      className={`p-5 mobile-m:p-6 laptop:p-7 rounded-sm border text-left min-h-[280px] mobile-m:min-h-[300px] laptop:min-h-[320px] flex flex-col justify-end shadow-premium hover:border-blue-500 transition-all duration-100 ${
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
    <div className="pb-12 mobile-m:pb-16 laptop:pb-20 4k:pb-32">
      {/* SECTION 1: OUR MISSION — stacks over the sticky hero */}
      <section
        ref={section1Ref}
        className={`relative z-30 w-full py-16 mobile-m:py-20 laptop:py-76 laptop-l:py-100 border-b transition-colors duration-300 shadow-[0_-40px_80px_rgba(0,0,0,0.7)] lg:-mt-[100vh] mt-0 ${
          isDark ? 'border-slate-900 bg-[#060814]' : 'border-slate-100 bg-white'
        }`}
      >
       <ScrollReveal variant="fadeUp" delay={0.3} >
        <div className="w-full px-4 mobile-m:px-5 mobile-l:px-6 laptop:px-8 laptop-l:px-12 4k:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 laptop:grid-cols-12 gap-8 laptop:gap-12 laptop-l:gap-16 items-center">
            
            {/* Left Column: The "Not a General Agency" card */}
            <div className="laptop:col-span-5">
              <div className={`relative rounded-xl overflow-hidden p-6 mobile-m:p-8 border border-b-4 border-b-gold ${
                isDark 
                  ? 'bg-slate-950/40 border-slate-800/80 shadow-[0_0_50px_rgba(0,0,0,0.3)]' 
                  : 'bg-slate-50/80 border-slate-200 shadow-sm'
              }`}>
                {/* Header Row */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg shrink-0 border ${
                    isDark 
                      ? 'bg-gold/10 border-gold/30 text-gold shadow-[0_0_15px_rgba(229,168,0,0.15)]' 
                      : 'bg-[#1b73ba]/10 border-[#1b73ba]/30 text-[#1b73ba]'
                  }`}>
                    <ArrowLeftRight className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-base mobile-m:text-lg font-extrabold tracking-tight ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      Not a General Agency
                    </h3>
                    <p className={`text-xs ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      We are a dedicated knowledge pipeline
                    </p>
                  </div>
                </div>

                {/* Box 1: Typical Consultancies */}
                <div className="mb-6 space-y-2">
                  <div className={`inline-block text-[9px] tracking-[0.2em] font-extrabold uppercase px-2.5 py-1 rounded border ${
                    isDark 
                      ? 'text-slate-400 bg-slate-900/60 border-slate-800/80' 
                      : 'text-slate-500 bg-slate-100 border-slate-200'
                  }`}>
                    Typical Consultancies
                  </div>
                  <p className={`text-xs italic leading-relaxed pl-1 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    "Giving the same advice to every student regardless of background. No real experience with APS or ground realities of German visa offices."
                  </p>
                </div>

                {/* Box 2: The EuroZiel Difference */}
                <div className="space-y-2">
                  <div className={`inline-block text-[9px] tracking-[0.2em] font-extrabold uppercase px-2.5 py-1 rounded border ${
                    isDark 
                      ? 'text-gold bg-gold/5 border-gold/20' 
                      : 'text-[#1b73ba] bg-[#1b73ba]/5 border-[#1b73ba]/20'
                  }`}>
                    The EuroZiel Difference
                  </div>
                  <p className={`text-xs italic leading-relaxed pl-1 font-medium ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    "Continuous 1-on-1 contact with active TU Munich, RWTH Aachen alumni and professionals. Transparent, honest, end-to-end guidance."
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="laptop:col-span-7 space-y-10 mobile-m:space-y-12 laptop:space-y-14 4k:space-y-16">
              {/* <span className={`inline-block text-[9px] mobile-m:text-[10px] 4k:text-xs font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-full transition-all duration-300 ${
                isDark 
                  ? 'text-gold bg-gold/8 border border-gold/20' 
                  : 'text-[#1b73ba] bg-[#1b73ba]/8 border border-[#1b73ba]/20'
              }`}>
                OUR MISSION
              </span> */}
              
              <h2 className={`text-2xl mobile-m:text-3xl laptop:text-4xl 4k:text-5xl font-extrabold tracking-tight font-sans leading-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                More Than a Consultancy. <span className="italic text-[#1b73ba]">A Real Bridge to Germany.</span>
              </h2>

              <div className={`space-y-4 text-xs mobile-m:text-[13px] laptop:text-sm 4k:text-base leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                <p>
                  EuroZiel was founded to replace generic agent templates with a dedicated, ground-level knowledge pipeline. We believe that capable students shouldn't lose opportunities to copied strategies, unrealistic expectations, or a lack of understanding of ground realities.
                </p>
                <p>
                  By combining structured, expert consultancy with direct mentorship from active alumni at top German public universities (like TU Munich and RWTH Aachen) and working professionals in Europe, we provide a transparent and honest pathway.
                </p>
                <p>
                  From APS validation and visa filing to finding student accommodation and Werkstudent jobs, we don't just guide your application—we prepare you for long-term career success on the ground in Germany.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateToTab('about')}
                  className={`group inline-flex items-center gap-2 text-xs mobile-m:text-sm font-bold transition-all duration-300 ${
                    isDark 
                      ? 'text-gold hover:text-white' 
                      : 'text-[#1b73ba] hover:text-slate-900'
                  }`}
                >
                  Read Yuvasri & Sarathkumar's complete story
                  <ArrowRight className="w-3.5 h-3.5 mobile-m:w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

          </div>
        </div>
       </ScrollReveal>
      </section>

      {/* SECTION 2: WHY STUDENTS CHOOSE EUROZIEL */}
      <section className={`relative z-30 py-16 mobile-m:py-20 laptop:py-24 px-4 mobile-m:px-5 mobile-l:px-6 laptop:px-8 4k:px-16 border-b w-full transition-colors duration-600 ${
        isDark ? 'border-slate-900 bg-[#060814]' : 'border-slate-100 bg-white'
      }`}>
        <div className="w-full space-y-8 mobile-m:space-y-10 laptop:space-y-12 4k:space-y-16 max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
            className="text-center max-w-xl mobile-m:max-w-2xl 4k:max-w-3xl mx-auto space-y-2 mobile-m:space-y-3"
          >
            {/* <span className="text-[9px] mobile-m:text-[10px] 4k:text-xs font-bold text-gold uppercase tracking-[0.2em] bg-gold/5 border border-gold/30 px-2.5 mobile-m:px-3 py-1 rounded-sm">
              Why EuroZiel?
            </span> */}
            <h2 className="text-2xl mobile-m:text-3xl laptop:text-4xl 4k:text-5xl font-bold tracking-tight font-sans">
              Why Students Choose Us
            </h2>
            <p className={`text-xs mobile-m:text-sm 4k:text-base ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              We focus on a single European pathway so we can offer deeper, more comprehensive expertise than any generalist agent.
            </p>
          </motion.div>

          <ScrollReveal variant="scaleUp" stagger={0.4} className="grid grid-cols-1 mobile-l:grid-cols-2 lg:grid-cols-3 gap-4 mobile-m:gap-5 laptop:gap-6 4k:gap-8">
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
      <section className={`relative z-30 py-16 mobile-m:py-20 laptop:py-24 px-4 mobile-m:px-5 mobile-l:px-6 laptop:px-8 4k:px-16 border-b w-full transition-colors duration-300 ${
        isDark ? 'border-slate-900 bg-[#060814]' : 'border-slate-100 bg-white'
      }`}>
        <div className="w-full space-y-8 mobile-m:space-y-10 laptop:space-y-12 4k:space-y-16 max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-xl mobile-m:max-w-2xl 4k:max-w-3xl mx-auto space-y-2 mobile-m:space-y-3"
          >
            <span className={`text-[9px] mobile-m:text-[10px] 4k:text-xs font-bold text-navy uppercase tracking-[0.2em] px-2.5 mobile-m:px-3 py-1 rounded-sm border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              SUCCESS STORIES
            </span>
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
      <div className={`w-full relative z-30 py-16 ${
        isDark ? 'bg-[#060814]' : 'bg-white'
      }`}>
        <section className="max-w-7xl mx-auto px-4 mobile-m:px-5 laptop:px-8 4k:px-16 text-center">
         <ScrollReveal variant="flipUp">
          <div className={`relative rounded-sm overflow-hidden py-8 mobile-m:py-10 laptop:py-12 4k:py-20 px-5 mobile-m:px-8 laptop:px-12 4k:px-20 border border-[#e5a800]/20 text-white shadow-premium border-b-4 border-b-gold ${
            isDark ? 'bg-slate-950' : 'bg-slate-900'
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