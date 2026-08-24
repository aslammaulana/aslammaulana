-- ==============================================================================
-- Supabase Full Schema Setup: Portfolio & Playground
-- Run this in the Supabase SQL Editor
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Table: portfolio_items
-- ------------------------------------------------------------------------------
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
    status TEXT DEFAULT 'In Progress',
    color TEXT NOT NULL DEFAULT '0c4778',
    image_position TEXT NOT NULL DEFAULT 'left',
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

-- Pastikan kolom detail_image ada jika tabel sudah pernah dibuat sebelumnya
ALTER TABLE public.portfolio_items ADD COLUMN IF NOT EXISTS detail_image TEXT DEFAULT '';

-- RLS
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view portfolio items" ON public.portfolio_items;
CREATE POLICY "Public can view portfolio items"
    ON public.portfolio_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert portfolio items" ON public.portfolio_items;
CREATE POLICY "Authenticated users can insert portfolio items"
    ON public.portfolio_items FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update portfolio items" ON public.portfolio_items;
CREATE POLICY "Authenticated users can update portfolio items"
    ON public.portfolio_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete portfolio items" ON public.portfolio_items;
CREATE POLICY "Authenticated users can delete portfolio items"
    ON public.portfolio_items FOR DELETE TO authenticated USING (true);

-- Trigger updated_at
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
    FOR EACH ROW EXECUTE FUNCTION public.handle_portfolio_updated_at();

CREATE INDEX IF NOT EXISTS idx_portfolio_items_order ON public.portfolio_items ("order" ASC);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_slug ON public.portfolio_items (slug);


-- ------------------------------------------------------------------------------
-- 2. Table: playground_items
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.playground_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'Open Source',
    description TEXT NOT NULL DEFAULT '',
    overview TEXT,
    github_url TEXT,
    preview_url TEXT,
    image TEXT NOT NULL DEFAULT '',
    detail_image TEXT NOT NULL DEFAULT '',
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    color TEXT NOT NULL DEFAULT '6366f1',
    "order" INT4 NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Pastikan kolom detail_image ada jika tabel sudah pernah dibuat sebelumnya
ALTER TABLE public.playground_items ADD COLUMN IF NOT EXISTS detail_image TEXT DEFAULT '';

-- RLS
ALTER TABLE public.playground_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view playground items" ON public.playground_items;
CREATE POLICY "Public can view playground items"
    ON public.playground_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert playground items" ON public.playground_items;
CREATE POLICY "Authenticated users can insert playground items"
    ON public.playground_items FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update playground items" ON public.playground_items;
CREATE POLICY "Authenticated users can update playground items"
    ON public.playground_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete playground items" ON public.playground_items;
CREATE POLICY "Authenticated users can delete playground items"
    ON public.playground_items FOR DELETE TO authenticated USING (true);

-- Trigger updated_at
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
    FOR EACH ROW EXECUTE FUNCTION public.handle_playground_updated_at();

CREATE INDEX IF NOT EXISTS idx_playground_items_order ON public.playground_items ("order" ASC);
CREATE INDEX IF NOT EXISTS idx_playground_items_slug ON public.playground_items (slug);
