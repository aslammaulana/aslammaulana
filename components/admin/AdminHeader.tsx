"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminHeader({ email }: { email: string }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
    };

    const breadcrumb = () => {
        if (pathname === "/admin") return "Dashboard";
        if (pathname === "/admin/portfolio/new") return "Tambah Portfolio";
        if (pathname.includes("/edit")) return "Edit Portfolio";
        return "Admin";
    };

    return (
        <header
            className="w-full sticky top-0 z-50 border-b border-white/8"
            style={{ background: "rgba(15,14,15,0.92)", backdropFilter: "blur(12px)" }}
        >
            <div className="w-full max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between gap-4">
                {/* Left: logo + breadcrumb */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                    >
                        <LayoutDashboard size={18} />
                        <span className="text-sm font-semibold">Admin</span>
                    </Link>
                    {pathname !== "/admin" && (
                        <>
                            <span className="text-white/20">/</span>
                            <span className="text-sm text-white/50">{breadcrumb()}</span>
                        </>
                    )}
                </div>

                {/* Right: email + logout */}
                <div className="flex items-center gap-3">
                    <span className="text-white/40 text-xs hidden sm:block">{email}</span>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 text-xs hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-200"
                    >
                        <LogOut size={13} />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
