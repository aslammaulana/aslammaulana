import Link from "next/link";
import Header from "@/components/theme/Header";

export const metadata = {
    title: "About — Aslam Maulana",
    description:
        "Learn more about Aslam Maulana — Front-End Developer & CMS Specialist based in Aceh, Indonesia.",
};

/* ── Background lines (Next.js-style column guides) ──────────── */
function GridBackground() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Left vertical line — left boundary of content column */}
            <div
                className="absolute top-0 bottom-0 w-px"
                style={{
                    left: "calc(50% - 380px)",
                    background: "rgba(255,255,255,0.09)",
                }}
            />
            {/* Right vertical line — right boundary of content column */}
            <div
                className="absolute top-0 bottom-0 w-px"
                style={{
                    right: "calc(50% - 380px)",
                    background: "rgba(255,255,255,0.09)",
                }}
            />

            {/* Circle arc — top-left corner (partially off-screen) */}
            <svg
                className="absolute"
                style={{ left: "calc(50% - 380px - 72px)", top: "40px" }}
                width="160" height="160" viewBox="0 0 160 160" fill="none"
            >
                <circle cx="80" cy="80" r="79" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
            </svg>

            {/* Crosshair top-left (on the left line) */}
            <svg
                className="absolute"
                style={{ left: "calc(50% - 380px - 6px)", top: "158px" }}
                width="12" height="12" viewBox="0 0 12 12" fill="none"
            >
                <line x1="6" y1="0" x2="6" y2="12" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                <line x1="0" y1="6" x2="12" y2="6" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            </svg>

            {/* Crosshair top-right (on the right line) */}
            <svg
                className="absolute hidden sm:block"
                style={{ right: "calc(50% - 380px - 6px)", top: "158px" }}
                width="12" height="12" viewBox="0 0 12 12" fill="none"
            >
                <line x1="6" y1="0" x2="6" y2="12" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                <line x1="0" y1="6" x2="12" y2="6" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            </svg>

            {/* Dotted rectangle that frames the CTA buttons */}
            <svg
                className="absolute hidden sm:block"
                style={{
                    left: "50%",
                    top: "295px",
                    transform: "translateX(-50%)",
                }}
                width="340" height="90" viewBox="0 0 340 90" fill="none"
            >
                <rect
                    x="0.5" y="0.5" width="339" height="89"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                />
                {/* Small crosshair on left-center of rect */}
                <line x1="0" y1="45" x2="8" y2="45" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <line x1="4" y1="41" x2="4" y2="49" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                {/* Small crosshair on right-center of rect */}
                <line x1="332" y1="45" x2="340" y2="45" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <line x1="336" y1="41" x2="336" y2="49" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            </svg>

            {/* Radial glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: "radial-gradient(ellipse 60% 55% at 50% 10%, rgba(255,255,255,0.035) 0%, transparent 70%)",
                }}
            />
        </div>
    );
}


export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Header />

            {/* ── HERO ─────────────────────────────────────────── */}
            <section className="relative flex flex-col items-center justify-center text-center pt-40 pb-28 px-6 overflow-hidden">
                <GridBackground />

                {/* Badge */}
                <span className="relative z-10 mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/60 text-xs font-medium tracking-widest uppercase backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Open to work
                </span>

                {/* Heading */}
                <h1 className="relative z-10 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] max-w-4xl">
                    Front-End Developer
                    <br />
                    <span className="text-white/40">&amp; CMS Specialist</span>
                </h1>

                <p className="relative z-10 mt-6 max-w-xl text-white/55 text-base sm:text-lg leading-relaxed">
                    Crafting meaningful digital experiences that move your business forward — clean code, sharp design, measurable results.
                </p>

                {/* CTA row */}
                <div className="relative z-10 mt-10 flex flex-wrap justify-center gap-3">
                    <Link
                        href="/#contact"
                        className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors duration-200"
                    >
                        Start a Project
                    </Link>
                    <Link
                        href="/"
                        className="px-6 py-2.5 rounded-full border border-white/20 text-white/80 text-sm font-medium hover:border-white/40 hover:text-white transition-all duration-200"
                    >
                        View Portfolio
                    </Link>
                </div>

                {/* Bottom border line */}
                <div className="relative z-10 mt-14 flex items-center w-full max-w-lg">
                    <span className="block w-px h-3 bg-white/25" />
                    <span className="block h-px flex-1 bg-white/10" />
                    <span className="block w-px h-3 bg-white/25" />
                </div>
            </section>
        </div>
    );
}
