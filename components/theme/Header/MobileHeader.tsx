"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { ArrowUpRight } from "lucide-react";
import { navLinks } from "./navLinks";
import AdminNavLink from "./AdminNavLink";

export default function MobileHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className="md:hidden">
            {/* Glassmorphism Logo (Not Sticky) */}
            <div className="absolute top-0 left-0 px-4 h-24 flex items-center z-40 pointer-events-none">
                <Link
                    href="/"
                    className="pointer-events-auto hover:opacity-80 transition-opacity px-5 py-3.5 rounded-full border border-white/10 shadow-lg flex items-center justify-center"
                    style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                    }}
                >
                    <Image
                        src="/assets/LogoAslamMaulana.svg"
                        alt="Aslam Maulana Logo"
                        width={140}
                        height={28}
                        priority
                    />
                </Link>
            </div>

            {/* Glassmorphism Icon Button (Sticky) */}
            <div className="fixed top-0 right-0 px-4 h-24 flex items-center z-50 pointer-events-none">
                <div ref={menuRef} className="relative pointer-events-auto">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="cursor-pointer rounded-full border border-white/10 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-white/10 relative overflow-hidden w-[46px] h-[46px]"
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
                        className={`absolute top-[56px] right-0 p-2 rounded-[20px] border border-white/10 shadow-2xl transition-all duration-300 transform origin-top-right ${isMenuOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"}`}
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
                            <div className="h-px bg-white/10 my-0.5" />
                            <AdminNavLink onClick={() => setIsMenuOpen(false)} isMobile />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
