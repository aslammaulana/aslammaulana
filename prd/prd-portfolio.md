# PRD — Halaman Detail Portfolio (`/portfolio/[slug]`)

## Latar Belakang

Saat ini, klik pada card portfolio membuka **PortfolioModal** (popup overlay).
Permintaan baru: klik card **navigasi ke halaman detail** `/portfolio/[slug]`.
File `PortfolioModal.tsx` **tidak dihapus** — tetap ada untuk kemungkinan penggunaan lain.

---

## Tujuan

- Setiap portfolio item memiliki halaman detail sendiri (`/portfolio/elmasudy`, `/portfolio/ibadurrahman-travel`, dst.)
- Layout halaman detail mengacu pada `prd/sample-index.html`, dengan desain disesuaikan ke tema website (dark mode, glassmorphism, color palette yang sudah ada)
- SEO-friendly dengan metadata per project

---

## Perubahan yang Diperlukan

### 1. Data Layer — `data/portfolio.ts`

Tambah field baru pada type `PortfolioItem`:

```ts
slug: string;              // URL segment, e.g. "elmasudy", "ibadurrahman-travel"
client?: string;           // Nama klien, e.g. "Yayasan Elmasudy"
role?: string;             // Peran, e.g. "Web Developer"
overview?: string;         // Paragraf panjang tentang project
challenge?: string;        // Paragraf tantangan
solution?: string;         // Paragraf solusi
status?: string;           // "Live" | "In Progress" | "Archived"
```

Isi `slug` dan field baru untuk setiap item yang sudah ada.

---

### 2. Halaman Detail — App Router

#### [NEW] `app/portfolio/[slug]/page.tsx`
- Server Component, menerima `params.slug`
- Cari item dari `portfolioItems` berdasarkan `slug`
- Jika tidak ditemukan → `notFound()`
- Render `PortfolioDetailPage` component
- Generate metadata dinamis (`generateMetadata`)

---

### 3. Komponen Detail Page

#### [NEW] `components/portfolio/PortfolioDetailPage.tsx`

Layout mengacu pada `prd/sample-index.html`, adaptasi ke dark theme:

| Section | Konten |
|---|---|
| **Back link** | `← Kembali ke Portfolio` navigasi ke `/#work` |
| **Project Header** | Category label (uppercase), H1 title, summary, tombol "Kunjungi Website" |
| **Hero Image** | Full-width image `images[0]` aspect 16/9 |
| **Meta Grid** | 4 kolom: Klien, Peran, Tahun, Status |
| **Overview** | Paragraf `overview` |
| **Fitur Utama** | Grid 2 kolom dari `features[]` |
| **Tech Stack** | Tag pills dari `tags[]` |
| **Challenge & Solution** | 2 kolom kiri/kanan |
| **Gallery** | Grid 3 kolom dari `images[]` + Lightbox |
| **Prev / Next nav** | Navigasi antar project |

**Design tokens (konsisten dengan website):**
- Background: `#0f0e0f`
- Card bg: `rgba(255,255,255,0.03)` + `border-white/10`
- Glassmorphism: `backdrop-filter: blur(8px)`
- Section title: `text-sm font-bold tracking-[0.25em] uppercase text-white`

---

### 4. Modifikasi Card — `PortfolioCard.tsx`

- Ubah `<button onClick={onClick}>` ke `<Link href={/portfolio/${item.slug}}>`
- Prop `onClick` dihapus

---

### 5. Modifikasi Section — `portfolio/index.tsx`

- Hapus state `activeItem` dan render `<PortfolioModal>`
- PortfolioModal **tidak dihapus dari file-nya**
- Card navigasi via Link

---

## Struktur File Setelah Implementasi

```
app/
  portfolio/
    [slug]/
      page.tsx                    ← NEW

components/
  portfolio/
    PortfolioDetailPage.tsx       ← NEW

components/homepage/portfolio/
  index.tsx                       ← MODIFY
  PortfolioCard.tsx               ← MODIFY
  PortfolioModal.tsx              ← TETAP (tidak dihapus)
  Lightbox.tsx                    ← TETAP (digunakan ulang)

data/
  portfolio.ts                    ← MODIFY (tambah slug + field baru)
```

---

## Open Questions

> Apakah field `overview`, `challenge`, dan `solution` akan diisi sekarang, atau boleh kosong dulu (fallback ke `description`)?

> `PortfolioModal.tsx` tetap ada tapi tidak dirender. Apakah ada rencana penggunaan lain, atau cukup disimpan saja?

---

## Verification Plan

1. Klik card portfolio → navigasi ke `/portfolio/[slug]`
2. Semua section tampil dengan konten benar
3. Tombol "Kunjungi Website" membuka URL di tab baru
4. Prev/Next navigasi antar project berfungsi
5. Lightbox gallery bisa dibuka & ditutup
6. Tombol back membawa ke `/#work`
7. Slug tidak valid → 404
8. Responsif di mobile & tablet
9. `npm run build` sukses tanpa error
