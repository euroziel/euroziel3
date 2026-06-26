import React, { useState } from 'react';
import Logo from './Logo';
import { Menu, X, Sun, Moon, Calendar, Home, BookOpen, Briefcase, GitBranch, Users, HelpCircle, LogIn } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onOpenConsultation: () => void;
}

export default function Navbar({ currentTab, onTabChange, theme, onThemeToggle, onOpenConsultation }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { id: 'home',     label: 'Home',              Icon: Home },
    { id: 'study',    label: 'Study in Germany',  Icon: BookOpen },
    { id: 'services', label: 'Services',           Icon: Briefcase },
    { id: 'process',  label: 'Process & Timeline', Icon: GitBranch },
    { id: 'about',    label: 'About & Founders',   Icon: Users },
    { id: 'faq',      label: 'FAQs',               Icon: HelpCircle },
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 border-b transition-all duration-300 backdrop-blur-md ${
      theme === 'dark'
        ? 'bg-slate-950/85 border-slate-800 text-slate-100'
        : 'bg-white/85 border-slate-150 text-slate-900'
    }`}>
      <div className="w-full px-4 mobile-m:px-5 mobile-l:px-6 laptop:px-8 laptop-l:px-12 4k:px-20">
        <div className="flex items-center justify-between h-16 mobile-m:h-[4.5rem] laptop:h-20 laptop-l:h-22 4k:h-28">

          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavClick('home')}>
            <Logo isDark={theme === 'dark'} />
          </div>

          {/* Desktop Nav — Icon only with tooltip */}
          <div className="hidden lg:flex items-center space-x-1 laptop:space-x-2 laptop-l:space-x-3 4k:space-x-4">
            {menuItems.map(({ id, label, Icon }) => {
              const isActive = currentTab === id;
              return (
                <div
                  key={id}
                  className="relative group"
                  onMouseEnter={() => setHoveredItem(id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    onClick={() => handleNavClick(id)}
                    className={`relative flex items-center justify-center w-9 h-9 laptop:w-10 laptop:h-10 4k:w-13 4k:h-13 rounded-sm border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-navy/30 border-navy/50 text-white'
                          : 'bg-navy/8 border-navy/20 text-navy'
                        : theme === 'dark'
                          ? 'border-transparent text-slate-400 hover:bg-slate-800/60 hover:border-slate-700 hover:text-slate-100'
                          : 'border-transparent text-slate-500 hover:bg-slate-100 hover:border-slate-200 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 laptop:w-4 laptop:h-4 4k:w-5 4k:h-5" strokeWidth={isActive ? 2.5 : 1.8} />

                    {/* Active dot */}
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                    )}
                  </button>

                  {/* Tooltip */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2.5 pointer-events-none transition-all duration-200 ease-out ${
                      hoveredItem === id
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-1'
                    }`}
                  >
                    {/* Arrow */}
                    <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
                      theme === 'dark' ? 'bg-slate-800 border-l border-t border-slate-700' : 'bg-white border-l border-t border-slate-200'
                    }`} />

                    {/* Label */}
                    <div className={`relative px-2.5 py-1.5 4k:px-3 4k:py-2 rounded-sm text-[10px] 4k:text-xs font-bold uppercase tracking-widest whitespace-nowrap shadow-lg border ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 text-slate-200'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}>
                      {label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center space-x-3 laptop:space-x-4 4k:space-x-5">
            <button
              onClick={onThemeToggle}
              className={`p-2 laptop:p-2.5 4k:p-3 rounded-sm border transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900 text-gold hover:bg-slate-850'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
              title="Toggle theme mode"
              aria-label="Toggle theme mode"
            >
              {theme === 'dark'
                ? <Sun className="w-3.5 h-3.5 laptop:w-4 laptop:h-4 4k:w-5 4k:h-5" />
                : <Moon className="w-3.5 h-3.5 laptop:w-4 laptop:h-4 4k:w-5 4k:h-5" />}
            </button>

            <button
              onClick={onOpenConsultation}
              className="px-4 laptop:px-5 4k:px-7 py-2 laptop:py-2.5 4k:py-3.5 rounded-sm text-[10px] laptop:text-xs 4k:text-sm font-bold tracking-widest uppercase bg-navy text-white hover:bg-opacity-90 shadow-premium border-b-2 border-gold cursor-pointer transition-all duration-300 flex items-center gap-1 laptop:gap-1.5 4k:gap-2"
            >
              <Calendar className="w-3 h-3 laptop:w-3.5 laptop:h-3.5 4k:w-4 4k:h-4 text-gold" /> Book Free Call
            </button>

            <a
              href="https://dashboard.euroziel.com"
              title="Login"
              aria-label="Login"
              className={`px-3 py-2 rounded-sm text-[10px] laptop:text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-transparent text-gold border border-gold hover:bg-gold/10'
                  : 'bg-gold text-navy border border-gold hover:bg-gold/90'
              }`}
            >
              <LogIn className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2 mobile-m:gap-3">
            <button
              onClick={onThemeToggle}
              className={`p-1.5 mobile-m:p-2 rounded-sm border transition-colors cursor-pointer ${
                theme === 'dark' ? 'border-slate-800 bg-slate-900 text-gold' : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              {theme === 'dark'
                ? <Sun className="w-3.5 h-3.5 mobile-m:w-4 mobile-m:h-4" />
                : <Moon className="w-3.5 h-3.5 mobile-m:w-4 mobile-m:h-4" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 mobile-m:p-2 rounded-sm text-slate-550 hover:text-navy focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen
                ? <X className="w-5 h-5 mobile-m:w-6 mobile-m:h-6" />
                : <Menu className="w-5 h-5 mobile-m:w-6 mobile-m:h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className={`lg:hidden border-t absolute top-16 mobile-m:top-[4.5rem] left-0 right-0 shadow-xl z-50 ${
          theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          <div className="px-3 mobile-m:px-4 mobile-l:px-5 pt-3 mobile-m:pt-4 pb-5 mobile-m:pb-6 space-y-3 mobile-m:space-y-4">
            <div className="flex flex-col space-y-0.5 mobile-m:space-y-1">
              {menuItems.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`w-full text-left py-2.5 mobile-m:py-3 px-3 mobile-m:px-4 rounded-sm text-[10px] mobile-m:text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-3 ${
                    currentTab === id
                      ? 'bg-blue-500/10 text-navy'
                      : theme === 'dark' ? 'text-slate-400 hover:bg-slate-900' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" strokeWidth={currentTab === id ? 2.5 : 1.8} />
                  {label}
                </button>
              ))}
            </div>

            <div className="px-3 mobile-m:px-4 pt-1">
              <button
                onClick={() => { setIsOpen(false); onOpenConsultation(); }}
                className="w-full py-2.5 mobile-m:py-3 rounded-sm font-bold text-[10px] mobile-m:text-xs uppercase tracking-wider text-center bg-navy text-white hover:bg-opacity-90 border-b-2 border-gold flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 mobile-m:w-4 mobile-m:h-4 text-gold" style={{ strokeWidth: 2.5 }} />
                Book Consultation Call
              </button>
            </div>

            <div className="px-3 mobile-m:px-4 pt-1">
              <button
                onClick={() => { setIsOpen(false); window.location.href = 'https://dashboard.euroziel.com'; }}
                className={`w-full py-2.5 mobile-m:py-3 rounded-sm font-bold text-[10px] mobile-m:text-xs uppercase tracking-wider text-center border transition-all flex items-center justify-center gap-2 ${
                  theme === 'dark' ? 'border-slate-700 text-slate-200 bg-transparent hover:bg-slate-800/60' : 'border-slate-200 text-slate-700 bg-transparent hover:bg-slate-50'
                }`}
              >
                <LogIn className="w-4 h-4" />
                Login / Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}