import { createAdminClient } from "@/lib/supabase/server";
import { mapPlaygroundRow } from "@/data/playground";
import { PlaygroundCard } from "./PlaygroundCard";
import type { DbPlaygroundRow } from "@/data/playground";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default async function PlaygroundHomepageSection() {
    let items: ReturnType<typeof mapPlaygroundRow>[] = [];

    try {
        const supabase = createAdminClient();
        const { data: rows, error } = await supabase
            .from("playground_items")
            .select("*")
            .order("order", { ascending: true });

        if (!error && rows) {
            items = rows.map((row) => mapPlaygroundRow(row as DbPlaygroundRow));
        }
    } catch {
        // Table may not exist yet or connection issue, graceful fallback
        items = [];
    }

    if (items.length === 0) return null;

    return (
        <section
            id="playground"
            className="relative w-full py-16 overflow-hidden border-t border-t-[#ffffff21] bg-[#111111]"
        >
            <div className="relative z-10 w-full max-w-[1230px] mx-auto px-4">
                <ScrollReveal animation="fade-up" duration={800} delay={0}>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                        <div>
                            <h2 className="text-sm font-bold tracking-[0.25em] uppercase text-white">
                                Playground &amp; Labs
                            </h2>
                            <p className="text-white/40 text-xs mt-1">
                                Experiments, open-source projects, CLI tools, and creative explorations.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                        <ScrollReveal
                            key={item.slug || index}
                            animation="fade-up"
                            duration={800}
                            delay={(index % 3) * 120}
                        >
                            <PlaygroundCard item={item} />
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
