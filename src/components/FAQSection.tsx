import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, ChevronDown, BookOpen, GraduationCap, Coins, FileCheck, HelpCircle, Globe, ChevronRight 
} from 'lucide-react';

interface FAQSectionProps {
  onOpenConsultation: () => void;
  theme: 'light' | 'dark';
}

export default function FAQSection({ onOpenConsultation, theme }: FAQSectionProps) {
  const dark = theme === 'dark';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null);

  const categories = [
    "All", "Ausbildung", "Bachelor's", "Master's", "German Language", "GRE & GMAT", "Costs & Finances", "Eligibility", "Visa", "Scholarships", "Accommodation", "After Studies"
  ];

  const faqs = [
    // PART 1 - AUSBILDUNG
    {
      cat: "Ausbildung",
      q: "What is Ausbildung and how is it different from a university degree?",
      a: "Ausbildung is Germany's dual vocational training system where you split your time between a company workplace and a vocational school. Unlike a university degree, it is hands-on, industry-integrated, and you earn a salary from day one. It typically lasts 2 to 3.5 years depending on the field."
    },
    {
      cat: "Ausbildung",
      q: "Can Indian students apply for Ausbildung in Germany?",
      a: "Yes, Indian students can apply for Ausbildung in Germany. You need a recognised school certificate, basic German language skills (usually B1 level minimum), and a training contract from a German company before you can apply for a visa."
    },
    {
      cat: "Ausbildung",
      q: "What German level do I need for Ausbildung?",
      a: "Most Ausbildung programmes require at least B1 German, though many employers prefer B2. Since the training and vocational school are conducted entirely in German, a strong language foundation is essential before you arrive."
    },
    {
      cat: "Ausbildung",
      q: "Do I get paid during Ausbildung?",
      a: "Yes, Ausbildung trainees receive a monthly training allowance (Ausbildungsvergütung) from their employer. This typically ranges from €600 to €1,200 per month depending on the field and employer. It is not a full salary but covers basic living costs."
    },
    {
      cat: "Ausbildung",
      q: "Are there scholarships specifically for Ausbildung students?",
      a: "Scholarship options for Ausbildung are more limited than for university students. However, some state-level programmes and foundations do support vocational training. Remember, your employer also pays you a contractual training allowance from day one."
    },

    // PART 2 - BACHELOR'S
    {
      cat: "Bachelor's",
      q: "Can Indian students apply for bachelor's programmes in Germany?",
      a: "Yes, but it is more competitive than masters. You need your Class 12 certificate, and in most cases, you will need to either complete one or two years of university study in India first, or pass a Studienkolleg (foundation preparatory course) in Germany to bridge the academic structural gap."
    },
    {
      cat: "Bachelor's",
      q: "What is Studienkolleg and do I need it?",
      a: "Studienkolleg is a one-year preparatory course for international students whose home country school certificate is not directly equivalent to the German Abitur. Most Indian students who completed Class 12 need to either complete it or have one to two years of university study in India before applying directly."
    },
    {
      cat: "Bachelor's",
      q: "Is tuition free for bachelor's in Germany?",
      a: "Yes. Public universities in almost all German states (except Baden-Württemberg) charge no tuition fees for bachelors. Even in Baden-Württemberg, the fee is approximately €1,500 per semester for non-EU students, which remains highly affordable globally."
    },

    // PART 3 - MASTER'S
    {
      cat: "Master's",
      q: "What is the minimum CGPA required for master's in Germany?",
      a: "Most German public universities require a minimum CGPA of 6.5 to 7.0 out of 10 (roughly 60 to 65 percent). Top universities like TU Munich or LMU may expect higher. Your profile is evaluated holistically, so work experience, SOP, and projects also carry weight."
    },
    {
      cat: "Master's",
      q: "Do I need GRE for master's in Germany?",
      a: "GRE is not required by most German public universities. However, a handful of highly competitive programmes, particularly in engineering and computer science at top institutions (such as TU Munich), do request or give preference to GRE scores. We help you identify whether your specific targets require it."
    },
    {
      cat: "Master's",
      q: "Can I work while studying a master's in Germany?",
      a: "Yes. International students are permitted to work up to 120 full days or 240 half days per year. Part-time student jobs (Studentenjobs) and working student (Werkstudent) positions in your engineering/IT field are extremely common and help fully cover local living expenses."
    },

    // PART 4 - GERMAN LANGUAGE
    {
      cat: "German Language",
      q: "From which level should I start learning German?",
      a: "If you have zero prior knowledge, start from A1. EuroZiel offers structured coaching from A1 through C1. For university admission, most programmes require at least B2 for German-taught courses. For Ausbildung, B1 to B2 is typically needed."
    },
    {
      cat: "German Language",
      q: "How long does it take to reach B2 from zero?",
      a: "On average, reaching B2 from scratch takes 10 to 14 months with consistent study of 1 to 2 hours per day. With our intensive system batches designed around university timelines, it can be completed faster."
    },
    {
      cat: "German Language",
      q: "Is German language mandatory if I am applying to an English-taught programme?",
      a: "Not for admission. However, basic German (A1 to A2) is extremely helpful for daily life, Anmeldung registration, dealing with local authorities, securing housing WGs, and finding part-time student jobs."
    },

    // PART 5 - GRE / GMAT
    {
      cat: "GRE & GMAT",
      q: "What is a competitive GRE score for German universities?",
      a: "For programmes that do require GRE, a Verbal score of 155+ and a Quant score of 162+ is generally considered competitive. Engineering and CS courses often weight the Quant section more heavily."
    },

    // PART 6 - COSTS & FINANCES
    {
      cat: "Costs & Finances",
      q: "What is the total estimated cost of studying in Germany for one year?",
      a: "As a rough estimate, plan for €10,000 to €12,000 per year for living expenses (rent, food, transport, health insurance, phone). Public university tuition itself is largely free."
    },
    {
      cat: "Costs & Finances",
      q: "What is the blocked account and how much do I need?",
      a: "A blocked account (Sperrkonto) is a German bank account where you deposit a fixed amount as proof of financial means for your visa. From 2025-26, the required amount is approximately €11,904 per year (€992 per month), released back to you in monthly instalments."
    },

    // PART 8 - VISA
    {
      cat: "Visa",
      q: "What documents are needed for a German student visa?",
      a: "Key documents include your university offer letter, APS certificate, blocked account funding confirmation, health insurance proof, valid passport, completed visa application forms, and transcript score sheets. EuroZiel prepares a custom personal checklist for you."
    },
    {
      cat: "Visa",
      q: "How long does German student visa processing take?",
      a: "Processing time at the German Embassy in India typically ranges from 6 to 12 weeks. We recommend applying at least 3 to 4 months before your intended travel date."
    },

    // PART 10 - ACCOMMODATION
    {
      cat: "Accommodation",
      q: "What is a WG and how do I find one?",
      a: "WG stands for Wohngemeinschaft, a shared flat where you rent one room and share the kitchen and living area with other flatmates. Popular platforms are WG-Gesucht.de and Studenten-WG.de. Competition is high in cities like Munich or Frankfurt, but our network helps you build reactive profiles to get replies."
    }
  ];

  // Filtering Logic
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'All' || faq.cat === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-12 md:space-y-16 pb-20 max-w-5xl mx-auto px-4 text-left">
      
      {/* Category banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] font-bold text-navy uppercase tracking-[0.2em] bg-gold/5 border border-gold/30 px-3 py-1 rounded-sm inline-block">
          FAQ DIRECTORY
        </span>
        <h2 className={`text-3xl font-bold tracking-tight font-sans ${dark ? 'text-white' : 'text-slate-900'}`}>
          Frequently Asked Questions
        </h2>
        <p className={`text-xs md:text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          Get authentic, ground-level answers regarding German admissions, blocked accounts, visas, and language targets.
        </p>
      </div>

      {/* SEARCH AND FILTERS ROW */}
      <div className="space-y-6">
        {/* Search Input */}
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. Ausbildung, APS, €11,904, WG)..."
            className={`w-full pl-11 pr-4 py-3 rounded-sm border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-navy ${
              dark
                ? 'border-slate-800 bg-slate-950 text-slate-105 focus:border-navy'
                : 'border-slate-205 bg-slate-50 text-slate-900 focus:border-navy'
            }`}
          />
        </div>

        {/* Categories Tab Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat, idx) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedIndex(null);
                }}
                className={`px-3 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-widest transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-navy text-white border-navy border-b-2 border-b-gold shadow-premium'
                    : dark
                    ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-100'
                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ ITEMS ACCORDION WRAPPER */}
      <div className={`border rounded-sm overflow-hidden shadow-premium ${
        dark ? 'border-slate-900 bg-slate-950' : 'border-slate-200/50 bg-white'
      }`}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => {
            const isExpanded = expandedIndex === `${faq.cat}-${index}`;
            return (
              <div 
                key={index}
                className={`border-b last:border-b-0 transition-colors ${
                  dark ? 'border-slate-900' : 'border-slate-200/40'
                } ${
                  isExpanded ? (dark ? 'bg-slate-900/10' : 'bg-slate-50/20') : ''
                }`}
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : `${faq.cat}-${index}`)}
                  className={`w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer transition-colors ${
                    dark ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50/50'
                  }`}
                >
                  <div className="space-y-1 pr-4">
                    <span className="text-[9px] font-bold text-gold uppercase tracking-widest font-mono">
                      Category: {faq.cat}
                    </span>
                    <h4 className={`font-bold text-sm md:text-base ${dark ? 'text-slate-100' : 'text-slate-900'}`}>
                      {faq.q}
                    </h4>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-6 pb-6 pt-1 text-xs md:text-sm leading-relaxed font-sans border-l-2 border-gold ${
                        dark ? 'text-slate-350' : 'text-slate-500'
                      }`}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center text-slate-400 text-sm font-sans space-y-2">
            <div>No matching FAQs found for your search query.</div>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className={`font-bold underline text-xs cursor-pointer ${dark ? 'text-gold' : 'text-navy'}`}
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </div>

      {/* STILL HAVE QUESTIONS BOTTOM BLOCK */}
      <div className={`p-8 rounded-sm border text-center shadow-premium border-b-4 border-b-gold space-y-4 ${
        dark ? 'border-gold/20 bg-slate-950' : 'border-gold/20 bg-white'
      }`}>
        <h4 className={`font-bold text-base ${dark ? 'text-white' : 'text-slate-900'}`}>Still searching for matching parameters?</h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Every educational background behaves uniquely. Let Yuvasri and Sarathkumar evaluate your CGPA and language status on a raw personal basis.
        </p>
        <div className="pt-2">
          <button
            onClick={onOpenConsultation}
            className="px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest bg-navy text-white hover:bg-opacity-95 border-b-2 border-gold shadow-premium cursor-pointer"
          >
            Start Detailed Profile Audit
          </button>
        </div>
      </div>

    </div>
  );
}