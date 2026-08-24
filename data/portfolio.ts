export type PortfolioItem = {
    id?: string;           // uuid from Supabase
    slug: string;
    category: string;
    title: string;
    description: string;
    tags: string[];
    previewUrl: string;
    image: string;
    detailImage?: string;
    images: string[];
    publishedAt?: string;
    features?: string[];
    imagePosition: "left" | "right";
    color: string;
    client?: string;
    role?: string;
    overview?: string;
    challenge?: string;
    solution?: string;
    status?: string;
    order?: number;
};

/** Shape of a row returned from Supabase `portfolio_items` table */
export type DbPortfolioRow = {
    id: string;
    slug: string;
    category: string;
    title: string;
    description: string;
    overview: string | null;
    challenge: string | null;
    solution: string | null;
    client: string | null;
    role: string | null;
    published_at: string | null;
    status: string | null;
    color: string;
    image_position: "left" | "right";
    preview_url: string;
    image: string;
    detail_image?: string | null;
    images: string[] | null;
    tags: string[] | null;
    features: string[] | null;
    order: number;
};

/** Convert Supabase snake_case row → camelCase PortfolioItem */
export function mapPortfolioRow(row: DbPortfolioRow): PortfolioItem {
    return {
        id: row.id,
        slug: row.slug,
        category: row.category,
        title: row.title,
        description: row.description,
        overview: row.overview ?? undefined,
        challenge: row.challenge ?? undefined,
        solution: row.solution ?? undefined,
        client: row.client ?? undefined,
        role: row.role ?? undefined,
        publishedAt: row.published_at ?? undefined,
        status: row.status ?? undefined,
        color: row.color,
        imagePosition: row.image_position,
        previewUrl: row.preview_url,
        image: row.image,
        detailImage: row.detail_image ?? undefined,
        images: row.images ?? [],
        tags: row.tags ?? [],
        features: row.features ?? [],
        order: row.order,
    };
}

// Legacy static array — kept empty; data now lives in Supabase
export const portfolioItems: PortfolioItem[] = [];
