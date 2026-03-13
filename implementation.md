# Header & Hero Section — Root Page

Membangun **Sticky Header** dengan efek Glassmorphism putih dan **Hero Section** dua-kolom untuk portfolio `AslamMln`. Stack: **Next.js 16 App Router + Tailwind CSS v4 + TypeScript**.

---

## Background & Color System

| Token | Value | Keterangan |
|-------|-------|-----------|
| `bg-[#0e0e0e]` | `#0e0e0e` | Background utama (halaman) |
| `bg-[#201c30]` | `#201c30` | Background sekunder / aksen |

---

## Struktur File

```
app/
├── components/
│   ├── Header.tsx          [NEW] Sticky glassmorphism header
│   └── HeroSection.tsx     [NEW] Hero section dua kolom
├── globals.css             [MODIFY] Tambah CSS variable warna + custom font
├── layout.tsx              [MODIFY] Import font Inter/Outfit dari Google Fonts
└── page.tsx                [MODIFY] Ganti isi dengan <Header /> + <HeroSection />

public/
└── homepage/
    └── hero-new.jpg        [DIPERLUKAN] Foto hero (sudah ada di folder ini atau perlu upload)
```

---

## Proposed Changes

### 1. `globals.css` — [MODIFY]

Tambahkan CSS variable warna dan pastikan `@import "tailwindcss"` tetap di atas:

```css
@import "tailwindcss";

:root {
  --bg-primary: #0e0e0e;
  --bg-secondary: #201c30;
}

@theme inline {
  --color-bg-primary: var(--bg-primary);
  --color-bg-secondary: var(--bg-secondary);
  --font-sans: var(--font-geist-sans);
}
```

### 2. `layout.tsx` — [MODIFY]

- Ganti font Geist dengan **Inter** (Google Fonts) atau tetap Geist (sudah bagus)
- Set `lang="id"` (opsional)
- Update `metadata` title & description untuk SEO portfolio

### 3. `app/components/Header.tsx` — [NEW]

**Komponen:** `<Header />`

- `position: sticky`, `top: 0`, `z-index: 50`
- Background: **white glassmorphism** → `bg-white/10 backdrop-blur-md border-b border-white/20`
- Logo kiri: **"AslamMln"** — bold, putih
- Nav tengah: `About | Skill | Work | Services` — link teks putih dengan hover underline smooth
- CTA kanan: tombol **"Start Project"** → border putih, rounded-full, hover fill putih

```
[ Logo: AslamMln ] ---- [ About  Skill  Work  Services ] ---- [ (ico) Start Project ]
```

> **Note**: Ikon di tombol "Start Project" bisa pakai emoji `→` atau SVG arrow inline (tidak perlu library ikon eksternal).

### 4. `app/components/HeroSection.tsx` — [NEW]

**Komponen:** `<HeroSection />`

Layout: **2 kolom (50% / 50%)**, full-viewport height minimal.

**Kolom Kiri:**
- Badge pill: `● Available for New Project` (border tipis, dot hijau animasi pulse)
- `<h1>` — `ASLAM MAULANA` (bold, putih, large)
- `<h2>` — `FRONT-END DEVELOPER` (abu-abu/muted)
- Tagline paragraf italic: *"Crafting meaningful digital experiences..."*
- Tombol: `[ Contact Me ]` (border outline) + `[ See Services ]` (border outline)
- Garis dekoratif horizontal di bawah tombol

**Kolom Kanan:**
- Container gambar: border-radius besar (card oval / rounded-3xl)
- Image: `public/homepage/hero-new.jpg` via `next/image`
- **Glassmorphism card hitam** di atas gambar (posisi absolute bottom-left):
  - `bg-black/60 backdrop-blur-md`
  - Teks: **"Aslam Maulana"** + **"FE Dev & CMS Specialist"**

### 5. `page.tsx` — [MODIFY]

Ganti seluruh isi `Home()` dengan:

```tsx
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0e0e0e]">
      <Header />
      <HeroSection />
    </main>
  );
}
```

---

## Verification Plan

### Browser Visual Test

1. Jalankan dev server:
   ```bash
   npm run dev
   ```
2. Buka `http://localhost:3000`
3. Checklist visual:
   - [ ] Header sticky saat scroll
   - [ ] Efek glassmorphism putih blur pada header
   - [ ] Logo "AslamMln" terlihat di kiri
   - [ ] Nav link di tengah
   - [ ] Tombol "Start Project" di kanan berikon
   - [ ] Hero section terbagi 2 kolom sejajar
   - [ ] Badge "Available for New Project" dengan dot hijau
   - [ ] Gambar hero tampil dengan card glassmorphism di atasnya
   - [ ] Background halaman `#0e0e0e`
   - [ ] Responsif di mobile (kolom stack ke bawah)

---

> **Catatan Foto Hero**: Pastikan file `public/homepage/hero-new.jpg` sudah ada sebelum menjalankan dev server. Jika belum ada, saya bisa generate placeholder atau gunakan path yang berbeda.
