import { skillItems } from "@/data/skills";

export default function SkillsSection() {
    const programmingSkills = skillItems.filter((s) => s.category === "programming");
    const designSkills = skillItems.filter((s) => s.category === "design");

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

                {/* Programming Pills */}
                <div className="flex flex-wrap gap-3 mb-3">
                    {programmingSkills.map((skill, i) => (
                        <span
                            key={i}
                            className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm bg-white/4 border border-white/15 text-white/80"
                        >
                            {skill.name}
                        </span>
                    ))}
                </div>

                {/* Design Pills */}
                <div className="flex flex-wrap gap-3">
                    {designSkills.map((skill, i) => (
                        <span
                            key={i}
                            className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm bg-[#566bca28] border border-white/15 text-white/80"
                        >
                            {skill.name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
