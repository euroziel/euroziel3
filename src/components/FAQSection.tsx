import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, ChevronDown, BookOpen, GraduationCap, Coins, FileCheck, HelpCircle, Globe, ChevronRight 
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

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
      a: "Ausbildung is Germany's dual vocational training system where you split your time between a company workplace and a vocational school. Unlike a university degree, it is hands on, industry integrated, and you earn a salary from day one. It typically lasts 2 to 3.5 years depending on the field."
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
      q: "What fields are available for Ausbildung? ",
      a: "Popular fields include IT and software development, healthcare and nursing, mechatronics, electrical engineering, hotel and hospitality, logistics, and business administration. IT Ausbildung is especially popular among Indian students."
    },
    {
      cat: "Ausbildung",
      q: "Is APS required for Ausbildung applicants?",
      a: "APS (Academic Evaluation Centre) certificate is typically required for Indian applicants going to Germany for any educational purpose, including Ausbildung. EuroZiel guides you through the entire APS process."
    },
    {
      cat: "Ausbildung",
      q: "Can I switch from Ausbildung to a university degree later?",
      a: "Yes. After completing Ausbildung, you can apply to a Fachhochschule (University of Applied Sciences) or in some cases a full university, especially if your Ausbildung results were strong. It is a recognised pathway."
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
    {
      cat: "Bachelor's",
      q: "What are the language requirements for bachelor's programmes?",
      a: "German-taught programmes require TestDaF, DSH, or Goethe C1 certificate. English-taught bachelor's programmes (which are fewer) require IELTS 6.5 or TOEFL equivalent."
    },
    {
      cat: "Bachelor's",
      q: "Which are the best German public universities for bachelor's degrees?",
      a: "Germany has many excellent public universities including LMU Munich, TU Munich, Heidelberg University, Freie Universität Berlin, RWTH Aachen, and University of Hamburg, among others. The right choice depends entirely on your field of study."
    },
    {
      cat: "Bachelor's",
      q: "What documents do I need to apply for a bachelor's in Germany?",
      a: "You typically need Class 12 marksheets, university transcripts if applicable, APS certificate, language test scores, letter of motivation, CV, and passport. EuroZiel helps you prepare and review every document."
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
    {
      cat: "Master's",
      q: "How long does a master's programme take in Germany?",
      a: "Most master's programmes in Germany are two years (four semesters). Some specialised programmes may be 1.5 years. They are research-oriented and often require a thesis."
    },
    {
      cat: "Master's",
      q: "What is the application deadline for master's in Germany?",
      a: "Winter semester (starting October) deadlines are typically between May and July. Summer semester (starting April) deadlines fall between November and January. Some universities use rolling admissions so applying early always helps."
    },
    {
      cat: "Master's",
      q: "How many universities should I apply to?",
      a: "EuroZiel recommends applying to 7 to 10 universities across three tiers such as ambitious, realistic, and safe to maximise your chances of receiving at least one strong offer letter."
    },
    {
      cat: "Master's",
      q: "What is uni-assist and do I need it?",
      a: "Uni-assist is a central application portal used by many German universities for international student applications. Some universities have their own direct application portals. EuroZiel manages both types on your behalf."
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
    {
      cat: "German Language",
      q: "Which German language exam is accepted by German universities?",
      a: "The most widely accepted exams are TestDaF (Test Deutsch als Fremdsprache), DSH (Deutsche Sprachprüfung für den Hochschulzugang), and Goethe-Institut certificates (B2 or C1). TestDaF is the most popular among international applicants as it can be taken in India."
    },
    {
      cat: "German Language",
      q: "How much does the German language exam cost?",
      a: "TestDaF costs approximately ₹12,000 to ₹15,000 in India. Goethe-Institut exam fees vary by level from approximately ₹10,000 for A1 to ₹15,000 for C1. These exam fees are not included in EuroZiel's package and are paid directly to the exam body."
    },
    {
      cat: "German Language",
      q: "Can I learn German online or do I need to attend in person? ",
      a: "Both modes work. EuroZiel offers online batches with live interactive sessions, making it convenient regardless of your city. Consistent practice, speaking sessions, and mock tests are the keys to progress."
    },

    // PART 5 - GRE / GMAT
    {
      cat: "GRE & GMAT",
      q: "What is a competitive GRE score for German universities?",
      a: "For programmes that do require GRE, a Verbal score of 155+ and a Quant score of 162+ is generally considered competitive. Engineering and CS courses often weight the Quant section more heavily."
    },
    {
      cat: "GRE & GMAT",
      q: "Which German universities or programmes require GRE?",
      a: "A small number of highly competitive programmes in engineering, computer science, and business at institutions like TU Munich, RWTH Aachen, and certain private universities request GRE or GMAT. EuroZiel will identify upfront whether your shortlisted programmes require it so you are not caught off guard."
    },
    {
      cat: "GRE & GMAT",
      q: "Is GMAT required for MBA programmes in Germany?",
      a: "Yes. Most German MBA programmes, particularly at business schools, require GMAT scores in the range of 600 to 680+. Some accept GRE as an alternative."
    },
    {
      cat: "GRE & GMAT",
      q: "How long should I prepare for GRE?",
      a: "A focused 3-to-4-month preparation period is typically sufficient for most students. EuroZiel's subsidised GRE coaching covers Verbal, Quant, and Analytical Writing with full-length mock tests and personalised feedback."
    },
    {
      cat: "GRE & GMAT",
      q: "How much does GRE cost?",
      a: "The GRE exam registration fee is approximately $220 (around ₹18,000). This exam fee is not included in EuroZiel's package and is paid directly to ETS."
    },

    // PART 6 - COSTS & FINANCES
    {
      cat: "Costs & Finances",
      q: "What is the total estimated cost of studying in Germany for one year?",
      a: "As a rough estimate, plan for €10,000 to €12,000 per year for living expenses (rent, food, transport, health insurance, phone). Public university tuition itself is largely free. Always keep a buffer of €2,000 to €3,000 for unexpected costs."
    },
    {
      cat: "Costs & Finances",
      q: "What is the blocked account and how much do I need?",
      a: "A blocked account (Sperrkonto) is a German bank account where you deposit a fixed amount as proof of financial means for your visa. From 2025-26, the required amount is approximately €11,904 per year (€992 per month), released in monthly instalments once you are in Germany."
    },
    {
      cat: "Costs & Finances",
      q: "Which banks offer blocked accounts for Indian students?",
      a: "The most popular options are Expatrio and Fintiba, both of which are online and designed specifically for international students. EuroZiel assists you in opening your blocked account with either provider."
    },
    {
      cat: "Costs & Finances",
      q: "Can I get an education loan for studying in Germany?",
      a: "Yes. Major Indian banks including SBI, Axis Bank, and HDFC, Credila offer education loans for Germany. Loan amounts, interest rates, and collateral requirements vary. EuroZiel connects you with these lenders and guides you through the process."
    },
    {
      cat: "Costs & Finances",
      q: "What is the semester contribution fee?",
      a: "Almost all German public universities charge a semester contribution (Semesterbeitrag) of approximately €200 to €400 per semester. This covers your student union fee, public transport pass for the semester, and administrative costs. It is separate from tuition."
    },

    // PART 7 - Eligibility
    {
      cat: "Eligibility",
      q: "What is the minimum academic requirement to apply for master's in Germany?",
      a: "You need a recognised bachelor's degree in a relevant field, typically with a minimum of 60 to 65 percent (or 6.5 CGPA out of 10). The degree must be from a recognised institution. Some competitive programmes may expect higher."
    },
    {
      cat: "Eligibility",
      q: "Does work experience matter for German university applications?",
      a: "For master's programmes, relevant work experience can significantly strengthen your application especially in the Statement of Purpose. Some management programmes require 1 to 2 years of professional experience."
    },
    {
      cat: "Eligibility",
      q: "My CGPA is below 6.5, can I still apply?",
      a: "It is worth exploring. Some universities and programmes have flexible criteria, and a strong SOP, relevant projects, or work experience can compensate to an extent. EuroZiel evaluates your full profile and identifies universities where you have a realistic chance."
    },
    {
      cat: "Eligibility",
      q: "Do I need to get my degree recognised in Germany?",
      a: "Your degree is evaluated by the German university or via uni-assist during the application process. APS verification is required for Indian applicants and is the first step EuroZiel helps you complete."
    },
    {
      cat: "Eligibility",
      q: "Is age a factor for German university admissions?",
      a: "No. German public universities do not have an upper age limit for international applicants. Career changers and mature students are equally welcome."
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
    {
      cat: "Visa",
      q: "What type of visa do I need to study in Germany?",
      a: "You need a National Visa (Type D) for the purpose of studying. This is different from a Schengen tourist visa. It is applied for at the German Embassy or VFS Global centre in India before you travel."
    },
    {
      cat: "Visa",
      q: "Is there a visa interview at the German Embassy?",
      a: "Yes. The German Embassy in India generally requires an in-person appointment. The interview is relatively straightforward, you will be asked about your study plans, financial means, and language ability. EuroZiel prepares you thoroughly for this."
    },
    {

      cat: "Visa",
      q: "Can I convert my student visa into a work permit after graduation?",
      a: "Yes. Germany has a very favourable post-study work policy. After completing your degree, you are entitled to an 18-month job-seeker visa to find work in Germany. Once employed in a role matching your qualification, you can apply for a work permit."
    },
    {
      cat: "Visa",
      q: "What is Anmeldung and do I need to do it after arrival?",
      a: "Anmeldung is the mandatory city registration you must complete within two weeks of arriving in Germany. You register your address at the local registration office (Einwohnermeldeamt or Bürgeramt). It is a legal requirement and needed for almost everything like bank account, SIM card, and tax ID. EuroZiel's on-arrival support walks you through this."
    },

    // PART 9 - SCHOLARSHIPS
    {
      cat: "Scholarships",
      q: "What scholarships are available for Indian students in Germany?",
      a: "The main scholarships include DAAD (German Academic Exchange Service) scholarships, Deutschlandstipendium, Heinrich Böll Foundation, Friedrich Ebert Foundation, Konrad-Adenauer-Stiftung, and university-specific merit scholarships. DAAD is the largest and most well-known."
    },
    {
      cat: "Scholarships",
      q: "How much does DAAD scholarship pay?",
      a: "DAAD scholarships for master's students typically cover a monthly stipend of approximately €850 to €1,200, plus health insurance allowance, travel allowance, and sometimes study and research allowances. The exact amount varies by programme."
    },
    {
      cat: "Scholarships",
      q: "When should I apply for DAAD scholarship?",
      a: "DAAD application deadlines are typically between August and October for programmes starting the following year. You should start your application at least 8 to 10 months before your intended start date. EuroZiel helps you plan your scholarship timeline alongside your university applications."
    },
    {
      cat: "Scholarships",
      q: "Do I need to be admitted to a university before applying for DAAD?",
      a: "For some DAAD programmes, a university admission letter is required. For others, you can apply simultaneously. EuroZiel maps out the correct sequence for your specific situation."
    },
    {
      cat: "Scholarships",
      q: "Are there scholarships specifically for Ausbildung students?",
      a: "Scholarship options for Ausbildung are more limited than for university students. However, some state-level programmes and foundations do support vocational training. Your employer also pays a training allowance. EuroZiel will identify any applicable funding for your situation."
    },
    {
      cat: "Scholarships",
      q: "What is Deutschlandstipendium?",
      a: "Deutschlandstipendium is a merit-based scholarship offered directly by German universities, funded half by the government and half by private sponsors. It pays €300 per month and does not affect other funding. You apply through your university once enrolled."
    },

    // PART 10 - ACCOMMODATION
    {
      cat: "Accommodation",
      q: "What are my accommodation options as an international student in Germany?",
      a: "The main options are university dormitories (Studentenwohnheim), WG shared flats, private apartments, and temporary accommodation like hostels when you first arrive. Each has different costs, availability, and lifestyle implications."
    },
    {
      cat: "Accommodation",
      q: "What is a WG and how do I find one?",
      a: "WG stands for Wohngemeinschaft, a shared flat where you rent one room and share the kitchen, bathroom, and living areas with other tenants. Popular platforms to find WGs include WG-Gesucht.de, Studenten-WG.de, and Facebook groups for students in your city. Competition is high in cities like Munich and Frankfurt."
    },
    {
      cat: "Accommodation",
      q: "How much does accommodation cost in Germany?",
      a: "A university dorm room costs approximately €200 to €350 per month. A WG room in a medium-sized city costs €350 to €550. In Munich or Frankfurt, expect to pay €600 to €900 or more for a WG room. EuroZiel's peer mentors give you real and current information for your specific city."
    },
    {
      cat: "Accommodation",
      q: "How early should I start looking for accommodation?",
      a: "Start as soon as you have your admission letter, ideally 4 to 6 months before arrival. University dorm waiting lists can be very long. Apply to the Studentenwerk (student services organisation) of your university immediately after admission."
    },
    {
      cat: "Accommodation",
      q: "Can I stay in temporary accommodation when I first arrive?",
      a: "Yes. Many students stay in a hostel, Airbnb, or short-term rental for the first 2 to 4 weeks while flat-hunting in person. EuroZiel's on-arrival support helps you navigate this transition smoothly."
    },
    {
      cat: "Accommodation",
      q: "Is a rental contract required for Anmeldung?",
      a: "Yes. You need a signed rental agreement or a Wohnungsgeberbestätigung (landlord confirmation letter) to complete your Anmeldung. Make sure your landlord provides this document."
    },

    // PART 11 - AFTER STARTING STUDIES
    {
      cat: "After Studies",
      q: "What should I do in the first week after arriving in Germany?",
      a: "Your first week checklist: complete Anmeldung (city registration), enrol at your university, open a German bank account (Sparkasse and DB are popular), get a local SIM card, activate your student ID and semester transport pass, and connect with your university's international student office."
    },
    {
      cat: "After Studies",
      q: "How does the German university system work, is it like India?",
      a: "It is quite different. German universities expect a high level of self-organisation and independent learning. There are fewer contact hours, less hand-holding, and exams often carry heavy weight. Attendance rules vary by programme. You are expected to manage your own schedule."
    },
    {
      cat: "After Studies",
      q: "What is ECTS and how does it work?",
      a: "ECTS (European Credit Transfer and Accumulation System) is the credit system used across European universities. A typical master's requires 120 ECTS over two years. Each module carries a specific number of ECTS credits based on workload."
    },
    {
      cat: "After Studies",
      q: "How do I open a bank account in Germany as a student?",
      a: "Popular options for students are Deutsche Bank, Sparkasse (local savings banks), DKB (free online account), and N26. You will need your passport, Anmeldung confirmation, and enrolment certificate. Most accounts can be opened online or in-branch."
    },
    {
      cat: "After Studies",
      q: "Can I bring my family to Germany while studying?",
      a: "Yes, under family reunification visa rules, spouses can join you in Germany. However, they must demonstrate financial means, language ability may be required, and the process takes time. EuroZiel can connect you with the right resources for this."
    },
    {
      cat: "After Studies",
      q: "What happens if I fail an exam in Germany?",
      a: "Most German universities allow you to retake failed exams, usually up to two or three times depending on the module and university. Failing beyond the permitted attempts can result in permanent deregistration from that programme. Take academic support services seriously from the start."
    },
    {
      cat: "After Studies",
      q: "Is it easy to find part-time work as a student?",
      a: "Yes, particularly in cities with large student populations. Common roles include student assistants (HiWi jobs) at your university, retail, hospitality, and Werkstudent positions in your field. University job boards and LinkedIn are good starting points. You can work up to 120 full days per year on a student visa."
    },
    {
      cat: "After Studies",
      q: "What support does EuroZiel provide after I start studying?",
      a: "EuroZiel stays connected with you even after you land. Our Germany-based peer network is always reachable for practical advice from navigating bureaucracy and finding part-time work to understanding university systems and exploring career options."
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
    <div className="space-y-12 md:space-y-16 pb-20 max-w-5xl mx-auto px-4 pt-10 text-left">
      
      {/* Category banner */}
      <ScrollReveal variant="fadeDown">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        {/* <span className="text-[10px] font-bold text-navy uppercase tracking-[0.2em] bg-gold/5 border border-gold/30 px-3 py-1 rounded-sm inline-block">
          FAQ DIRECTORY
        </span> */}
        <h2 className={`text-3xl font-bold tracking-tight font-sans ${dark ? 'text-white' : 'text-slate-900'}`}>
          Frequently Asked Questions
        </h2>
        <p className={`text-xs md:text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          Get authentic, ground-level answers regarding German admissions, blocked accounts, visas, and language targets.
        </p>
      </div>
      </ScrollReveal>

      {/* SEARCH AND FILTERS ROW */}
      <div className="space-y-6">
        {/* Search Input */}
        <div className="relative max-w-lg mx-auto">
          <Search className="mybtn absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. Ausbildung, APS, €11,904, WG)..."
            className={`mybtn w-full pl-11 pr-4 py-3 rounded-sm border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-navy ${
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
                className={`px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer border ${
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
      <ScrollReveal variant="glideUp">
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
                    <span className="text-[13px] font-bold text-gold uppercase tracking-widest font-sans">
                      Category: {faq.cat}
                    </span>
                    <h4 className={`text-sm md:text-base ${dark ? 'text-slate-100' : 'text-slate-900'}`}>
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
      </ScrollReveal>

      {/* STILL HAVE QUESTIONS BOTTOM BLOCK */}
      <ScrollReveal variant="elastic">
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
            className="mybtn px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest bg-navy text-white hover:bg-opacity-95 border-b-2 border-gold shadow-premium cursor-pointer"
          >
            Start Detailed Profile Audit
          </button>
        </div>
      </div>
      </ScrollReveal>

    </div>
  );
}