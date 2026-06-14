import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Search, Map, FileText, Plane, Home, TrendingUp } from "lucide-react";

const steps = [
    {
        number: "01", label: "Discovery", title: "Your German Dream Begins",
        description: "Start with a personalized consultation to map your unique path to Germany.",
        Icon: Search,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
        accent: "navy"
    },
    {
        number: "02", label: "Strategy", title: "Building Your Germany Roadmap",
        description: "Customized university and career strategy based on your profile.",
        Icon: Map,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
        accent: "gold"
    },
    {
        number: "03", label: "Applications", title: "Turning Plans Into Offers",
        description: "Complete SOP, APS and university application support.",
        Icon: FileText,
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200",
        accent: "emerald"
    },
    {
        number: "04", label: "Visa", title: "Preparing You For Germany",
        description: "Visa, blocked account and pre departure guidance.",
        Icon: Plane,
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200",
        accent: "purple"
    },
    {
        number: "05", label: "Settlement", title: "Your New Life Starts",
        description: "Support after landing in Germany.",
        Icon: Home,
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200",
        accent: "teal"
    },
    {
        number: "06", label: "Career", title: "Beyond Admission",
        description: "Career and long term mentorship.",
        Icon: TrendingUp,
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200",
        accent: "navy"
    }
];

const accentMap: Record<string, {
    dot: string;
    iconBg: string;
    iconText: string;
    shadow: string;
}> = {
    navy: { dot: "bg-indigo-600 shadow-[0_0_24px_rgba(79,70,229,0.6)]", iconBg: "bg-indigo-600/20", iconText: "text-indigo-600", shadow: "shadow-[0_20px_60px_rgba(79,70,229,0.2)]" },
    gold: { dot: "bg-amber-500 shadow-[0_0_24px_rgba(245,158,11,0.6)]", iconBg: "bg-amber-500/20", iconText: "text-amber-500", shadow: "shadow-[0_20px_60px_rgba(245,158,11,0.2)]" },
    emerald: { dot: "bg-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.6)]", iconBg: "bg-emerald-500/20", iconText: "text-emerald-500", shadow: "shadow-[0_20px_60px_rgba(16,185,129,0.2)]" },
    purple: { dot: "bg-purple-500 shadow-[0_0_24px_rgba(168,85,247,0.6)]", iconBg: "bg-purple-500/20", iconText: "text-purple-500", shadow: "shadow-[0_20px_60px_rgba(168,85,247,0.2)]" },
    teal: { dot: "bg-teal-500 shadow-[0_0_24px_rgba(20,184,166,0.6)]", iconBg: "bg-teal-500/20", iconText: "text-teal-500", shadow: "shadow-[0_20px_60px_rgba(20,184,166,0.2)]" },
};

function StepInnerCard({ step }: { step: typeof steps[0] }) {
    const accent = accentMap[step.accent] || accentMap.navy;
    return (
        <div
            className={`relative rounded-2xl overflow-hidden min-h-[260px] mobile-m:min-h-[300px] laptop:min-h-[340px] shadow-xl ${accent.shadow}`}
            style={{
                backgroundImage: `linear-gradient(180deg, rgba(4,17,31,.2) 0%, rgba(4,17,31,.88) 100%), url(${step.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="p-5 h-full flex flex-col justify-end">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md ${accent.iconBg}`}>
                    <step.Icon className={`w-5 h-5 ${accent.iconText}`} />
                </div>
                <h3 className="text-xl font-bold text-white leading-tight">
                    {step.title}
                </h3>
                <p className="mt-2 text-xs text-white/70 font-sans">
                    {step.description}
                </p>
            </div>
        </div>
    );
}

interface StepCardProps {
    step: typeof steps[0];
    theme: 'light' | 'dark';
    index: number;
    registerRef: (el: HTMLDivElement | null, index: number) => void;
}

function StepCard({ step, theme, index, registerRef }: StepCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const accent = accentMap[step.accent] || accentMap.navy;
    const left = index % 2 === 0;

    // Local scroll mapping for card entry effects
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start 90%", "start 35%"]
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 22, stiffness: 90, mass: 0.6 });

    const cardY = useTransform(smoothProgress, [0, 1], [90, 0]);
    const cardOpacity = useTransform(smoothProgress, [0, 0.4, 1], [0, 0.6, 1]);
    const cardRotate = useTransform(smoothProgress, [0, 1], [left ? 4 : -4, 0]);
    const cardScale = useTransform(smoothProgress, [0, 1], [0.95, 1]);

    const GhostNumber = (
        <motion.span
            className={`font-black leading-none select-none text-[100px] laptop:text-[150px] ${
                theme === 'dark' ? 'text-white/[0.04]' : 'text-slate-900/[0.06]'
            }`}
        >
            {step.number}
        </motion.span>
    );

    return (
        <div
            ref={(el) => {
                cardRef.current = el;
                registerRef(el, index); // Shares layout height directly to background path pipeline
            }}
            className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
        >
            {left ? (
                <>
                    <div className="hidden md:flex items-center justify-end">{GhostNumber}</div>
                    <motion.div style={{ y: cardY, opacity: cardOpacity, rotate: cardRotate, scale: cardScale }}>
                        <StepInnerCard step={step} />
                    </motion.div>
                </>
            ) : (
                <>
                    <motion.div style={{ y: cardY, opacity: cardOpacity, rotate: cardRotate, scale: cardScale }}>
                        <StepInnerCard step={step} />
                    </motion.div>
                    <div className="hidden md:flex items-center justify-start">{GhostNumber}</div>
                </>
            )}

            {/* Center dot locks timing right to card scroll position */}
            <motion.div
                style={{ opacity: cardOpacity, scale: cardScale }}
                className={`absolute left-1/2 top-1/2 hidden md:block w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2 z-10 ${accent.dot}`}
            />
        </div>
    );
}

interface RoadPathProps {
    theme: 'light' | 'dark';
    containerRef: React.RefObject<HTMLDivElement | null>;
}

function RoadPath({ theme, containerRef }: RoadPathProps) {
    const pathRef = useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 20%"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        damping: 25,
        stiffness: 80,
        mass: 0.5,
    });

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, []);

    const strokeDashoffset = useTransform(
        smoothProgress,
        [0, 1],
        [pathLength, 0]
    );

    return (
        <div className="absolute inset-0 pointer-events-none hidden md:block">
            <svg
                className="absolute left-1/2 -translate-x-1/2 top-24 w-[360px] laptop:w-[460px]"
                style={{
                    height: "calc(100% - 6rem)",
                }}
                viewBox="0 0 500 2600"
                preserveAspectRatio="none"
                fill="none"
            >
                {/* Background path */}
                <path
                    d="M250 120 C80 300 420 500 250 750 C70 1000 430 1200 250 1500 C80 1800 420 2200 250 2500"
                    strokeLinecap="round"
                    strokeWidth="4"
                    className={theme === "dark" ? "stroke-slate-800" : "stroke-slate-200"}
                />
                {/* Animated drawing path */}
                <motion.path
                    ref={pathRef}
                    d="M250 120 C80 300 420 500 250 750 C70 1000 430 1200 250 1500 C80 1800 420 2200 250 2500"
                    strokeLinecap="round"
                    strokeWidth="5"
                    className={theme === "dark" ? "stroke-indigo-500" : "stroke-indigo-600"}
                    style={{
                        strokeDasharray: pathLength,
                        strokeDashoffset,
                    }}
                />
            </svg>
        </div>
    );
}

interface JourneyProps {
    theme: 'light' | 'dark';
}

export default function Journey({ theme }: JourneyProps) {
    const dark = theme === 'dark';
    const timelineContainerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const registerRef = (el: HTMLDivElement | null, index: number) => {
        cardRefs.current[index] = el;
    };

    return (
        <section className={`relative py-20 overflow-hidden ${dark ? 'bg-slate-950' : 'bg-slate-50/60'}`}>
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-24">
                    <h2 className={`font-bold text-4xl ${dark ? 'text-slate-100' : 'text-slate-900'}`}>
                        Six Steps To{" "}
                        <span className={dark ? 'font-serif italic text-amber-400' : 'font-serif italic text-indigo-600'}>
                            Germany
                        </span>
                    </h2>
                </div>

                <div ref={timelineContainerRef} className="relative">
                    {/* RoadPath calculation tracks individual element spacing */}
                    <RoadPath
                        theme={theme}
                        containerRef={timelineContainerRef}
                    />

                    <div className="space-y-36 relative">
                        {steps.map((step, i) => (
                            <StepCard
                                key={step.number}
                                step={step}
                                theme={theme}
                                index={i}
                                registerRef={registerRef}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}