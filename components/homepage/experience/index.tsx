"use client";

import { useState } from "react";
import Image from "next/image";
import { experienceItems, trainingItems, languageItems } from "@/data/data";
import { ChevronUp, ChevronDown, ExternalLink } from "lucide-react";
import ProfileCard from "./ProfileCard";

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
            className="rounded-2xl border border-white/10 overflow-hidden transition-all duration-300"
            style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
            }}
        >
            {/* Header */}
            <button
                onClick={onToggle}
                className="w-full flex items-center gap-4 px-6 py-5 text-left group cursor-pointer"
            >
                {/* Logo */}
                <div className="w-10 h-10 shrink-0 rounded-lg overflow-hidden  flex items-center justify-center">
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

            {/* Mobile: period + location */}
            {period && (
                <div className="sm:hidden px-6 pb-3 -mt-2 flex flex-col gap-0.5 text-sm">
                    <span className="text-white/80 font-medium">{period}</span>
                    {location && <span className="text-white/40">{location}</span>}
                </div>
            )}

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
function GroupLabel({ label }: { label: string }) {
    return (
        <p className="text-sm font-bold tracking-[0.25em] uppercase text-white mt-10">
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
    const langOffset = experienceItems.length + trainingItems.length;

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
                        <ProfileCard />
                    </div>

                    {/* RIGHT: accordion groups */}
                    <div className="flex-1 flex flex-col gap-4">

                        {/* EXPERIENCE */}
                        <GroupLabel label="Experience" />
                        {experienceItems.map((item, i) => (
                            <AccordionItem
                                key={`exp-${i}`}
                                logo={item.logo}
                                title={item.company}
                                subtitle={item.role}
                                period={item.period}
                                location={item.location}
                                points={item.points}
                                isOpen={openIndex === expOffset + i}
                                onToggle={() => toggle(expOffset + i)}
                            />
                        ))}

                        {/* COURSE / TRAINING */}
                        <GroupLabel label="Course / Training" />
                        {trainingItems.map((item, i) => (
                            <AccordionItem
                                key={`train-${i}`}
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
                        ))}

                        {/* LANGUAGES */}
                        <GroupLabel label="Languages" />
                        {languageItems.map((item, i) => (
                            <AccordionItem
                                key={`lang-${i}`}
                                logo={item.flag}
                                title={item.language}
                                subtitle={item.level}
                                isOpen={openIndex === langOffset + i}
                                onToggle={() => toggle(langOffset + i)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}


