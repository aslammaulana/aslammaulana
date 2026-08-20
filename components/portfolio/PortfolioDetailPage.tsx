"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";
import { portfolioItems } from "@/data/portfolio";
import { Lightbox } from "@/components/homepage/portfolio/Lightbox";

export default function PortfolioDetailPage({ item }: { item: PortfolioItem }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const images = item.images?.length ? item.images : [item.image];
    const currentIndex = portfolioItems.findIndex((p) => p.slug === item.slug);
    const prevItem = currentIndex > 0 ? portfolioItems[currentIndex - 1] : null;
    const nextItem = currentIndex < portfolioItems.length - 1 ? portfolioItems[currentIndex + 1] : null;

    const openLightbox = (idx: number) => {
        setLightboxIndex(idx);
        setLightboxOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#0f0e0f]">
            {/* ── Top Nav Bar ── */}
            <div className="w-full border-b border-white/8 bg-[#0f0e0f]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="w-full max-w-[900px] mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        href="/#work"
                        className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
                    >
                        <ArrowLeft size={16} />
                        Kembali ke Portfolio
                    </Link>
                    {item.previewUrl && item.previewUrl !== "#" && (
                        <a
                            href={item.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/15 bg-white/5 text-white/70 text-xs font-medium hover:border-white/30 hover:text-white hover:bg-white/10 transition-all duration-200"
                        >
                            Kunjungi Website
                            <ExternalLink size={12} />
                        </a>
                    )}
                </div>
            </div>

            <div className="w-full max-w-[900px] mx-auto px-4 pb-20">

                {/* ── Project Header ── */}
                <div className="pt-12 pb-10 border-b border-white/8">
                    <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-3">
                        {item.category}
                    </p>
                    <h1 className="text-3xl md:text-[40px] font-bold text-white leading-tight tracking-tight mb-4">
                        {item.title}
                    </h1>
                    <p className="text-white/50 text-[16px] max-w-[600px] leading-relaxed">
                        {item.overview ?? item.description}
                    </p>
                    {item.previewUrl && item.previewUrl !== "#" && (
                        <div className="mt-6">
                            <a
                                href={item.previewUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#0f0f0e] text-sm font-semibold hover:bg-white/90 transition-all duration-200"
                            >
                                Kunjungi Website
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    )}
                </div>

                {/* ── Hero Image ── */}
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
                        sizes="(max-width: 900px) 100vw, 900px"
                    />
                    {/* Subtle color overlay from item.color */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: `radial-gradient(ellipse at top, #${item.color}22 0%, transparent 60%)`,
                        }}
                    />
                </div>

                {/* ── Meta Grid ── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 p-6 rounded-2xl border border-white/10"
                    style={{ background: "rgba(255,255,255,0.03)" }}>
                    {[
                        { label: "Klien", value: item.client ?? "—" },
                        { label: "Peran", value: item.role ?? "Web Developer" },
                        { label: "Tahun", value: item.publishedAt ?? "—" },
                        { label: "Status", value: item.status ?? "—" },
                    ].map(({ label, value }) => (
                        <div key={label} className="flex flex-col gap-1">
                            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/30">{label}</p>
                            <p className="text-white font-semibold text-[15px]">{value}</p>
                        </div>
                    ))}
                </div>

                {/* ── Overview ── */}
                {item.overview && (
                    <div className="mt-12 pt-10 border-t border-white/8">
                        <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-4">Tentang Proyek</p>
                        <p className="text-white/60 leading-relaxed text-[15px] max-w-[720px]">
                            {item.overview}
                        </p>
                    </div>
                )}

                {/* ── Features ── */}
                {item.features && item.features.length > 0 && (
                    <div className="mt-12 pt-10 border-t border-white/8">
                        <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-6">Fitur Utama</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {item.features.map((feat, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 px-5 py-4 rounded-xl border border-white/8"
                                    style={{ background: "rgba(255,255,255,0.03)" }}
                                >
                                    <span
                                        className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0"
                                        style={{ background: `#${item.color}` }}
                                    />
                                    <span className="text-white/70 text-sm leading-relaxed">{feat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Tech Stack ── */}
                {item.tags && item.tags.length > 0 && (
                    <div className="mt-12 pt-10 border-t border-white/8">
                        <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-5">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 rounded-full text-sm font-medium border border-white/10 text-white/70"
                                    style={{ background: `rgba(${parseInt(item.color.slice(0,2),16)}, ${parseInt(item.color.slice(2,4),16)}, ${parseInt(item.color.slice(4,6),16)}, 0.15)` }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Challenge & Solution ── */}
                {(item.challenge || item.solution) && (
                    <div className="mt-12 pt-10 border-t border-white/8">
                        <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-6">Tantangan &amp; Solusi</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {item.challenge && (
                                <div className="p-5 rounded-xl border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
                                    <p className="text-white font-semibold text-sm mb-3">Tantangan</p>
                                    <p className="text-white/55 text-sm leading-relaxed">{item.challenge}</p>
                                </div>
                            )}
                            {item.solution && (
                                <div className="p-5 rounded-xl border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
                                    <p className="text-white font-semibold text-sm mb-3">Solusi</p>
                                    <p className="text-white/55 text-sm leading-relaxed">{item.solution}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ── Gallery ── */}
                {images.length > 1 && (
                    <div className="mt-12 pt-10 border-t border-white/8">
                        <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-6">Galeri Screenshot</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {images.map((src, i) => (
                                <button
                                    key={i}
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
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Prev / Next Nav ── */}
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
