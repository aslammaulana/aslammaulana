"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function Lightbox({
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
            <button
                onClick={close}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                aria-label="Close lightbox"
            >
                <X size={20} />
            </button>

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
