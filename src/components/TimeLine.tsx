"use client";

import { useEffect, useRef, useState } from "react";

interface TimelinePhase {
    range: string;
    month: string;
    title: string;
    intro: string;
    items: string[];
    highlight?: {
        label: string;
        text: string;
    };
    isFinal?: boolean;
}

const timelineData: TimelinePhase[] = [
    {
        range: "Month 1–2",
        month: "01–02",
        title: "Discovery, Planning & APS Preparation",
        intro:
            "Your journey begins with understanding your profile, goals, and the right pathway for Germany.",
        items: [
            "Free Profile Evaluation",
            "Career & Goal Mapping",
            "Personalized Germany Roadmap",
            "University & Course Shortlisting",
            "APS Documentation Support",
            "APS Application Filing",
        ],
    },
    {
        range: "Month 2–4",
        month: "02–04",
        title: "Language Preparation, SOP, LOR & CV",
        intro:
            "This stage focuses on strengthening your profile and initiating essential documentation processes.",
        items: [
            "IELTS / German Language Coaching",
            "SOP Planning & Initial Drafting",
            "LOR Collection Guidance",
            "European Format CV Preparation",
            "SOP Review & Refinement",
        ],
    },
    {
        range: "Month 4–5",
        month: "04–05",
        title: "GRE, GMAT, Profile Building & Documentation",
        intro:
            "We help you prepare strong, professional application materials aligned with German university standards.",
        items: [
            "GRE / GMAT Preparation Guidance",
            "Academic Profile Evaluation & University Shortlisting",
            "uni-assist Account & Portal Setup",
            "Application Readiness & Submission Guidance",
        ],
    },
    {
        range: "Month 5–7",
        month: "05–07",
        title: "University Applications and Tracking",
        intro:
            "Applications are strategically submitted based on deadlines, profile fit, and admission potential.",
        items: [
            "University Application Submission",
            "uni-assist Handling",
            "Deadline Tracking",
            "Application Status Monitoring",
        ],
        highlight: {
            label: "Important Intake Timeline",
            text: "Most Winter Intake deadlines close around July 15 for public universities in Germany.",
        },
    },
    {
        range: "Month 7–8",
        month: "07–08",
        title: "Offers, Decision Making & Financial Arrangements",
        intro:
            "Once offers arrive, we help you evaluate universities and make informed decisions for your future.",
        items: [
            "Offer Letter Evaluation",
            "Admission Acceptance Guidance",
            "Scholarship & Funding Guidance",
            "Final University Selection",
        ],
    },
    {
        range: "Month 8–9",
        month: "08–09",
        title: "Blocked Account, Health Insurance & Visa",
        intro:
            "This stage prepares you for the German student visa process with complete documentation support.",
        items: [
            "Blocked Account (Sperrkonto) Guidance",
            "Health Insurance Support",
            "Visa Documentation Preparation",
            "Embassy Appointment Assistance",
        ],
        highlight: {
            label: "Current Financial Requirement",
            text: "Blocked account funding requirement approximately €11,904 for Germany student visa processing.",
        },
    },
    {
        range: "Month 10–12",
        month: "10–12",
        title: "Pre-Departure & Germany Arrival",
        intro: "The final stage focuses on preparing you for a smooth transition into Germany.",
        items: [
            "Visa Approval & Passport Collection",
            "Accommodation Confirmation",
            "Pre-Departure Orientation",
            "Travel Planning & Settlement Guidance",
        ],
        highlight: {
            label: "Final Step",
            text: "Fly to Germany with confidence and support from the EuroZiel network.",
        },
        isFinal: true,
    },
];

const CheckIcon = () => (
    <svg
        className="w-4 h-4 text-gold shrink-0 mt-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

function CalendarPageContent({ phase }: { phase: TimelinePhase }) {
    return (
        <>
            {/* Torn calendar header */}
            <div className="relative bg-navy px-8 pt-9 pb-7 text-center shrink-0">
                <p className="text-gold text-[11px] font-bold tracking-[0.25em] uppercase mb-1">
                    {phase.range}
                </p>
                <h3 className="text-white text-5xl md:text-6xl font-bold font-sans tracking-tight">
                    {phase.month}
                </h3>
                <svg
                    className="absolute bottom-0 left-0 w-full text-navy"
                    style={{ transform: "translateY(1px)" }}
                    viewBox="0 0 400 16"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0 L10,10 L20,2 L30,12 L40,4 L50,14 L60,3 L70,11 L80,5 L90,13 L100,2 L110,10 L120,4 L130,14 L140,3 L150,12 L160,5 L170,11 L180,2 L190,13 L200,4 L210,14 L220,3 L230,10 L240,5 L250,12 L260,2 L270,13 L280,4 L290,11 L300,3 L310,14 L320,5 L330,10 L340,2 L350,12 L360,4 L370,13 L380,3 L390,11 L400,4 L400,0 Z"
                        fill="currentColor"
                    />
                </svg>
            </div>

            {/* Content */}
            <div className="px-8 md:px-10 py-8 space-y-5 overflow-y-auto grow">
                <h4 className="text-xl md:text-2xl font-bold font-sans text-slate-900 leading-snug">
                    {phase.title}
                </h4>
                <p className="text-sm text-slate-600 font-sans leading-relaxed">{phase.intro}</p>

                <ul className="space-y-2.5 pt-1">
                    {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 font-sans">
                            <CheckIcon />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>

                {phase.highlight && (
                    <div
                        className={`mt-4 rounded-sm border-l-4 px-4 py-3 ${phase.isFinal
                            ? "border-l-gold bg-navy text-white"
                            : "border-l-gold bg-gold/5 border border-gold/20"
                            }`}
                    >
                        <p
                            className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${phase.isFinal ? "text-gold" : "text-navy"
                                }`}
                        >
                            {phase.highlight.label}
                        </p>
                        <p
                            className={`text-sm font-sans leading-relaxed ${phase.isFinal ? "text-slate-200" : "text-slate-700"
                                }`}
                        >
                            {phase.highlight.text}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Applies a smooth, continuous peel transform to a page based on progress `p` (0 -> flat, 1 -> fully peeled away)
function applyPeelStyle(el: HTMLDivElement, p: number) {
    const t = Math.min(1, Math.max(0, p));

    if (t <= 0) {
        el.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
        el.style.transform = "translate(0%, 0%) rotate(0deg)";
        el.style.opacity = "1";
        return;
    }

    const x1 = lerp(100, 4, t);
    const x2 = lerp(100, 0, t);
    const y2 = lerp(100, 4, t);
    const y3 = lerp(100, 0, t);
    const tx = lerp(0, -42, t);
    const ty = lerp(0, -42, t);
    const rot = lerp(0, -28, t);
    const opacity = t < 0.85 ? 1 : lerp(1, 0, (t - 0.85) / 0.15);

    el.style.clipPath = `polygon(0% 0%, ${x1}% 0%, ${x2}% ${y2}%, 0% ${y3}%)`;
    el.style.transform = `translate(${tx}%, ${ty}%) rotate(${rot}deg)`;
    el.style.opacity = String(opacity);
}

export default function GermanyTimelineSection() {
    const total = timelineData.length;
    // extra scroll room per month + a settle buffer at the end (in vh units)
    const vhPerMonth = 120;
    const endBufferVh = 40;

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const progressBarRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const lastIndexRef = useRef(0);

    useEffect(() => {
        let ticking = false;

        const update = () => {
            const wrapper = wrapperRef.current;
            if (!wrapper) return;

            const rect = wrapper.getBoundingClientRect();
            const viewportH = window.innerHeight;
            const scrolled = -rect.top;
            // subtract the end buffer so progress reaches 1 a bit before the section fully ends,
            // giving the last page time to settle before unpinning
            const maxScroll = rect.height - viewportH - (endBufferVh / 100) * viewportH;
            const raw = maxScroll > 0 ? scrolled / maxScroll : 0;
            const clamped = Math.min(1, Math.max(0, raw));
            const progress = clamped * (total - 1);

            for (let i = 0; i < total - 1; i++) {
                const el = pageRefs.current[i];
                if (!el) continue;
                const p = progress - i;
                applyPeelStyle(el, p);
            }

            if (progressBarRef.current) {
                progressBarRef.current.style.width = `${clamped * 100}%`;
            }

            const idx = Math.min(total - 1, Math.round(progress));
            if (idx !== lastIndexRef.current) {
                lastIndexRef.current = idx;
                setCurrentIndex(idx);
            }
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    update();
                    ticking = false;
                });
                ticking = true;
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [total]);

    return (
        <section
            ref={wrapperRef}
            className="relative w-full bg-transparent"
            style={{ height: `calc(${total * vhPerMonth}vh + ${endBufferVh}vh)` }}
        >
            {/* Sticky viewport that holds the calendar in place while the page scrolls through it */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center py-8 md:py-10">
                {/* Ambient glows */}
                <div className="absolute top-0 -right-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 -left-32 w-96 h-96 bg-navy/30 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-6xl w-full mx-auto px-4 flex flex-col items-center justify-center h-full">
                    {/* Section heading */}
                    <div className="text-center max-w-2xl mx-auto space-y-3 mb-6 md:mb-8 shrink-0">
                        <span className="inline-block text-[10px] font-bold text-gold uppercase tracking-[0.2em] border border-gold/30 bg-gold/5 px-3 py-1.5 rounded-sm">
                            The Roadmap
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold font-sans text-white leading-tight">
                            Your Germany{" "}
                            <span className="font-serif italic font-medium text-gold">Timeline</span>
                        </h2>
                        <p className="text-sm md:text-base text-slate-400 font-sans leading-relaxed hidden md:block">
                            A structured roadmap designed to guide you from your first consultation to your
                            arrival in Germany with complete clarity and support.
                        </p>
                    </div>

                    {/* Calendar wrapper */}
                    <div className="relative w-full max-w-2xl shrink-0">
                        {/* Spiral binding */}
                        <div className="absolute -top-3 left-0 right-0 flex justify-center gap-4 z-30">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <span
                                    key={i}
                                    className="w-2.5 h-2.5 rounded-full bg-slate-700 border border-slate-600 shadow-inner"
                                />
                            ))}
                        </div>

                        {/* Stacked page shadow (depth effect) */}
                        <div className="absolute inset-0 translate-y-2 translate-x-1 bg-slate-800/60 rounded-sm" />
                        <div className="absolute inset-0 translate-y-1 translate-x-0.5 bg-slate-800/80 rounded-sm" />

                        {/* Page stack - all months stacked, revealed one by one as you scroll */}
                        <div className="relative h-[480px] md:h-[540px]">
                            {timelineData.map((phase, i) => (
                                <div
                                    key={i}
                                    ref={(el) => {
                                        pageRefs.current[i] = el;
                                    }}
                                    className="absolute inset-0 flex flex-col bg-white rounded-sm shadow-premium border-b-4 border-b-gold overflow-hidden"
                                    style={{
                                        zIndex: total - i,
                                        transformOrigin: "bottom right",
                                        willChange: "transform, clip-path, opacity",
                                        backfaceVisibility: "hidden",
                                    }}
                                >
                                    <CalendarPageContent phase={phase} />
                                </div>
                            ))}
                        </div>

                        {/* Page number tab */}
                        <div className="absolute top-4 right-4 z-40 bg-gold text-slate-950 text-[11px] font-bold px-2.5 py-1 rounded-sm">
                            {currentIndex + 1} / {total}
                        </div>

                        {/* Scroll progress bar */}
                        <div className="absolute -bottom-5 left-0 right-0 h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div
                                ref={progressBarRef}
                                className="h-full bg-gold rounded-full"
                                style={{ width: "0%" }}
                            />
                        </div>
                    </div>

                    {/* Scroll cue */}
                    <div className="flex flex-col items-center gap-1.5 mt-6 md:mt-8 text-slate-500 shrink-0">
                        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
                            Scroll to explore
                        </span>
                        <svg
                            className="w-4 h-4 animate-bounce"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}