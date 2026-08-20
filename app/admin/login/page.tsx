import LoginForm from "@/components/admin/LoginForm";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const params = await searchParams;
    const error = params?.error;

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{
                background: "radial-gradient(ellipse at 50% 0%, #2d2d2d 0%, #181818 40%, #080808 100%)",
            }}
        >
            <div className="w-full max-w-[380px]">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <p className="text-white font-bold text-xl">AslamMln</p>
                    <p className="text-white/40 text-sm mt-1">Admin Dashboard</p>
                </div>

                {/* Card */}
                <div
                    className="rounded-2xl border border-white/10 p-7"
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
                    Hanya untuk admin. Akses tidak diizinkan.
                </p>
            </div>
        </div>
    );
}
