"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Home } from "lucide-react";
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
        if (pathname === "/admin") return "Portfolio CMS";
        if (pathname === "/admin/portfolio/new") return "Tambah Portfolio";
        if (pathname.startsWith("/admin/portfolio/") && pathname.includes("/edit")) return "Edit Portfolio";
        if (pathname === "/admin/playground") return "Playground CMS";
        if (pathname === "/admin/playground/new") return "Tambah Playground";
        if (pathname.startsWith("/admin/playground/") && pathname.includes("/edit")) return "Edit Playground";
        return "Dashboard";
    };

    const isPortfolioActive = pathname === "/admin" || pathname.startsWith("/admin/portfolio");
    const isPlaygroundActive = pathname.startsWith("/admin/playground");

    return (
        <header
            className="w-full sticky top-0 z-50 border-b border-white/8"
            style={{ background: "rgba(15,14,15,0.92)", backdropFilter: "blur(12px)" }}
        >
            <div className="w-full max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between gap-4">
                {/* Left: Homepage Button + Admin logo + Tabs + breadcrumb */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/70 text-xs font-medium hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-200 group"
                        title="Kembali ke Homepage"
                    >
                        <Home size={13} className="text-white/50 group-hover:text-white transition-colors" />
                        <span className="hidden sm:inline">Homepage</span>
                    </Link>

                    <div className="h-4 w-px bg-white/10" />

                    {/* Nav Switcher Tabs */}
                    <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/8">
                        <Link
                            href="/admin"
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                                isPortfolioActive
                                    ? "bg-white/15 text-white shadow-sm"
                                    : "text-white/50 hover:text-white/80"
                            }`}
                        >
                            Portfolio
                        </Link>
                        <Link
                            href="/admin/playground"
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                                isPlaygroundActive
                                    ? "bg-white/15 text-white shadow-sm"
                                    : "text-white/50 hover:text-white/80"
                            }`}
                        >
                            Playground
                        </Link>
                    </div>

                    {pathname !== "/admin" && pathname !== "/admin/playground" && (
                        <div className="hidden md:flex items-center gap-2">
                            <span className="text-white/20">/</span>
                            <span className="text-xs text-white/50">{breadcrumb()}</span>
                        </div>
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
