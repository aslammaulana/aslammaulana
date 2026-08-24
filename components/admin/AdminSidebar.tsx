"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Briefcase,
    Sparkles,
    Home,
    LogOut,
    X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AdminSidebarProps {
    mobileOpen?: boolean;
    onMobileClose?: () => void;
}

export default function AdminSidebar({
    mobileOpen = false,
    onMobileClose,
}: AdminSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    // Auto-close mobile sidebar when route changes
    useEffect(() => {
        if (onMobileClose) onMobileClose();
    }, [pathname]);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
    };

    const isPortfolioActive = pathname === "/admin" || pathname.startsWith("/admin/portfolio");
    const isPlaygroundActive = pathname.startsWith("/admin/playground");

    const renderNavContent = (isMobile: boolean) => (
        <div className="flex flex-col flex-1 justify-between py-4">
            {/* Main Navigation Links */}
            <div className="flex flex-col gap-1.5 px-2">
                <Link
                    href="/admin"
                    onClick={isMobile ? onMobileClose : undefined}
                    className={`flex h-10 w-full items-center rounded-xl px-3 transition-colors ${
                        isPortfolioActive
                            ? "bg-white/15 text-white font-medium border border-white/10 shadow-sm"
                            : "text-zinc-400 hover:bg-white/10 hover:text-white"
                    }`}
                    title="Portfolio CMS"
                >
                    <div className="relative shrink-0 flex items-center justify-center">
                        <Briefcase size={18} />
                    </div>
                    <span
                        className={`ml-3 overflow-hidden text-sm font-medium whitespace-nowrap ${
                            isMobile
                                ? "opacity-100"
                                : "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        }`}
                    >
                        Portfolio CMS
                    </span>
                </Link>

                <Link
                    href="/admin/playground"
                    onClick={isMobile ? onMobileClose : undefined}
                    className={`flex h-10 w-full items-center rounded-xl px-3 transition-colors ${
                        isPlaygroundActive
                            ? "bg-white/15 text-white font-medium border border-white/10 shadow-sm"
                            : "text-zinc-400 hover:bg-white/10 hover:text-white"
                    }`}
                    title="Playground CMS"
                >
                    <div className="relative shrink-0 flex items-center justify-center">
                        <Sparkles size={18} />
                    </div>
                    <span
                        className={`ml-3 overflow-hidden text-sm font-medium whitespace-nowrap ${
                            isMobile
                                ? "opacity-100"
                                : "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        }`}
                    >
                        Playground CMS
                    </span>
                </Link>
            </div>

            {/* Bottom Section: Homepage, Logout */}
            <div className="mt-auto px-2 flex flex-col gap-1.5 pt-4 border-t border-white/10">
                {/* Back to Homepage */}
                <Link
                    href="/"
                    onClick={isMobile ? onMobileClose : undefined}
                    className="flex h-10 w-full items-center rounded-xl px-3 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
                    title="Kembali ke Homepage"
                >
                    <div className="relative shrink-0 flex items-center justify-center">
                        <Home size={18} />
                    </div>
                    <span
                        className={`ml-3 overflow-hidden text-sm font-medium whitespace-nowrap ${
                            isMobile
                                ? "opacity-100"
                                : "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        }`}
                    >
                        Kembali ke Web
                    </span>
                </Link>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex h-10 w-full items-center rounded-xl px-3 text-red-400/80 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer text-left"
                    title="Logout"
                >
                    <div className="relative shrink-0 flex items-center justify-center">
                        <LogOut size={18} />
                    </div>
                    <span
                        className={`ml-3 overflow-hidden text-sm font-medium whitespace-nowrap ${
                            isMobile
                                ? "opacity-100"
                                : "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        }`}
                    >
                        Logout
                    </span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* ── DESKTOP SIDEBAR — HOVER TO EXPAND ── */}
            <aside className="group hidden md:flex fixed left-0 top-0 z-40 h-screen w-[64px] flex-col border-r border-white/10 bg-[#0f0e0f]/95 backdrop-blur-xl transition-all duration-300 ease-in-out hover:w-[240px] overflow-y-auto overflow-x-hidden select-none">
                {/* Desktop Header / Logo */}
                <Link
                    href="/admin"
                    className="flex h-14 items-center gap-3 px-3.5 border-b border-white/10 shrink-0"
                >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-black font-bold text-sm shadow-md">
                        AM
                    </div>
                    <div className="flex flex-col opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap overflow-hidden">
                        <span className="text-sm font-semibold tracking-tight text-white leading-none">
                            Aslam Maulana
                        </span>
                        <span className="text-[11px] text-white/40 font-mono mt-1">
                            Admin CMS
                        </span>
                    </div>
                </Link>

                {renderNavContent(false)}
            </aside>

            {/* ── MOBILE SIDEBAR — SLIDE IN DRAWER ── */}
            <aside
                className={`fixed left-0 top-0 z-50 h-screen w-[80%] max-w-[300px] flex flex-col border-r border-white/10 bg-[#0f0e0f] overflow-y-auto overflow-x-hidden transition-transform duration-300 ease-in-out md:hidden select-none ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Mobile Header in Drawer */}
                <div className="flex h-14 items-center justify-between px-4 border-b border-white/10 shrink-0">
                    <Link
                        href="/admin"
                        onClick={onMobileClose}
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-bold text-sm">
                            AM
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-white leading-none">
                                Aslam Maulana
                            </span>
                            <span className="text-[11px] text-white/40 font-mono mt-0.5">
                                Admin CMS
                            </span>
                        </div>
                    </Link>
                    <button
                        onClick={onMobileClose}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                {renderNavContent(true)}
            </aside>
        </>
    );
}
