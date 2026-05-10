"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { portfolioItems } from "@/data/portfolio";
import type { PortfolioItem } from "@/data/portfolio";
import { X, ExternalLink, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

/* ────────────────────────────────────────────────────
   Inline Lightbox (fullscreen image overlay)
──────────────────────────────────────────────────── */
function Lightbox({
    images,
    startIndex,
    onClose,
}: {
    images: string[];
    startIndex: number;
    onClose: () => void;
}) {
    const [idx, setIdx] = useState(startIndex);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
            if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const close = useCallback(() => {
        setVisible(false);
        setTimeout(onClose, 220);
    }, [onClose]);

    return createPortal(
        <div
            className="fixed inset-0 z-[300] flex items-center justify-center"
            style={{
                background: "rgba(0,0,0,0.92)",
                transition: "opacity 0.22s ease",
                opacity: visible ? 1 : 0,
            }}
            onClick={close}
        >
            {/* Close */}
            <button
                onClick={close}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                aria-label="Close lightbox"
            >
                <X size={20} />
            </button>

            {/* Image */}
            <div
                className="relative w-[90vw] max-w-5xl"
                style={{ aspectRatio: "16/9" }}
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={images[idx]}
                    alt={`Slide ${idx + 1}`}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                />
            </div>

            {/* Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                        aria-label="Next"
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* Dot indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                            className="rounded-full transition-all duration-200"
                            style={{
                                width: idx === i ? "20px" : "6px",
                                height: "6px",
                                background: idx === i ? "#fff" : "rgba(255,255,255,0.4)",
                            }}
                            aria-label={`Slide ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>,
        document.body
    );
}

/* ────────────────────────────────────────────────────
   Portfolio Modal
──────────────────────────────────────────────────── */
function PortfolioModal({
    item,
    onClose,
}: {
    item: PortfolioItem;
    onClose: () => void;
}) {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const images = item.images?.length ? item.images : [item.image];

    const clearAuto = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, []);

    const startAuto = useCallback(() => {
        clearAuto();
        if (images.length <= 1) return;
        intervalRef.current = setInterval(() => {
            setImgIndex((p) => (p + 1) % images.length);
        }, 3000);
    }, [clearAuto, images.length]);

    useEffect(() => {
        setMounted(true);
        requestAnimationFrame(() => setVisible(true));
        startAuto();
        document.body.style.overflow = "hidden";
        return () => {
            clearAuto();
            document.body.style.overflow = "";
        };
    }, [startAuto, clearAuto]);

    const close = useCallback(() => {
        setVisible(false);
        setTimeout(onClose, 260);
    }, [onClose]);

    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "Escape" && !lightboxOpen) close(); };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [close, lightboxOpen]);

    if (!mounted) return null;

    const modalContent = (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
                style={{
                    background: visible ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0)",
                    backdropFilter: visible ? "blur(6px)" : "blur(0px)",
                    WebkitBackdropFilter: visible ? "blur(6px)" : "blur(0px)",
                    transition: "all 0.26s ease",
                }}
                onClick={(e) => { if (e.target === e.currentTarget) close(); }}
            >
                {/* Modal box */}
                <div
                    className="relative w-full max-w-4xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
                    style={{
                        background: "#111213",
                        transition: "transform 0.26s cubic-bezier(.34,1.4,.64,1), opacity 0.26s ease",
                        transform: visible ? "scale(1) translateY(0)" : "scale(0.93) translateY(24px)",
                        opacity: visible ? 1 : 0,
                    }}
                >
                    {/* Close */}
                    <button
                        onClick={close}
                        className="absolute top-4 right-4 z-20 p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>

                    {/* Scrollable inner */}
                    <div
                        className="max-h-[88vh] overflow-y-auto p-6 sm:p-8"
                        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.12) transparent" }}
                    >
                        {/* Two-column grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 lg:gap-8">

                            {/* ── LEFT COLUMN ── */}
                            <div className="flex flex-col gap-4">
                                {/* Carousel with lightbox icon */}
                                <div
                                    className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-[#1a1b1c]"
                                    style={{ aspectRatio: "16/10" }}
                                >
                                    {images.map((src, i) => (
                                        <Image
                                            key={`${src}-${i}`}
                                            src={src}
                                            alt={`${item.title} – ${i + 1}`}
                                            fill
                                            className="object-contain transition-opacity duration-500"
                                            style={{ opacity: imgIndex === i ? 1 : 0 }}
                                            sizes="(max-width: 1024px) 100vw, 55vw"
                                            priority={i === 0}
                                        />
                                    ))}

                                    {/* Lightbox expand icon */}
                                    <button
                                        onClick={() => { clearAuto(); setLightboxOpen(true); }}
                                        className="absolute top-3 right-3 z-10 p-1.5 rounded-md bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all duration-200"
                                        aria-label="Open fullscreen"
                                    >
                                        <ExternalLink size={15} />
                                    </button>

                                    {/* Carousel arrows */}
                                    {images.length > 1 && (
                                        <>
                                            <button
                                                onClick={() => { clearAuto(); setImgIndex((i) => (i - 1 + images.length) % images.length); startAuto(); }}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
                                                aria-label="Previous"
                                            >
                                                <ChevronLeft size={16} />
                                            </button>
                                            <button
                                                onClick={() => { clearAuto(); setImgIndex((i) => (i + 1) % images.length); startAuto(); }}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
                                                aria-label="Next"
                                            >
                                                <ChevronRight size={16} />
                                            </button>
                                        </>
                                    )}

                                    {/* Dot indicators */}
                                    {images.length > 1 && (
                                        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                            {images.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => { clearAuto(); setImgIndex(i); startAuto(); }}
                                                    className="rounded-full transition-all duration-200"
                                                    style={{
                                                        width: imgIndex === i ? "18px" : "5px",
                                                        height: "5px",
                                                        background: imgIndex === i ? "#fff" : "rgba(255,255,255,0.4)",
                                                    }}
                                                    aria-label={`Slide ${i + 1}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Description below image */}
                                <div>
                                    <h3 className="text-xs font-bold tracking-widest uppercase text-white mb-2">
                                        Description
                                    </h3>
                                    <p className="text-sm text-white/55 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* ── RIGHT COLUMN ── */}
                            <div className="flex flex-col gap-5">
                                {/* Title + Published */}
                                <div>
                                    <h2 className="text-xl font-bold text-white leading-snug mb-1">
                                        {item.title}
                                    </h2>
                                    {item.publishedAt && (
                                        <p className="text-sm text-white/40">
                                            Published: {item.publishedAt}
                                        </p>
                                    )}
                                </div>

                                {/* Divider */}
                                <hr className="border-white/10" />

                                {/* Technologies */}
                                {item.tags && item.tags.length > 0 && (
                                    <div className="space-y-2.5">
                                        <h3 className="text-sm font-bold text-white">Technologies</h3>
                                        <div className="flex flex-wrap gap-1.5">
                                            {item.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 py-0.5 rounded-full text-xs border border-white/15 bg-white/5 text-white/70"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Key Features */}
                                {item.features && item.features.length > 0 && (
                                    <div className="space-y-2.5">
                                        <h3 className="text-sm font-bold text-white">Key Features</h3>
                                        <ul className="flex flex-col gap-1.5">
                                            {item.features.map((f, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-white/55">
                                                    <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400/80" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Project URL */}
                                <div className="space-y-2">
                                    <h3 className="text-sm font-bold text-white">Project Url</h3>
                                    {item.previewUrl && item.previewUrl !== "#" ? (
                                        <a
                                            href={item.previewUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 break-all"
                                        >
                                            <span>{item.previewUrl}</span>
                                            <ExternalLink size={12} className="flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                                        </a>
                                    ) : (
                                        <span className="text-sm text-white/30 italic">Not available</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <Lightbox
                    images={images}
                    startIndex={imgIndex}
                    onClose={() => { setLightboxOpen(false); startAuto(); }}
                />
            )}
        </>
    );

    return createPortal(modalContent, document.body);
}

/* ────────────────────────────────────────────────────
   Main Section
──────────────────────────────────────────────────── */
export default function PortfolioSection() {
    const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

    return (
        <>
            <section
                id="work"
                className="relative w-full py-10 overflow-hidden border-t border-t-[#ffffff21] bg-[#0e0f0f]"
            >
                <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4">
                    <h2 className="text-sm font-bold tracking-[0.25em] uppercase text-white mb-10">
                        Selected Portofolio
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {portfolioItems.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col rounded-2xl border border-white/10 overflow-hidden group"
                                style={{
                                    background: "rgba(255,255,255,0.03)",
                                    backdropFilter: "blur(8px)",
                                    WebkitBackdropFilter: "blur(8px)",
                                }}
                            >
                                <div className="relative w-full h-[260px] shrink-0 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, 33vw"
                                    />
                                </div>

                                <div className="flex flex-col flex-1 gap-4 p-6">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-2 h-2 rounded-full inline-block"
                                            style={{ background: index % 2 === 0 ? "#3b82f6" : "#ef4444" }}
                                        />
                                        <span
                                            className="text-sm font-medium"
                                            style={{ color: index % 2 === 0 ? "#60a5fa" : "#f87171" }}
                                        >
                                            {item.category}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white leading-snug">{item.title}</h3>

                                    <p className="text-white/50 text-sm leading-relaxed line-clamp-3">
                                        {item.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-medium hover:border-white/30 hover:text-white transition-all duration-200"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setActiveItem(item)}
                                        className="inline-flex items-center gap-1.5 text-white font-semibold text-sm underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all duration-200 w-fit mt-auto pt-2 cursor-pointer"
                                    >
                                        Get Preview
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14" height="14"
                                            viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round" strokeLinejoin="round"
                                            className="mt-px"
                                        >
                                            <path d="M7 17 17 7" />
                                            <path d="M7 7h10v10" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {activeItem && (
                <PortfolioModal
                    item={activeItem}
                    onClose={() => setActiveItem(null)}
                />
            )}
        </>
    );
}
