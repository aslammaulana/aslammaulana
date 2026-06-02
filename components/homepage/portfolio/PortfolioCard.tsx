"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";

export function PortfolioCard({
    item,
    onClick,
}: {
    item: PortfolioItem;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="relative w-full text-left group cursor-pointer focus:outline-none"
            aria-label={`View ${item.title}`}
        >
            {/* ── Wrapper dengan padding = jarak main card ke back frame ── */}
            <div className="relative w-full p-[8px]">

                {/* ── Back frame — full size, rim light here (like HeroSection outer layer) ── */}
                <div className="absolute inset-0 rounded-[22px] border border-[#292929] bg-[#191819] overflow-hidden transition-all duration-300 ">
                    {/* Rim light top */}
                    <div
                        className="absolute top-0 left-0 right-0 z-10 rounded-t-[22px]"
                        style={{
                            height: "1px",
                            background:
                                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 10%, rgba(255,255,255,0.55) 38%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.55) 62%, rgba(255,255,255,0) 90%, transparent 100%)",
                        }}
                    />
                    {/* Inner glow */}
                    <div
                        className="absolute top-0 left-0 right-0 pointer-events-none"
                        style={{
                            height: "60px",
                            background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
                        }}
                    />
                </div>

                {/* ── Main card — sits inside the padding of wrapper ── */}
                <div
                    className="relative rounded-[17px] border border-[#636363] overflow-hidden transition-all duration-300 group-hover:border-white/20 max-md:[--card-color:var(--item-color)] md:[--card-color:#353535] md:group-hover:[--card-color:var(--item-color)]"
                    style={{
                        background: `radial-gradient(circle at center 10%, var(--card-color) 0%, #1a1a1a 100%)`,
                        "--item-color": `#${item.color}`,
                    } as React.CSSProperties}
                >

                    {/* Rim light top */}
                    <div
                        className="absolute top-0 left-0 right-0 z-10 rounded-t-[17px]"
                        style={{
                            height: "1px",
                            background:
                                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 10%, rgba(255,255,255,0.4) 38%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 62%, rgba(255,255,255,0) 90%, transparent 100%)",
                        }}
                    />

                    {/* Inner top glow */}
                    <div
                        className="absolute top-0 left-0 right-0 pointer-events-none z-[5]"
                        style={{
                            height: "50px",
                            background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
                        }}
                    />

                    {/* Header info */}
                    <div className="relative z-10 flex items-start justify-between gap-3 px-6 pt-5 pb-4">
                        <div className="flex flex-col gap-1 min-w-0">
                            <p className="text-white text-[16px] mb-1 font-bold leading-snug">{item.category}</p>
                            <p className="text-white/50 text-[13px] leading-normal">
                                <span className="text-white/85 font-medium">{item.title}</span>
                                <span className="mx-1 text-white/30">—</span>
                                <span>{item.description}</span>
                            </p>
                        </div>
                        <div className="shrink-0 mt-0.5 p-1.5 rounded-lg border border-white/15 bg-white/5 text-white/60 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-200">
                            <ArrowUpRight size={16} strokeWidth={2} />
                        </div>
                    </div>

                    {/* Image area */}
                    <div
                        className="relative mx-[17px] mb-[-1px]  rounded-t-[11px] overflow-hidden border border-white/10"
                        style={{ aspectRatio: "16/10" }}
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </div>
                </div>
            </div>
        </button>
    );
}
