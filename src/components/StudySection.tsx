import React from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle, Briefcase, TrendingUp, Calendar, AlertTriangle, ShieldCheck, Flame, Cpu, Building2, Lightbulb, Stethoscope, Palette, Compass, Zap
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface StudySectionProps {
  onOpenConsultation: () => void;
  theme: 'light' | 'dark';
}

export default function StudySection({ onOpenConsultation, theme }: StudySectionProps) {
  const dark = theme === 'dark';

  const stats = [
    {
      num: "400,000+",
      label: "International Students",
      desc: "Germany is currently the third-largest destination for Indian students after the US and Canada, and growing faster than both."
    },
    {
      num: "€0",
      label: "Tuition Fees",
      desc: "At public universities in almost all states. Even states with exceptions charge under €3,000/year—less than a semester in private colleges."
    },
    {
      num: "18 Months",
      label: "Post-Study Job Seeker Visa",
      desc: "No pressure countdown. Germany gives you a full year and a half after graduation to find the right role without leaving."
    },
    {
      num: "1.7 Million",
      label: "Unfilled Skilled Jobs",
      desc: "Active immigration changes are rolling out right now to make it easier for qualified non-EU graduates to stay and work."
    }
  ];

  const specialisations = [
    {
      icon: <Cpu className="w-5 h-5 text-indigo-500" />,
      title: "Engineering and Technology",
      text: "Germany is the core R&D engine of Europe, where Siemens, Bosch, BASF, Volkswagen, and Airbus actually build. TU Munich, RWTH Aachen, and KIT consistently rank in global top 100 for engineering. Recognized on a global benchmark scale in over 50 countries."
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
      title: "Computer Science and IT",
      text: "Berlin is one of Europe's fastest-growing tech hubs, home to 4,000+ startups (Zalando, N26, Celonis). Course frameworks require mandatory hands-on industry internships. Graduate employment is outstanding at over 96% within six months of completion."
    },
    {
      icon: <Building2 className="w-5 h-5 text-[#1b73ba]" />,
      title: "Business and Management",
      text: "Unlike US/UK case-study models, German business schools focus deeply on applied economics, multinational finance, and supply chain management. Institutes like Mannheim Business School, Frankfurt School of Finance, and WHU rank in Europe's top 20."
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-[#e5a800]" />,
      title: "Natural Sciences",
      text: "Germany funds more scientific research per capita than almost any other country, with the DFG (German Research Foundation) alone distributing €3 billion+ annually. Secure your research career at the source."
    },
    {
      icon: <Palette className="w-5 h-5 text-purple-500" />,
      title: "Design and Architecture",
      text: "The infamous Bauhaus school started in Germany, and that prestige runs through every urban planning, product design, and industrial design programme. Recognized globally as high-end design credentials."
    },
    {
      icon: <Stethoscope className="w-5 h-5 text-rose-500" />,
      title: "Medicine and Health",
      text: "Ranked among the most rigorous in the world. Fully integrated with state-of-the-art hospitals, research intensive, and recognized across the UK, Gulf, and Australia. A long pathway but a permanent, peak qualification."
    }
  ];

  const brandLogs = [
    "SAP", "Siemens", "Bosch", "BMW", "Volkswagen", "Airbus", "Allianz", "BASF", "Daimler Trucks", "Zalando", "DeepMind Berlin", "N26", "Celonis"
  ];

  return (
    <div className="space-y-24 md:space-y-36 pb-20">

      {/* HERO SECTION FOR STUDY IN GERMANY */}
      <section className="max-w-7xl mx-auto px-4 text-left">
       <ScrollReveal variant="clipReveal">
        <div className="rounded-sm bg-slate-900 text-white p-8 md:p-14 relative overflow-hidden border border-slate-800 border-b-4 border-b-gold shadow-premium">
          <div className="absolute top-0 right-0 w-80 h-80 bg-navy/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] font-sans">
              The degree costs nothing.<br />
              <span className="font-serif italic font-medium text-gold">The opportunity costs everything if you miss it.</span>
            </h2>
            <p className="text-slate-350 text-sm md:text-base leading-relaxed max-w-2xl font-sans">
              Germany's public universities charge zero tuition fees to international students. These are the same universities that train stellar engineers at Siemens, researchers at BASF, and tech pioneers at SAP. You pay only for your standard living costs. The high-class world education itself is completely free.
            </p>
          </div>
        </div>
       </ScrollReveal>
      </section>

      {/* SEMESTER CALENDAR & URGENCY */}
      <section className={`py-20 px-4 border-y ${dark ? 'bg-slate-950/50 border-slate-900' : 'bg-slate-50/50 border-slate-100'
        }`}>
        <div className="max-w-7xl mx-auto text-left space-y-12">

          <div className="space-y-2">
            <h2 className={`text-2xl md:text-3.5xl font-bold tracking-tight font-sans ${dark ? 'text-white' : 'text-slate-900'}`}>
              Semester Academic Calendars
            </h2>
            <p className={`text-xs md:text-sm font-sans ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              German university intakes operate with extremely strict deadlines. Missing a timeline puts you back a full academic year.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Winter Semester Card */}
           <ScrollReveal variant="slideLeft" delay={0.1}>
            <div className={`rounded-sm border p-6 md:p-8 space-y-4 shadow-premium border-b-4 border-b-rose-500 ${dark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'
              }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy uppercase tracking-widest font-sans">Winter Intake</span>
                <span className="px-2 py-1 rounded-sm text-[9px] bg-red-500/10 text-red-500 font-bold uppercase tracking-wider animate-pulse flex items-center gap-1 border border-red-500/20">
                  <Flame className="w-3 h-3" /> Priority
                </span>
              </div>
              <h3 className={`text-lg font-bold font-sans ${dark ? 'text-white' : 'text-slate-900'}`}>October Start (Main Intake)</h3>
              <p className={`text-xs leading-relaxed font-sans ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                The widest choice of programmes, most seats, and the most competitive. If targeting the winter semester, you must start your APS and language prep at least **12 months** before October.
              </p>
              <div className={`grid grid-cols-2 gap-3 text-xs border-t pt-4 ${dark ? 'border-slate-900' : 'border-slate-100'}`}>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-mono">Applications Open</span>
                  <span className="font-semibold text-gold">January</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-mono">Deadline Date</span>
                  <span className="font-semibold text-rose-500">July 15</span>
                </div>
              </div>
            </div>
           </ScrollReveal>

            {/* Summer Semester Card */}
           <ScrollReveal variant="slideRight" delay={0.2}>
            <div className={`rounded-sm border p-6 md:p-8 space-y-4 shadow-premium border-b-4 border-b-emerald-500 ${dark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'
              }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest font-sans">Summer Intake</span>
              </div>
              <h3 className={`text-lg font-bold font-sans ${dark ? 'text-white' : 'text-slate-900'}`}>April Start</h3>
              <p className={`text-xs leading-relaxed font-sans ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                Fewer programmes offer a summer intake. Competition is slightly lower because fewer students know about it. A good option if your profile is already strong and you want a faster start.
              </p>
              <div className={`grid grid-cols-2 gap-3 text-xs border-t pt-4 ${dark ? 'border-slate-900' : 'border-slate-100'}`}>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-mono">Applications Open</span>
                  <span className="font-semibold text-gold">July</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-mono">Deadline Date</span>
                  <span className="font-semibold text-rose-500">January 15</span>
                </div>
              </div>
            </div>
           </ScrollReveal>

          </div>

          <ScrollReveal variant="fadeUp" delay={0.3}>
          <div className="p-5 rounded-sm border border-gold/20 bg-gold/5 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <span className="font-bold text-gold uppercase tracking-wider font-mono flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-gold" style={{ strokeWidth: 2.5 }} /> Ground Advice from Founders:
            </span>
            <p className="font-sans leading-relaxed">
              "Start the process the moment you make the decision. Not when your final semester results are out. Not after holidays. The APS certification process alone can require **up to 3 months**. Language preparation to B2 takes **10 to 14 months minimum**. Successful students started earlier than felt necessary."
            </p>
          </div>
         </ScrollReveal>

        </div>
      </section>

      {/* STATS ROW WITH IMMEDIATE VISUAL IMPACT */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-left max-w-2xl">
          <h3 className={`text-2xl md:text-3xl font-extrabold font-sans ${dark ? 'text-white' : 'text-slate-900'}`}>Facts That Matter</h3>
        </div>

        <ScrollReveal variant="elastic" stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-sm border text-left space-y-3 shadow-premium hover:border-gold hover:shadow-premium transition-all relative overflow-hidden group border-b-2 border-b-navy ${dark ? 'border-slate-800 bg-slate-950' : 'border-slate-200/50 bg-white'
                }`}
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-navy transition-all group-hover:h-3" />
              <div className="text-3xl md:text-4xl font-black font-sans text-navy select-none tracking-tight">
                {stat.num}
              </div>
              <div>
                <h4 className={`text-sm font-bold ${dark ? 'text-slate-200' : 'text-slate-800'}`}>{stat.label}</h4>
                <p className={`text-xs mt-2 leading-relaxed font-sans ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{stat.desc}</p>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </section>

      {/* FIELDS AND SPECIALISATIONS */}
      <section className={`py-20 px-4 border-y ${dark ? 'bg-slate-950/50 border-slate-900' : 'bg-slate-50/50 border-slate-100'
        }`}>
        <div className="max-w-7xl mx-auto space-y-12">

          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className={`text-3xl font-bold tracking-tight font-sans ${dark ? 'text-white' : 'text-slate-900'}`}>
              Fields & Specialisations
            </h2>
            <p className={`text-xs md:text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              We add genuine weight to your application across all key professional domains with targeted academic profile strategies.
            </p>
          </div>

          <ScrollReveal variant="rotateIn" stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialisations.map((spec, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-sm border text-left space-y-4 shadow-premium hover:border-gold transition-all duration-300 ${dark ? 'border-slate-800 bg-slate-950' : 'border-slate-200/50 bg-white'
                  }`}
              >
                <div className={`w-10 h-10 rounded-sm border flex items-center justify-center shrink-0 text-navy ${dark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200/40'
                  }`}>
                  {spec.icon}
                </div>
                <div>
                  <h4 className={`font-bold text-sm mb-2 ${dark ? 'text-slate-200' : 'text-slate-800'}`}>{spec.title}</h4>
                  <p className={`text-xs leading-relaxed font-sans ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{spec.text}</p>
                </div>
              </div>
            ))}
          </ScrollReveal>

        </div>
      </section>

      {/* CAREER PROSPECTS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <ScrollReveal variant="swoopIn" className="lg:col-span-6 space-y-6 text-left">
            <h3 className={`text-2xl md:text-3.5xl font-black font-sans leading-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
              What Happens After You Graduate?
            </h3>
            <p className={`text-sm md:text-base leading-relaxed font-sans ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
              The reason Indian students choose Germany over other European countries is not just the free education. It is what comes after.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-4 rounded-sm border shadow-sm border-b-2 border-b-gold ${dark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200/60 bg-white/50'
                }`}>
                <div className="text-xl font-bold text-navy">€52,000</div>
                <div className="text-xs text-slate-400 mt-0.5 font-sans">Average starting salary across all fields (not a tech outlier)</div>
              </div>
              <div className={`p-4 rounded-sm border shadow-sm border-b-2 border-b-navy ${dark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200/60 bg-white/50'
                }`}>
                <div className="text-xl font-bold text-gold">3.4%</div>
                <div className="text-xs text-slate-400 mt-0.5 font-sans">Graduate unemployment (UK is 6%+, US is 5%+)</div>
              </div>
            </div>

            <div className="bg-amber-500/5 border border-gold/15 rounded-sm p-4 flex gap-3 items-start">
              <div className="p-1 rounded-full bg-gold/10 text-gold shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className={`text-xs font-sans leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
                <strong>Deliberate immigration shifts:</strong> The German government passed the **Skilled Immigration Act** in 2023 specifically to expand opportunities for non-EU graduates. The door has been widened deliberately.
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="blurIn" delay={0.15} className="lg:col-span-6">
            <div className={`p-6 md:p-8 rounded-sm border shadow-premium ${dark ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200/50 bg-white'
              }`}>
              <div className="text-left mb-6">
                <h4 className="font-bold text-navy uppercase tracking-widest text-[10px] mb-1">Global Employers</h4>
                <div className={`text-base font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Where EuroZiel Connected Students Work</div>
                <p className="text-slate-400 text-xs mt-1">Direct recruitment pipelines with Europe giants</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-start">
                {brandLogs.map((brand, bIdx) => (
                  <span
                    key={bIdx}
                    className={`px-4 py-2 border rounded-sm text-xs font-bold font-sans hover:text-[#e5a800] transition-colors ${dark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-250'
                      }`}
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* BOTTOM CTA: ₹9 PROFILE VERIFICATION */}
      <section className="max-w-7xl mx-auto px-4 text-center">
       <ScrollReveal variant="flipUp">
        <div className={`p-8 md:p-12 rounded-sm border shadow-premium space-y-6 border-b-4 border-b-gold ${dark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-850'
          }`}>
          <h3 className={`text-2xl md:text-3xl font-bold font-sans max-w-xl mx-auto ${dark ? 'text-white' : 'text-slate-900'}`}>
            Pay just <span className="line-through opacity-65 font-normal text-slate-450">₹1,500</span> ₹9 to verify your profile with a credentialed Germany expert
          </h3>
          <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto font-sans leading-relaxed">
            Get an honest review pointing you in the right direction. We will tell you exactly where your profile stands. No sugarcoating, no false promises.
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