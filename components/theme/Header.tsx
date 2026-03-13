"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skill", href: "#skill" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        /* Wrapper: full-width tapi hanya untuk positioning */
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-6">
            <header
                className={`w-full max-w-[1200px] flex items-center justify-between px-6 h-18 rounded-2xl border transition-all duration-500 ${scrolled
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

                {/* CTA Button */}
                <Link
                    href="#contact"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 text-white text-sm font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-200 group"
                >
                    {/* Mail Icon */}
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
            </header>
        </div>
    );
}
