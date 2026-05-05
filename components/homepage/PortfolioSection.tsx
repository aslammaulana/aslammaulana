import Image from "next/image";
import { portfolioItems } from "@/data/data";

export default function PortfolioSection() {
    return (
        <section
            id="work"
            className="relative w-full py-10 overflow-hidden border-t border-t-[#ffffff21] bg-[#0e0f0f]"
        >
          

            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4">
                {/* Heading */}
                <h2 className="text-sm font-bold tracking-[0.25em] uppercase text-white mb-10">
                    Selected Portofolio
                </h2>

                {/* Grid: 2 cols desktop & tablet, 1 col mobile */}
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
                            {/* Image */}
                            <div className="relative w-full h-[260px] shrink-0 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, 50vw"
                                />
                            </div>

                            {/* Text */}
                            <div className="flex flex-col flex-1 gap-4 p-6">
                                {/* Category badge */}
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-2 h-2 rounded-full inline-block"
                                        style={{
                                            background:
                                                index % 2 === 0
                                                    ? "#3b82f6"
                                                    : "#ef4444",
                                        }}
                                    />
                                    <span
                                        className="text-sm font-medium"
                                        style={{
                                            color:
                                                index % 2 === 0
                                                    ? "#60a5fa"
                                                    : "#f87171",
                                        }}
                                    >
                                        {item.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-white leading-snug">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/50 text-sm leading-relaxed line-clamp-3">
                                    {item.description}
                                </p>

                                {/* Tags */}
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

                                {/* Preview link */}
                                <a
                                    href={item.previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-white font-semibold text-sm underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all duration-200 w-fit mt-auto pt-2"
                                >
                                    Get Preview
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mt-px"
                                    >
                                        <path d="M7 17 17 7" />
                                        <path d="M7 7h10v10" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
