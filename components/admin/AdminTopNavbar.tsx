"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, User } from "lucide-react";

interface AdminTopNavbarProps {
    email: string;
    onMenuClick: () => void;
}

export default function AdminTopNavbar({ email, onMenuClick }: AdminTopNavbarProps) {
    const pathname = usePathname();

    // Generate dynamic breadcrumb segments based on current pathname
    const getBreadcrumbs = () => {
        const items: { label: string; href?: string }[] = [
            { label: "Admin", href: "/admin" },
        ];

        if (pathname === "/admin") {
            items.push({ label: "Portfolio CMS" });
        } else if (pathname === "/admin/portfolio/new") {
            items.push({ label: "Portfolio CMS", href: "/admin" });
            items.push({ label: "Tambah Portfolio" });
        } else if (pathname.startsWith("/admin/portfolio") && pathname.includes("/edit")) {
            items.push({ label: "Portfolio CMS", href: "/admin" });
            items.push({ label: "Edit Portfolio" });
        } else if (pathname === "/admin/playground") {
            items.push({ label: "Playground CMS" });
        } else if (pathname === "/admin/playground/new") {
            items.push({ label: "Playground CMS", href: "/admin/playground" });
            items.push({ label: "Tambah Playground" });
        } else if (pathname.startsWith("/admin/playground") && pathname.includes("/edit")) {
            items.push({ label: "Playground CMS", href: "/admin/playground" });
            items.push({ label: "Edit Playground" });
        } else {
            items.push({ label: "Dashboard" });
        }

        return items;
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-white/10 bg-[#0f0e0f]/95 px-4 sm:px-6 backdrop-blur-md">
            {/* Left: Mobile Toggle Button + Breadcrumbs */}
            <div className="flex items-center gap-3 min-w-0">
                {/* Mobile Menu Hamburger */}
                <button
                    onClick={onMenuClick}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white transition-colors md:hidden shrink-0 cursor-pointer"
                    aria-label="Toggle menu sidebar"
                >
                    <Menu size={18} />
                </button>

                {/* Breadcrumbs trail */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1">
                    {breadcrumbs.map((crumb, index) => {
                        const isLast = index === breadcrumbs.length - 1;

                        return (
                            <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                                {index > 0 && (
                                    <ChevronRight size={14} className="text-white/30 shrink-0" />
                                )}
                                {crumb.href && !isLast ? (
                                    <Link
                                        href={crumb.href}
                                        className="text-sm text-white/50 hover:text-white transition-colors"
                                    >
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span
                                        className={`text-sm ${
                                            isLast ? "font-semibold text-white" : "text-white/50"
                                        }`}
                                    >
                                        {crumb.label}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>

            {/* Right: Email Admin (Sesuai area kotak merah di gambar) */}
            <div className="flex items-center gap-3 shrink-0 pl-4">
                <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/70 text-xs font-mono select-none"
                    title={`Login sebagai: ${email}`}
                >
                    <User size={13} className="text-white/40 shrink-0" />
                    <span className="truncate max-w-[180px] sm:max-w-[280px]">
                        {email || "admin"}
                    </span>
                </div>
            </div>
        </header>
    );
}
