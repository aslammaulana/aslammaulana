import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { mapPlaygroundRow } from "@/data/playground";
import PlaygroundDetailPage from "@/components/playground/PlaygroundDetailPage";
import type { DbPlaygroundRow } from "@/data/playground";

export const revalidate = 60; // ISR — revalidate every 60 seconds

type Props = { params: Promise<{ slug: string }> };

// Runs at BUILD TIME — must NOT use cookies(), use admin client instead
export async function generateStaticParams() {
    try {
        const supabase = createAdminClient();
        const { data } = await supabase.from("playground_items").select("slug");
        return (data ?? []).map((row: { slug: string }) => ({ slug: row.slug }));
    } catch {
        return [];
    }
}

// Runs at BUILD TIME — must NOT use cookies()
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    try {
        const supabase = createAdminClient();
        const { data } = await supabase
            .from("playground_items")
            .select("title, overview, description")
            .eq("slug", slug)
            .single();

        if (!data) return {};
        return {
            title: `${data.title} — Playground | Aslam Maulana`,
            description: data.overview ?? data.description,
        };
    } catch {
        return {};
    }
}

// Runs at REQUEST TIME
export default async function PlaygroundSlugPage({ params }: Props) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("playground_items")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error || !data) notFound();

    const item = mapPlaygroundRow(data as DbPlaygroundRow);

    // Fetch all items to get prev and next navigation
    const { data: allRows } = await supabase
        .from("playground_items")
        .select("slug, title, order")
        .order("order", { ascending: true });

    const allItems = allRows ?? [];
    const currentIndex = allItems.findIndex((p: { slug: string }) => p.slug === slug);
    const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
    const nextItem = currentIndex >= 0 && currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

    return (
        <PlaygroundDetailPage
            item={item}
            prevItem={prevItem ? { slug: prevItem.slug, title: prevItem.title } : null}
            nextItem={nextItem ? { slug: nextItem.slug, title: nextItem.title } : null}
        />
    );
}
