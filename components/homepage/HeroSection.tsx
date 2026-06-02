import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaLinkedin, FaSquareGithub, FaInstagram } from "react-icons/fa6";

export default function HeroSection() {
    return (
        <section className="relative  flex items-center pt-16 overflow-hidden">


            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-1 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 items-center py-17">
                {/* ======================== KOLOM KIRI ======================== */}
                <div className="flex flex-col gap-6">
                    {/* Badge available */}
                    <div className="inline-flex items-center gap-2 w-fit  rounded-full  text-[13px] font-semibold uppercase text-white/50 text-sm">
                        <span className="relative flex h-2 w-2 mr-1">
                            <span
                                className="relative inline-flex rounded-full h-2 w-2 bg-white"
                                style={{
                                    filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 1))",
                                }}
                            />
                        </span>
                        Aslam - Web Developer
                    </div>

                    {/* Heading */}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-4xl lg:text-[45px] font-semibold text-white leading-snug tracking-tight"
                        >
                            Crafting meaningful digital experiences that move your
                            <span
                                className="text-4xl lg:text-[45px] font-bold leading-tight tracking-tight"
                                style={{
                                    fontFamily: "var(--font-croissant)",
                                    fontStyle: "italic",
                                    background: "linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.3) 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    filter: "drop-shadow(0 0 4px rgba(255,255,255,0.45))",
                                }}
                            > business forward.</span>
                        </h1>
                    </div>

                    {/* CTA buttons */}
                    <div className="flex items-center gap-4 flex-wrap mt-3">
                        <Link
                            href="#contact"
                            className="flex items-center gap-1.5 px-6 py-3 rounded-full border border-white/40 text-[#0f0f0e] text-sm font-semibold bg-white hover:bg-[#e9e9e9] hover:text-[#0f0f0e] transition-all duration-300"
                        >
                            Resume
                            <ArrowUpRight size={15} strokeWidth={2.5} />
                        </Link>

                    </div>

                    {/* Decorative line */}
                    <div className="w-full h-px bg-[#ffffff21] mt-4" />

                    {/* Social Icons */}
                    <div className="flex items-center gap-5 mt-1">
                        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                            <FaLinkedin size={28} />
                        </a>
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors duration-200" aria-label="GitHub">
                            <FaSquareGithub size={28} />
                        </a>
                        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors duration-200" aria-label="Instagram">
                            <FaInstagram size={28} />
                        </a>
                    </div>
                </div>


                {/* ======================== KOLOM KANAN ======================== */}
                <div className="relative flex justify-center md:justify-end">
                    <div className="relative w-full max-w-[360px] mx-auto">

                        {/* Layer belakang — ukuran penuh, gradient rim light di sini */}
                        <div className="absolute inset-0 rounded-[22px] border border-[#636363] bg-[#303030] overflow-hidden">
                            {/* Gradient rim light */}
                            <div
                                className="absolute top-0 left-0 right-0 z-10 rounded-t-3xl"
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

                        {/* Card utama — 7px lebih kecil kiri & kanan */}
                        <div className="relative m-[10px] aspect-4/5 rounded-[15px] overflow-hidden border border-white/10 shadow-2xl">
                            <Image
                                src="/homepage/hero-new2.png"
                                alt="Aslam Maulana — Front-End Developer"
                                fill
                                priority
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* Glassmorphism card info */}
                            <div
                                className="absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 border border-white/10 z-10"
                                style={{
                                    background: "rgba(0,0,0,0.55)",
                                    backdropFilter: "blur(12px)",
                                    WebkitBackdropFilter: "blur(12px)",
                                }}
                            >

                                <p className="text-white font-semibold text-sm">AslamMln</p>
                                <p className="text-white/50 text-xs mt-0.5">
                                    Frontend Developer &nbsp;|&nbsp; CMS Specialist
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
