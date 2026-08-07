import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check, Info, HelpCircle, ArrowRight, Zap, Target, BookOpen, FileSpreadsheet, Backpack, CalendarDays, ClipboardCheck, Lightbulb, AlertCircle
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import TimeLine from '@/src/components/TimeLine';

interface ProcessSectionProps {
  onOpenConsultation: () => void;
  theme: 'light' | 'dark';
}

export default function ProcessSection({ onOpenConsultation, theme }: ProcessSectionProps) {
  const navigate = useNavigate();
  const dark = theme === 'dark';

  // Pre-departure Checklist state
  const [checklist, setChecklist] = useState([
    { id: 1, text: "APS Certificate Obtained", checked: false },
    { id: 2, text: "IELTS / German Language Requirement Completed", checked: false },
    { id: 3, text: "SOP Finalized & Reviewed", checked: false },
    { id: 4, text: "LORs Prepared on Official Letterhead", checked: false },
    { id: 5, text: "European Format CV Updated", checked: false },
    { id: 6, text: "University Applications Submitted", checked: false },
    { id: 7, text: "Offer Letter Received", checked: false },
    { id: 8, text: "Blocked Account Funded (€11,904)", checked: false },
    { id: 9, text: "Health Insurance Confirmed (TK/AOK/Barmer)", checked: false },
    { id: 10, text: "Student Visa Approved", checked: false },
    { id: 11, text: "Accommodation Secured (Dorm/WG)", checked: false },
    { id: 12, text: "Flight Tickets Booked", checked: false },
  ]);

  const checkedCount = checklist.filter((item) => item.checked).length;
  const progressPercent = Math.round((checkedCount / checklist.length) * 100);

  const toggleCheck = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

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
  const insights = [
    {
      title: "APS Processing Times",
      short: "Pre-evaluation takes 6-12 weeks",
      image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80",
      points: [
        "APS verifies your Indian transcripts against German academic guidelines",
        "Processing typically takes 6 to 12 weeks apply early",
        "Certificate is mandatory for most public university portals",
        "Do not wait for admissions to open before applying"
      ]
    },
    {
      title: "Public Universities",
      short: "World class and tuition free",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
      points: [
        "Most public universities charge zero tuition fees",
        "Only a nominal semester contribution of €200–€400 applies",
        "This fee typically includes a city wide public transport pass",
        "Applies to both EU and non-EU international students"
      ]
    },
    {
      title: "Language Advantage",
      short: "B1/B2 level opens all doors",
      image: "https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?auto=format&fit=crop&w=800&q=80",
      points: [
        "English-taught programs are widely available",
        "Basic German (A1–A2) improves daily life and Anmeldung",
        "Helps significantly with part time student jobs",
        "B1/B2 is critical and often mandatory for Ausbildung"
      ]
    },
    {
      title: "Career Opportunities",
      short: "1.7M unfilled skilled jobs",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
      points: [
        "Germany's job seeker visa policy is highly favorable",
        "Start your job search before your graduation month",
        "Prioritize internships to build local work experience",
        "'Werkstudent' roles are ideal for early industry exposure"
      ]
    },
    {
      title: "Student Networking",
      short: "Build connections on the ground",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      points: [
        "Connect with current students at your target university",
        "Learn practical housing and WG-hunting tips early",
        "Understand local Bürgeramt registration queues in advance",
        "Get insider info on transport routes before landing"
      ]
    },
    {
      title: "Structured Planning Matters",
      short: "Start 12 months ahead",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      points: [
        "Begin your planning at least 12 months in advance",
        "Early planning leads to smoother admissions and visa approval",
        "Gives adequate time to set up your blocked account",
        "Last-minute timelines risk missing intake deadlines"
      ]
    }
  ];

  return (
    <div className="space-y-24 md:space-y-36 pb-20">

      {/* PROCESS TEAM HERO HERO */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-navy via-slate-900 to-slate-950" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Decorative glow accents */}
        <div className="absolute top-0 right-0 w-[32rem] h-[32rem] bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 min-h-screen flex items-center">
          <div className="grid md:grid-cols-2 gap-10 items-center w-full py-16 md:py-24">
            {/* Left: text content */}
            <ScrollReveal variant="glideUp">
              <div className="space-y-6 text-left order-2 md:order-1">
                {/* <span className="inline-block text-[10px] font-bold text-gold uppercase tracking-[0.2em] border border-gold/30 bg-gold/5 px-3 py-1.5 rounded-sm">
                  Study Abroad Guidance
                </span> */}

                <h1 className="text-3xl mobile-m:text-4xl sm:text-5xl md:text-6xl font-bold font-sans leading-[1.1] text-white">
                  Smart Guidance <br /> for a
                  <br />
                  <span className="font-serif italic font-medium text-gold">
                    Smarter Future.
                  </span>
                </h1>

                <p className="text-sm md:text-base font-sans leading-relaxed max-w-md text-slate-300">
                  From your first enquiry to your first day on a German campus EuroZiel
                  covers every aspect of your study abroad journey. Guided by mentors
                  currently studying your fields in Germany.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button className="mybtn bg-gold text-slate-950 text-sm font-bold px-8 py-3.5 rounded-sm hover:bg-gold/90 hover:scale-[1.02] transition-all shadow-premium">
                    Start Your Journey Today
                  </button>
                  <button
                    onClick={() => {
                      navigate('/services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mybtn text-sm font-semibold px-8 py-3.5 rounded-sm border border-slate-600 text-white hover:bg-white/5 transition-colors"
                  >
                    Explore Services
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-4 mobile-m:gap-6 pt-6 text-xs font-sans">
                  <div className="text-slate-400">
                    <span className="text-gold font-bold text-[20px] text-base">500+ </span> Students Guided
                  </div>
                  <div className="w-px h-4 bg-slate-700" />
                  <div className="text-slate-400">
                    <span className="text-gold font-bold text-[20px] text-base">98%</span> Visa Success Rate
                  </div>
                  <div className="w-px h-4 bg-slate-700" />
                  <div className="text-slate-400">
                    <span className="text-gold font-bold text-[20px] text-base">50+</span> Partner Universities
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: sample image */}
            <ScrollReveal variant="clipReveal">
              <div className="relative w-full flex justify-center md:justify-end order-1 md:order-2 pb-8 md:pb-0">
                <div className="relative w-full max-w-sm mobile-l:max-w-md md:max-w-lg">
                  <img
                    src="/assets/process.jpg"
                    alt="Graduate student smiling"
                    className="w-full rounded-sm object-cover object-top h-[300px] mobile-m:h-[360px] mobile-l:h-[420px] md:h-[520px] shadow-premium border-b-4 border-b-gold"
                  />

                  {/* Floating badge on the image */}
                  <div className="absolute -bottom-8 left-4 right-4 mobile-l:left-auto mobile-l:right-4 md:-right-6 md:left-auto md:bottom-[-1.5rem] bg-gold text-slate-900 rounded-sm px-4 py-3.5 mobile-l:px-5 mobile-l:py-4 shadow-premium border-l-4 border-l-gold max-w-full mobile-l:max-w-[220px]">
                    <p className="text-[11px] font-sans pb-3 text-black leading-snug">
                      Personalized courses, expert mentors, and flexible guidance built for real results.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* YOUR GERMANY TIMELINE ROADMAP */}

      <TimeLine />

      {/* INTERACTIVE PRE-DEPARTURE CHECKLIST */}
      <section className="max-w-7xl mx-auto px-4">
        <ScrollReveal variant="scaleUp">
          <div
            className={`p-6 md:p-10 rounded-sm border border-[#e5a800]/20 shadow-premium border-b-4 border-b-gold space-y-8 text-left relative ${dark ? "bg-slate-950/80" : "bg-white"
              }`}
          >
            <div className="absolute top-4 right-4 text-[9px] px-2 py-1 rounded-sm bg-gold/5 text-gold border border-gold/20 font-mono font-bold uppercase tracking-wider">
              Interactive Checklist
            </div>

            {/* Header */}
            <div className="space-y-2">
              <h2
                className={`text-2xl font-bold tracking-tight font-sans ${dark ? "text-slate-100" : "text-slate-800"
                  }`}
              >
                Pre-Departure Readiness Checklist
              </h2>
              <p className={`text-xs font-sans ${dark ? "text-slate-400" : "text-slate-500"}`}>
                Follow each step in order and tick it off once completed. Track how prepared you are for your flight.
              </p>
            </div>

            {/* Progress Tracker bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-500">Your Progress</span>
                <span className="font-bold text-gold">
                  {checkedCount} of {checklist.length} Completed ({progressPercent}%)
                </span>
              </div>
              <div
                className={`h-2 rounded-sm overflow-hidden border border-slate-200/20 ${dark ? "bg-slate-900" : "bg-slate-105"
                  }`}
              >
                <div
                  className="h-full bg-navy transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Ordered Step-by-Step Checklist */}
            <div className="flex flex-col divide-y divide-slate-200/10">
              {checklist.map((item, index) => (
                <label
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`py-3.5 flex items-center gap-3.5 cursor-pointer transition-all ${item.checked
                    ? `${dark ? "text-slate-200" : "text-slate-800"}`
                    : `${dark ? "text-slate-400" : "text-slate-500"}`
                    }`}
                >
                  {/* Step Number Badge */}
                  <div
                    className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold font-mono border transition-all ${item.checked
                      ? "bg-navy/10 border-navy/40 text-navy"
                      : `${dark ? "border-slate-700 text-slate-500" : "border-slate-300 text-slate-400"}`
                      }`}
                  >
                    {index + 1}
                  </div>

                  {/* Checkbox */}
                  <div
                    className={`mybtn w-5 h-5 shrink-0 rounded-sm flex items-center justify-center border transition-all ${item.checked
                      ? "bg-navy border-navy text-white"
                      : `${dark ? "border-slate-700" : "border-slate-300"}`
                      }`}
                  >
                    {item.checked && <Check className="mybtn w-3.5 h-3.5 stroke-[3.5]" />}
                  </div>

                  {/* Step Text */}
                  <span className="text-xs font-semibold select-none font-sans leading-none">
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* GERMANY JOURNEY INSIGHTS FLASH CARDS */}
      <section className={`py-10 px-4 animate-fade-in ${dark ? 'bg-transparent' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto space-y-12">

          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold tracking-tight font-sans">
              Germany Journey Insights
            </h2>
            <p className={`text-xs md:text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              Hover over any card to flip it and reveal detailed insights about student life and legal compliance in Germany.
            </p>
          </div>

          <ScrollReveal
            variant="blurIn"
            stagger={0.08}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {insights.map((ins, idx) => (
              <div
                key={idx}
                className="group h-96 rounded-sm"
                style={{ perspective: '1200px' }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                >
                  {/* FRONT FACE */}
                  <div
                    className="absolute inset-0 rounded-sm border overflow-hidden shadow-premium border-b-4 border-b-gold [backface-visibility:hidden]"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${ins.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/20" />
                    <div className="relative p-8 h-full flex flex-col justify-between text-left">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-sans tracking-widest text-gold uppercase font-bold bg-slate-950/40 px-2.5 py-1.5 rounded-sm border border-gold/20">
                          Fact Card 0{idx + 1}
                        </span>
                        <Lightbulb className="w-5 h-5 text-gold" />
                      </div>

                      <div className="space-y-4 mt-40">
                        <h4 className="font-bold text-xl text-white font-sans">{ins.title}</h4>
                        <p className="text-sm text-slate-200 mt-2 font-sans">{ins.short}</p>
                      </div>

                      <div className="text-[10px] text-slate-300 border-t border-white/15 pt-3 flex items-center justify-between">
                        {/* <span className="font-sans uppercase tracking-wider text-[9px]">Hover to Read Detail</span> */}
                        <ArrowRight className="w-3.5 h-3.5 text-gold" />
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className={`absolute inset-0 rounded-sm border p-8 flex flex-col justify-between text-left shadow-premium border-gold border-b-4 border-b-gold [backface-visibility:hidden] [transform:rotateY(180deg)] ${dark ? 'bg-slate-950 text-slate-100' : 'bg-slate-950 text-slate-100'
                      }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[9px] font-sans tracking-widest text-gold uppercase font-bold">
                          {ins.title}
                        </span>
                        <Lightbulb className="w-5 h-5 text-gold" />
                      </div>

                      <ul className="space-y-2.5 overflow-y-auto max-h-[220px] pr-1">
                        {ins.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-300 font-sans">
                            <span className="text-gold mt-0.5 shrink-0">▹</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-[10px] text-slate-400 border-t border-slate-100/15 pt-3 flex items-center justify-between">
                      <span className="font-sans uppercase tracking-wider text-[9px]">Move Away to Flip Back</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold rotate-180" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollReveal>

        </div>
      </section>

      {/* PROCESS FINAL BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 text-center">
        <ScrollReveal variant="flipUp">
          <div className={`relative rounded-sm overflow-hidden py-12 px-6 border border-gold/20 text-white shadow-premium border-b-4 border-b-gold ${dark ? 'bg-slate-950' : 'bg-slate-900'
            }`}>
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-bold font-sans">Still Confused About Your Germany Pathway?</h3>
              <p className="text-gold text-xs uppercase tracking-widest max-w-lg mx-auto font-sans font-semibold">
                Speak with our core team and get a realistic, honest evaluation of your profile, academic eligibility, and career opportunities in public universities.
              </p>
              <div>
                <button
                  onClick={onOpenConsultation}
                  className="mybtn px-8 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest bg-navy hover:bg-opacity-90 border-b-2 border-gold text-white transition-all cursor-pointer shadow-premium"
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