import React from 'react';
import Logo from './Logo';
import { Mail, ShieldCheck, Heart, ArrowRight, Compass, ShieldAlert } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface FooterProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  theme: 'light' | 'dark';
  onOpenConsultation: () => void;
}

export default function Footer({ currentTab, onTabChange, theme, onOpenConsultation }: FooterProps) {
  const dark = theme === 'dark';

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'study', label: 'Study in Germany' },
    { id: 'services', label: 'Services' },
    { id: 'process', label: 'Process & Timeline' },
    { id: 'about', label: 'About & Founders' },
    { id: 'faq', label: 'FAQs' }
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t select-none transition-colors duration-300 relative z-60 shadow-[0_-20px_40px_rgba(0,0,0,0.45)] ${
      dark
        ? 'bg-transparent border-slate-900 text-slate-400'
        : 'bg-transparent border-slate-200 text-slate-500'
    }`}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#e5a800] to-transparent" />

      <div className="w-full px-4 py-8 mobile-m:px-5 mobile-l:px-6 laptop:px-8 laptop-l:px-12 4k:px-20 space-y-6">

        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="flex flex-wrap justify-between gap-8">

            <div className="max-w-xs space-y-1.5">
              <Logo isDark={dark} />
              <p className="text-[11px] leading-snug font-sans">
                EuroZiel is a professional student success network built by Germany graduates and active advisors. We provide domain-specific counseling to bypass late applications and structural document delays.
              </p>
              <div className={`flex items-center gap-1.5 text-[11px] font-bold ${dark ? 'text-slate-200' : 'text-slate-800'}`}>
                <Mail className="w-3.5 h-3.5 text-[#1b73ba]" />
                <a href="mailto:info@euroziel.com?subject=Inquiry%20about%20services&body=Hello%2C%20I%20want%20to%20know%20about%20your%20services." className="hover:underline">info@euroziel.com</a>
              </div>
            </div>

            <div>
              <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>
                Explore EuroZiel
              </h4>
              <div className="grid grid-cols-1 gap-1.5">
                {links.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="text-[11px] text-left hover:text-[#1b73ba] transition-colors cursor-pointer font-medium font-sans flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-all -ml-3 group-hover:ml-0" />
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>
                Founders
              </h4>
              <div className="space-y-2 text-[11px] font-sans">
                <div>
                  <div className={`font-extrabold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>Sarathkumar Venkateshwaran</div>
                  <div className="text-[9px] text-[#e5a800] uppercase mt-0.5">European Network & Student Ecosystem</div>
                </div>
                <div>
                  <div className={`font-extrabold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>Yuvasri Jagadeesan</div>
                  <div className="text-[9px] text-[#e5a800] uppercase mt-0.5">Academic Strategy & Student Success</div>
                </div>
              </div>
            </div>

            <div className="max-w-xs space-y-1.5">
              <h3 className={`text-xs font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>
                Ready to verify your university CGPA?
              </h3>
              <p className="text-[11px] font-sans leading-snug">
                Don't miss the current Winter intake deadlines. Book a 1-on-1 counselor audit.
              </p>
              <button
                onClick={onOpenConsultation}
                className="px-3.5 py-2 rounded-sm text-[11px] font-bold uppercase tracking-widest bg-navy text-white hover:bg-opacity-90 border-b-2 border-gold transition-all cursor-pointer shadow-premium"
              >
                9rs Enrollment &rarr;
              </button>
            </div>

          </div>
        </ScrollReveal>

        <div className={`border-t pt-4 text-[10px] font-sans leading-snug text-left space-y-2 ${
          dark ? 'border-slate-800' : 'border-slate-200/50'
        }`}>
          <div className="flex gap-2 items-start text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#e5a800] shrink-0" />
            <span>
              <strong>Tuition & Contribution Mandates:</strong> Average starting fees of €0 apply strictly to general state-funded German public Universities under current federal legislations. Nominal semester fees of €200 - €400 cover administrative and local transit tickets. Special block states like Baden-Württemberg hold separate €1,500/semester rules.
            </span>
          </div>
          <div className="flex gap-2 items-start text-slate-500">
            <ShieldAlert className="w-3.5 h-3.5 text-[#1b73ba] shrink-0" />
            <span>
              <strong>Blocked account rule (€11,904):</strong> Living expense verifications (Sperrkonto) remain governed by the Ausländerbehörde (Foreigner's Authority) and require compliance tracking directly before visa applications.
            </span>
          </div>
        </div>

        <div className={`border-t pt-4 flex flex-col mobile-l:flex-row items-center justify-between gap-2 text-[11px] ${
          dark ? 'border-slate-900' : 'border-slate-200/40'
        }`}>
          <span>&copy; 2026 EuroZiel Consulting. All Rights Reserved.</span>
          <div className="flex items-center gap-1">
            <span>Made with</span> <Heart className="w-3 h-3 text-rose-500 fill-current" /> <span>for future German Scholars</span>
          </div>
        </div>

        <div className="text-center text-[10px] opacity-70">
          Designed and Developed by{' '}
          <a
            href="https://techgajana.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#e5a800] hover:underline"
          >
            TechGajana Digital Solutions
          </a>
        </div>

      </div>
    </footer>
  );
}