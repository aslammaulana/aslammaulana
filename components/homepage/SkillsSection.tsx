import { skillItems } from "@/data/skills";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function SkillsSection() {
    const programmingSkills = skillItems.filter((s) => s.category === "programming");
    const designSkills = skillItems.filter((s) => s.category === "design");

    return (
        <section
            id="skill"
            className="relative w-full py-10 border-t border-t-[#ffffff21] bg-[#0A0A0A]"
        >
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4">
                {/* 1. Text: Skills */}
                <ScrollReveal animation="fade-up" duration={800} delay={0}>
                    <h2 className="text-sm font-bold tracking-[0.25em] uppercase text-white mb-6">
                        Skills
                    </h2>
                </ScrollReveal>

                {/* 2. Tag Category: Programming */}
                <ScrollReveal animation="fade-up" duration={800} delay={100}>
                    <div className="flex flex-wrap gap-3 mb-3">
                        {programmingSkills.map((skill, i) => (
                            <span
                                key={i}
                                className="px-4 py-2 rounded-full text-sm font-medium bg-white/[0.07] border border-white/15 text-white/80"
                            >
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>

                {/* 3. Tag Category: Design */}
                <ScrollReveal animation="fade-up" duration={800} delay={200}>
                    <div className="flex flex-wrap gap-3">
                        {designSkills.map((skill, i) => (
                            <span
                                key={i}
                                className="px-4 py-2 rounded-full text-sm font-medium bg-[#0c47789d] border border-white/15 text-white/80"
                            >
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
