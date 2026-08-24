"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";
import { portfolioItems } from "@/data/portfolio";
import { Lightbox } from "@/components/homepage/portfolio/Lightbox";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function PortfolioDetailPage({ item }: { item: PortfolioItem }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const accentColor = (item.color || "3b82f6").replace("#", "") || "3b82f6";
    const heroImage = item.detailImage || item.image;
    const images = (item.images?.length ? item.images : [heroImage]).filter(Boolean);
    const currentIndex = portfolioItems.findIndex((p) => p.slug === item.slug);
    const prevItem = currentIndex > 0 ? portfolioItems[currentIndex - 1] : null;
    const nextItem = currentIndex < portfolioItems.length - 1 ? portfolioItems[currentIndex + 1] : null;

    const openLightbox = (idx: number) => {
        setLightboxIndex(idx);
        setLightboxOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#0f0e0f]">
            {/* ── Top Hero Section with Radial Gradient (Without Glassmorphism Header) ── */}
            <section
                className="relative w-full border-b border-white/8 overflow-hidden"
                style={{
                    background: `radial-gradient(circle at 50% 0%, #${accentColor}40 0%, #0f0e0f 75%)`,
                }}
            >
                {/* Subtle top rim light */}
                <div
                    className="absolute top-0 left-0 right-0 pointer-events-none"
                    style={{
                        height: "1px",
                        background:
                            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 10%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.9) 90%, transparent 100%)",
                    }}
                />

                <div className="w-full max-w-[1200px] mx-auto px-4 pt-8 pb-14 flex flex-col">
                    {/* Back Button (Capsule / Pill Style) */}
                    <div className="mb-8">
                        <Link
                            href="/#work"
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/10 text-white text-sm font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-200 shadow-sm"
                        >
                            <ArrowLeft size={16} />
                            Back
                        </Link>
                    </div>

                    {/* 1. Kategori (40px) */}
                    <ScrollReveal animation="fade-up" duration={700} delay={0}>
                        <h1 className="text-3xl sm:text-[40px] font-bold text-white leading-tight tracking-tight">
                            {item.category}
                        </h1>
                    </ScrollReveal>

                    {/* 2. Title (16px) */}
                    <ScrollReveal animation="fade-up" duration={700} delay={50}>
                        <p className="text-[16px] text-white/70 font-medium mt-2">
                            {item.title}
                        </p>
                    </ScrollReveal>

                    {/* 3. Image */}
                    {heroImage && (
                        <ScrollReveal animation="fade-up" duration={800} delay={100}>
                            <div
                                className="relative w-full mt-8  overflow-hidden  "
                                style={{ aspectRatio: "16/10" }}
                            >
                                <Image
                                    src={heroImage}
                                    alt={item.title}
                                    fill
                                    priority
                                    className="object-cover object-top"
                                    sizes="(max-width: 1200px) 100vw, 1200px"
                                />
                                {/* Subtle color overlay from accentColor */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(ellipse at top, #${accentColor}20 0%, transparent 60%)`,
                                    }}
                                />
                            </div>
                        </ScrollReveal>
                    )}

                    {/* 4. Deskripsi */}
                    <ScrollReveal animation="fade-up" duration={700} delay={150}>
                        <p className="text-[15px] sm:text-[16px] text-white/60 max-w-[850px] leading-relaxed mt-8">
                            {item.overview ?? item.description}
                        </p>
                    </ScrollReveal>

                    {/* 5. Kunjungi Website */}
                    {item.previewUrl && item.previewUrl !== "#" && (
                        <ScrollReveal animation="fade-up" duration={700} delay={200}>
                            <div className="mt-6">
                                <a
                                    href={item.previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#0f0f0e] text-sm font-semibold hover:bg-white/90 transition-all duration-200 shadow-md"
                                >
                                    Kunjungi Website
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </section>

            {/* ── Remaining Content Sections ── */}
            <div className="w-full max-w-[1200px] mx-auto px-4 pb-20">

                {/* ── Meta Grid: [KLIEN, PERAN] and [TAHUN, STATUS] ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
                    {/* Group 1: Klien & Peran */}
                    <ScrollReveal animation="fade-up" duration={800} delay={0}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                            <div
                                className="flex flex-col justify-between gap-2.5 p-5 rounded-2xl border border-white/10 transition-all duration-200 hover:border-white/20 h-full"
                                style={{ background: "rgba(255,255,255,0.03)" }}
                            >
                                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">KLIEN</p>
                                <p className="text-white font-semibold text-[15px] leading-snug">{item.client ?? "—"}</p>
                            </div>
                            <div
                                className="flex flex-col justify-between gap-2.5 p-5 rounded-2xl border border-white/10 transition-all duration-200 hover:border-white/20 h-full"
                                style={{ background: "rgba(255,255,255,0.03)" }}
                            >
                                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">PERAN</p>
                                <p className="text-white font-semibold text-[15px] leading-snug">{item.role ?? "Web Developer"}</p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Group 2: Tahun & Status */}
                    <ScrollReveal animation="fade-up" duration={800} delay={100}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                            <div
                                className="flex flex-col justify-between gap-2.5 p-5 rounded-2xl border border-white/10 transition-all duration-200 hover:border-white/20 h-full"
                                style={{ background: "rgba(255,255,255,0.03)" }}
                            >
                                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">TAHUN</p>
                                <p className="text-white font-semibold text-[15px] leading-snug">{item.publishedAt ?? "—"}</p>
                            </div>
                            <div
                                className="flex flex-col justify-between gap-2.5 p-5 rounded-2xl border border-white/10 transition-all duration-200 hover:border-white/20 h-full"
                                style={{ background: "rgba(255,255,255,0.03)" }}
                            >
                                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">STATUS</p>
                                <p className="text-white font-semibold text-[15px] leading-snug">{item.status ?? "—"}</p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* ── Overview ── */}
                {item.overview && (
                    <ScrollReveal animation="fade-up" duration={800}>
                        <div className="mt-12 pt-10 border-t border-white/8">
                            <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-4">Tentang Proyek</p>
                            <p className="text-white/60 leading-relaxed text-[15px] max-w-[900px]">
                                {item.overview}
                            </p>
                        </div>
                    </ScrollReveal>
                )}

                {/* ── Features ── */}
                {item.features && item.features.length > 0 && (
                    <div className="mt-12 pt-10 border-t border-white/8">
                        <ScrollReveal animation="fade-up" duration={800}>
                            <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-6">Fitur Utama</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {item.features.map((feat, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3 px-5 py-4 rounded-xl border border-white/8 h-full"
                                        style={{ background: "rgba(255,255,255,0.03)" }}
                                    >
                                        <span
                                            className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0"
                                            style={{ background: `#${accentColor}` }}
                                        />
                                        <span className="text-white/70 text-sm leading-relaxed">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                )}

                {/* ── Tech Stack ── */}
                {item.tags && item.tags.length > 0 && (
                    <ScrollReveal animation="fade-up" duration={800}>
                        <div className="mt-12 pt-10 border-t border-white/8">
                            <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-5">Tech Stack</p>
                            <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 rounded-full text-sm font-medium border border-white/10 text-white/70"
                                        style={{
                                            background: `rgba(${parseInt(accentColor.slice(0, 2) || "3b", 16)}, ${parseInt(accentColor.slice(2, 4) || "82", 16)}, ${parseInt(accentColor.slice(4, 6) || "f6", 16)}, 0.15)`,
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                )}

                {/* ── Challenge & Solution ── */}
                {(item.challenge || item.solution) && (
                    <div className="mt-12 pt-10 border-t border-white/8">
                        <ScrollReveal animation="fade-up" duration={800}>
                            <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-6">Tantangan &amp; Solusi</p>
                        </ScrollReveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {item.challenge && (
                                <ScrollReveal animation="fade-up" duration={800} delay={0}>
                                    <div className="p-5 rounded-xl border border-white/8 h-full" style={{ background: "rgba(255,255,255,0.03)" }}>
                                        <p className="text-white font-semibold text-sm mb-3">Tantangan</p>
                                        <p className="text-white/55 text-sm leading-relaxed">{item.challenge}</p>
                                    </div>
                                </ScrollReveal>
                            )}
                            {item.solution && (
                                <ScrollReveal animation="fade-up" duration={800} delay={100}>
                                    <div className="p-5 rounded-xl border border-white/8 h-full" style={{ background: "rgba(255,255,255,0.03)" }}>
                                        <p className="text-white font-semibold text-sm mb-3">Solusi</p>
                                        <p className="text-white/55 text-sm leading-relaxed">{item.solution}</p>
                                    </div>
                                </ScrollReveal>
                            )}
                        </div>
                    </div>
                )}

                {/* ── Gallery ── */}
                {images.length > 1 && (
                    <div className="mt-12 pt-10 border-t border-white/8">
                        <ScrollReveal animation="fade-up" duration={800}>
                            <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-6">Galeri Screenshot</p>
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
                                        style={{ aspectRatio: "4/3" }}
                                        aria-label={`Lihat screenshot ${i + 1}`}
                                    >
                                        <Image
                                            src={src}
                                            alt={`${item.title} screenshot ${i + 1}`}
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

                {/* ── Prev / Next Nav ── */}
                <ScrollReveal animation="fade-up" duration={800}>
                    <div className="mt-16 pt-10 border-t border-white/8 flex items-center justify-between gap-4">
                        {prevItem ? (
                            <Link
                                href={`/portfolio/${prevItem.slug}`}
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
                                href={`/portfolio/${nextItem.slug}`}
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

            {/* ── Lightbox ── */}
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
