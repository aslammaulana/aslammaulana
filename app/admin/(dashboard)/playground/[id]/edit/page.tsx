import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { mapPlaygroundRow } from "@/data/playground";
import PlaygroundForm, { type PlaygroundFormData } from "@/components/admin/PlaygroundForm";
import { updatePlaygroundItem } from "../../actions";
import type { DbPlaygroundRow } from "@/data/playground";

type Props = { params: Promise<{ id: string }> };

export default async function EditPlaygroundPage({ params }: Props) {
    const { id } = await params;
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from("playground_items")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) notFound();

    const item = mapPlaygroundRow(data as DbPlaygroundRow);

    const defaultValues: PlaygroundFormData = {
        slug: item.slug,
        title: item.title,
        type: item.type,
        description: item.description,
        overview: item.overview ?? "",
        githubUrl: item.githubUrl ?? "",
        previewUrl: item.previewUrl ?? "",
        color: item.color,
        order: item.order ?? 0,
        image: item.image,
        images: item.images ?? [],
        tags: item.tags ?? [],
        features: item.features ?? [],
    };

    async function handleUpdate(data: PlaygroundFormData) {
        "use server";
        await updatePlaygroundItem(id, data);
    }

    return (
        <div>
            <h1 className="text-white font-bold text-2xl mb-2">Edit Item Playground</h1>
            <p className="text-white/40 text-sm mb-8">
                <span className="text-white/60 font-medium">{item.title}</span>
                <span className="mx-2 text-white/20">·</span>
                <span className="font-mono text-xs">{item.slug}</span>
            </p>
            <div
                className="rounded-2xl border border-white/10 p-6"
                style={{ background: "rgba(255,255,255,0.02)" }}
            >
                <PlaygroundForm
                    defaultValues={defaultValues}
                    onSubmit={handleUpdate}
                    submitLabel="Simpan Perubahan"
                    isEdit
                />
            </div>
        </div>
    );
}
