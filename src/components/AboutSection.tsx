import React from 'react';
import { motion } from 'motion/react';
import {
  Heart, Users, BookOpen, GraduationCap, Compass, ShieldAlert, Sparkles, Building2, HelpCircle, ArrowRight, ArrowUpRight
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface AboutSectionProps {
  onOpenConsultation: () => void;
  theme: 'light' | 'dark';
}

export default function AboutSection({ onOpenConsultation, theme }: AboutSectionProps) {
  const dark = theme === 'dark';

  const trustPoints = [
    {
      icon: Users,
      num: "01",
      title: "Peer Proof",
      text: "You hear directly from active Indian students at TU Munich, RWTH Aachen, TU Berlin, University of Hamburg, and more. No brochures or recycled marketing templates.",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30"
    },
    {
      icon: Building2,
      num: "02",
      title: "Professional Network",
      text: "Indian professionals working in Germany across engineering, IT, healthcare, and finance sectors give our students an honest, raw picture of the career landscape.",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30"
    },
    {
      icon: Compass,
      num: "03",
      title: "Germany Only Focus",
      text: "We do not spread attention across ten countries to maximize volumes. Every resource we possess is custom-built for Germany and Europe specifically.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30"
    },
    {
      icon: ShieldAlert,
      num: "04",
      title: "No Hidden Anything",
      text: "What we charge is discussed upfront in clear terms. If we cannot honestly help your profile, we tell you immediately instead of leading you into rejections.",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30"
    }
  ];

  const stats = [
    { value: "100%", label: "Germany Focused", color: "text-blue-500", bg: "bg-blue-500/5" },
    { value: "25+", label: "Partner Universities", color: "text-amber-500", bg: "bg-amber-500/5" },
    { value: "Active", label: "Student Network", color: "text-emerald-500", bg: "bg-emerald-500/5" },
    { value: "Zero", label: "Hidden Fees", color: "text-rose-500", bg: "bg-rose-500/5" }
  ];

  const founders = [
    {
      name: "Sarathkumar Venkateshwaran",
      role: "Co-Founder",
      focus: "European Network & Student Ecosystem",
      accent: "navy",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      tags: ["University Network", "Career Guidance", "Student Ecosystem"],
      bio: [
        "Sarathkumar leads EuroZiel's European network and ecosystem development initiatives, building strong connections across universities, student communities, graduates, and working professionals throughout Germany and Europe.",
        "His expertise lies in creating a network driven guidance system that provides students with practical exposure and real world insights beyond the traditional admission process. Through continuous collaboration with students and professionals across multiple European cities, he helps deliver ground-level guidance on academics, student life, accommodation, internships, and career pathways.",
        "This on the ground presence is what separates EuroZiel from agencies working purely off brochures every recommendation is backed by someone who has actually navigated that city, that university, or that visa office."
      ]
    },
    {
      name: "Yuvasri Jagadeesan",
      role: "Co-Founder",
      focus: "Academic Strategy & Student Success",
      accent: "gold",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      tags: ["Profile Evaluation", "APS Coordination", "Visa Guidance"],
      bio: [
        "Yuvasri leads EuroZiel's student support and academic process framework with strong experience in overseas education counseling and Germany-focused application guidance. Her expertise spans profile evaluation, university shortlisting, application planning, APS coordination, documentation review, and visa guidance.",
        "Known for her structured and accountable approach, she works closely with students across multiple academic backgrounds, helping them navigate complex admission processes with clarity and confidence.",
        "Her focus on transparent communication and personalized mentorship is the heart of EuroZiel's student-first model every student gets a plan built around their actual profile, not a one-size-fits-all template."
      ]
    }
  ];

  return (
    <div className="space-y-28 md:space-y-40 pb-24 bg-transparent">

      {/* ===== HERO — COLORFUL & ATTRACTIVE ===== */}
      <section className="max-w-5xl pt-20 mx-auto px-4 text-left relative">
        {/* soft color blobs behind hero */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <ScrollReveal variant="blurIn">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              {/* <span className="text-[10px] font-bold uppercase tracking-[0.3em] px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-amber-500 text-white inline-flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3 h-3" />
                About EuroZiel
              </span> */}
            </div>

            <h1 className={`text-4xl md:text-6xl font-bold font-sans leading-[1.05] tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
              We're not a consultancy
              <br />
              that read about{" "}
              <span className="bg-gradient-to-r from-blue-500 via-amber-500 to-emerald-500 bg-clip-text text-transparent">
                Germany.
              </span>
            </h1>
            <p className={`text-xl md:text-2xl font-serif italic max-w-2xl ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              We're connected to people living it, right now.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenConsultation}
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                Book a Free Consultation
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <span className={`text-[11px] font-sans ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                No pressure. No sales pitch. Just honest guidance.
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== STATS ROW — COLOR-CODED BLOCKS ===== */}
      <section className="max-w-5xl mx-auto px-4">
        <ScrollReveal variant="fadeUp">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`py-6 px-4 rounded-2xl text-center md:text-left ${s.bg} transition-transform hover:-translate-y-1`}
              >
                <div className={`text-2xl md:text-3xl font-bold font-serif ${s.color}`}>
                  {s.value}
                </div>
                <div className={`text-[10px] uppercase tracking-widest font-bold mt-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ===== OUR STORY — FLOWING TEXT WITH COLOR ACCENTS ===== */}
      <section className="max-w-4xl mx-auto px-4 text-left">
        <ScrollReveal variant="fadeUp">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-white bg-navy px-3 py-1 rounded-full uppercase tracking-[0.3em]">
                Our Story
              </span>
              <span className={`flex-1 h-px bg-gradient-to-r from-blue-500/40 to-transparent`} />
            </div>

            <blockquote className={`text-2xl md:text-3xl font-serif italic leading-snug border-l-4 border-gradient-to-b from-blue-500 to-amber-500 pl-6 relative ${dark ? 'text-slate-100' : 'text-slate-800'}`}
              style={{ borderImage: 'linear-gradient(180deg, #3b82f6, #f59e0b) 1' }}
            >
              "The problem was never the students. The problem was the guidance."
            </blockquote>

            <div className={`space-y-4 text-sm md:text-base font-sans leading-relaxed max-w-3xl ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              <p>
                Sarathkumar Venkateshwaran and Yuvasri Jagadeesan did not start EuroZiel because they saw a business opportunity. They started it because they watched too many genuinely capable Indian students either give up on Germany entirely or get burned by generic agencies that had never actually engaged with the German university system at a real level.
              </p>
              <p>
                Generic agencies giving the same advice to every student regardless of their background. No one with actual ground level knowledge of what TU Munich expects versus what RWTH Aachen looks for. No one who had sat through an APS documentation process, waited three months for a certificate, or figured out how Anmeldung actually works on arrival.
              </p>
              <p className={`font-semibold ${dark ? 'text-white' : 'text-slate-800'}`}>
                So they built something different. Not just a consultancy. A real, structural bridge.
              </p>
            </div>

            {/* Mission / Vision — color-tinted chips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
              <div className="flex gap-4 p-5 rounded-2xl bg-blue-500/5">
                <div className="w-10 h-10 shrink-0 rounded-full bg-blue-500/15 flex items-center justify-center">
                  <BookOpen className="w-4.5 h-4.5 text-blue-500" />
                </div>
                <div>
                  <h5 className={`text-sm font-bold font-sans mb-1 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Our Mission</h5>
                  <p className={`text-xs leading-relaxed font-sans ${dark ? 'text-slate-500' : 'text-slate-500'}`}>
                    Make Germany genuinely accessible through honest, ground level guidance.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-amber-500/5">
                <div className="w-10 h-10 shrink-0 rounded-full bg-amber-500/15 flex items-center justify-center">
                  <GraduationCap className="w-4.5 h-4.5 text-amber-500" />
                </div>
                <div>
                  <h5 className={`text-sm font-bold font-sans mb-1 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Our Vision</h5>
                  <p className={`text-xs leading-relaxed font-sans ${dark ? 'text-slate-500' : 'text-slate-500'}`}>
                    A student first bridge between India and Europe, built on trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== LEADERSHIP — ALTERNATING, COLOR-CODED PROFILES ===== */}
      <section className="max-w-6xl mx-auto px-4">
        <ScrollReveal variant="fadeUp">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-20">
            {/* <span className="text-[10px] font-bold text-white bg-navy px-3 py-1 rounded-full uppercase tracking-[0.3em] inline-block">
              Leadership Team
            </span> */}
            <h2 className={`text-3xl md:text-4xl font-bold font-sans ${dark ? 'text-white' : 'text-slate-900'}`}>
              Meet the Founders
            </h2>
            <p className={`text-xs md:text-sm font-sans ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              Direct student centric counseling expertise backed by a robust European network.
            </p>
          </div>
        </ScrollReveal>

        {/* Separate standalone blocks — no shared container, no card */}
        <div className="space-y-24 md:space-y-32">
          {founders.map((f, idx) => (
            <ScrollReveal
              key={idx}
              variant={idx % 2 === 0 ? 'slideLeft' : 'slideRight'}
              delay={idx * 0.1}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">

                {/* IMAGE SIDE */}
                <div
                  className={`md:col-span-5 relative min-h-[320px] md:min-h-[440px] rounded-2xl overflow-hidden ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'
                    }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${f.image})` }}
                  />
                  <div
                    className={`absolute inset-0 ${f.accent === 'navy'
                        ? 'bg-gradient-to-t from-navy/70 via-navy/10 to-transparent'
                        : 'bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent'
                      }`}
                  />
                  <div
                    className={`absolute top-4 ${idx % 2 === 0 ? 'left-4' : 'right-4'} w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold font-mono ${f.accent === 'navy' ? 'bg-navy' : 'bg-gold'
                      }`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* CONTENT SIDE */}
                <div
                  className={`md:col-span-7 space-y-4 text-left ${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'
                    }`}
                >
                  <div>
                    <h4 className={`text-2xl md:text-3xl font-bold font-sans leading-tight ${dark ? 'text-slate-100' : 'text-slate-900'}`}>
                      {f.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white ${f.accent === 'navy' ? 'bg-navy' : 'bg-gold'
                          }`}
                      >
                        {f.role}
                      </span>
                      <span className={`text-[11px] font-bold uppercase tracking-wide ${f.accent === 'navy' ? 'text-navy' : 'text-gold'}`}>
                        {f.focus}
                      </span>
                    </div>
                  </div>

                  <div className={`h-px w-16 ${f.accent === 'navy' ? 'bg-navy' : 'bg-gold'}`} />

                  <div className="space-y-3">
                    {f.bio.map((para, pIdx) => (
                      <p key={pIdx} className={`text-xs md:text-sm font-sans leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {para}
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {f.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-[10px] font-sans font-semibold px-2.5 py-1 rounded-full border ${dark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
                          }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== TRUST PILLARS — COLORFUL ICON CHIPS ===== */}
      <section className="max-w-5xl mx-auto px-4">
        <ScrollReveal variant="fadeUp">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
            {/* <span className="text-[10px] font-bold text-white bg-rose-500 px-3 py-1 rounded-full uppercase tracking-[0.3em] inline-flex items-center gap-1.5">
              <Heart className="w-3 h-3" />
              Ethical Pillars
            </span> */}
            <h2 className={`text-3xl md:text-4xl font-bold font-sans ${dark ? 'text-white' : 'text-slate-900'}`}>
              Why Students Trust Us
            </h2>
            <p className={`text-xs md:text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              Absolute transparency, honest evaluations, and domain based expertise.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <ScrollReveal key={index} variant="fadeUp" delay={index * 0.06}>
                <div className={`group p-6 rounded-2xl ${point.bg} flex gap-4 items-start text-left transition-transform hover:-translate-y-1`}>
                  <div className={`w-11 h-11 shrink-0 rounded-full ${point.bg} border ${point.border} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${point.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-xs font-mono font-bold ${point.color}`}>{point.num}</span>
                      <h4 className={`font-bold text-base font-sans ${dark ? 'text-white' : 'text-slate-900'}`}>
                        {point.title}
                      </h4>
                    </div>
                    <p className={`text-xs leading-relaxed font-sans ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {point.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ===== CLOSING CTA — VIBRANT GRADIENT BANNER ===== */}
      <section className="max-w-5xl mx-auto px-4">
        <ScrollReveal variant="scaleUp">
          <div className="relative overflow-hidden text-center py-16 px-6 rounded-3xl bg-gradient-to-br from-blue-500/10 via-amber-500/10 to-emerald-500/10 space-y-5">
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="w-12 h-12 rounded-full bg-white/60 dark:bg-slate-900/60 flex items-center justify-center mx-auto shadow-sm">
                <HelpCircle className="w-6 h-6 text-gold" />
              </div>
              <h3 className={`text-2xl md:text-3xl font-bold font-serif italic ${dark ? 'text-white' : 'text-slate-900'}`}>
                Still deciding if EuroZiel is right for you?
              </h3>
              <p className={`text-xs md:text-sm max-w-xl mx-auto font-sans ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                Talk to us directly. No sales pitch, no pressure just an honest evaluation of your profile.
              </p>
              <button
                onClick={onOpenConsultation}
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-500 to-amber-500 px-6 py-3 rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                Talk to a Counselor
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}