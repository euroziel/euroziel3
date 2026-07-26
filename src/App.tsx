import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThreeDHero from './components/ThreeDHero';
import HomeSection from './components/HomeSection';
import StudySection from './components/StudySection';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';
import ContactModal from './components/ContactModal';
import ContactModal2 from './components/ContactModal2';
import { ChevronUp } from 'lucide-react';
import Particles from './../components/Particles';
import CanvasPlaneCursor from '@/components/CanvasPlaneCursor';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Derive "currentTab" from the URL path so existing components
  // that expect a `currentTab` string keep working unchanged.
  const currentTab = location.pathname === '/' ? 'home' : location.pathname.slice(1);

  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isConsultation2Open, setIsConsultation2Open] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("hasSeenContactModal");

    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsConsultation2Open(true);
        sessionStorage.setItem("hasSeenContactModal", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseModal2 = () => {
    setIsConsultation2Open(false);
  };

  const handleCloseModal1 = () => {
    setIsConsultationOpen(false);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Replaces old setState-based tab switching with real navigation.
  const handleTabChange = (tabId: string) => {
    navigate(tabId === 'home' ? '/' : `/${tabId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ width: '100%', height: '600px', position: 'absolute' }}>
      <Particles
        particleColors={["#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
      />
      <div
        className={`relative z-10 min-h-screen flex flex-col font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-transparent text-slate-100' : 'bg-white text-slate-900'
          }`}
      >
        <Navbar
          currentTab={currentTab}
          onTabChange={handleTabChange}
          theme={theme}
          onThemeToggle={toggleTheme}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        <main className="flex-grow pt-0">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ThreeDHero
                    onOpenConsultation={() => setIsConsultationOpen(true)}
                    onNavigateToTab={handleTabChange}
                    theme={theme}
                  />
                  <HomeSection
                    onOpenConsultation={() => setIsConsultationOpen(true)}
                    onNavigateToTab={handleTabChange}
                    theme={theme}
                  />
                </>
              }
            />
            <Route
              path="/study"
              element={<StudySection onOpenConsultation={() => setIsConsultationOpen(true)} onNavigateToTab={handleTabChange} theme={theme} />}
            />
            <Route
              path="/services"
              element={<ServicesSection onOpenConsultation={() => setIsConsultationOpen(true)} theme={theme} />}
            />
            <Route
              path="/process"
              element={<ProcessSection onOpenConsultation={() => setIsConsultationOpen(true)} theme={theme} />}
            />
            <Route
              path="/about"
              element={<AboutSection onOpenConsultation={() => setIsConsultationOpen(true)} theme={theme} />}
            />
            <Route
              path="/faq"
              element={<FAQSection onOpenConsultation={() => setIsConsultationOpen(true)} theme={theme} />}
            />
          </Routes>
        </main>

        <Footer
          currentTab={currentTab}
          onTabChange={handleTabChange}
          theme={theme}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        <CanvasPlaneCursor />

        <ContactModal isOpen={isConsultationOpen} onClose={handleCloseModal1} theme={theme} />
        <ContactModal2 isOpen={isConsultation2Open} onClose={handleCloseModal2} theme={theme} />

        {showScrollTop && (
          <button
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-sm bg-navy text-white hover:bg-opacity-90 border-b border-gold transition-all shadow-premium active:scale-95 z-30 cursor-pointer"
            title="Scroll back up"
            aria-label="Scroll back up"
          >
            <ChevronUp className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}
      </div>
    </div>
  );
}