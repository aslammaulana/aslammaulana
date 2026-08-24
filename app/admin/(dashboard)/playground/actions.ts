"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PlaygroundFormData } from "@/components/admin/PlaygroundForm";

function toDbRow(data: PlaygroundFormData) {
    return {
        slug: data.slug.trim(),
        title: data.title.trim(),
        type: data.type.trim() || "Open Source",
        description: data.description.trim(),
        overview: data.overview.trim() || null,
        github_url: data.githubUrl.trim() || null,
        preview_url: data.previewUrl.trim() || null,
        color: data.color.replace("#", "").trim() || "6366f1",
        image: data.image.trim(),
        detail_image: (data.detailImage ?? "").trim(),
        images: data.images ?? [],
        tags: data.tags ?? [],
        features: data.features ?? [],
        order: data.order ?? 0,
        updated_at: new Date().toISOString(),
    };
}

function revalidateAll() {
    revalidatePath("/", "page");
    revalidatePath("/playground/[slug]", "page");
    revalidatePath("/admin", "page");
    revalidatePath("/admin/playground", "page");
}

const BUCKET_NAME = "portfolio-images";

async function ensureBucketExists(supabase: ReturnType<typeof createAdminClient>) {
    try {
        const { data: buckets, error } = await supabase.storage.listBuckets();
        if (!error && buckets) {
            const exists = buckets.some((b) => b.name === BUCKET_NAME);
            if (!exists) {
                await supabase.storage.createBucket(BUCKET_NAME, {
                    public: true,
                    fileSizeLimit: 10485760, // 10MB
                });
            }
        }
    } catch {
        // bucket might already exist or list permissions differ
    }
}

export async function uploadPlaygroundImage(
    formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
        const file = formData.get("file") as File | null;
        if (!file || typeof file === "string" || !file.size) {
            return { success: false, error: "File tidak valid atau kosong." };
        }

        if (file.size > 10 * 1024 * 1024) {
            return { success: false, error: "Ukuran file maksimal 10MB." };
        }

        const supabase = createAdminClient();
        await ensureBucketExists(supabase);

        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const cleanName = file.name
            .replace(/\.[^/.]+$/, "")
            .replace(/[^a-zA-Z0-9_-]/g, "-")
            .slice(0, 30);
        const filename = `playground/${Date.now()}-${cleanName || "img"}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

        const buffer = Buffer.from(await file.arrayBuffer());

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filename, buffer, {
                contentType: file.type || "image/jpeg",
                upsert: true,
            });

        if (error) {
            return { success: false, error: `Supabase Storage error: ${error.message}` };
        }

        const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(data.path);

        return { success: true, url: urlData.publicUrl };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : "Gagal mengunggah gambar.",
        };
    }
}

export async function createPlaygroundItem(data: PlaygroundFormData) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("playground_items").insert(toDbRow(data));
    if (error) throw new Error(error.message);
    revalidateAll();
    redirect("/admin/playground");
}

export async function updatePlaygroundItem(id: string, data: PlaygroundFormData) {
    const supabase = createAdminClient();
    const { error } = await supabase
        .from("playground_items")
        .update(toDbRow(data))
        .eq("id", id);
    if (error) throw new Error(error.message);
    revalidateAll();
    redirect("/admin/playground");
}

export async function deletePlaygroundItem(id: string) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("playground_items").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidateAll();
}
