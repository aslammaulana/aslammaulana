"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopNavbar from "./AdminTopNavbar";

interface AdminShellProps {
    email: string;
    children: React.ReactNode;
}

export default function AdminShell({ email, children }: AdminShellProps) {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // Lock body scroll when mobile sidebar is open
    useEffect(() => {
        if (mobileSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileSidebarOpen]);

    return (
        <div className="min-h-screen bg-[#0f0e0f] text-white flex flex-col selection:bg-white/20 selection:text-white">
            {/* Sidebar (Desktop Hover Expand + Mobile Drawer) */}
            <AdminSidebar
                mobileOpen={mobileSidebarOpen}
                onMobileClose={() => setMobileSidebarOpen(false)}
            />

            {/* Mobile Backdrop Overlay */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 z-[45] bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
                    onClick={() => setMobileSidebarOpen(false)}
                    aria-label="Tutup menu sidebar"
                />
            )}

            {/* Main Content Area (With Desktop 64px offset) */}
            <div className="flex-1 md:pl-[64px] min-w-0 flex flex-col transition-all duration-300">
                {/* Top Navbar / Header with Breadcrumbs and Email */}
                <AdminTopNavbar
                    email={email}
                    onMenuClick={() => setMobileSidebarOpen((prev) => !prev)}
                />

                {/* Page Content */}
                <main className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}


