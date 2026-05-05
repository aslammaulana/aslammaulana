import { Sparkles, Target } from "lucide-react";

const values = [
    "Graphic Designs",
    "Problem Solver",
    "Ai-First",
    "Market Insighter",
];

const specialties = [
    "Web Designs System",
    "Ai Prompt Engineering",
    "Brand & Visual Identity",
];

export default function AboutSection() {
    return (
        <section id="about" className="relative w-full py-24 border-t border-t-[#ffffff21] overflow-hidden bg-[#0c0c0c]">
           

            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-10 items-stretch">
                {/* ======================== KOLOM KIRI ======================== */}
                <div className="flex flex-col gap-8">
                    
                    {/* Section label + bio */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-sm font-bold tracking-[0.25em] uppercase text-white mb-5">
                    ABOUT ME
                </h2>
                        <p className="text-white/60 text-base leading-relaxed">
                            I&apos;m Aslam, a versatile professional who bridges the gap
                            between design and technology. I transform complex challenges into
                            intuitive digital solutions, specializing in creating responsive
                            interfaces that balance user needs with business goals. From
                            identifying pain points to delivering clean, scalable code, I
                            focus on building products that are fast, reliable, and ready to
                            grow with your business.
                        </p>
                    </div>

                    {/* Pendekatan card */}
                    <div
                        className="rounded-2xl border border-white/10 px-6 py-5 flex flex-col gap-4"
                        style={{
                            background: "rgba(255,255,255,0.03)",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                        }}
                    >
                        <div className="w-8 h-8 rounded-lg bg-[#12231c] border border-white/10 flex items-center justify-center">
                            <Target size={15} className="text-[#2aa076]" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <p className="text-white font-semibold text-sm">The Process</p>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Every project begins with a deep dive into your goals, followed by a structured workflow that prioritizes precision and premium quality.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ======================== KOLOM KANAN ======================== */}
                <div
                    className="rounded-2xl border border-white/10 px-6 py-7 flex flex-col gap-8"
                    style={{
                        background: "rgba(255,255,255,0.03)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                    }}
                >
                    {/* My Values */}
                    <div className="flex flex-col gap-4">
                        <p className="text-[14px] tracking-wider  uppercase text-white font-semibold">
                            My Values
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                            {values.map((v) => (
                                <span
                                    key={v}
                                    className="px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-medium hover:border-white/30 hover:text-white transition-all duration-200 cursor-default"
                                >
                                    {v}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-white/8" />

                    {/* My Specialty */}
                    <div className="flex flex-col gap-4">
                        <p className="text-[14px] tracking-wider  uppercase text-white font-semibold">
                            My Speciality
                        </p>
                        <ul className="flex flex-col gap-3">
                            {specialties.map((s) => (
                                <li key={s} className="flex items-center gap-3 group">
                                    <span className="text-white/30 group-hover:text-white/70 transition-colors duration-200 text-sm leading-none">
                                        ✦
                                    </span>
                                    <span className="text-white/60 group-hover:text-white text-sm transition-colors duration-200">
                                        {s}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
