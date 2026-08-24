"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ArrowUpRight } from "lucide-react";

interface AdminNavLinkProps {
    onClick?: () => void;
    isMobile?: boolean;
}

export default function AdminNavLink({ onClick, isMobile = false }: AdminNavLinkProps) {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data }) => {
            setIsAdmin(!!data.user);
        });

        // Listen to auth state changes (e.g. login/logout in another tab or session)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAdmin(!!session?.user);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // masih loading — jangan tampilkan apapun agar tidak flicker
    if (isAdmin === null) return null;

    if (isMobile) {
        return (
            <Link
                href={isAdmin ? "/admin" : "/admin/login"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClick}
                className="flex items-center justify-between gap-6 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
            >
                <span className="text-white font-medium text-[13px]">
                    {isAdmin ? "Admin" : "Login"}
                </span>
                <ArrowUpRight className="text-white/60 group-hover:text-white transition-colors w-5 h-5 shrink-0" />
            </Link>
        );
    }

    return (
        <Link
            href={isAdmin ? "/admin" : "/admin/login"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            className="flex items-center justify-between gap-6 px-3 py-3 rounded-xl hover:bg-white/10 transition-colors group"
        >
            <span className="text-white/90 font-medium text-[15px]">
                {isAdmin ? "Admin" : "Login"}
            </span>
            <ArrowUpRight className="text-white/50 group-hover:text-white transition-colors w-[18px] h-[18px]" strokeWidth={2.5} />
        </Link>
    );
}
