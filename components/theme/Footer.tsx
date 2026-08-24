import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Footer() {
    return (
        <footer className="w-full border-t border-t-[#ffffff21] bg-[#0c0d0d] py-6">
            <ScrollReveal animation="fade" duration={600} threshold={0.1}>
                <div className="w-full max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:flex md:items-baseline md:justify-between gap-4">
                    {/* Left */}
                    <div className="flex flex-col gap-1">
                        <p className="text-white/80 text-[15px] font-medium">
                            © 2026 AslamMaulana. All Rights Reserved.
                        </p>
                        <p className="text-white/40 text-[13px]">
                            Made with love and sanger coffee (0% extra sugar, no ice).
                        </p>
                    </div>

                    {/* Right */}
                    <p className="text-white/40 text-[13px] text-left md:text-right shrink-0">
                        Updated Portfolio Coming Soon 🙂
                    </p>
                </div>
            </ScrollReveal>
        </footer>
    );
}
