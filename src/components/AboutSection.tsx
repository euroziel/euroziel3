import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, Users, BookOpen, GraduationCap, Compass, ShieldAlert, Sparkles, Building2, HelpCircle 
} from 'lucide-react';

interface AboutSectionProps {
  onOpenConsultation: () => void;
  theme: 'light' | 'dark';
}

export default function AboutSection({ onOpenConsultation, theme }: AboutSectionProps) {
  
  const trustPoints = [
    {
      title: "Peer Proof",
      text: "You hear directly from active Indian students at TU Munich, RWTH Aachen, TU Berlin, University of Hamburg, and more. No brochures or recycled marketing templates. Just real people you can speak to before deciding."
    },
    {
      title: "Professional Network",
      text: "Our connections extend far beyond university campuses. Indian professionals working in Germany across engineering, IT, healthcare, and finance sectors give our students an honest, raw picture of the career landscape post-graduation."
    },
    {
      title: "Germany Only Focus",
      text: "We do not spread our attention across ten countries just to maximize consulting volumes. Every single resource, connection, and piece of ground expertise we possess is custom-built for Germany and Europe specifically."
    },
    {
      title: "No Hidden Anything",
      text: "What we offer is fully explained on our website. What we charge is discussed upfront in clear terms. If we cannot honestly help with your academic profile, we tell you immediately instead of leading you into rejections."
    }
  ];

  return (
    <div className="space-y-24 md:space-y-36 pb-20">
      
      {/* ABOUT INTRO HERO */}
      <section className="max-w-7xl mx-auto px-4 text-left">
        <div className="relative rounded-sm overflow-hidden py-16 px-8 md:px-14 border border-slate-200/50 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-premium border-b-4 border-b-gold">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl space-y-4">
            <span className="text-[10px] font-bold text-navy uppercase tracking-[0.2em] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-sm inline-block">
              ABOUT EUROZIEL
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-sans leading-tight text-slate-900 dark:text-white">
              We are not a consultancy <br />that read about Germany. <br />
              <span className="font-serif italic font-medium text-gold">We are connected to people living it right now.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* FOUNDER STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Founders visual card Left */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-sm border border-slate-200/50 dark:border-slate-900 bg-white dark:bg-slate-950 p-6 md:p-8 space-y-6 shadow-premium border-b-4 border-b-gold">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[9px] font-bold tracking-widest bg-gold/5 border border-gold/30 text-gold uppercase">
                Our Story
              </span>
              <h3 className="text-xl font-bold font-sans text-navy">Why EuroZiel exists</h3>
              <div className="space-y-4 text-xs md:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                <p>
                  Yuvasri Jagadeesan and Sarathkumar Venkateshwaran did not start EuroZiel because they saw a business opportunity. They started it because they watched too many genuinely capable Indian students either give up on Germany entirely or get burned by generic agencies that had never actually engaged with the German university system at a real level.
                </p>
                <p>
                  The problem was never the students. The problem was the guidance. Generic agencies giving the same advice to every student regardless of their background. No one with actual ground-level knowledge of what TU Munich expects versus what RWTH Aachen looks for. No one who had sat through an APS documentation process, waited three months for a certificate, or figured out how Anmeldung actually works on arrival.
                </p>
                <p>
                  So they built something different. Not just a consultancy. **A real, structural bridge.**
                </p>
              </div>
            </div>
          </div>

          {/* Core Team Details Right */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-navy uppercase tracking-[0.2em] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-sm inline-block mb-1">
                Leadership Team
              </span>
              <h2 className="text-2xl md:text-3.5xl font-bold font-sans text-slate-900 dark:text-white">Meet the Founders Behind EuroZiel</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-sans pb-4">
                Our founders bring together direct, student-centric counseling expertise and a robust European network that enables students to make completely informed decisions with absolute confidence.
              </p>
            </div>

            {/* Profile 1: Yuvasri */}
            <div className="p-6 rounded-sm border border-slate-250 dark:border-slate-900 bg-white dark:bg-slate-950 space-y-3 shadow-premium border-l-4 border-l-gold">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h4 className="text-lg font-bold font-sans text-slate-800 dark:text-slate-100">Yuvasri Jagadeesan</h4>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-navy dark:text-gold mt-1">Co-Founder | Academic Strategy & Student Success</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                Yuvasri leads EuroZiel’s student support and academic process framework with strong experience in overseas education counseling and Germany-focused application guidance. Her expertise spans profile evaluation, university shortlisting, application planning, APS coordination, documentation review, and visa guidance.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                Known for her structured and accountable approach, she works closely with students across multiple academic backgrounds, helping them navigate complex admission processes with clarity and confidence. Her focus on transparent communication and personalized mentorship is the heart of EuroZiel’s student-first model.
              </p>
            </div>

            {/* Profile 2: Sarathkumar */}
            <div className="p-6 rounded-sm border border-slate-250 dark:border-slate-900 bg-white dark:bg-slate-950 space-y-3 shadow-premium border-l-4 border-l-navy">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h4 className="text-lg font-bold font-sans text-slate-800 dark:text-slate-100">Sarathkumar Venkateshwaran</h4>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-navy dark:text-gold mt-1">Co-Founder | European Network & Student Ecosystem</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                Sarathkumar leads EuroZiel’s European network and ecosystem development initiatives, building strong connections across universities, student communities, graduates, and working professionals throughout Germany and Europe.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                His expertise lies in creating a network-driven guidance system that provides students with practical exposure and real-world insights beyond the traditional admission process. Through continuous collaboration with students and professionals across multiple European cities, he helps deliver ground-level guidance on academics, student life, accommodation, internships, and career pathways.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* WHY STUDENTS TRUST US */}
      <section className="bg-slate-50/50 dark:bg-slate-950/50 py-20 px-4 border-y border-slate-100 dark:border-slate-900 animate-fade-in">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] bg-gold/5 border border-gold/30 px-3 py-1 rounded-sm">
              Ethical Pillars
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-sans tracking-tight text-slate-900 dark:text-white">
              Why Students Trust Us
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">
              We maintain absolute transparency, honest evaluations, and domain-based expertise so that you avoid catastrophic application rejections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
            {trustPoints.map((point, index) => (
              <div 
                key={index}
                className="p-6 rounded-sm border border-slate-200/50 dark:border-slate-900 bg-white dark:bg-slate-950 space-y-3 shadow-premium border-t-2 border-t-gold"
              >
                <h4 className="font-bold text-navy dark:text-white text-base font-sans">{point.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{point.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
