import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import { Menu, X, Calendar, Home, BookOpen, Briefcase, GitBranch, Users, HelpCircle, LogIn, LogOut } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onOpenConsultation: () => void;
  onOpenLogin?: () => void;
}

export default function Navbar({ currentTab, onTabChange, theme, onThemeToggle, onOpenConsultation, onOpenLogin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const [currentUser, setCurrentUser] = useState<any>(() => {
    const saved = localStorage.getItem('euroziel_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkUserStatus = () => {

      const saved = localStorage.getItem('euroziel_current_user');
      setCurrentUser(saved ? JSON.parse(saved) : null);
    };

    window.addEventListener('storage', checkUserStatus);
    window.addEventListener('euroziel_payment_updated', checkUserStatus);
    return () => {
      window.removeEventListener('storage', checkUserStatus);
      window.removeEventListener('euroziel_payment_updated', checkUserStatus);
    };
  }, []);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowNavbar(false);
        setIsOpen(false);
      } else if (currentScrollY < lastScrollY.current) {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => window.removeEventListener('scroll', controlNavbar);
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout? Your services will be locked until you log back in.');
    if (!confirmed) return;
    localStorage.removeItem('euroziel_current_user');
    setCurrentUser(null);
    window.dispatchEvent(new Event('euroziel_payment_updated'));
  };

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
    <nav
      style={{
        zIndex: 1000,
        transform: showNavbar ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-150%)',
        transition: 'transform 0.35s ease-in-out',
      }}
      className={`fixed top-3 mobile-m:top-4 left-1/2 border rounded-full backdrop-blur-md w-[calc(100%-0.75rem)] mobile-m:w-[calc(100%-1rem)] tablet:w-full max-w-[calc(100%-0.75rem)] laptop:max-w-[95vw] laptop-l:max-w-[80vw] ${
        theme === 'dark'
          ? 'bg-transparent border-slate-800 text-slate-100'
          : 'bg-transparent border-slate-200 text-slate-900'
      }`}
      id="navbar"
    >
      <div className="px-2 mobile-m:px-3 tablet:px-4 laptop:px-0">
        <div className="flex items-center justify-center gap-1 h-12 mobile-m:h-14 tablet:h-14 laptop:h-16">

          {/* Logo */}
          <div className={`flex-shrink-0 cursor-pointer pr-1 mobile-m:pr-2 mr-0.5 mobile-m:mr-1 laptop:w-1/5 ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`} onClick={() => handleNavClick('home')}>
            <Logo isDark={theme === 'dark'} />
          </div>

          <div className={`hidden laptop:block h-6 w-px mx-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`} />

          {/* Desktop Nav */}
          <div className="hidden laptop:flex items-center gap-0.5">
            {menuItems.map(({ id, label, Icon }) => {
              const isActive = currentTab === id;
              return (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`relative flex items-center gap-1.5 px-2.5 laptop:px-3 py-1.5 rounded-full text-[10px] mobile-m:text-[11px] laptop:text-[9px] laptop-l:text-[12px] font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-navy/40 text-white'
                        : 'bg-navy/10 text-navy'
                      : theme === 'dark'
                        ? 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 laptop:hidden" strokeWidth={isActive ? 2.5 : 1.8} />
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className={`hidden laptop:block h-6 w-px mx-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`} />

          {/* Desktop Controls */}
          <div className="hidden laptop:flex items-center gap-2">
            {currentUser ? (
              <a
                href="https://dashboard.euroziel.com"
                className="flex items-center gap-1.5 px-3 mobile-m:px-4 py-1.5 rounded-full text-[10px] mobile-m:text-[11px] laptop:text-[9px] font-bold tracking-widest uppercase bg-navy text-white hover:bg-opacity-90 border-b-2 border-gold cursor-pointer transition-all duration-300 whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5 text-gold shrink-0" />
                Go to Dashboard
              </a>
            ) : (
              <button
                onClick={onOpenConsultation}
                className="flex items-center gap-1.5 px-3 mobile-m:px-4 py-1.5 rounded-full text-[10px] mobile-m:text-[11px] laptop:text-[9px] font-bold tracking-widest uppercase bg-navy text-white hover:bg-opacity-90 border-b-2 border-gold cursor-pointer transition-all duration-300 whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
                Book Free Call
              </button>
            )}

            {/* Dynamic Circular Login / Logout Icon Button */}
            {currentUser ? (
              <button
                onClick={handleLogout}
                title={`Logout (${currentUser.name || currentUser.email})`}
                aria-label="Logout"
                className={`flex items-center justify-center p-2 rounded-full border transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'border-red-500/50 text-red-400 bg-red-500/10 hover:bg-red-500/20'
                    : 'bg-red-50 text-red-600 border-red-300 hover:bg-red-100'
                }`}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                title="Login to Account"
                aria-label="Login"
                className={`flex items-center justify-center p-2 rounded-full border transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'border-gold text-gold hover:bg-gold/10'
                    : 'bg-gold text-navy border-gold hover:bg-gold/90'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex laptop:hidden items-center gap-1.5 mobile-m:gap-2 ml-auto">
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="p-1.5 rounded-full border border-gold bg-gold/10 text-gold cursor-pointer"
                title="Login"
              >
                <LogIn className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-full text-slate-500 hover:text-navy focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-4.5 h-4.5 mobile-m:w-5 mobile-m:h-5" /> : <Menu className="w-4.5 h-4.5 mobile-m:w-5 mobile-m:h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className={`laptop:hidden border-t absolute top-[3.25rem] mobile-m:top-14 left-0 right-0 shadow-xl z-50 rounded-b-2xl overflow-hidden ${
          theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          <div className="px-3 mobile-m:px-4 pt-3 pb-5 space-y-3">
            <div className="flex flex-col space-y-0.5">
              {menuItems.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`w-full text-left py-2.5 px-3 rounded-xl text-[10px] mobile-m:text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-3 ${
                    currentTab === id
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
              {currentUser ? (
                <a
                  href="https://dashboard.euroziel.com"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 rounded-xl font-bold text-[10px] mobile-m:text-[11px] laptop:text-[9px] uppercase tracking-wider text-center bg-navy text-white hover:bg-opacity-90 border-b-2 border-gold flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-gold" />
                  Go to Dashboard
                </a>
              ) : (
                <button
                  onClick={() => { setIsOpen(false); onOpenConsultation(); }}
                  className="w-full py-2.5 rounded-xl font-bold text-[10px] mobile-m:text-[11px] laptop:text-[9px] uppercase tracking-wider text-center bg-navy text-white hover:bg-opacity-90 border-b-2 border-gold flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-gold" style={{ strokeWidth: 2.5 }} />
                  Book Consultation Call
                </button>
              )}
            </div>

            <div className="pt-1">
              {currentUser ? (
                <button
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="w-full py-2.5 rounded-xl font-bold text-[10px] mobile-m:text-[11px] uppercase tracking-wider text-center border border-red-500/40 text-red-400 bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout ({currentUser.name || 'User'})
                </button>
              ) : (
                <button
                  onClick={() => { setIsOpen(false); if (onOpenLogin) onOpenLogin(); }}
                  className={`w-full py-2.5 rounded-xl font-bold text-[10px] mobile-m:text-[11px] laptop:text-[9px] uppercase tracking-wider text-center border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    theme === 'dark' ? 'border-slate-700 text-slate-200 hover:bg-slate-800/60' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <LogIn className="w-4 h-4 text-gold" />
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}