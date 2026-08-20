import { createClient } from "@/lib/supabase/server";
import { mapPortfolioRow } from "@/data/portfolio";
import { PortfolioCard } from "./PortfolioCard";
import type { DbPortfolioRow } from "@/data/portfolio";

export default async function PortfolioSection() {
    const supabase = await createClient();
    const { data: rows } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("order", { ascending: true });

    const items = (rows ?? []).map((row) => mapPortfolioRow(row as DbPortfolioRow));

    if (items.length === 0) return null;

    return (
        <section
            id="work"
            className="relative w-full py-10 overflow-hidden border-t border-t-[#ffffff21] bg-[#0e0f0f]"
        >
            <div className="relative z-10 w-full max-w-[1230px] mx-auto px-4">
                <h2 className="text-sm font-bold tracking-[0.25em] uppercase text-white mb-10">
                    Selected Portofolio
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                        <PortfolioCard key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
