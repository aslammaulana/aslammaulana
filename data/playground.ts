export type PlaygroundItem = {
    id?: string;            // uuid from Supabase
    slug: string;
    title: string;
    type: string;           // "Open Source" | "Experiment" | "Contribution" | "Tool" | "Library" | etc.
    description: string;
    overview?: string;
    githubUrl?: string;
    previewUrl?: string;
    image: string;
    images: string[];
    tags: string[];
    features?: string[];
    color: string;          // Hex without #, e.g. "6366f1"
    order?: number;
    createdAt?: string;
    updatedAt?: string;
};

/** Shape of a row returned from Supabase `playground_items` table */
export type DbPlaygroundRow = {
    id: string;
    slug: string;
    title: string;
    type: string;
    description: string;
    overview: string | null;
    github_url: string | null;
    preview_url: string | null;
    image: string;
    images: string[] | null;
    tags: string[] | null;
    features: string[] | null;
    color: string;
    order: number;
    created_at?: string;
    updated_at?: string;
};

/** Convert Supabase snake_case row → camelCase PlaygroundItem */
export function mapPlaygroundRow(row: DbPlaygroundRow): PlaygroundItem {
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        type: row.type || "Open Source",
        description: row.description || "",
        overview: row.overview ?? undefined,
        githubUrl: row.github_url ?? undefined,
        previewUrl: row.preview_url ?? undefined,
        image: row.image || "",
        images: row.images ?? [],
        tags: row.tags ?? [],
        features: row.features ?? [],
        color: row.color || "6366f1",
        order: row.order ?? 0,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

// Fallback/starter items if needed
export const playgroundItems: PlaygroundItem[] = [];
