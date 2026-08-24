"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import AdminNavLink from "./Header/AdminNavLink";

interface DetailNavHeaderProps {
    backHref: string;
    backLabel?: string;
}

const detailNavLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Work", href: "/#work" },
    { label: "Playground", href: "/#playground" },
    { label: "Services", href: "/#services" },
];

export default function DetailNavHeader({ backHref, backLabel = "Back" }: DetailNavHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 15);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMenuOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMenuOpen]);

    return (
        <header className="fixed top-0 left-0 w-full flex justify-center z-50 pt-6 px-4 sm:px-6 pointer-events-none">
            <div className="w-full max-w-[1200px] flex items-center justify-between pointer-events-none">
                {/* ── Left: Back Button ── */}
                <div className="pointer-events-auto">
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-[14px] font-medium transition-all duration-300 shadow-lg cursor-pointer hover:bg-white/15 hover:border-white/30"
                        style={
                            scrolled
                                ? {
                                    background: "rgba(27, 27, 26, 0.85)",
                                    backdropFilter: "blur(12px)",
                                    WebkitBackdropFilter: "blur(12px)",
                                    boxShadow: "0 20px 20px -12px rgba(0, 0, 0, 0.5)",
                                }
                                : {
                                    background: "rgba(255, 255, 255, 0.08)",
                                    backdropFilter: "blur(16px)",
                                    WebkitBackdropFilter: "blur(16px)",
                                }
                        }
                    >
                        <ArrowLeft size={16} />
                        {backLabel}
                    </Link>
                </div>

                {/* ── Right: Sticky Glassmorphism Menu Dropdown ── */}
                <div ref={menuRef} className="relative pointer-events-auto">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center justify-center w-[48px] h-[48px] rounded-full border border-white/20 transition-all duration-300 shadow-lg cursor-pointer hover:bg-white/15"
                        style={
                            scrolled
                                ? {
                                    background: "rgba(27, 27, 26, 0.85)",
                                    backdropFilter: "blur(12px)",
                                    WebkitBackdropFilter: "blur(12px)",
                                    boxShadow: "0 20px 20px -12px rgba(0, 0, 0, 0.5)",
                                }
                                : {
                                    background: "rgba(255, 255, 255, 0.08)",
                                    backdropFilter: "blur(16px)",
                                    WebkitBackdropFilter: "blur(16px)",
                                }
                        }
                        aria-label="Menu"
                    >
                        <div className="relative w-5 h-5 flex items-center justify-center">
                            <div
                                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${
                                    isMenuOpen ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"
                                }`}
                            >
                                <HiOutlineMenuAlt3 className="text-white text-[20px]" />
                            </div>
                            <div
                                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${
                                    isMenuOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50"
                                }`}
                            >
                                <IoClose className="text-white text-[22px]" />
                            </div>
                        </div>
                    </button>

                    {/* Glassmorphism Dropdown List */}
                    <div
                        className={`absolute top-[58px] right-0 p-2 rounded-[20px] border border-white/20 shadow-2xl transition-all duration-300 transform origin-top-right ${
                            isMenuOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"
                        }`}
                        style={{
                            background: "rgba(30, 30, 30, 0.9)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            minWidth: "175px",
                        }}
                    >
                        <div className="flex flex-col gap-1">
                            {detailNavLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between gap-6 px-3.5 py-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                                >
                                    <span className="text-white/90 font-medium text-[14px]">{link.label}</span>
                                    <ArrowUpRight
                                        className="text-white/50 group-hover:text-white transition-colors w-4 h-4"
                                        strokeWidth={2.5}
                                    />
                                </Link>
                            ))}
                            <div className="h-px bg-white/10 my-0.5" />
                            <AdminNavLink onClick={() => setIsMenuOpen(false)} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
