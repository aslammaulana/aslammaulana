-- ==============================================================================
-- Schema: portfolio_items
-- Purpose: Table, RLS policies, triggers, and indexes for Portfolio Items
-- ==============================================================================

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.portfolio_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL DEFAULT '',
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    overview TEXT,
    challenge TEXT,
    solution TEXT,
    client TEXT,
    role TEXT,
    published_at TEXT,
    status TEXT DEFAULT 'In Progress', -- 'Live' | 'In Progress' | 'Archived'
    color TEXT NOT NULL DEFAULT '0c4778', -- hex without #
    image_position TEXT NOT NULL DEFAULT 'left', -- 'left' | 'right'
    preview_url TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT '',
    detail_image TEXT NOT NULL DEFAULT '',
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    "order" INT4 NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Allow anyone (public/anon) to read portfolio items
DROP POLICY IF EXISTS "Public can view portfolio items" ON public.portfolio_items;
CREATE POLICY "Public can view portfolio items"
    ON public.portfolio_items
    FOR SELECT
    USING (true);

-- Allow authenticated users (admin) to insert, update, and delete
DROP POLICY IF EXISTS "Authenticated users can insert portfolio items" ON public.portfolio_items;
CREATE POLICY "Authenticated users can insert portfolio items"
    ON public.portfolio_items
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update portfolio items" ON public.portfolio_items;
CREATE POLICY "Authenticated users can update portfolio items"
    ON public.portfolio_items
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete portfolio items" ON public.portfolio_items;
CREATE POLICY "Authenticated users can delete portfolio items"
    ON public.portfolio_items
    FOR DELETE
    TO authenticated
    USING (true);

-- 4. Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_portfolio_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_portfolio_updated_at ON public.portfolio_items;
CREATE TRIGGER set_portfolio_updated_at
    BEFORE UPDATE ON public.portfolio_items
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_portfolio_updated_at();

-- 5. Indexes for performant lookups and ordering
CREATE INDEX IF NOT EXISTS idx_portfolio_items_order ON public.portfolio_items ("order" ASC);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_slug ON public.portfolio_items (slug);
