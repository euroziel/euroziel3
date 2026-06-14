import React from 'react';
import Logo from './Logo';
import { Mail, ShieldCheck, Heart, ArrowRight, Compass, ShieldAlert } from 'lucide-react';

interface FooterProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  theme: 'light' | 'dark';
  onOpenConsultation: () => void;
}

export default function Footer({ currentTab, onTabChange, theme, onOpenConsultation }: FooterProps) {
  const dark = theme === 'dark';
  
  const links = [
    { id: 'home', label: 'Home Feed' },
    { id: 'study', label: 'German Universites' },
    { id: 'services', label: 'Pathways Overview' },
    { id: 'process', label: 'Timeline & Checklist' },
    { id: 'about', label: 'Founders Story' },
    { id: 'faq', label: 'Searchable FAQs' }
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t select-none transition-colors duration-300 relative ${
      dark 
        ? 'bg-slate-950 border-slate-900 text-slate-400' 
        : 'bg-slate-50 border-slate-200 text-slate-500'
    }`}>
      {/* Decorative colored glow on foot */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#e5a800] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-12">
        
        {/* Upper Column Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo & Corporate Brand Column */}
          <div className="col-span-1 md:col-span-4 space-y-4 text-left">
            <Logo isDark={dark} />
            <p className="text-xs leading-relaxed max-w-xs font-sans mt-2">
              EuroZiel is a professional student success network built by Germany graduates and active advisors. We provide domain-specific counseling to bypass late applications and structural document delays.
            </p>
            <div className={`flex items-center gap-2 text-xs font-bold ${dark ? 'text-slate-200' : 'text-slate-800'}`}>
              <Mail className="w-4 h-4 text-[#1b73ba]" />
              <a href="mailto:team@euroziel.com" className="hover:underline">team@euroziel.com</a>
            </div>
          </div>

          {/* Quick Nav Links Col */}
          <div className="col-span-1 md:col-span-3 text-left">
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>
              Explore EuroZiel
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-xs text-left hover:text-[#1b73ba] transition-colors cursor-pointer font-medium font-sans flex items-center gap-1 group"
                >
                  <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-all -ml-3 group-hover:ml-0" />
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Founders Column */}
          <div className="col-span-1 md:col-span-2 text-left">
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>
              Founders
            </h4>
            <div className="space-y-4 text-xs font-sans">
              <div>
                <div className={`font-extrabold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>Yuvasri Jagadeesan</div>
                <div className="text-[10px] text-[#e5a800] uppercase mt-0.5">Academic Strategy Lead</div>
              </div>
              <div>
                <div className={`font-extrabold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>Sarathkumar Venkateshwaran</div>
                <div className="text-[10px] text-[#e5a800] uppercase mt-0.5">European Network Architect</div>
              </div>
            </div>
          </div>

          {/* Urgent Audit CTA Button Right */}
          <div className="col-span-1 md:col-span-3 text-left space-y-4">
            <h3 className={`text-sm font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>
              Ready to verify your university CGPA?
            </h3>
            <p className="text-xs font-sans leading-relaxed">
              Don't miss the current Winter intake deadlines. Book a 1-on-1 counselor audit.
            </p>
            <button
              onClick={onOpenConsultation}
              className="px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest bg-navy text-white hover:bg-opacity-90 border-b-2 border-gold transition-all cursor-pointer shadow-premium"
            >
              Start Free Evaluation &rarr;
            </button>
          </div>

        </div>

        {/* Legal Disclaimers section */}
        <div className={`border-t pt-8 text-[11px] font-sans leading-relaxed max-w-4xl mr-auto text-left space-y-3 ${
          dark ? 'border-slate-800' : 'border-slate-200/50'
        }`}>
          <div className="flex gap-2 items-start text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#e5a800] shrink-0" />
            <span>
              <strong>Tuition & Contribution Mandates:</strong> Average starting fees of €0 apply strictly to general state-funded German public Universities under current federal legislations. Nominal semester fees of €200 - €400 cover administrative and local transit tickets. Special block states like Baden-Württemberg hold separate €1,500/semester rules.
            </span>
          </div>
          <div className="flex gap-2 items-start text-slate-500">
            <ShieldAlert className="w-4 h-4 text-[#1b73ba] shrink-0" />
            <span>
              <strong>Blocked account rule (€11,904):</strong> Living expense verifications (Sperrkonto) remain governed by the Ausländerbehörde (Foreigner's Authority) and require compliance tracking directly before visa applications.
            </span>
          </div>
        </div>

        {/* Base Copyright Block */}
        <div className={`border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          dark ? 'border-slate-900' : 'border-slate-200/40'
        }`}>
          <span>&copy; 2026 EuroZiel Consulting. All Rights Reserved. Hamburg - Bengaluru.</span>
          <div className="flex items-center gap-1">
            <span>Made with</span> <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> <span>for future German Scholars</span>
          </div>
        </div>

      </div>
    </footer>
  );
}