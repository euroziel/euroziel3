import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Laptop, FileCode, Landmark, ShieldCheck, HelpCircle, ArrowRight, ClipboardCheck, Scroll, FileCheck, Award, GraduationCap, ChevronDown, CheckCircle 
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenConsultation: () => void;
  theme: 'light' | 'dark';
}

export default function ServicesSection({ onOpenConsultation, theme }: ServicesSectionProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const mainServices = [
    {
      title: "Ausbildung (Vocational Training)",
      tag: "Dual System Trainee",
      desc: "Germany's dual vocational training system where you split your time between a real company and a vocational school. You are not an intern—you are a registered trainee with a contractual monthly salary between €600 and €1,200. Run by leaders like Bosch, BMW, and Siemens.",
      rules: "Requires solid German language skills (B1 to B2 level target). We assist in school mapping and securing local training contracts."
    },
    {
      title: "Bachelor's Programmes",
      tag: "Undergraduate Entry",
      desc: "Applying as an Indian student requires specific routing, as Class 12 certificates alone are usually insufficient for direct university entry. Depending on your stream and score, we analyze whether you need Studienkolleg (foundation) or Indian university bridging first.",
      rules: "Assists in finding world-class tuition-free English or German taught pathways with clear upfront route advice."
    },
    {
      title: "Master's Programmes",
      tag: "Strategic Post-Graduation",
      desc: "Where the majority of Indian students fail or succeed. Common mistakes include targeting wrong university tiers for CGPA, templated SOPs, late APS applications, or wrong portal submission. We map your specific profile and shortlist universities across 3 tiers (Ambitious, Realistic, Safe).",
      rules: "100% customized profiles. We build real, compelling academic documents."
    }
  ];

  const blockSteps = [
    {
      id: "01",
      title: "Profile Verification",
      short: "CGPA, backlogs, gaps, goals",
      full: "Before we talk universities, we talk about you. Your CGPA, your backlog history if any, your gap year if there is one, your actual dream, and most importantly which stream matches your long-term roadmap. We have seen students with 6.2 CGPA get into TU Munich and students with 8.5 struggle because their profile was pointed in the wrong direction. No sugarcoating, no false promises."
    },
    {
      id: "02",
      title: "University & Course Selection",
      short: "TU Munich & beyond matching",
      full: "Choosing a university in Germany is not about picking the most famous name. We match you to universities where your CGPA is competitive and where Indian students have succeeded. We shortlist across three tiers: ambitious, realistic, and safe, so you always have a strong option waiting."
    },
    {
      id: "03",
      title: "APS Application",
      short: "Academic Evaluation Centre verification",
      full: "The Academic Evaluation Centre verifies the authenticity of every academic document you have. APS can take anywhere from 6 to 12 weeks. We make sure you begin APS at the right time so the certificate is in your hand long before your first university deadline, not after."
    },
    {
      id: "04",
      title: "SOP / LOR / CV Creation",
      short: "Individually drafted stories",
      full: "A German professor reading your SOP has read five hundred others that week. They know within the first paragraph whether you actually wrote it. We do not write it for you and hand it over. We help you shape your own story into something that is genuinely compelling. Same goes for LORs and European-format styled CVs."
    },
    {
      id: "05",
      title: "IELTS / GRE / German Prep",
      short: "Language and assessment coaching",
      full: "IELTS is not just about the overall band score—a 5.5 in Writing will get you rejected. For German language elements, B1 can feel like a whole new language compared to A1/A2. We structure target batches exactly where students slow down. EuroZiel students receive these courses at half the standard market rate."
    },
    {
      id: "06",
      title: "University Application",
      short: "Uni-assist and direct portals",
      full: "German university applications are not a single form. Every university has its own portal and uni-assist has separate processes. One wrong file format, one missing document, and your application disappears with no second chances until the next intake. We manage every application end-to-end, tracking every deadline."
    },
    {
      id: "07",
      title: "Offer Letter",
      short: "Handling conditional admits",
      full: "Getting your offer letter is when everything becomes real. But it is also when students make expensive mistakes—accepting the wrong offer too quickly or missing acceptance deadlines. We read every offer letter with you, explain exactly what it means, and guide your final choice."
    },
    {
      id: "08",
      title: "Loan Assistance",
      short: "Working with Indian banks",
      full: "German university loan applications are harder than they should be because most Indian bank officers have never processed one. They ask for documents that do not exist in the German system. We know which banks process Germany loans without complications and how to present your offer letter to a loan officer."
    },
    {
      id: "09",
      title: "Blocked Account Opening",
      short: "Securing the monthly payout",
      full: "The blocked account is not just a visa formality. It is the €992 that gets released into your German account every single month (totaling €11,904/year from 2025/26) to cover living expenses. We handle setup timing with Expatrio or Fintiba to ensure your confirmation is ready before your visa appointment."
    },
    {
      id: "10",
      title: "Insurance Assistance",
      short: "Registering with TK, AOK or Barmer",
      full: "The moment you land in Germany, your insurance is active, and you need to know how to use it. Which clinics take walk-ins, what requires prior approval, etc. We help you enroll with TK, AOK, or Barmer from India itself so your confirmation letter is ready without any last-minute panic."
    },
    {
      id: "11",
      title: "Visa Guidance",
      short: "National Visa Type D interview prep",
      full: "The German student visa interview is not a rubber stamp. The consulate officer will ask detailed questions about your programme, post-graduation plans, funding, and return plans. We conduct complete mock embassy interviews with you covering every likely question until your answers are consistent."
    },
    {
      id: "12",
      title: "Flight to Germany",
      short: "Pre-departure luggage lists",
      full: "Where most consultancies stop, we do not. Which city to fly into, baggage limits, direct vs. connecting flights, what to pack in your cabin bag in case checked luggage is delayed. We provide a full pre-departure checklist and run a raw, real conversation before you take off."
    },
    {
      id: "13",
      title: "On-Arrival Pickup",
      short: "WhatsApp coordinators waiting for you",
      full: "You land after a long flight with 30kg of baggage and no local SIM card. Our Germany-based student network coordinates arrival support on the ground. You have someone who has already been through this waiting for you or reachable on WhatsApp the instant you touch down."
    },
    {
      id: "14",
      title: "Accommodation",
      short: "WG-Gesucht and Studentenwerk rosters",
      full: "University dorm waiting lists in Germany run anywhere from 6 months to over a year. WG-Gesucht listings in Munich and Frankfurt disappear within hours. We help you apply to your university Studentenwerk the right way, build a strong WG profile, and hook you up with active student peer databases."
    },
    {
      id: "15",
      title: "Settling in Germany",
      short: "Anmeldung, transport pass, groceries",
      full: "The first few weeks involve Anmeldung at the Bürgeramt, opening your German bank account, activating your health card, and understanding local recycling rules (your neighbors will notice if you get it wrong!). Our connected network is reachable throughout. You are never navigating it alone."
    }
  ];

  return (
    <div className="space-y-24 md:space-y-36 pb-20">
      
      {/* SERVICES HERO */}
      <section className="max-w-7xl mx-auto px-4 text-left">
        <div className="relative rounded-sm overflow-hidden py-16 px-8 md:px-14 border border-slate-200/50 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-premium border-b-4 border-b-gold">
          <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-80 h-80 bg-navy/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-[10px] font-bold text-navy uppercase tracking-[0.2em] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-sm">
              OUR GUIDANCE SERVICES
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-sans leading-tight text-slate-900 dark:text-white">
              Complete support, <br />
              <span className="font-serif italic font-medium text-gold">zero gaps.</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-sans leading-relaxed">
              From your first enquiry to your first day on a German campus—EuroZiel covers every aspect of your study abroad journey. Guided by mentors currently studying your fields in Germany.
            </p>
          </div>
        </div>
      </section>

      {/* THREE PATHWAYS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {mainServices.map((service, sIdx) => (
            <div 
              key={sIdx}
              className="p-8 rounded-sm border border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 text-left space-y-4 relative shadow-premium hover:border-gold transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-[9px] font-bold text-gold uppercase bg-gold/5 border border-gold/20 px-2 py-0.5 rounded-sm">
                {service.tag}
              </div>
              <h3 className="text-lg font-bold font-sans border-b border-slate-100 dark:border-slate-900 pb-3 text-slate-800 dark:text-slate-100">
                {service.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                {service.desc}
              </p>
              <div className="p-4 rounded-sm bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                <strong>Ground Rule:</strong> {service.rules}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 15 STEPS DIARY DIRECTORY */}
      <section className="max-w-5xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] bg-gold/5 border border-gold/30 px-3 py-1 rounded-sm">
            Active Support Directory
          </span>
          <h2 className="text-2xl md:text-3.5xl font-bold tracking-tight font-sans">
            Our 15-Step End-To-End Support
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">
            We handle the intricate details so you can focus entirely on your academics and language goals. Click any step below to explore.
          </p>
        </div>

        {/* Directory List Accordion Style */}
        <div className="border border-slate-200/50 dark:border-slate-800 rounded-sm overflow-hidden bg-white dark:bg-slate-950/65 shadow-premium">
          {blockSteps.map((step, idx) => {
            const isExpanded = expandedStep === idx;
            return (
              <div 
                key={idx}
                className={`border-b last:border-b-0 border-slate-200/50 dark:border-slate-800 transition-all ${
                  isExpanded ? 'bg-slate-50/50 dark:bg-slate-900/20' : ''
                }`}
              >
                <button
                  onClick={() => setExpandedStep(isExpanded ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-100/40 dark:hover:bg-slate-900/40 transition-colors pointer-cursor"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-extrabold text-sm text-[#e5a800] tracking-wider w-6">
                      {step.id}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-205">
                        {step.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {step.short}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-12 pb-6 pt-1 text-slate-600 dark:text-slate-350 text-xs md:text-sm leading-relaxed font-sans border-l-2 border-[#1b73ba]">
                        {step.full}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 md:p-12 rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-premium space-y-6 border-b-4 border-b-gold">
          <span className="text-[10px] font-bold text-navy uppercase tracking-[0.2em] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-sm">
            Need Expert Input?
          </span>
          <h3 className="text-2xl font-bold font-sans leading-tight text-slate-900 dark:text-white">
            Stop Guessing and Connect with Students Already Living Your Dream
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Our mentors are not sitting in an office in India guessing what Germany is like. They are there. Right now. And they are part of your team.
          </p>
          <div>
            <button
              onClick={onOpenConsultation}
              className="px-8 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest bg-navy hover:bg-opacity-90 text-white border-b-2 border-gold transition-all cursor-pointer shadow-premium"
            >
              Consult with a Mentor Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
