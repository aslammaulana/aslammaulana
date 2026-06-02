"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaForwardStep } from "react-icons/fa6";
import { useTheme } from "next-themes";
import { TbMenu4 } from "react-icons/tb";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Skill", href: "#skill" },
    { label: "Services", href: "#services" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        let lastY = window.scrollY;
        let pastExperience = false;

        // Track whether user has scrolled past #experience
        const experienceSection = document.querySelector("#experience");
        let observer: IntersectionObserver | null = null;

        if (experienceSection) {
            observer = new IntersectionObserver(
                ([entry]) => {
                    pastExperience = entry.boundingClientRect.top < 0;
                    // Immediately hide if we're past the section
                    if (pastExperience) setHidden(true);
                },
                { threshold: 0 }
            );
            observer.observe(experienceSection);
        }

        const onScroll = () => {
            const currentY = window.scrollY;
            setScrolled(currentY > 10);

            if (currentY > lastY && currentY > 80) {
                // scrolling down
                setHidden(true);
            } else if (!pastExperience) {
                // scrolling up AND not past experience section
                setHidden(false);
            }
            lastY = currentY;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            observer?.disconnect();
        };
    }, []);



    const isDark = theme === "dark";

    return (
        <>
            {/* ── MOBILE VIEW ── */}
            <div className="md:hidden">
                {/* Logo (Not Sticky) */}
                <div className="absolute top-0 left-0 right-0 px-4 h-24 flex items-center z-40 pointer-events-none">
                    <Link href="/" className="pointer-events-auto hover:opacity-80 transition-opacity">
                        <Image
                            src="/assets/LogoAslamMaulana.svg"
                            alt="Aslam Maulana Logo"
                            width={150}
                            height={32}
                            priority
                        />
                    </Link>
                </div>

                {/* Sticky Icon Button */}
                <div className="fixed top-0 right-0 px-3 h-24 flex items-center z-50 pointer-events-none">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="pointer-events-auto cursor-pointer rounded-full border border-white/10 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-white/10 relative overflow-hidden w-[46px] h-[46px]"
                        style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                        }}
                        aria-label="Menu"
                    >
                        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${isMenuOpen ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"}`}>
                            <HiOutlineMenuAlt3 className="text-white text-lg" />
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${isMenuOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50"}`}>
                            <IoClose className="text-white text-xl" />
                        </div>
                    </button>

                    {/* Glassmorphism Dropdown */}
                    <div
                        className={`absolute top-[80px] right-6 p-2 rounded-[20px] border border-white/10 shadow-2xl transition-all duration-300 transform origin-top-right pointer-events-auto ${isMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
                        style={{
                            background: "rgba(30, 30, 30, 0.8)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            minWidth: "160px",
                        }}
                    >
                        <div className="flex flex-col gap-1.5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between gap-6 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
                                >
                                    <span className="text-white font-medium text-[13px]">{link.label}</span>
                                    <ArrowUpRight className="text-white/60 w-5 h-5 shrink-0" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── DESKTOP VIEW ── */}
            <div className={`hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center px-6 pt-6 transition-all duration-500 ${hidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}>
                <header
                    className={`w-full max-w-[1200px] flex items-center justify-between px-6 h-18 rounded-2xl border transition-all duration-100 ${scrolled
                        ? "border-white/8 shadow-2xl shadow-black/50"
                        : "bg-white/8 backdrop-blur-lg border-white/10"
                        }`}
                    style={
                        scrolled
                            ? {
                                background: "rgba(10,10,10,0.75)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                            }
                            : {
                                background: "rgba(255,255,255,0.06)",
                                backdropFilter: "blur(16px)",
                                WebkitBackdropFilter: "blur(16px)",
                            }
                    }
                >
                    {/* Logo */}
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <Image
                            src="/assets/LogoAslamMaulana.svg"
                            alt="Aslam Maulana Logo"
                            width={150}
                            height={32}
                            priority
                        />
                    </Link>

                    {/* Nav Links */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-white/65 text-sm font-medium hover:text-white transition-colors duration-200 relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </nav>

                    {/* Right side: Theme toggle + CTA */}
                    <div className="flex items-center gap-3">


                        {/* CTA Button */}
                        <Link
                            href="#contact"
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 text-white text-sm font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-200 group"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            Start a Project
                        </Link>
                    </div>
                </header>
            </div>
        </>
    );
}
