import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Twitter, Globe, ArrowUpRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative  flex items-center pt-16 overflow-hidden">
            {/* Subtle bg gradient accent */}
            <div
                className="absolute top-0 right-0 w-[55%] h-full opacity-20 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 80% 20%, #201c30 0%, transparent 70%)",
                }}
            />

            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-1 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 items-center py-17">
                {/* ======================== KOLOM KIRI ======================== */}
                <div className="flex flex-col gap-6">
                    {/* Badge available */}
                    <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border text-[13px] border-white/20 bg-white/5 text-white/80 text-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                        </span>
                        Available for New Project
                    </div>

                    {/* Heading */}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-4xl lg:text-[60px] font-bold text-white leading-tight tracking-tight">
                            Aslam,
                        </h1>
                        <h2 className="text-4xl lg:text-[60px] font-bold text-white/30 leading-tight tracking-tight">
                            Front-end <span className="text-4xl lg:text-[60px] font-bold text-white leading-tight tracking-tight">Developer.</span>
                        </h2>
                    </div>

                    {/* Tagline */}
                    <p className="text-white/60 text-base lg:text-lg leading-relaxed max-w-sm mt-[-15px]">
                        Crafting meaningful digital experiences that move your
                        business forward
                    </p>

                    {/* CTA buttons */}
                    <div className="flex items-center gap-4 flex-wrap">
                        <Link
                            href="#contact"
                            className="flex items-center gap-1.5 px-6 py-3 rounded-full border border-white/40 text-[#0f0f0e] text-sm font-semibold bg-white hover:bg-[#e9e9e9] hover:text-[#0f0f0e] transition-all duration-300"
                        >
                            Contact Me
                            <ArrowUpRight size={15} strokeWidth={2.5} />
                        </Link>
                        <Link
                            href="#services"
                            className="px-6 py-3 rounded-full border border-white/40 text-white text-sm font-medium bg-white/5 hover:bg-white hover:text-black transition-all duration-300"
                        >
                            See Services
                        </Link>
                    </div>

                    {/* Decorative line */}
                    <div className="w-full h-px bg-[#ffffff21] mt-4" />

                    {/* Social Icons */}
                    <div className="flex items-center gap-7 mt-1">
                        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-200" aria-label="Instagram">
                            <Instagram size={22} strokeWidth={1.75} />
                        </a>
                        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                            <Linkedin size={22} strokeWidth={1.75} />
                        </a>
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-200" aria-label="Twitter / X">
                            <Twitter size={22} strokeWidth={1.75} />
                        </a>
                        <a href="/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-200" aria-label="Website">
                            <Globe size={22} strokeWidth={1.75} />
                        </a>
                    </div>
                </div>

                {/* ======================== KOLOM KANAN ======================== */}
                <div className="relative flex justify-center md:justify-end">
                    {/* Image card container */}
                    <div className="relative w-full max-w-[360px] mx-auto aspect-4/5 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                            src="/homepage/hero-new.jpg"
                            alt="Aslam Maulana — Front-End Developer"
                            fill
                            priority
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        {/* Glassmorphism card info — bottom left */}
                        <div
                            className="absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 border border-white/10"
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
        </section>
    );
}
