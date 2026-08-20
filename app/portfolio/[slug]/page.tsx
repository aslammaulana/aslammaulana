import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { mapPortfolioRow } from "@/data/portfolio";
import PortfolioDetailPage from "@/components/portfolio/PortfolioDetailPage";
import type { DbPortfolioRow } from "@/data/portfolio";

export const revalidate = 60; // ISR — revalidate every 60 seconds

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    const supabase = await createClient();
    const { data } = await supabase.from("portfolio_items").select("slug");
    return (data ?? []).map((row: { slug: string }) => ({ slug: row.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();
    const { data } = await supabase
        .from("portfolio_items")
        .select("title, overview, description")
        .eq("slug", slug)
        .single();

    if (!data) return {};
    return {
        title: `${data.title} — Portfolio | Aslam Maulana`,
        description: data.overview ?? data.description,
    };
}

export default async function PortfolioSlugPage({ params }: Props) {
    const { slug } = await params;
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error || !data) notFound();

    const item = mapPortfolioRow(data as DbPortfolioRow);

    return <PortfolioDetailPage item={item} />;
}
