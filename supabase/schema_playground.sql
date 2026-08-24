-- ==============================================================================
-- Schema: playground_items
-- Purpose: Table and RLS policies for Playground (Open Source, Experiments, Tools)
-- ==============================================================================

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.playground_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'Open Source', -- 'Open Source' | 'Experiment' | 'Contribution' | 'Tool' | 'Library'
    description TEXT NOT NULL DEFAULT '',
    overview TEXT,
    github_url TEXT,
    preview_url TEXT,
    image TEXT NOT NULL DEFAULT '',
    detail_image TEXT NOT NULL DEFAULT '',
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    color TEXT NOT NULL DEFAULT '6366f1', -- hex without #
    "order" INT4 NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.playground_items ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Allow anyone (public/anon) to read playground items
DROP POLICY IF EXISTS "Public can view playground items" ON public.playground_items;
CREATE POLICY "Public can view playground items"
    ON public.playground_items
    FOR SELECT
    USING (true);

-- Allow authenticated users (admin) to insert, update, and delete
DROP POLICY IF EXISTS "Authenticated users can insert playground items" ON public.playground_items;
CREATE POLICY "Authenticated users can insert playground items"
    ON public.playground_items
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update playground items" ON public.playground_items;
CREATE POLICY "Authenticated users can update playground items"
    ON public.playground_items
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete playground items" ON public.playground_items;
CREATE POLICY "Authenticated users can delete playground items"
    ON public.playground_items
    FOR DELETE
    TO authenticated
    USING (true);

-- 4. Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_playground_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_playground_updated_at ON public.playground_items;
CREATE TRIGGER set_playground_updated_at
    BEFORE UPDATE ON public.playground_items
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_playground_updated_at();

-- 5. Indexes for performant lookups and ordering
CREATE INDEX IF NOT EXISTS idx_playground_items_order ON public.playground_items ("order" ASC);
CREATE INDEX IF NOT EXISTS idx_playground_items_slug ON public.playground_items (slug);
