"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginAction } from "@/app/admin/login/actions";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

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
                <div className="relative w-full">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="w-full pl-3 pr-10 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-white/30 transition-all"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white/80 focus:outline-none transition-colors cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <EyeOff size={16} strokeWidth={1.75} />
                        ) : (
                            <Eye size={16} strokeWidth={1.75} />
                        )}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-lg bg-white text-[#0f0f0e] text-sm font-semibold hover:bg-white/90 transition-all duration-200 cursor-pointer"
            >
                Masuk
            </button>
        </form>
    );
}
