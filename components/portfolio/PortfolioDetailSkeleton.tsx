export default function PortfolioDetailSkeleton() {
    return (
        <div className="min-h-screen bg-[#0f0e0f] text-white">
            {/* ── Top Nav Bar Skeleton ── */}
            <div className="w-full border-b border-white/8 bg-[#0f0e0f]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="w-full max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-white/10 animate-pulse" />
                        <div className="w-36 h-4 rounded bg-white/10 animate-pulse" />
                    </div>
                    <div className="h-8 w-28 rounded-lg border border-white/10 bg-white/5 animate-pulse hidden sm:block" />
                </div>
            </div>

            <div className="w-full max-w-[1200px] mx-auto px-4 pb-20">
                {/* ── Project Header Skeleton ── */}
                <div className="pt-12 pb-10 border-b border-white/8">
                    {/* Category kicker */}
                    <div className="h-3 w-24 bg-white/15 rounded animate-pulse mb-4" />

                    {/* Title */}
                    <div className="h-9 md:h-11 w-3/4 max-w-[520px] bg-white/20 rounded-lg animate-pulse mb-4" />

                    {/* Overview / Subtitle */}
                    <div className="space-y-2.5 max-w-[800px]">
                        <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                        <div className="h-4 w-5/6 bg-white/10 rounded animate-pulse" />
                    </div>

                    {/* Action button placeholder */}
                    <div className="mt-6 h-10 w-36 bg-white/15 rounded-lg animate-pulse" />
                </div>

                {/* ── Hero Image Skeleton ── */}
                <div
                    className="relative w-full mt-10 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] animate-pulse flex items-center justify-center"
                    style={{ aspectRatio: "16/10" }}
                >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                        <div className="w-6 h-6 rounded-sm bg-white/10" />
                    </div>
                </div>

                {/* ── Meta Grid: 4 Boxes ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="flex flex-col justify-between gap-3 p-5 rounded-2xl border border-white/10 bg-white/[0.03] animate-pulse min-h-[92px]"
                        >
                            <div className="h-2.5 w-16 bg-white/15 rounded" />
                            <div className="h-5 w-28 bg-white/20 rounded-md" />
                        </div>
                    ))}
                </div>

                {/* ── Overview Section Skeleton ── */}
                <div className="mt-12 pt-10 border-t border-white/8">
                    <div className="h-3 w-28 bg-white/15 rounded mb-4 animate-pulse" />
                    <div className="space-y-2.5 max-w-[900px]">
                        <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                        <div className="h-4 w-11/12 bg-white/10 rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse" />
                    </div>
                </div>

                {/* ── Features Skeleton ── */}
                <div className="mt-12 pt-10 border-t border-white/8">
                    <div className="h-3 w-24 bg-white/15 rounded mb-6 animate-pulse" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 px-5 py-4 rounded-xl border border-white/8 bg-white/[0.03] animate-pulse"
                            >
                                <div className="w-2 h-2 rounded-full bg-white/20 shrink-0" />
                                <div className="h-4 w-3/4 bg-white/10 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Tech Stack Skeleton ── */}
                <div className="mt-12 pt-10 border-t border-white/8">
                    <div className="h-3 w-24 bg-white/15 rounded mb-5 animate-pulse" />
                    <div className="flex flex-wrap gap-2">
                        {[18, 24, 20, 28, 16].map((w, i) => (
                            <div
                                key={i}
                                className="h-8 rounded-full border border-white/10 bg-white/[0.03] animate-pulse"
                                style={{ width: `${w * 4}px` }}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Prev / Next Navigation Skeleton ── */}
                <div className="mt-16 pt-10 border-t border-white/8 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-white/10 animate-pulse" />
                        <div className="space-y-1">
                            <div className="h-2.5 w-14 bg-white/10 rounded animate-pulse" />
                            <div className="h-4 w-24 bg-white/15 rounded animate-pulse" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-right">
                        <div className="space-y-1">
                            <div className="h-2.5 w-14 bg-white/10 rounded animate-pulse ml-auto" />
                            <div className="h-4 w-24 bg-white/15 rounded animate-pulse" />
                        </div>
                        <div className="w-4 h-4 rounded bg-white/10 animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}
