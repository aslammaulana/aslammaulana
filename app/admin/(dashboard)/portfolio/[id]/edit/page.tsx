import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { mapPortfolioRow } from "@/data/portfolio";
import PortfolioForm, { type PortfolioFormData } from "@/components/admin/PortfolioForm";
import { updatePortfolioItem } from "../../actions";
import type { DbPortfolioRow } from "@/data/portfolio";

type Props = { params: Promise<{ id: string }> };

export default async function EditPortfolioPage({ params }: Props) {
    const { id } = await params;
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) notFound();

    const item = mapPortfolioRow(data as DbPortfolioRow);

    const defaultValues: PortfolioFormData = {
        slug: item.slug,
        category: item.category,
        title: item.title,
        description: item.description,
        overview: item.overview ?? "",
        challenge: item.challenge ?? "",
        solution: item.solution ?? "",
        client: item.client ?? "",
        role: item.role ?? "",
        publishedAt: item.publishedAt ?? "",
        status: item.status ?? "Live",
        color: item.color,
        imagePosition: item.imagePosition,
        previewUrl: item.previewUrl,
        order: item.order ?? 0,
        image: item.image,
        images: item.images ?? [],
        tags: item.tags ?? [],
        features: item.features ?? [],
    };

    async function handleUpdate(data: PortfolioFormData) {
        "use server";
        await updatePortfolioItem(id, data);
    }

    return (
        <div>
            <h1 className="text-white font-bold text-2xl mb-2">Edit Portfolio</h1>
            <p className="text-white/40 text-sm mb-8">
                <span className="text-white/60 font-medium">{item.title}</span>
                <span className="mx-2 text-white/20">·</span>
                <span className="font-mono text-xs">{item.slug}</span>
            </p>
            <div
                className="rounded-2xl border border-white/10 p-6"
                style={{ background: "rgba(255,255,255,0.02)" }}
            >
                <PortfolioForm
                    defaultValues={defaultValues}
                    onSubmit={handleUpdate}
                    submitLabel="Simpan Perubahan"
                    isEdit
                />
            </div>
        </div>
    );
}
