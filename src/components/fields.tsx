import { Cpu, TrendingUp, Building2, Lightbulb, Palette, Stethoscope, Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import engineeringImg from "/assets/engineering-technology.jpg";
import csItImg from "/assets/computer-science-it.jpg";
import businessImg from "/assets/business-management.jpg";
import naturalSciencesImg from "/assets/natural-sciences.jpg";
import designArchitectureImg from "/assets/design-architecture.jpg";
import medicineHealthImg from "/assets/medicine-health.jpg";

const specialisations = [
  {
    icon: <Cpu className="w-5 h-5 text-indigo-500" />,
    title: "Engineering and Technology",
    image: engineeringImg,
    points: [
      "Germany is the core R&D engine of Europe, where Siemens, Bosch, BASF, Volkswagen, and Airbus actually build their technology.",
      "TU Munich, RWTH Aachen, and KIT consistently rank in the global top 100 for engineering.",
      "Recognized on a global benchmark scale in over 50 countries.",
    ],
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
    title: "Computer Science and IT",
    image: csItImg,
    points: [
      "Berlin is one of Europe's fastest growing tech hubs, home to 4,000+ startups including Zalando, N26, and Celonis.",
      "Course frameworks require mandatory hands on industry internships.",
      "Graduate employment is outstanding at over 96% within six months of completion.",
    ],
  },
  {
    icon: <Building2 className="w-5 h-5 text-[#1b73ba]" />,
    title: "Business and Management",
    image: businessImg,
    points: [
      "Unlike US/UK case study models, German business schools focus deeply on applied economics, multinational finance, and supply chain management.",
      "Institutes like Mannheim Business School, Frankfurt School of Finance, and WHU rank in Europe's top 20.",
      "Strong ties to multinational corporations mean real industry exposure from year one.",
    ],
  },
  {
    icon: <Lightbulb className="w-5 h-5 text-[#e5a800]" />,
    title: "Natural Sciences",
    image: naturalSciencesImg,
    points: [
      "Germany funds more scientific research per capita than almost any other country.",
      "The DFG (German Research Foundation) alone distributes over €3 billion annually.",
      "Secure your research career at the source, working alongside leading institutes.",
    ],
  },
  {
    icon: <Palette className="w-5 h-5 text-purple-500" />,
    title: "Design and Architecture",
    image: designArchitectureImg,
    points: [
      "The infamous Bauhaus school started in Germany, and that prestige runs through every design programme.",
      "Coverage spans urban planning, product design, and industrial design.",
      "Recognized globally as a high end design credential.",
    ],
  },
  {
    icon: <Stethoscope className="w-5 h-5 text-rose-500" />,
    title: "Medicine and Health",
    image: medicineHealthImg,
    points: [
      "Ranked among the most rigorous medical programmes in the world.",
      "Fully integrated with state of the art hospitals and research-intensive faculties.",
      "Recognized across the UK, Gulf, and Australia a long pathway but a permanent, peak qualification.",
    ],
  },
];

// ------------------------------------------------------------------
// Single alternating row: image on one side, bullet-point content
// on the other. `reverse` flips which side the image sits on.
// ------------------------------------------------------------------

const SpecialisationRow: React.FC<{
  spec: (typeof specialisations)[number];
  reverse: boolean;
  dark: boolean;
}> = ({ spec, reverse, dark }) => {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center gap-8 md:gap-14`}
    >
      {/* Image side */}
      <div className="w-full md:w-1/2">
        <div
          className={`relative rounded-2xl overflow-hidden border shadow-premium aspect-[4/3] ${
            dark ? "border-slate-800" : "border-slate-200/50"
          }`}
        >
          <img
            src={spec.image}
            alt={spec.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* subtle gradient overlay for polish */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* floating icon badge on the image */}
          <div
            className={`absolute top-4 ${reverse ? "right-4" : "left-4"} w-11 h-11 rounded-xl border flex items-center justify-center backdrop-blur-md ${
              dark
                ? "bg-slate-950/70 border-slate-800"
                : "bg-white/80 border-slate-200/60"
            }`}
          >
            {spec.icon}
          </div>
        </div>
      </div>

      {/* Content side */}
      <div className="w-full md:w-1/2 space-y-4">
        <h4
          className={`text-xl md:text-2xl font-bold font-sans ${
            dark ? "text-slate-100" : "text-slate-900"
          }`}
        >
          {spec.title}
        </h4>

        <ul className="space-y-3">
          {spec.points.map((point, pIdx) => (
            <li key={pIdx} className="flex items-start gap-3">
              <span
                className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center ${
                  dark
                    ? "border-gold/40 bg-gold/10 text-gold"
                    : "border-[#1b73ba]/30 bg-[#1b73ba]/10 text-[#1b73ba]"
                }`}
              >
                <Check className="w-3 h-3" />
              </span>
              <span
                className={`text-sm md:text-[15px] leading-relaxed font-sans ${
                  dark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// Section
// ------------------------------------------------------------------

interface FieldsProps {
  dark?: boolean;
}

const Fields: React.FC<FieldsProps> = ({ dark = false }) => {
  return (
    <section
      className={`py-0 px-4  ${
        dark
          ? "bg-transparent border-slate-900"
          : "bg-transparent border-slate-100"
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          {/* <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] bg-gold/5 border border-gold/30 px-3 py-1 rounded-sm">
            Academics
          </span> */}
          <h2
            className={`text-3xl font-bold tracking-tight font-sans ${dark ? "text-white" : "text-slate-900"}`}
          >
            Fields & Specialisations
          </h2>
          <p
            className={`text-xs md:text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}
          >
            We add genuine weight to your application across all key
            professional domains with targeted academic profile strategies.
          </p>
        </div>

        <ScrollReveal variant="fadeUp" stagger={0.15} className="space-y-16 md:space-y-20">
          {specialisations.map((spec, idx) => (
            <SpecialisationRow
              key={idx}
              spec={spec}
              reverse={idx % 2 === 1}
              dark={dark}
            />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Fields;