"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

interface AdminMobileHeaderProps {
    onMenuClick: () => void;
}

export default function AdminMobileHeader({ onMenuClick }: AdminMobileHeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#0f0e0f]/95 px-4 text-white backdrop-blur-md md:hidden">
            <Link href="/admin" className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-bold text-sm shadow-sm">
                    AM
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-tight text-white leading-none">
                        Aslam Maulana
                    </span>
                    <span className="text-[11px] text-white/40 font-mono mt-0.5">
                        Admin CMS
                    </span>
                </div>
            </Link>

            <button
                onClick={onMenuClick}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                aria-label="Buka Menu Admin"
            >
                <Menu size={20} />
            </button>
        </header>
    );
}
