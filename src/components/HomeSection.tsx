import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Users, Compass, GraduationCap, Star, ArrowLeftRight, Globe, Award, ShieldCheck
} from 'lucide-react';
import Journey from './Journey';

interface HomeSectionProps {
  onOpenConsultation: () => void;
  onNavigateToTab: (tab: string) => void;
  theme: 'light' | 'dark';
}

export default function HomeSection({ onOpenConsultation, onNavigateToTab, theme }: HomeSectionProps) {
  const isDark = theme === 'dark';

  const testimonials = [
    {
      name: "Aditya R.", prog: "M.Sc Computer Science, Germany",
      quote: "Unlike other consultancies, EuroZiel actually helped me understand the complete process instead of just submitting applications. Speaking with students already studying in Germany gave me clarity and confidence before making decisions."
    },
    {
      name: "Keerthana S.", prog: "Mechanical Engineering Student",
      quote: "The biggest difference was honesty. They clearly explained which universities matched my profile and what improvements I needed instead of giving false promises. That transparency saved me months."
    },
    {
      name: "Vishnu Prasad", prog: "TU Berlin Student",
      quote: "From APS to accommodation, every step was properly guided. Even after reaching Germany, their peer network helped me settle faster and avoid common mistakes international students face."
    },
    {
      name: "Nithya M.", prog: "Healthcare Ausbildung Pathway",
      quote: "I was confused about Ausbildung pathways and language requirements. EuroZiel connected me with people who had already gone through the same process, which made everything much easier to understand."
    }
  ];

  const chooseCards = [
    { icon: <Users className="w-5 h-5 mobile-m:w-6 mobile-m:h-6 4k:w-7 4k:h-7 text-[#1b73ba]" />, title: "Real People. Real Guidance.", text: "Speak directly with Indian students currently enrolled in German universities and professionals working across Europe." },
    { icon: <Globe className="w-5 h-5 mobile-m:w-6 mobile-m:h-6 4k:w-7 4k:h-7 text-[#e5a800]" />, title: "Germany Exclusive Focus", text: "We are built specifically for Germany and Europe pathways. Every university recommendation, visa process, APS strategy, and settlement guide comes from deep knowledge of the German system." },
    { icon: <GraduationCap className="w-5 h-5 mobile-m:w-6 mobile-m:h-6 4k:w-7 4k:h-7 text-emerald-500" />, title: "Domain-Based Experts", text: "Engineering, Computer Science, Healthcare, Ausbildung, Business. Your guidance comes from people who understand your field inside and out." },
    { icon: <Compass className="w-5 h-5 mobile-m:w-6 mobile-m:h-6 4k:w-7 4k:h-7 text-purple-500" />, title: "Personalized Strategy", text: "No copy-paste counselling. Every student receives a customised roadmap based on academics, career goals, budget, language level, and long-term plans." },
    { icon: <ShieldCheck className="w-5 h-5 mobile-m:w-6 mobile-m:h-6 4k:w-7 4k:h-7 text-teal-500" />, title: "End-to-End Support", text: "From university shortlisting to Anmeldung, blocked account, visa, accommodation, and settlement support. We stay connected even after you land." },
    { icon: <Award className="w-5 h-5 mobile-m:w-6 mobile-m:h-6 4k:w-7 4k:h-7 text-red-500" />, title: "Language Coaching Support", text: "German language preparation is a critical part of your journey. We guide students with structured coaching support and practical learning strategies." }
  ];

  return (
    <div className="space-y-16 mobile-m:space-y-20 mobile-l:space-y-24 tablet:space-y-24 laptop:space-y-28 laptop-l:space-y-36 4k:space-y-48 pb-12 mobile-m:pb-16 laptop:pb-20 4k:pb-32">

      {/* SECTION: WHY EUROZIEL BRIDGE */}
      <section className="max-w-7xl 4k:max-w-[96rem] mx-auto px-4 mobile-m:px-5 mobile-l:px-6 laptop:px-8 laptop-l:px-10 4k:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mobile-m:gap-10 laptop:gap-12 4k:gap-20 items-center">

          {/* Visual Left */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-[#e5a800]/5 rounded-sm -rotate-2 transform scale-102 pointer-events-none border border-gold/10" />
            <div className={`relative rounded-sm p-5 mobile-m:p-6 laptop:p-8 4k:p-12 shadow-premium border-b-4 border-b-gold ${
              isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200/50 bg-white'
            }`}>
              <div className="flex items-center gap-3 mobile-m:gap-4 mb-5 mobile-m:mb-6 4k:mb-8">
                <div className="w-10 h-10 mobile-m:w-12 mobile-m:h-12 4k:w-14 4k:h-14 rounded-sm bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <ArrowLeftRight className="w-5 h-5 mobile-m:w-6 mobile-m:h-6 4k:w-7 4k:h-7" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base mobile-m:text-lg 4k:text-xl">Not a General Agency</h4>
                  <p className="text-[10px] mobile-m:text-xs 4k:text-sm text-slate-400">We are a dedicated knowledge pipeline</p>
                </div>
              </div>

              <div className="space-y-3 mobile-m:space-y-4">
                <div className={`p-3 mobile-m:p-4 4k:p-5 rounded-sm border text-[10px] mobile-m:text-xs 4k:text-sm text-left ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'
                }`}>
                  <span className="font-semibold text-slate-400 block mb-1 uppercase tracking-[0.15em] text-[9px] mobile-m:text-[10px] 4k:text-xs">Typical Consultancies</span>
                  "Giving the same advice to every student regardless of background. No real experience with APS or ground realities of German visa offices."
                </div>
                <div className={`p-3 mobile-m:p-4 4k:p-5 rounded-sm border text-[10px] mobile-m:text-xs 4k:text-sm text-left ${
                  isDark ? 'bg-[#1b73ba]/10 border-[#1b73ba]/25' : 'bg-[#1b73ba]/5 border-[#1b73ba]/25'
                }`}>
                  <span className="font-bold text-navy block mb-1 uppercase tracking-[0.15em] text-[9px] mobile-m:text-[10px] 4k:text-xs">The EuroZiel Difference</span>
                  "Continuous 1-on-1 contact with active TU Munich, RWTH Aachen alumni and professionals. Transparent, honest, end-to-end guidance."
                </div>
              </div>
            </div>
          </div>

          {/* Text Right */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4 mobile-m:space-y-5 laptop:space-y-6 4k:space-y-8 text-left">
            <span className={`text-[9px] mobile-m:text-[10px] 4k:text-xs font-bold text-navy uppercase tracking-[0.2em] px-2.5 mobile-m:px-3 py-1 rounded-sm border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              OUR MISSION
            </span>
            <h2 className={`text-2xl mobile-m:text-3xl laptop:text-4xl 4k:text-5xl font-bold font-sans tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              More Than a Consultancy. <span className="font-serif italic font-medium text-navy">A Real Bridge to Germany.</span>
            </h2>
            <div className={`text-xs mobile-m:text-sm laptop:text-base 4k:text-lg leading-relaxed space-y-3 mobile-m:space-y-4 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <p>EuroZiel was founded with a clear purpose to give students access to guidance that is honest, Germany-focused, and built on real experience instead of generic advice. We saw too many capable students lose opportunities because they were given copied strategies, unrealistic expectations, and little understanding of how the German system actually works.</p>
              <p>That is why EuroZiel combines structured consultancy with direct insight from students currently studying at German public universities, Indian professionals working across Europe, and domain-specific mentors who understand your academic and career pathway.</p>
              <p>From university applications and APS to visas, accommodation, and settling in Germany, every step is designed to give students clarity, confidence, and practical direction. At EuroZiel, we do not just help you apply to Germany, we help you prepare for life and long-term success there.</p>
            </div>
            <div className="pt-1 mobile-m:pt-2">
              <button
                onClick={() => onNavigateToTab('about')}
                className="inline-flex items-center gap-1.5 mobile-m:gap-2 text-xs mobile-m:text-sm 4k:text-base font-bold text-[#e5a800] hover:text-[#1b73ba] transition-colors"
              >
                Read Yuvasri & Sarathkumar's complete story <ArrowRight className="w-3.5 h-3.5 mobile-m:w-4 mobile-m:h-4 4k:w-5 4k:h-5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: WHY STUDENTS CHOOSE EUROZIEL */}
      <section className={`py-12 mobile-m:py-16 laptop:py-20 4k:py-28 px-4 mobile-m:px-5 mobile-l:px-6 laptop:px-8 4k:px-16 border-y ${
        isDark ? 'bg-slate-950/50 border-slate-900' : 'bg-slate-50/50 border-slate-100'
      }`}>
        <div className="max-w-7xl 4k:max-w-[96rem] mx-auto space-y-8 mobile-m:space-y-10 laptop:space-y-12 4k:space-y-16">

          <div className="text-center max-w-xl mobile-m:max-w-2xl 4k:max-w-3xl mx-auto space-y-2 mobile-m:space-y-3">
            <span className="text-[9px] mobile-m:text-[10px] 4k:text-xs font-bold text-gold uppercase tracking-[0.2em] bg-gold/5 border border-gold/30 px-2.5 mobile-m:px-3 py-1 rounded-sm">
              Why EuroZiel?
            </span>
            <h2 className="text-2xl mobile-m:text-3xl laptop:text-4xl 4k:text-5xl font-bold tracking-tight font-sans">
              Why Students Choose Us
            </h2>
            <p className={`text-xs mobile-m:text-sm 4k:text-base ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              We focus on a single European pathway so we can offer deeper, more comprehensive expertise than any generalist agent.
            </p>
          </div>

          <div className="grid grid-cols-1 mobile-l:grid-cols-2 lg:grid-cols-3 gap-4 mobile-m:gap-5 laptop:gap-6 4k:gap-8">
            {chooseCards.map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`p-4 mobile-m:p-5 laptop:p-6 4k:p-8 rounded-sm border text-left space-y-3 mobile-m:space-y-4 shadow-premium hover:border-gold transition-all duration-300 ${
                  isDark ? 'border-slate-900 bg-slate-950/80' : 'border-slate-200/50 bg-white'
                }`}
              >
                <div className={`p-2.5 mobile-m:p-3 4k:p-4 w-10 h-10 mobile-m:w-12 mobile-m:h-12 4k:w-14 4k:h-14 rounded-sm border flex items-center justify-center ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200/40'
                }`}>
                  {card.icon}
                </div>
                <h3 className={`text-sm mobile-m:text-base 4k:text-lg font-bold font-sans ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}>{card.title}</h3>
                <p className={`text-[10px] mobile-m:text-xs 4k:text-sm leading-relaxed font-sans ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>{card.text}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* DYNAMIC COMPONENT FOR THE 6-STEP PATHWAY */}
      <Journey theme={theme} />

      {/* SECTION: TESTIMONIALS */}
      <section className={`py-12 mobile-m:py-16 laptop:py-20 4k:py-28 px-4 mobile-m:px-5 mobile-l:px-6 laptop:px-8 4k:px-16 border-y ${
        isDark ? 'bg-slate-950/30 border-slate-900' : 'bg-slate-50/50 border-slate-100'
      }`}>
        <div className="max-w-7xl 4k:max-w-[96rem] mx-auto space-y-8 mobile-m:space-y-10 laptop:space-y-12 4k:space-y-16">

          <div className="text-center max-w-xl mobile-m:max-w-2xl 4k:max-w-3xl mx-auto space-y-2 mobile-m:space-y-3">
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
          </div>

          <div className="grid grid-cols-1 mobile-l:grid-cols-2 gap-4 mobile-m:gap-5 laptop:gap-6 4k:gap-8 max-w-2xl mobile-l:max-w-none laptop:max-w-4xl 4k:max-w-6xl mx-auto">
            {testimonials.map((test, index) => (
              <div
                key={index}
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
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION: BOTTOM CTA */}
      <section className="max-w-2xl mobile-m:max-w-3xl laptop:max-w-4xl 4k:max-w-5xl mx-auto px-4 mobile-m:px-5 laptop:px-8 4k:px-16 text-center">
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
      </section>

    </div>
  );
}