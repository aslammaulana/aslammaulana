-- ==============================================================================
-- Migration: Add detail_image to portfolio_items & playground_items
-- Purpose: Support separate images for Card Thumbnail (Homepage) and Hero Banner (/[slug])
-- ==============================================================================

-- 1. Tambah kolom detail_image pada tabel portfolio_items
ALTER TABLE public.portfolio_items
ADD COLUMN IF NOT EXISTS detail_image TEXT DEFAULT '';

-- 2. Tambah kolom detail_image pada tabel playground_items
ALTER TABLE public.playground_items
ADD COLUMN IF NOT EXISTS detail_image TEXT DEFAULT '';
