import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, Calendar, GraduationCap, ChevronRight, CheckCircle } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

interface ThreeDHeroProps {
  onOpenConsultation: () => void;
  onNavigateToTab: (tab: string) => void;
  theme: 'light' | 'dark'; // Added theme prop here
}

export default function ThreeDHero({ onOpenConsultation, onNavigateToTab, theme }: ThreeDHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  const [mouseActive, setMouseActive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relativeX);
    y.set(relativeY);
    setMouseActive(true);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setMouseActive(false);
  };

  const isDark = theme === 'dark';

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden pt-6 pb-6 mobile-m:pt-8 mobile-m:pb-8 mobile-l:pt-10 mobile-l:pb-10 tablet:pt-5 tablet:pb-5 laptop:pt-12 laptop:pb-12 laptop-l:pt-16 laptop-l:pb-16 4k:pt-24 4k:pb-24 px-4 mobile-m:px-5 mobile-l:px-6 tablet:px-6 laptop:px-8 laptop-l:px-12 4k:px-20 select-none lg:h-screen lg:flex lg:items-center lg:justify-center z-10 ${isDark ? 'bg-[#060814]' : 'bg-white'
        }`}
    >
      {/* Decorative Grid Gradients */}
      <div className={`absolute inset-0 pointer-events-none bg-[radial-gradient(#1b73ba_1.5px,transparent_1.5px)] [background-size:24px_24px] laptop:[background-size:28px_28px] 4k:[background-size:36px_36px] ${isDark ? 'opacity-20' : 'opacity-30'
        }`} />

      {/* Glowing Blobs */}
      <div className={`absolute top-1/4 -left-24 mobile-l:-left-28 laptop:-left-32 4k:-left-48 w-72 h-72 mobile-l:w-80 mobile-l:h-80 laptop:w-96 laptop:h-96 4k:w-[32rem] 4k:h-[32rem] rounded-full blur-3xl pointer-events-none ${isDark ? 'bg-[#1b73ba]/20' : 'bg-[#1b73ba]/10'
        }`} />
      <div className={`absolute bottom-1/4 -right-24 mobile-l:-right-28 laptop:-right-32 4k:-right-48 w-72 h-72 mobile-l:w-80 mobile-l:h-80 laptop:w-96 laptop:h-96 4k:w-[32rem] 4k:h-[32rem] rounded-full blur-3xl pointer-events-none ${isDark ? 'bg-[#e5a800]/15' : 'bg-[#e5a800]/10'
        }`} />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 mobile-l:gap-10 laptop:gap-12 4k:gap-20 items-center relative z-10">

        {/* Left Column */}
        <div className="lg:col-span-8 space-y-4 mobile-m:space-y-5 laptop:space-y-6 4k:space-y-8 text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`inline-flex items-center gap-2 px-3 py-1.5 mobile-m:px-3.5 laptop:px-4 4k:px-5 4k:py-2.5 rounded-sm border backdrop-blur-md shadow-sm ${isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white/70'
              }`}
          >
            <span className="flex h-2 w-2 rounded-full bg-[#e5a800] animate-pulse" />
            <span className={`text-[9px] mobile-m:text-[10px] laptop:text-[10px] 4k:text-xs font-bold tracking-[0.2em] uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
              German Public University Experts
            </span>
            <div className={`w-px h-3.5 4k:h-4 ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
            <span className="text-[9px] mobile-m:text-[10px] 4k:text-xs font-bold text-[#e5a800] tracking-[0.15em] uppercase flex items-center gap-1">
              INR 100 CONSULTATIONS <Sparkles className="w-3 h-3 4k:w-3.5 4k:h-3.5" />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-3xl mobile-m:text-4xl mobile-l:text-4xl tablet:text-4xl laptop:text-5xl laptop-l:text-6xl 4k:text-7xl font-bold font-sans leading-[1.1] tracking-tight ${isDark ? 'text-white' : 'text-slate-900'
              }`}
          >
            Your bridge from <span className="font-serif italic font-normal text-[#e5a800]">India</span> to <span className={`font-serif italic font-semibold ${isDark ? 'text-blue-400' : 'text-navy'
              }`}>Germany</span>, built by people already there.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-xs mobile-m:text-sm laptop:text-sm laptop-l:text-base 4k:text-lg leading-relaxed font-sans ${isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
          >
            Not templates. Not generic advice. Direct access to Indian students at German universities and professionals working across Europe before you decide, during your application, and after you land.
          </motion.p>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`grid grid-cols-3 gap-3 mobile-m:gap-4 laptop:gap-6 4k:gap-8 py-3 mobile-m:py-4 4k:py-5 border-y max-w-xs mobile-m:max-w-sm laptop:max-w-lg ${isDark ? 'border-slate-800/50' : 'border-slate-200/50'
              }`}
          >
            <div>
              <div className={`text-lg mobile-m:text-xl laptop:text-2xl 4k:text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-navy'}`}>
                0€ <span className="text-[10px] mobile-m:text-xs 4k:text-sm font-normal text-slate-400 font-sans">Tuition</span>
              </div>
              <div className={`text-[9px] mobile-m:text-[10px] 4k:text-xs tracking-widest uppercase mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>Most German States</div>
            </div>
            <div>
              <div className="text-lg mobile-m:text-xl laptop:text-2xl 4k:text-3xl font-bold text-[#e5a800]">
                98% <span className="text-[10px] mobile-m:text-xs 4k:text-sm font-normal text-slate-400 font-sans">Success</span>
              </div>
              <div className={`text-[9px] mobile-m:text-[10px] 4k:text-xs tracking-widest uppercase mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>Visa Accomplishment</div>
            </div>
            <div>
              <div className={`text-lg mobile-m:text-xl laptop:text-2xl 4k:text-3xl font-bold ${isDark ? 'text-teal-400' : 'text-teal-600'
                }`}>1-on-1</div>
              <div className={`text-[9px] mobile-m:text-[10px] 4k:text-xs tracking-widest uppercase mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>Native Mentorship</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mobile-m:gap-4 4k:gap-5 pt-1 mobile-m:pt-2"
          >
            <button
              onClick={onOpenConsultation}
              className="px-6 mobile-m:px-8 laptop:px-8 4k:px-10 py-3 mobile-m:py-4 4k:py-5 rounded-sm font-bold text-[10px] mobile-m:text-xs 4k:text-sm tracking-widest uppercase cursor-pointer transition-all duration-300 bg-navy text-white hover:bg-opacity-90 text-center shadow-premium border-b-2 border-gold font-sans flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Start Your Germany Journey
              <ChevronRight className="w-3.5 h-3.5 mobile-m:w-4 mobile-m:h-4 4k:w-5 4k:h-5" />
            </button>
            <button
              onClick={() => onNavigateToTab('process')}
              className={`px-5 mobile-m:px-6 4k:px-8 py-3 mobile-m:py-4 4k:py-5 rounded-sm font-bold text-[10px] mobile-m:text-xs 4k:text-sm tracking-widest uppercase cursor-pointer transition-all duration-300 border text-center font-sans ${isDark
                  ? 'border-slate-800 hover:border-slate-600 hover:bg-slate-900 text-slate-300'
                  : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700'
                }`}
            >
              Explore 6-Step Roadmap
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className={`text-[10px] mobile-m:text-sm 4k:text-base leading-relaxed font-sans ${isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
          >
            Have an{' '}
            <a
              href="https://wa.me/917598969875?text=Hello%2C%20I%20have%20an%20enquiry%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className={`underline transition-colors duration-300 ${isDark ? 'text-slate-200 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                }`}
            >
              enquiry
            </a>
            ? Reach out to us on WhatsApp or email for a quick response.
          </motion.p>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-2 mobile-m:gap-3 4k:gap-4"
          >
            {[
              { href: 'https://wa.me/917598969875?text=Hello%2C%20I%20have%20an%20enquiry%20about%20your%20services.', label: 'WhatsApp', Icon: FaWhatsapp, color: '#25D366', glow: 'rgba(37,211,102,0.5)' },
              { href: 'mailto:info@euroziel.com?subject=I%20want%20to%20know%20about%20your%20services&body=Hello%2C%20I%20want%20to%20know%20about%20your%20services.', label: 'Email', Icon: FaEnvelope, color: '#EA4335', glow: 'rgba(234,67,53,0.5)' },
              { href: 'https://www.youtube.com/channel/UC_X0Q9J4444', label: 'YouTube', Icon: FaYoutube, color: '#FF0000', glow: 'rgba(255,0,0,0.5)' },
              { href: 'https://www.instagram.com/euro_ziel/', label: 'Instagram', Icon: FaInstagram, color: '#E4405F', glow: 'rgba(228,64,95,0.5)' },
              { href: 'https://www.linkedin.com/company/euroziel/', label: 'LinkedIn', Icon: FaLinkedin, color: '#0A66C2', glow: 'rgba(10,102,194,0.5)' },
            ].map(({ href, label, Icon, color, glow }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`flex items-center justify-center rounded-full transition-all duration-300 h-10 w-10 mobile-m:h-11 mobile-m:w-11 laptop:h-12 laptop:w-12 4k:h-14 4k:w-14 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100/10 border-slate-200/20'
                  }`}
                style={{ color }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.10)';
                  e.currentTarget.style.boxShadow = `0 0 24px ${glow}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Icon style={{ fontSize: 18 }} className="mobile-m:text-[20px] 4k:text-[24px]" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right Column — 3D Card */}
        <div className="lg:col-span-4 flex justify-center items-center">
          <motion.div
            style={{ perspective: 1000 }}
            className="w-full max-w-xs mobile-m:max-w-sm tablet:max-w-sm laptop:max-w-md 4k:max-w-lg relative"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className={`relative rounded-sm border shadow-premium p-4 mobile-m:p-5 laptop:p-6 4k:p-10 overflow-hidden border-b-4 border-b-gold ${isDark ? 'border-slate-800 bg-slate-950/90' : 'border-slate-200/50 bg-white/90'
                }`}
            >
              {/* Card BG */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-navy/5 to-transparent pointer-events-none"
                style={{ transform: 'translateZ(-50px)' }}
              />

              {/* Flag */}
              <div
                className="absolute top-3 right-3 mobile-m:top-4 mobile-m:right-4 4k:top-6 4k:right-6 flex h-3 w-8 mobile-m:h-3.5 mobile-m:w-10 4k:h-4 4k:w-12 overflow-hidden rounded-sm bg-slate-200"
                style={{ transform: 'translateZ(60px)' }}
              >
                <div className="w-1/3 bg-black" />
                <div className="w-1/3 bg-red-600" />
                <div className="w-1/3 bg-gold" />
              </div>

              {/* Card Header */}
              <div className="mb-4 mobile-m:mb-5 laptop:mb-6 4k:mb-8" style={{ transform: 'translateZ(40px)' }}>
                <span className={`text-[9px] mobile-m:text-[10px] 4k:text-xs font-bold tracking-widest uppercase px-2 py-1 4k:px-3 4k:py-1.5 rounded-sm border ${isDark ? 'text-blue-400 bg-slate-900 border-slate-800' : 'text-navy bg-slate-100 border-slate-200/50'
                  }`}>
                  Admission Guarantee
                </span>
                <h4 className={`text-base mobile-m:text-lg laptop:text-lg 4k:text-2xl font-bold font-sans mt-2 mobile-m:mt-3 ${isDark ? 'text-slate-100' : 'text-slate-800'
                  }`}>
                  Germany Admissions Tracker
                </h4>
                <p className="text-[10px] mobile-m:text-xs 4k:text-sm text-slate-400">Updated Real-Time for Winter Intake</p>
              </div>

              {/* Milestones */}
              <div className="space-y-3 mobile-m:space-y-4 4k:space-y-5 mb-4 mobile-m:mb-6 4k:mb-8" style={{ transform: 'translateZ(30px)' }}>

                <div className={`flex items-start gap-2 mobile-m:gap-3 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  <div className="w-6 h-6 mobile-m:w-7 mobile-m:h-7 4k:w-9 4k:h-9 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/25 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 mobile-m:w-4 mobile-m:h-4 4k:w-5 4k:h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] mobile-m:text-xs 4k:text-sm font-bold font-sans">01. Profile Verification</div>
                    <div className={`text-[9px] mobile-m:text-[10px] 4k:text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Completed in 24 hours with native team</div>
                  </div>
                </div>

                <div className={`flex items-start gap-2 mobile-m:gap-3 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  <div className="w-6 h-6 mobile-m:w-7 mobile-m:h-7 4k:w-9 4k:h-9 rounded-full bg-gold/10 text-gold border border-gold/25 flex items-center justify-center shrink-0">
                    <Calendar className="w-3.5 h-3.5 mobile-m:w-4 mobile-m:h-4 4k:w-5 4k:h-5" style={{ strokeWidth: 2.5 }} />
                  </div>
                  <div>
                    <div className="text-[10px] mobile-m:text-xs 4k:text-sm font-bold font-sans">02. APS Document Support</div>
                    <div className={`text-[9px] mobile-m:text-[10px] 4k:text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Verifying transcripts to bypass delays</div>
                  </div>
                </div>

                <div className={`flex items-start gap-2 mobile-m:gap-3 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  <div className={`w-6 h-6 mobile-m:w-7 mobile-m:h-7 4k:w-9 4k:h-9 rounded-full border flex items-center justify-center shrink-0 ${isDark ? 'bg-slate-900 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}>
                    <GraduationCap className="w-3.5 h-3.5 mobile-m:w-4 mobile-m:h-4 4k:w-5 4k:h-5" />
                  </div>
                  <div>
                    <div className={`text-[10px] mobile-m:text-xs 4k:text-sm font-bold font-sans ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>03. University Match</div>
                    <div className={`text-[9px] mobile-m:text-[10px] 4k:text-xs ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>Shortlisting Ambitious, Realistic & Safe</div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div
                className={`pt-3 mobile-m:pt-4 4k:pt-5 flex items-center justify-between border-t ${isDark ? 'border-slate-900' : 'border-slate-100'
                  }`}
                style={{ transform: 'translateZ(50px)' }}
              >
                <div className="text-left">
                  <span className="text-[8px] mobile-m:text-[9px] 4k:text-[11px] uppercase tracking-widest text-slate-400 block font-sans">Consultation Fee</span>
                  <span className="text-xs mobile-m:text-sm 4k:text-base font-bold text-gold">INR 100</span>
                  <span className="text-[9px] mobile-m:text-[10px] 4k:text-xs text-slate-400 ml-1">for 20 mins</span>
                </div>
                <button
                  onClick={onOpenConsultation}
                  className="px-3 mobile-m:px-4 4k:px-6 py-1.5 mobile-m:py-2 4k:py-3 bg-navy text-[10px] mobile-m:text-xs 4k:text-sm font-bold uppercase tracking-wider text-white rounded-sm hover:opacity-90 shadow-sm border-b-2 border-gold transition-all duration-300 cursor-pointer"
                >
                  Book Session
                </button>
              </div>

              {/* Depth Badge */}
              <div
                className="absolute -bottom-2 -left-2 bg-gold text-slate-950 text-[8px] mobile-m:text-[9px] 4k:text-[11px] font-bold px-2.5 mobile-m:px-3 4k:px-4 py-1 mobile-m:py-1.5 4k:py-2 rounded-sm shadow-premium uppercase tracking-widest border border-gold/30"
                style={{ transform: 'translateZ(70px)' }}
              >
                Zero Tuition Goal €
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}