"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PortfolioFormData } from "@/components/admin/PortfolioForm";

function toDbRow(data: PortfolioFormData) {
    return {
        slug: data.slug.trim(),
        category: data.category.trim(),
        title: data.title.trim(),
        description: data.description.trim(),
        overview: data.overview.trim() || null,
        challenge: data.challenge.trim() || null,
        solution: data.solution.trim() || null,
        client: data.client.trim() || null,
        role: data.role.trim() || null,
        published_at: data.publishedAt.trim() || null,
        status: data.status || null,
        color: data.color.replace("#", "").trim(),
        image_position: data.imagePosition,
        preview_url: data.previewUrl.trim(),
        image: data.image.trim(),
        images: data.images,
        tags: data.tags,
        features: data.features,
        order: data.order,
        updated_at: new Date().toISOString(),
    };
}

function revalidateAll() {
    revalidatePath("/", "page");
    revalidatePath("/portfolio/[slug]", "page");
    revalidatePath("/admin", "page");
}

export async function createPortfolioItem(data: PortfolioFormData) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("portfolio_items").insert(toDbRow(data));
    if (error) throw new Error(error.message);
    revalidateAll();
    redirect("/admin");
}

export async function updatePortfolioItem(id: string, data: PortfolioFormData) {
    const supabase = createAdminClient();
    const { error } = await supabase
        .from("portfolio_items")
        .update(toDbRow(data))
        .eq("id", id);
    if (error) throw new Error(error.message);
    revalidateAll();
    redirect("/admin");
}

export async function deletePortfolioItem(id: string) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidateAll();
}
