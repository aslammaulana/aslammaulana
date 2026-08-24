"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink, Sparkles } from "lucide-react";
import type { PlaygroundItem } from "@/data/playground";

export function PlaygroundCard({ item }: { item: PlaygroundItem }) {
    const accentColor = (item.color || "6366f1").replace("#", "") || "6366f1";

    return (
        <div className="relative w-full text-left group">
            {/* ── Outer wrapper with padding (distance to rim frame) ── */}
            <div className="relative w-full p-[8px]">

                {/* ── Back frame with rim light ── */}
                <div className="absolute inset-0 rounded-[22px] border border-[#292929] bg-[#191819] overflow-hidden transition-all duration-300">
                    {/* Top Rim light */}
                    <div
                        className="absolute top-0 left-0 right-0 z-10 rounded-t-[22px]"
                        style={{
                            height: "1px",
                            background:
                                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 10%, rgba(255,255,255,0.45) 38%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.45) 62%, rgba(255,255,255,0) 90%, transparent 100%)",
                        }}
                    />
                    {/* Inner glow */}
                    <div
                        className="absolute top-0 left-0 right-0 pointer-events-none"
                        style={{
                            height: "60px",
                            background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
                        }}
                    />
                </div>

                {/* ── Main card container ── */}
                <div
                    className="relative rounded-[17px] border border-[#444] overflow-hidden transition-all duration-300 group-hover:border-white/20 flex flex-col justify-between"
                    style={{
                        background: `radial-gradient(circle at center 10%, rgba(${parseInt(accentColor.slice(0, 2) || "63", 16)}, ${parseInt(accentColor.slice(2, 4) || "66", 16)}, ${parseInt(accentColor.slice(4, 6) || "f1", 16)}, 0.15) 0%, #171717 100%)`,
                    }}
                >
                    {/* Top inner rim light */}
                    <div
                        className="absolute top-0 left-0 right-0 z-10 rounded-t-[17px]"
                        style={{
                            height: "1px",
                            background:
                                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 15%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.1) 85%, transparent 100%)",
                        }}
                    />

                    {/* Top Content: Badges + Quick Action Links */}
                    <div className="relative z-10 flex items-center justify-between gap-3 px-5 pt-5 pb-3">
                        <div className="flex items-center gap-2">
                            <span
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider"
                                style={{
                                    background: `rgba(${parseInt(accentColor.slice(0, 2) || "63", 16)}, ${parseInt(accentColor.slice(2, 4) || "66", 16)}, ${parseInt(accentColor.slice(4, 6) || "f1", 16)}, 0.2)`,
                                    color: `#${accentColor}`,
                                    border: `1px solid #${accentColor}40`,
                                }}
                            >
                                <Sparkles size={10} />
                                {item.type || "Open Source"}
                            </span>
                        </div>

                        {/* Quick links: GitHub & Live Demo */}
                        <div className="flex items-center gap-1.5 z-20">
                            {item.githubUrl && item.githubUrl !== "#" && (
                                <a
                                    href={item.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-200"
                                    title="View GitHub Repository"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Github size={14} />
                                </a>
                            )}
                            {item.previewUrl && item.previewUrl !== "#" && (
                                <a
                                    href={item.previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-200"
                                    title="View Live Demo"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink size={14} />
                                </a>
                            )}
                            <Link
                                href={`/playground/${item.slug}`}
                                className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-200"
                                title="View Details"
                            >
                                <ArrowUpRight size={14} strokeWidth={2} />
                            </Link>
                        </div>
                    </div>

                    {/* Title and Short Description */}
                    <div className="relative z-10 px-5 pb-3">
                        <Link href={`/playground/${item.slug}`} className="block group-hover:text-white">
                            <h3 className="text-white text-[16px] font-bold leading-snug group-hover:text-white transition-colors line-clamp-1">
                                {item.title}
                            </h3>
                            <p className="text-white/50 text-[13px] leading-relaxed mt-1 line-clamp-2">
                                {item.description}
                            </p>
                        </Link>
                    </div>

                    {/* Tech Stack Pills */}
                    {item.tags && item.tags.length > 0 && (
                        <div className="relative z-10 px-5 pb-4 flex flex-wrap gap-1.5">
                            {item.tags.slice(0, 4).map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/5 border border-white/8 text-white/60"
                                >
                                    {tag}
                                </span>
                            ))}
                            {item.tags.length > 4 && (
                                <span className="text-[11px] text-white/40 self-center pl-0.5">
                                    +{item.tags.length - 4}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Thumbnail Image Area */}
                    <Link
                        href={`/playground/${item.slug}`}
                        className="relative mx-[14px] mb-[-1px] rounded-t-[10px] overflow-hidden border border-white/10 block"
                        style={{ aspectRatio: "16/9" }}
                    >
                        {item.image ? (
                            <Image
                                src={item.image}
                                alt={item.title || "Playground preview"}
                                fill
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        ) : (
                            <div className="w-full h-full bg-white/3 flex items-center justify-center text-white/25 text-xs">
                                Open Source / Experiment
                            </div>
                        )}
                        {/* Bottom fade gradient */}
                        <div
                            className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
                            style={{
                                height: "35%",
                                background: "linear-gradient(to top, #171717 0%, rgba(23, 23, 23, 0.6) 50%, transparent 100%)",
                            }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
