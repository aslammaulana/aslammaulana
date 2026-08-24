"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Sparkles, Layers } from "lucide-react";
import type { PlaygroundItem } from "@/data/playground";
import { Lightbox } from "@/components/homepage/portfolio/Lightbox";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function PlaygroundDetailPage({
    item,
    prevItem,
    nextItem,
}: {
    item: PlaygroundItem;
    prevItem?: { slug: string; title: string } | null;
    nextItem?: { slug: string; title: string } | null;
}) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const accentColor = (item.color || "6366f1").replace("#", "") || "6366f1";
    const images = (item.images?.length ? item.images : [item.image]).filter(Boolean);

    const openLightbox = (idx: number) => {
        setLightboxIndex(idx);
        setLightboxOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#0f0e0f]">
            {/* ── Top Nav Bar ── */}
            <div className="w-full border-b border-white/8 bg-[#0f0e0f]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="w-full max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        href="/#playground"
                        className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
                    >
                        <ArrowLeft size={16} />
                        Kembali ke Playground
                    </Link>

                    <div className="flex items-center gap-2">
                        {item.githubUrl && item.githubUrl !== "#" && (
                            <a
                                href={item.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/15 bg-white/5 text-white/80 text-xs font-medium hover:border-white/30 hover:text-white hover:bg-white/10 transition-all duration-200"
                            >
                                <Github size={14} />
                                <span className="hidden sm:inline">GitHub Repo</span>
                            </a>
                        )}
                        {item.previewUrl && item.previewUrl !== "#" && (
                            <a
                                href={item.previewUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-[#0f0f0e] text-xs font-semibold hover:bg-white/90 transition-all duration-200"
                            >
                                <span>Live Demo</span>
                                <ExternalLink size={13} />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[1200px] mx-auto px-4 pb-20">

                {/* ── Project Header ── */}
                <ScrollReveal animation="fade-up" duration={800} delay={0}>
                    <div className="pt-12 pb-10 border-b border-white/8">
                        <div className="flex items-center gap-2 mb-3">
                            <span
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                                style={{
                                    background: `rgba(${parseInt(accentColor.slice(0, 2) || "63", 16)}, ${parseInt(accentColor.slice(2, 4) || "66", 16)}, ${parseInt(accentColor.slice(4, 6) || "f1", 16)}, 0.15)`,
                                    color: `#${accentColor}`,
                                    border: `1px solid #${accentColor}40`,
                                }}
                            >
                                <Sparkles size={11} />
                                {item.type || "Open Source"}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-[42px] font-bold text-white leading-tight tracking-tight mb-4">
                            {item.title}
                        </h1>

                        <p className="text-white/60 text-[16px] max-w-[850px] leading-relaxed">
                            {item.overview ?? item.description}
                        </p>

                        {/* Action CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-3 mt-7">
                            {item.githubUrl && item.githubUrl !== "#" && (
                                <a
                                    href={item.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 bg-white/5 text-white text-sm font-medium hover:border-white/40 hover:bg-white/10 transition-all duration-200"
                                >
                                    <Github size={16} />
                                    Buka Repository GitHub
                                </a>
                            )}
                            {item.previewUrl && item.previewUrl !== "#" && (
                                <a
                                    href={item.previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#0f0f0e] text-sm font-semibold hover:bg-white/90 transition-all duration-200"
                                >
                                    Kunjungi Live Demo
                                    <ExternalLink size={15} />
                                </a>
                            )}
                        </div>
                    </div>
                </ScrollReveal>

                {/* ── Main Preview Image ── */}
                {images[0] && (
                    <ScrollReveal animation="fade-up" duration={800} delay={100}>
                        <div
                            className="relative w-full mt-10 rounded-2xl overflow-hidden border border-white/10"
                            style={{ aspectRatio: "16/9" }}
                        >
                            <Image
                                src={images[0]}
                                alt={item.title}
                                fill
                                priority
                                className="object-cover object-top"
                                sizes="(max-width: 1200px) 100vw, 1200px"
                            />
                            {/* Accent color glow */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: `radial-gradient(ellipse at top, #${accentColor}25 0%, transparent 65%)`,
                                }}
                            />
                        </div>
                    </ScrollReveal>
                )}

                {/* ── Meta Info Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                    <ScrollReveal animation="fade-up" duration={800} delay={0}>
                        <div
                            className="flex flex-col justify-between gap-2.5 p-5 rounded-2xl border border-white/10 h-full"
                            style={{ background: "rgba(255,255,255,0.03)" }}
                        >
                            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">TIPE PROYEK</p>
                            <p className="text-white font-semibold text-[15px] leading-snug">{item.type || "Open Source"}</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" duration={800} delay={100}>
                        <div
                            className="flex flex-col justify-between gap-2.5 p-5 rounded-2xl border border-white/10 h-full"
                            style={{ background: "rgba(255,255,255,0.03)" }}
                        >
                            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">KATEGORI</p>
                            <p className="text-white font-semibold text-[15px] leading-snug">
                                {item.tags?.[0] ? `${item.tags[0]} Project` : "Eksperimen"}
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" duration={800} delay={200}>
                        <div
                            className="flex flex-col justify-between gap-2.5 p-5 rounded-2xl border border-white/10 h-full"
                            style={{ background: "rgba(255,255,255,0.03)" }}
                        >
                            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">STATUS AKSES</p>
                            <p className="text-emerald-400 font-semibold text-[15px] leading-snug flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                {item.githubUrl ? "Open Source & Public" : "Public Showcase"}
                            </p>
                        </div>
                    </ScrollReveal>
                </div>

                {/* ── Overview / Deep Dive ── */}
                {item.overview && (
                    <ScrollReveal animation="fade-up" duration={800}>
                        <div className="mt-12 pt-10 border-t border-white/8">
                            <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-4">
                                Tentang Eksperimen
                            </p>
                            <p className="text-white/70 leading-relaxed text-[15px] max-w-[900px] whitespace-pre-line">
                                {item.overview}
                            </p>
                        </div>
                    </ScrollReveal>
                )}

                {/* ── Highlights / Key Features ── */}
                {item.features && item.features.length > 0 && (
                    <div className="mt-12 pt-10 border-t border-white/8">
                        <ScrollReveal animation="fade-up" duration={800}>
                            <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-6">
                                Highlights &amp; Inovasi Kunci
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {item.features.map((feat, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3 px-5 py-4 rounded-xl border border-white/8 h-full"
                                        style={{ background: "rgba(255,255,255,0.03)" }}
                                    >
                                        <Layers
                                            size={16}
                                            className="mt-0.5 shrink-0"
                                            style={{ color: `#${accentColor}` }}
                                        />
                                        <span className="text-white/80 text-sm leading-relaxed">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                )}

                {/* ── Tech Stack / Tools ── */}
                {item.tags && item.tags.length > 0 && (
                    <ScrollReveal animation="fade-up" duration={800}>
                        <div className="mt-12 pt-10 border-t border-white/8">
                            <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-5">
                                Teknologi &amp; Tools yang Digunakan
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 rounded-full text-sm font-medium border border-white/10 text-white/80"
                                        style={{
                                            background: `rgba(${parseInt(accentColor.slice(0, 2) || "63", 16)}, ${parseInt(accentColor.slice(2, 4) || "66", 16)}, ${parseInt(accentColor.slice(4, 6) || "f1", 16)}, 0.12)`,
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                )}

                {/* ── Gallery Screenshot ── */}
                {images.length > 1 && (
                    <div className="mt-12 pt-10 border-t border-white/8">
                        <ScrollReveal animation="fade-up" duration={800}>
                            <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-6">
                                Tangkapan Layar &amp; Demo UI
                            </p>
                        </ScrollReveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {images.map((src, i) => (
                                <ScrollReveal
                                    key={i}
                                    animation="fade-up"
                                    duration={800}
                                    delay={(i % 3) * 100}
                                >
                                    <button
                                        onClick={() => openLightbox(i)}
                                        className="relative w-full rounded-xl overflow-hidden border border-white/10 group cursor-zoom-in focus:outline-none"
                                        style={{ aspectRatio: "16/10" }}
                                        aria-label={`Lihat gambar demo ${i + 1}`}
                                    >
                                        <Image
                                            src={src}
                                            alt={`${item.title} preview ${i + 1}`}
                                            fill
                                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                                            sizes="(max-width: 640px) 100vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                                    </button>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Prev / Next Project Nav ── */}
                <ScrollReveal animation="fade-up" duration={800}>
                    <div className="mt-16 pt-10 border-t border-white/8 flex items-center justify-between gap-4">
                        {prevItem ? (
                            <Link
                                href={`/playground/${prevItem.slug}`}
                                className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200 group"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
                                <span>
                                    <span className="block text-[11px] text-white/30 uppercase tracking-widest mb-0.5">Sebelumnya</span>
                                    {prevItem.title}
                                </span>
                            </Link>
                        ) : <div />}

                        {nextItem ? (
                            <Link
                                href={`/playground/${nextItem.slug}`}
                                className="flex items-center gap-2 text-right text-white/50 hover:text-white text-sm transition-colors duration-200 group ml-auto"
                            >
                                <span>
                                    <span className="block text-[11px] text-white/30 uppercase tracking-widest mb-0.5">Selanjutnya</span>
                                    {nextItem.title}
                                </span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                        ) : <div />}
                    </div>
                </ScrollReveal>
            </div>

            {/* ── Lightbox Modal ── */}
            {lightboxOpen && (
                <Lightbox
                    images={images}
                    startIndex={lightboxIndex}
                    onClose={() => setLightboxOpen(false)}
                />
            )}
        </div>
    );
}
