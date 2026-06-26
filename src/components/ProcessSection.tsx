import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, Info, HelpCircle, ArrowRight, Zap, Target, BookOpen, FileSpreadsheet, Backpack, CalendarDays, ClipboardCheck, Lightbulb, AlertCircle
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ProcessSectionProps {
  onOpenConsultation: () => void;
  theme: 'light' | 'dark';
}

export default function ProcessSection({ onOpenConsultation, theme }: ProcessSectionProps) {
  const dark = theme === 'dark';
  
  // Pre-departure Checklist state
  const [checklist, setChecklist] = useState([
    { id: 1, text: "APS Certificate Obtained", checked: true },
    { id: 2, text: "IELTS / German Language Requirement Completed", checked: true },
    { id: 3, text: "SOP Finalized & Reviewed", checked: false },
    { id: 4, text: "LORs Prepared on Official Letterhead", checked: false },
    { id: 5, text: "European Format CV Updated", checked: true },
    { id: 6, text: "University Applications Submitted", checked: false },
    { id: 7, text: "Offer Letter Received", checked: false },
    { id: 8, text: "Blocked Account Funded (€11,904)", checked: false },
    { id: 9, text: "Health Insurance Confirmed (TK/AOK/Barmer)", checked: false },
    { id: 10, text: "Student Visa Approved", checked: false },
    { id: 11, text: "Accommodation Secured (Dorm/WG)", checked: false },
    { id: 12, text: "Flight Tickets Booked", checked: false },
  ]);

  const toggleCheck = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const checkedCount = checklist.filter(item => item.checked).length;
  const progressPercent = Math.round((checkedCount / checklist.length) * 100);

  // Timeline list
  const timeline = [
    {
      months: "Month 1–2",
      title: "Discovery, Planning & APS Preparation",
      sub: "Your journey begins with understanding your academic profile, goals, and finding the right pathway for Germany.",
      bullets: [
        "Free Profile Evaluation",
        "Career & Goal Mapping",
        "Personalized Germany Roadmap",
        "University & Course Shortlisting",
        "APS Documentation Support & Application Filing"
      ]
    },
    {
      months: "Month 2–4",
      title: "Language Preparation, SOP, LOR & CV",
      sub: "This stage focuses heavily on strengthening your academic profile draft and initiating essential documentation.",
      bullets: [
        "IELTS / German Language Coaching",
        "SOP Planning & Initial Drafting",
        "LOR Collection Guidance",
        "European Format CV Preparation",
        "SOP Review & Refinement"
      ]
    },
    {
      months: "Month 4–5",
      title: "GRE, GMAT, Profile Building & Documentation",
      sub: "We help you prepare strong, professional application materials aligned with specific German public university criteria.",
      bullets: [
        "GRE / GMAT Preparation Guidance (if required for competitive courses)",
        "Academic Profile Evaluation & Final Shortlisting",
        "uni-assist Account & Portal Setup",
        "APS & Final Application Documentation Support",
        "Application Readiness & Submission Guidance"
      ]
    },
    {
      months: "Month 5–7",
      title: "University Applications and tracking",
      sub: "Applications are strategically submitted based on intakes, intake deadlines, profile fit, and admission potentials.",
      bullets: [
        "University Application Submission",
        "uni-assist Handling & Portal Monitoring",
        "Deadline Tracking Across Portals",
        "Application Status Monitoring & Follow-ups"
      ]
    },
    {
      months: "Month 7–8",
      title: "Offers, Decision Making & Financial arrangements",
      sub: "Once offers arrive, we help you evaluate diverse admissions and make thoroughly informed decisions.",
      bullets: [
        "Offer Letter Evaluation & Comparison",
        "Admission Acceptance Guidance",
        "Scholarship & Funding Guidance",
        "Final University Selection"
      ]
    },
    {
      months: "Month 8–9",
      title: "Blocked account, Health insurance & Visa",
      sub: "This stage prepares you for the detailed German Student Visa process with complete documentation support.",
      bullets: [
        "Blocked Account (Sperrkonto) Setup Guidance",
        "Health Insurance Support (TK/AOK/Barmer)",
        "Visa Documentation Preparation",
        "Embassy / VFS Appointment Assistance & Mock Interviews",
        "Blocked funding requirement: €11,904"
      ]
    },
    {
      months: "Month 10–12",
      title: "Pre-Departure & Germany Arrival",
      sub: "The final stage focuses on preparing you for a completely fluid transition to your new university town.",
      bullets: [
        "Visa Approval & Passport Collection",
        "Accommodation Confirmation & WG profiling",
        "Pre-Departure Orientation",
        "Travel Planning & On-Ground Settlement Guidance",
        "Final Step: Fly with complete safety and confidence"
      ]
    }
  ];

  // Journey insights cards
  const [activeInsight, setActiveInsight] = useState<number | null>(null);

  const insights = [
    {
      title: "APS Processing Times",
      short: "Pre-evaluating takes 6-12 weeks",
      full: "Academic Evaluation Centre (APS) verifies that your Indian educational transcripts match German guidelines. Do not wait for admissions to open. Apply first thing, as this certificate is mandatory for most public university portals."
    },
    {
      title: "Public Universities",
      short: "World-class and tuition-free",
      full: "Most public universities in Germany are completely free of tuition, only requiring a nominal block semester contribution of €200 to €400 which typically includes your city public transport pass!"
    },
    {
      title: "Language Advantage",
      short: "B1/B2 level opens all doors",
      full: "While English-taught programs are available, even basic conversational German (A1-A2) significantly improves daily life, Anmeldung, and student part-time jobs. For Ausbildung, B1/B2 is absolutely critical."
    },
    {
      title: "Career Opportunities",
      short: "1.7M unfilled skilled jobs",
      full: "Germany's job seeker visa is highly favorable, but you must start your search before graduation month. Focus heavily on internships and 'Werkstudent' student assistant roles to gain local experience early."
    },
    {
      title: "Student Networking",
      short: "Build connections on the ground",
      full: "Connect with students already at your destination university to learn housing tips, local Bürgeramt registration queues, and transport routes before landing in Germany."
    },
    {
      title: "Structured Planning Matters",
      short: "Start 12 months ahead",
      full: "Students who plan ahead experience smoother admissions, visa approvals, and blocked account setup. Last-minute timelines often lead to missed intake dates."
    }
  ];

  return (
    <div className="space-y-24 md:space-y-36 pb-20">
      
      {/* PROCESS TEAM HERO HERO */}
      <section className="max-w-7xl mx-auto px-4 text-left">
       <ScrollReveal variant="clipReveal">
        <div className="rounded-sm bg-slate-950 text-white p-8 md:p-14 relative overflow-hidden border border-[#e5a800]/20 border-b-4 border-b-gold shadow-premium">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[10px] font-bold tracking-widest bg-gold/5 border border-gold/30 text-gold uppercase">
              What Students often miss
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight font-sans">
              Germany Is More Than Just an <span className="font-serif italic font-medium text-gold">Admission Letter.</span>
            </h2>
            <div className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl space-y-4 font-sans">
              <p>
                Most students begin their Germany journey believing the process ends once they receive an offer letter. In reality, studying and building a future in Germany involves far more than university applications alone.
              </p>
              <p>
                It is a journey that involves deep profile building, APS certificate verification, language preparation, customized applications, complex visas, secured accommodation on tight markets, and adapting to a completely new system.
              </p>
              <p>
                At EuroZiel, we guide students through every stage with structured planning, personalized strategy, and real insights from students and professionals already living in Germany. Our process is designed to remove confusion, reduce uncertainty, and help students move forward with absolute clarity and confidence.
              </p>
            </div>
          </div>
        </div>
       </ScrollReveal>
      </section>

      {/* YOUR GERMANY TIMELINE ROADMAP */}
      <section className="max-w-4xl mx-auto px-4 text-left space-y-12">
       <ScrollReveal variant="fadeDown">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <span className={`text-[10px] font-bold text-navy uppercase tracking-[0.2em] border px-3 py-1 rounded-sm inline-block ${
            dark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            Step-By-Step
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Your Germany Timeline</h2>
          <p className={`text-xs font-sans ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            A structured roadmap designed to guide you from your first consultation to your arrival in Germany with complete clarity and support.
          </p>
        </div>
       </ScrollReveal>

        {/* Timeline Path */}
        <div className={`relative border-l-2 ml-4 md:ml-6 space-y-12 py-4 ${dark ? 'border-slate-800' : 'border-slate-200'}`}>
          
          {timeline.map((card, idx) => (
            <div key={idx} className="relative pl-8 md:pl-10">
              
              {/* Timeline dot */}
              <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-sm border-2 border-navy flex items-center justify-center ${
                dark ? 'bg-slate-950' : 'bg-white'
              }`}>
                <div className="w-1.5 h-1.5 rounded-sm bg-gold" />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold text-gold tracking-widest uppercase font-mono block">
                  {card.months}
                </span>
                <h3 className={`text-base md:text-lg font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>
                  {card.title}
                </h3>
                <p className={`text-xs font-sans max-w-2xl leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {card.sub}
                </p>

                {/* Sub-bullets list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl pt-2">
                  {card.bullets.map((bullet, bulletIdx) => (
                    <div key={bulletIdx} className={`flex items-start gap-2 text-[11px] ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <span className="text-navy font-bold shrink-0">•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

        </div>

        <div className={`p-4 rounded-sm border bg-red-500/5 text-xs text-slate-600 flex gap-3 items-center ${
          dark ? 'border-red-500/20 text-slate-400' : 'border-red-500/20 text-slate-600'
        }`}>
          <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
          <div className="font-sans leading-relaxed">
            <strong>Intake Reminder:</strong> Most Winter Intake deadlines close around **July 15** for public universities in Germany. Do not leave your university applications or APS verification to the last minute!
          </div>
        </div>
      </section>

      {/* INTERACTIVE PRE-DEPARTURE CHECKLIST */}
      <section className="max-w-4xl mx-auto px-4">
       <ScrollReveal variant="scaleUp">
        <div className={`p-6 md:p-10 rounded-sm border border-[#e5a800]/20 shadow-premium border-b-4 border-b-gold space-y-8 text-left relative ${
          dark ? 'bg-slate-950/80' : 'bg-white'
        }`}>
          <div className="absolute top-4 right-4 text-[9px] px-2 py-1 rounded-sm bg-gold/5 text-gold border border-gold/20 font-mono font-bold uppercase tracking-wider">
            Interactive Checklist
          </div>

          <div className="space-y-2">
            <h2 className={`text-2xl font-bold tracking-tight font-sans ${dark ? 'text-slate-100' : 'text-slate-800'}`}>
              Pre-Departure Readiness Checklist
            </h2>
            <p className={`text-xs font-sans ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              Plan and tick off milestones. See if you are fully prepared for your flight.
            </p>
          </div>

          {/* Progress Tracker bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-500">Your Progress</span>
              <span className="font-bold text-gold">{checkedCount} of {checklist.length} Completed ({progressPercent}%)</span>
            </div>
            <div className={`h-2 rounded-sm overflow-hidden border border-slate-200/20 ${dark ? 'bg-slate-900' : 'bg-slate-105'}`}>
              <div 
                className="h-full bg-navy transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Checklist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {checklist.map((item) => (
              <label 
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-3.5 rounded-sm border flex items-center gap-3.5 cursor-pointer transition-all ${
                  item.checked 
                    ? `border-navy/30 bg-navy/5 ${dark ? 'text-slate-200' : 'text-slate-800'}` 
                    : `${dark ? 'border-slate-800 bg-slate-900/40 text-slate-400' : 'border-slate-200 bg-slate-50/50 text-slate-500'}`
                }`}
              >
                <div className={`w-5 h-5 rounded-sm flex items-center justify-center border transition-all ${
                  item.checked
                    ? 'bg-navy border-navy text-white'
                    : `${dark ? 'border-slate-700' : 'border-slate-300'}`
                }`}>
                  {item.checked && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                </div>
                <span className="text-xs font-semibold select-none font-sans leading-none">{item.text}</span>
              </label>
            ))}
          </div>
        </div>
       </ScrollReveal>
      </section>

      {/* GERMANY JOURNEY INSIGHTS FLASH CARDS */}
      <section className={`py-20 px-4 border-y animate-fade-in ${
        dark ? 'bg-slate-950/50 border-slate-900' : 'bg-slate-50/50 border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] bg-gold/5 border border-gold/30 px-3 py-1 rounded-sm">
              Flash Cards
            </span>
            <h2 className="text-3xl font-bold tracking-tight font-sans">
              Germany Journey Insights
            </h2>
            <p className={`text-xs md:text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              Click any flash card below to flip it over and read vital insights about student life and legal compliance in Germany.
            </p>
          </div>

          <ScrollReveal variant="blurIn" stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {insights.map((ins, idx) => {
              const isSelected = activeInsight === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveInsight(isSelected ? null : idx)}
                  className={`h-48 rounded-sm border cursor-pointer relative overflow-hidden transition-all duration-300 transform ${
                    isSelected 
                      ? 'border-gold bg-slate-950 text-gold shadow-premium border-b-4 border-b-gold' 
                      : `shadow-premium hover:border-gold ${
                          dark ? 'border-slate-900 bg-slate-950 text-slate-100' : 'border-slate-200/50 bg-white text-slate-800'
                        }`
                  }`}
                >
                  <div className="p-6 h-full flex flex-col justify-between text-left">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono tracking-widest text-[#1b73ba] uppercase font-bold">Fact Card 0{idx+1}</span>
                        <Lightbulb className={`w-4 h-4 ${isSelected ? 'text-gold' : 'text-slate-400'}`} />
                      </div>
                      
                      <AnimatePresence mode="wait">
                        {!isSelected ? (
                          <motion.div
                            key="front"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="mt-4"
                          >
                            <h4 className="font-bold text-sm">{ins.title}</h4>
                            <p className="text-xs text-slate-400 mt-2 font-sans">{ins.short}</p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="back"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="mt-3 overflow-y-auto max-h-[100px] pr-1"
                          >
                            <p className="text-xs text-slate-300 leading-relaxed font-sans">{ins.full}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="text-[9px] text-slate-400 border-t border-slate-100/15 pt-2 flex items-center justify-between">
                      <span className="font-sans uppercase tracking-wider text-[8px]">{isSelected ? "Click to Flip Back" : "Click to Read Detail"}</span>
                      <ArrowRight className="w-3 h-3 text-gold" />
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollReveal>

        </div>
      </section>

      {/* PROCESS FINAL BOTTOM CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
       <ScrollReveal variant="flipUp">
        <div className={`relative rounded-sm overflow-hidden py-12 px-6 border border-gold/20 text-white shadow-premium border-b-4 border-b-gold ${
          dark ? 'bg-slate-950' : 'bg-slate-900'
        }`}>
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl font-bold font-sans">Still Confused About Your Germany Pathway?</h3>
            <p className="text-gold text-xs uppercase tracking-widest max-w-lg mx-auto font-sans font-semibold">
              Speak with our core team and get a realistic, honest evaluation of your profile, academic eligibility, and career opportunities in public universities.
            </p>
            <div>
              <button
                onClick={onOpenConsultation}
                className="px-8 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest bg-navy hover:bg-opacity-90 border-b-2 border-gold text-white transition-all cursor-pointer shadow-premium"
              >
                Get Your Germany Roadmap
              </button>
            </div>
          </div>
        </div>
       </ScrollReveal>
      </section>

    </div>
  );
}