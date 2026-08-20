export default function Footer() {
    return (
        <footer className="w-full border-t border-t-[#ffffff21] bg-[#0c0d0d] py-6">
            <div className="w-full max-w-[1200px] mx-auto px-4 flex items-baseline-last justify-between gap-4">
                {/* Left */}
                <div className="flex flex-col gap-1">
                    <p className="text-white/80 text-[15px] font-medium">
                        © 2026 AslamMln. All Rights Reserved.
                    </p>
                    <p className="text-white/40 text-[13px]">
                        Made with love and Sanger Coffee (0% extra sugar, no ice).
                    </p>
                </div>

                {/* Right */}
                <p className="text-white/40 text-[13px] text-right shrink-0">
                    2026 Portfolio Coming Soon 🙂
                </p>
            </div>
        </footer>
    );
}
