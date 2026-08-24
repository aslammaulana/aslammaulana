# PRD — Playground (Experiments, Open Source & Side Projects)

## 1. Latar Belakang & Motivasi

Website portfolio saat ini memiliki section **"Selected Portfolio"** yang difokuskan untuk **karya/proyek profesional & komersial** (klien, perusahaan, production apps).

Namun, seorang developer seringkali memiliki eksplorasi teknis lain seperti:
- Kontribusi Open Source / GitHub repository
- Eksperimen teknologi baru / AI agents / WebGL / Canvas / interactive UI
- Mini tools / CLI / boilerplate / npm packages
- Proyek hobi & hackathon

Membuat section khusus **"Playground"** (atau *Lab / Experiments*) yang terpisah dari Portfolio komersial adalah praktik terbaik karena:
1. **Pemisahan Konteks yang Jelas:** Klien/recruiter bisnis fokus ke portofolio komersial (studi kasus, dampak bisnis, klien), sedangkan tech lead/developer peers bisa melihat kreativitas, kedalaman teknis, dan *passion* di Playground.
2. **Fleksibilitas Konten:** Playground tidak harus selalu berupa website utuh—bisa berupa library, kontribusi PR di open source ternama, starter kit, atau demo eksperimen UI.
3. **Konsistensi Visual:** Menggunakan bahasa desain yang sama (dark mode, glassmorphism, rim light styling) sehingga tampilan tetap serasi dan berkelas.

---

## 2. Tujuan & Sasaran

- Menghadirkan section **Playground** di homepage (`/#playground`) dengan visual card yang senada dengan Selected Portfolio.
- Menyediakan halaman detail khusus (`/playground/[slug]`) atau tautan langsung ke GitHub / Live Demo.
- Menyediakan integrasi CMS di **Admin Dashboard** (`/admin/playground`) untuk CRUD data playground via Supabase, lengkap dengan upload gambar preview.
- Memungkinkan filtrasi atau badging berdasarkan tipe project (e.g., `Open Source`, `Experiment`, `Contribution`, `Mini Tool`).

---

## 3. Desain & User Experience (UX)

### 3.1. Penempatan di Homepage
- **Posisi:** Diletakkan setelah/sebelum section Portfolio/Experience (misal: di bawah Selected Portfolio).
- **Header Section:**
  - Label: `PLAYGROUND` / `LABS & EXPERIMENTS`
  - Subtitle singkat: *"A collection of open-source projects, experiments, tools, and side explorations."*
- **Grid Layout:** 3 kolom responsif (1 kolom di mobile, 2 di tablet, 3 di desktop), konsisten dengan Portfolio.

### 3.2. Komponen Card (`PlaygroundCard`)
Mempertahankan desain premium dengan rim-light, glow, dan border elegan:
- **Badge Tipe:** `Open Source` | `Experiment` | `Contribution` | `Library`
- **Judul & Deskripsi Singkat:** Nama project + apa yang dibuat / diselesaikan
- **Tech Stack Pills:** e.g. `Next.js`, `TypeScript`, `TailwindCSS`, `Rust`, `Python`
- **Action Buttons:**
  - Tombol **GitHub** (ikon GitHub dengan link ke repo)
  - Tombol **Live Demo** / **Halaman Detail** (ikon external link)
- **Preview Visual:** Gambar tangkapan layar, mock UI, atau thumbnail ilustrasi

---

## 4. Skema Database (Supabase)

Tabel baru: `playground_items`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | `uuid` PK | Default `gen_random_uuid()` |
| `slug` | `text` UNIQUE NOT NULL | Identifier URL (e.g. `react-awesome-picker`) |
| `title` | `text` NOT NULL | Nama project/repo |
| `type` | `text` | e.g. `Open Source`, `Experiment`, `Contribution`, `Tool` |
| `description` | `text` | Deskripsi ringkas (1-2 kalimat) |
| `overview` | `text` | Penjelasan detail / context / cara kerja |
| `github_url` | `text` | Link ke repository GitHub |
| `preview_url` | `text` | Link live demo / npm / deployment (opsional) |
| `image` | `text` | URL thumbnail utama |
| `images` | `text[]` | Gallery screenshot tambahan (opsional) |
| `tags` | `text[]` | Tech stack / tags (e.g. `['TypeScript', 'Tailwind', 'AI']`) |
| `color` | `text` | Hex color accent tanpa `#` (e.g. `6366f1` / `10b981`) |
| `featured` | `boolean` | Default `true` (tampil di homepage) |
| `order` | `int4` | Urutan tampil (ASC) |
| `created_at` | `timestamptz` | Default `now()` |
| `updated_at` | `timestamptz` | Auto-update via trigger |

### Row Level Security (RLS)
- `SELECT`: Public (anon & authenticated)
- `INSERT`, `UPDATE`, `DELETE`: Authenticated only (Admin)

### Storage
- Menggunakan bucket yang sama (`portfolio-images`) dengan subfolder `/playground/{id}/` atau bucket khusus `playground-images`.

---

## 5. Rencana Arsitektur & Struktur File

```
app/
  playground/
    [slug]/
      page.tsx                     ← [NEW] Halaman detail playground (ISR)
  admin/
    playground/
      page.tsx                     ← [NEW] Daftar playground items di dashboard
      new/
        page.tsx                   ← [NEW] Form tambah item baru
      [id]/
        edit/
          page.tsx                 ← [NEW] Form edit item
      actions.ts                   ← [NEW] Server actions (create, update, delete)

components/
  homepage/
    PlaygroundSection.tsx          ← [NEW] Wrapper section di homepage
    playground/
      index.tsx                    ← [NEW] Fetcher + Grid render
      PlaygroundCard.tsx           ← [NEW] Komponen card aesthetic
  playground/
    PlaygroundDetailPage.tsx       ← [NEW] Halaman detail project
  admin/
    PlaygroundForm.tsx             ← [NEW] Form create/edit playground

data/
  playground.ts                    ← [NEW] TypeScript types & mapper helper

lib/
  supabase/                        ← [REUSE] Client & Server helpers yang sudah ada
```

---

## 6. Integrasi Navigasi

1. **Header Navigation:**
   - Tambah item di `components/theme/Header/navLinks.ts`:
     ```ts
     export const navLinks = [
         { label: "About", href: "#about" },
         { label: "Work", href: "#work" },
         { label: "Playground", href: "#playground" },
         { label: "Services", href: "#services" },
     ];
     ```
2. **Admin Navigation:**
   - Tambahkan tab/menu navigasi di `AdminHeader` untuk beralih antara **Portfolio** dan **Playground**.

---

## 7. Tahapan Implementasi

1. **Fase 1: Database & Data Types**
   - Buat migration / table `playground_items` di Supabase.
   - Buat file `data/playground.ts` dengan interface `PlaygroundItem` dan mapper function.
2. **Fase 2: Admin Dashboard CRUD**
   - Buat `components/admin/PlaygroundForm.tsx`.
   - Buat routing `app/admin/playground/*` dan Server Actions di `app/admin/playground/actions.ts`.
3. **Fase 3: Homepage Component & UI**
   - Buat `PlaygroundCard.tsx` dan `components/homepage/playground/index.tsx`.
   - Pasang `<PlaygroundSection />` di `app/page.tsx`.
   - Update `navLinks.ts`.
4. **Fase 4: Halaman Detail & Routing**
   - Buat route `app/playground/[slug]/page.tsx` dan komponen `PlaygroundDetailPage.tsx`.
5. **Fase 5: Testing & Polishing**
   - Validasi responsive layout, animasi scroll-reveal, integrasi link GitHub/Live Demo, dan performa ISR (60 detik).

---

## 8. Open Questions / Pilihan Desain untuk Didiskusikan

1. **Aksi Klik Card:**
   - **Opsi A (Detail Page):** Klik card selalu membuka `/playground/[slug]` yang berisi overview teknis, tantangan coding, dan link repo/demo (mirip halaman detail portfolio).
   - **Opsi B (Direct / Quick Links):** Card langsung memiliki tombol eksternal ke GitHub repo dan Live Demo tanpa harus masuk ke halaman detail, atau membuka modal/drawer ringan.
   - **Opsi C (Hybrid):** Card bisa diklik ke detail page, tetapi memiliki ikon *quick action* di sudut card untuk langsung loncat ke GitHub repo.
2. **Filter Kategori di Homepage:**
   - Apakah perlu ada tab filter kategori (misal: *All*, *Open Source*, *Experiments*, *Tools*) di atas grid Playground, atau cukup tampilkan semua dalam 1 grid?
