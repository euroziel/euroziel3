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

  const menuItems = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'study', label: 'Study in Germany', Icon: BookOpen },
    { id: 'services', label: 'Services', Icon: Briefcase },
    { id: 'process', label: 'Process & Timeline', Icon: GitBranch },
    { id: 'about', label: 'About & Founders', Icon: Users },
    { id: 'faq', label: 'FAQs', Icon: HelpCircle },
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 border transition-all rounded-full duration-300 backdrop-blur-md w-max ${theme === 'dark'
        ? 'bg-transparent border-slate-800 text-slate-100'
        : 'bg-transparent border-slate-200 text-slate-900'
      }`}>
      <div className="px-3 laptop:px-4">
        <div className="flex items-center gap-1 h-14 laptop:h-16">

          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer pr-2 mr-1 ${
            theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
          }" onClick={() => handleNavClick('home')}>
            <Logo isDark={theme === 'dark'} />
          </div>

          <div className={`hidden lg:block h-6 w-px mx-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`} />

          {/* Desktop Nav — icon + label */}
          <div className="hidden lg:flex items-center gap-0.5">
            {menuItems.map(({ id, label, Icon }) => {
              const isActive = currentTab === id;
              return (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${isActive
                      ? theme === 'dark'
                        ? 'bg-navy/40 text-white'
                        : 'bg-navy/10 text-navy'
                      : theme === 'dark'
                        ? 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={isActive ? 2.5 : 1.8} />
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className={`hidden lg:block h-6 w-px mx-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`} />

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center gap-2">
            {/* <button
              onClick={onThemeToggle}
              className={`p-2 rounded-full border transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                theme === 'dark'
                  ? 'border-slate-700 bg-slate-900 text-gold hover:bg-slate-800'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
              title="Toggle theme mode"
              aria-label="Toggle theme mode"
            >
              {theme === 'dark'
                ? <Sun className="w-3.5 h-3.5" />
                : <Moon className="w-3.5 h-3.5" />}
            </button> */}

            <button
              onClick={onOpenConsultation}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase bg-navy text-white hover:bg-opacity-90 border-b-2 border-gold cursor-pointer transition-all duration-300 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
              Book Free Call
            </button>

            <a
              href="https://dashboard.euroziel.com"
              title="Login"
              aria-label="Login"
              className={`flex items-center justify-center p-2 rounded-full border transition-all ${theme === 'dark'
                  ? 'border-gold text-gold hover:bg-gold/10'
                  : 'bg-gold text-navy border-gold hover:bg-gold/90'
                }`}
            >
              <LogIn className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2 ml-2">
            <button
              onClick={onThemeToggle}
              className={`p-1.5 rounded-full border transition-colors cursor-pointer ${theme === 'dark' ? 'border-slate-700 bg-slate-900 text-gold' : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
            >
              {theme === 'dark'
                ? <Sun className="w-3.5 h-3.5" />
                : <Moon className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-full text-slate-500 hover:text-navy focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className={`lg:hidden border-t absolute top-14 left-0 right-0 shadow-xl z-50 rounded-b-2xl overflow-hidden ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100'
          }`}>
          <div className="px-4 pt-3 pb-5 space-y-3">
            <div className="flex flex-col space-y-0.5">
              {menuItems.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`w-full text-left py-2.5 px-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-3 ${currentTab === id
                      ? 'bg-navy/10 text-navy'
                      : theme === 'dark' ? 'text-slate-400 hover:bg-slate-900' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  <Icon className="w-4 h-4 shrink-0" strokeWidth={currentTab === id ? 2.5 : 1.8} />
                  {label}
                </button>
              ))}
            </div>

            <div className="pt-1">
              <button
                onClick={() => { setIsOpen(false); onOpenConsultation(); }}
                className="w-full py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-wider text-center bg-navy text-white hover:bg-opacity-90 border-b-2 border-gold flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-gold" style={{ strokeWidth: 2.5 }} />
                Book Consultation Call
              </button>
            </div>

            <div className="pt-1">
              <button
                onClick={() => { setIsOpen(false); window.location.href = 'https://dashboard.euroziel.com'; }}
                className={`w-full py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-wider text-center border transition-all flex items-center justify-center gap-2 ${theme === 'dark' ? 'border-slate-700 text-slate-200 hover:bg-slate-800/60' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
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