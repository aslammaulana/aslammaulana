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
            className="min-h-screen bg-[#0F0E0F] flex items-center justify-center px-4"
            
        >
            <div className="w-full max-w-[380px]">
                

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
                    Only for Administrator.
                </p>
            </div>
        </div>
    );
}
