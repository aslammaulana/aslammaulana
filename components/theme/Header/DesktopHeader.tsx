"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { navLinks } from "./navLinks";
import AdminNavLink from "./AdminNavLink";

interface DesktopHeaderProps {
    scrolled: boolean;
}

export default function DesktopHeader({ scrolled }: DesktopHeaderProps) {
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
        <div className="hidden md:block pointer-events-none ">
            {/* Glassmorphism Logo (Not Sticky) */}
            <div className="absolute top-0 left-0 w-full flex justify-center z-40 pointer-events-none pt-6">
                <div className="w-full max-w-[1280px] px-6 pt-6 flex justify-start">
                    <div className="pointer-events-auto">
                        <Link
                            href="/"
                            className="flex items-center justify-center px-6 py-4 rounded-[15px] border border-white/20 transition-all duration-300 hover:bg-white/5 shadow-lg bg-[#1B1B1A] "
                        >
                            <Image
                                src="/assets/LogoAslamMaulana.svg"
                                alt="Aslam Maulana Logo"
                                width={150}
                                height={32}
                                priority
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Glassmorphism Menu Dropdown (Sticky) */}
            <div
                className="fixed top-0 left-0 w-full flex justify-center z-50 pt-6 pointer-events-none"
            >
                <div className="w-full max-w-[1280px] px-6 pt-6 flex justify-end">
                    <div ref={menuRef} className="relative pointer-events-auto">
                        {/* Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center justify-center w-[48px] h-[48px] rounded-full border border-white/30 transition-all duration-300 shadow-lg cursor-pointer hover:bg-white/10"
                            style={
                                scrolled
                                    ? {
                                        background: "rgba(27, 27, 26, 0.85)",
                                        backdropFilter: "blur(3px)",
                                        WebkitBackdropFilter: "blur(3px)",
                                        boxShadow: "0 20px 20px -12px rgba(0, 0, 0, 0.5)",
                                    }
                                    : {
                                        background: "rgba(255, 255, 255, 0.05)",
                                        backdropFilter: "blur(16px)",
                                        WebkitBackdropFilter: "blur(16px)",
                                    }
                            }
                        >
                            <div className="relative w-5 h-5 flex items-center justify-center">
                                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${isMenuOpen ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"}`}>
                                    <HiOutlineMenuAlt3 className="text-white text-[20px]" />
                                </div>
                                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${isMenuOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50"}`}>
                                    <IoClose className="text-white text-[22px]" />
                                </div>
                            </div>
                        </button>

                        {/* Glassmorphism Dropdown List */}
                        <div
                            className={`absolute top-[68px] right-0 p-2 rounded-[20px] border  border-white/20 shadow-2xl transition-all duration-300 transform origin-top-right ${isMenuOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"}`}
                            style={{
                                background: "rgba(30,30,30,0.85)",
                                backdropFilter: "blur(24px)",
                                WebkitBackdropFilter: "blur(24px)",
                                minWidth: "170px",
                            }}
                        >
                            <div className="flex flex-col gap-1.5">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-between gap-6 px-3 py-3 rounded-xl  hover:bg-white/10 transition-colors group "
                                    >
                                        <span className="text-white/90 font-medium text-[15px]">{link.label === "Services" ? "Service" : link.label}</span>
                                        <ArrowUpRight className="text-white/50 group-hover:text-white transition-colors w-[18px] h-[18px]" strokeWidth={2.5} />
                                    </Link>
                                ))}
                                <div className="h-px bg-white/10 my-0.5" />
                                <AdminNavLink onClick={() => setIsMenuOpen(false)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
