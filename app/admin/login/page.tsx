import { loginAction } from "./actions";

export default function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
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

                    <LoginForm />
                </div>

                <p className="text-center text-white/20 text-xs mt-6">
                    Hanya untuk admin. Akses tidak diizinkan.
                </p>
            </div>
        </div>
    );
}

/* ── Client form extracted to avoid async/await issues in server component ── */
function LoginForm() {
    return (
        <form action={loginAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    Email
                </label>
                <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="admin@example.com"
                    className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-white/30 transition-all"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    Password
                </label>
                <input
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-white/30 transition-all"
                />
            </div>

            <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-lg bg-white text-[#0f0f0e] text-sm font-semibold hover:bg-white/90 transition-all duration-200"
            >
                Masuk
            </button>
        </form>
    );
}
