import { skillItems } from "@/data/data";

export default function SkillsSection() {
    return (
        <section
            id="skill"
            className="relative w-full py-10 border-t border-t-[#ffffff21] bg-[#0c0d0d]"
        >
           

            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4">
                {/* Heading */}
                <h2 className="text-sm font-bold tracking-[0.25em] uppercase text-white mb-6">
                    Skills
                </h2>

                {/* Pills */}
                <div className="flex flex-wrap gap-3">
                    {skillItems.map((skill, i) => (
                        <span
                            key={i}
                            className="px-4 py-2 rounded-full border border-white/15 text-white/80 text-sm font-medium"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                backdropFilter: "blur(6px)",
                                WebkitBackdropFilter: "blur(6px)",
                            }}
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
