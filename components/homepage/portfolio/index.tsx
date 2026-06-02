"use client";

import { useState } from "react";
import { portfolioItems } from "@/data/portfolio";
import type { PortfolioItem } from "@/data/portfolio";
import { PortfolioCard } from "./PortfolioCard";
import { PortfolioModal } from "./PortfolioModal";

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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolioItems.map((item, index) => (
                            <PortfolioCard
                                key={index}
                                item={item}
                                onClick={() => setActiveItem(item)}
                            />
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
