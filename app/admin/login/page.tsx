import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LoginForm from "@/components/admin/LoginForm";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const params = await searchParams;
    const error = params?.error;

    return (
        <div className="min-h-screen bg-[#0F0E0F] flex flex-col justify-between py-6 px-4 sm:px-6">
            {/* Top Bar: Back to Homepage (aligned to max-w-[1200px]) */}
            <div className="w-full max-w-[1200px] mx-auto pt-2">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10 text-sm font-medium transition-all duration-200 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
                    <span>Kembali ke Beranda</span>
                </Link>
            </div>

            {/* Main Center Area: Login Card (bounded by max-w-[1200px]) */}
            <div className="w-full max-w-[1200px] mx-auto flex-1 flex flex-col items-center justify-center my-8">
                <div className="w-full max-w-[380px]">
                    {/* Card */}
                    <div
                        className="rounded-2xl border border-white/10 p-7 shadow-2xl"
                        style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}
                    >
                        <h1 className="text-white font-bold text-lg mb-6">Masuk ke Dashboard</h1>

                        {error && (
                            <div className="mb-4 p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs leading-relaxed">
                                {error}
                            </div>
                        )}

                        <LoginForm />
                    </div>

                    <p className="text-center text-white/20 text-xs mt-6">
                        Only for Administrator.
                    </p>
                </div>
            </div>

            {/* Bottom Balance Spacer */}
            <div className="w-full max-w-[1200px] mx-auto invisible pointer-events-none pb-2">
                <div className="h-9" />
            </div>
        </div>
    );
}
