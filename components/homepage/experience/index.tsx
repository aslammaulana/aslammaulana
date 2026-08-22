"use client";

import { useState } from "react";
import Image from "next/image";
import { experienceItems } from "@/data/experience";
import { trainingItems } from "@/data/training";
import { languageItems } from "@/data/profile";
import { ChevronUp, ChevronDown, ExternalLink } from "lucide-react";
import ProfileCard from "./ProfileCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

/* ─── Accordion Item ─────────────────────────────────────── */
type AccordionItemProps = {
    logo: string;
    title: string;
    subtitle: string;
    period?: string;
    location?: string;
    points?: string[];
    certificateUrl?: string;
    isOpen: boolean;
    onToggle: () => void;
};

function AccordionItem({
    logo,
    title,
    subtitle,
    period,
    location,
    points,
    certificateUrl,
    isOpen,
    onToggle,
}: AccordionItemProps) {
    return (
        <div
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isOpen ? "border-white/25" : "border-white/10"}`}
            style={{
                background: isOpen ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
            }}
        >
            {/* Header */}
            <button
                onClick={onToggle}
                className="w-full flex items-start sm:items-center gap-4 px-6 py-5 text-left group cursor-pointer"
            >
                {/* Logo */}
                <div className="w-10 h-10 shrink-0 rounded-lg overflow-hidden  flex items-start justify-center">
                    {logo ? (
                        <Image
                            src={logo}
                            alt={title}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <span className="text-[10px] font-bold text-white/40 select-none leading-none px-1 text-center">
                            {title
                                .split(" ")
                                .slice(0, 2)
                                .map((w) => w[0])
                                .join("")
                                .toUpperCase()}
                        </span>
                    )}
                </div>

                {/* Title + subtitle */}
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <p className="text-white font-bold text-[15px] leading-snug ">
                        {title}
                    </p>
                    <p className="text-white/50 text-[14px]">{subtitle}</p>
                    {/* Mobile: period + location — right under subtitle */}
                    {period && (
                        <div className="sm:hidden flex flex-col gap-0 mt-1 text-sm">
                            <span className="text-white/80 font-medium">{period}</span>
                            {location && <span className="text-white/40">{location}</span>}
                        </div>
                    )}
                </div>

                {/* Period + location + chevron */}
                <div className="flex items-center gap-6 shrink-0">
                    {period && (
                        <div className="text-right hidden sm:block">
                            <p className="text-white/80 text-sm font-medium">{period}</p>
                            {location && (
                                <p className="text-white/40 text-[14px]">{location}</p>
                            )}
                        </div>
                    )}
                    <span className="text-white/50 group-hover:text-white transition-colors duration-200">
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                </div>
            </button>



            {/* Expandable body */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-6 pb-6 pt-1 pl-6 sm:pl-14">
                    <div className="w-full h-px bg-white/8 mb-4" />

                    {points && points.length > 0 && (
                        <ul className="flex flex-col gap-3 mb-5">
                            {points.map((point, pi) => (
                                <li key={pi} className="flex items-start gap-3">
                                    <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                                    <span className="text-white/60 text-sm leading-relaxed">
                                        {point}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {certificateUrl && (
                        <a
                            href={certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 bg-white/5 text-white/70 text-xs font-medium hover:border-white/30 hover:text-white transition-all duration-200"
                        >
                            Certificate Source
                            <ExternalLink size={12} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─── Group Label ───────────────────────────────────────────── */
function GroupLabel({ label, first }: { label: string; first?: boolean }) {
    return (
        <p className={`text-sm font-bold tracking-[0.25em] uppercase text-white${first ? "" : " mt-10"}`}>
            {label}
        </p>
    );
}

/* ─── Main Section ──────────────────────────────────────────── */
export default function ExperienceSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (i: number) =>
        setOpenIndex((prev) => (prev === i ? null : i));

    const expOffset = 0;
    const trainOffset = experienceItems.length;

    return (
        <section
            id="experience"
            className="relative w-full py-10 border-t border-t-[#ffffff21] bg-[#0f0e0f]"
        >


            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4">
                {/* Two-column layout */}
                <div className="flex gap-8 items-start">

                    {/* LEFT: sticky ProfileCard */}
                    <div className="hidden lg:block w-[280px] shrink-0 sticky top-6">
                        <ScrollReveal animation="fade-right" duration={700} delay={100}>
                            <ProfileCard />
                        </ScrollReveal>
                    </div>

                    {/* RIGHT: accordion groups */}
                    <div className="flex-1 flex flex-col gap-4">

                        {/* EXPERIENCE */}
                        <ScrollReveal animation="fade-up" duration={600} delay={0}>
                            <GroupLabel label="Experience" first />
                        </ScrollReveal>
                        {experienceItems.map((item, i) => (
                            <ScrollReveal
                                key={`exp-${i}`}
                                animation="fade-up"
                                duration={600}
                                delay={i * 80}
                            >
                                <AccordionItem
                                    logo={item.logo}
                                    title={item.company}
                                    subtitle={item.role}
                                    period={item.period}
                                    location={item.location}
                                    points={item.points}
                                    isOpen={openIndex === expOffset + i}
                                    onToggle={() => toggle(expOffset + i)}
                                />
                            </ScrollReveal>
                        ))}

                        {/* COURSE / TRAINING */}
                        <ScrollReveal animation="fade-up" duration={600} delay={0}>
                            <GroupLabel label="Course / Training" />
                        </ScrollReveal>
                        {trainingItems.map((item, i) => (
                            <ScrollReveal
                                key={`train-${i}`}
                                animation="fade-up"
                                duration={600}
                                delay={i * 80}
                            >
                                <AccordionItem
                                    logo={item.logo}
                                    title={item.name}
                                    subtitle={item.organizer}
                                    period={item.period}
                                    location={item.location}
                                    points={item.points}
                                    certificateUrl={item.certificateUrl}
                                    isOpen={openIndex === trainOffset + i}
                                    onToggle={() => toggle(trainOffset + i)}
                                />
                            </ScrollReveal>
                        ))}

                        {/* LANGUAGES */}
                        <ScrollReveal animation="fade-up" duration={600} delay={0}>
                            <GroupLabel label="Languages" />
                        </ScrollReveal>
                        <div className="flex flex-col gap-3">
                            {languageItems.map((item, i) => (
                                <ScrollReveal
                                    key={`lang-${i}`}
                                    animation="fade-up"
                                    duration={500}
                                    delay={i * 60}
                                >
                                    <div
                                        className="rounded-2xl border border-white/10 px-6 py-5 flex items-center gap-4"
                                        style={{
                                            background: "rgba(255,255,255,0.03)",
                                            backdropFilter: "blur(8px)",
                                            WebkitBackdropFilter: "blur(8px)",
                                        }}
                                    >
                                        {/* Flag */}
                                        <div className="w-10 h-10 shrink-0 rounded-lg overflow-hidden flex items-center justify-center">
                                            <Image
                                                src={item.flag}
                                                alt={item.language}
                                                width={40}
                                                height={40}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        {/* Language + level */}
                                        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                            <p className="text-white font-bold text-[15px] leading-snug">{item.language}</p>
                                            <p className="text-white/50 text-[14px]">{item.level}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


