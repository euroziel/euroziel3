import React, { useState, useEffect } from 'react';
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
import { Calendar, CheckCircle2, ChevronUp } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync dark class on document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Track scroll position for backing up
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#060814] text-slate-100' : 'bg-white text-slate-900'
    }`}>
      
      {/* Sticky Premium Header navigation with logo trigger */}
      <Navbar 
        currentTab={currentTab} 
        onTabChange={handleTabChange} 
        theme={theme} 
        onThemeToggle={toggleTheme}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Main workspace */}
      <main className="flex-grow pt-20">
        
        {/* Dynamic section rendering according to state */}
        {currentTab === 'home' && (
          <>
            {/* Immersive 3D Parallax Mouse Tracker Section */}
            <ThreeDHero 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
              onNavigateToTab={handleTabChange} 
            />
            {/* Core Home Sections (Why EuroZiel, Timeline Slider, Testimonials) */}
            <HomeSection 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
              onNavigateToTab={handleTabChange} 
              theme={theme}
            />
          </>
        )}

        {currentTab === 'study' && (
          <div className="py-8">
            <StudySection 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
              theme={theme}
            />
          </div>
        )}

        {currentTab === 'services' && (
          <div className="py-8">
            <ServicesSection 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
              theme={theme}
            />
          </div>
        )}

        {currentTab === 'process' && (
          <div className="py-8">
            <ProcessSection 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
              theme={theme}
            />
          </div>
        )}

        {currentTab === 'about' && (
          <div className="py-8">
            <AboutSection 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
              theme={theme}
            />
          </div>
        )}

        {currentTab === 'faq' && (
          <div className="py-8">
            <FAQSection 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
              theme={theme}
            />
          </div>
        )}

      </main>

      {/* Corporate compliant Foot note */}
      <Footer 
        currentTab={currentTab} 
        onTabChange={handleTabChange} 
        theme={theme} 
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Contact modal popup */}
      <ContactModal 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)} 
        theme={theme}
      />

      {/* Scroll to top floating button */}
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
  );
}
