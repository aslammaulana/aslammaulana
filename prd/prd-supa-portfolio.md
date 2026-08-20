# PRD — Supabase Integration: Portfolio CMS + Auth + Dashboard

## Latar Belakang

Saat ini data portfolio disimpan statis di `data/portfolio.ts`.
Tujuan: migrasikan data ke **Supabase** sehingga konten bisa dikelola secara dinamis melalui halaman dashboard tanpa perlu deploy ulang.

---

## Keputusan Desain

| Topik | Keputusan |
|---|---|
| Upload gambar | Supabase Storage (upload dari dashboard) |
| Admin user | Dibuat manual di Supabase dashboard (tanpa halaman register) |
| Seed data | Diisi manual lewat dashboard |
| Rendering halaman publik | **ISR — revalidate 60 detik** |

---

## Scope

1. **Supabase Setup** — install client, env vars, schema database
2. **Auth** — login admin via Supabase Auth (email + password), route protection via middleware
3. **Dashboard Admin** — CRUD portfolio items + upload gambar ke Supabase Storage
4. **Migrasi halaman publik** — `/portfolio/[slug]` & homepage baca dari Supabase dengan ISR

---

## Tech Stack Tambahan

| Package | Fungsi |
|---|---|
| `@supabase/supabase-js` | Supabase client SDK |
| `@supabase/ssr` | Cookie-based auth untuk Next.js App Router (SSR-safe) |

---

## Perubahan yang Diperlukan

---

### 1. Setup & Konfigurasi

#### Install packages
```bash
npm install @supabase/supabase-js @supabase/ssr
```

#### `.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

#### [NEW] `lib/supabase/client.ts` — Browser client
```ts
import { createBrowserClient } from "@supabase/ssr";
export const createClient = () =>
    createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
```

#### [NEW] `lib/supabase/server.ts` — Server client (cookie-based)
```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
export const createClient = async () => {
    const cookieStore = await cookies();
    return createServerClient(url, anonKey, { cookies: { ... } });
};
```

#### [NEW] `middleware.ts` (root)
- Refresh Supabase session di setiap request
- Guard: redirect ke `/admin/login` jika akses `/admin/*` tanpa session

---

### 2. Skema Database Supabase

#### Tabel: `portfolio_items`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | `uuid` PK | auto-generated |
| `slug` | `text` UNIQUE NOT NULL | URL segment |
| `category` | `text` | e.g. "Company Profile" |
| `title` | `text` | |
| `description` | `text` | Short desc |
| `overview` | `text` | Paragraf panjang |
| `challenge` | `text` | |
| `solution` | `text` | |
| `client` | `text` | |
| `role` | `text` | |
| `published_at` | `text` | e.g. "2024" |
| `status` | `text` | "Live" / "In Progress" / "Archived" |
| `color` | `text` | hex tanpa #, e.g. "0c4778" |
| `image_position` | `text` | "left" / "right" |
| `preview_url` | `text` | |
| `image` | `text` | URL gambar utama (dari Supabase Storage) |
| `images` | `text[]` | array URL gambar gallery |
| `tags` | `text[]` | tech stack |
| `features` | `text[]` | fitur-fitur utama |
| `order` | `int4` | urutan tampil di homepage |
| `created_at` | `timestamptz` | auto |
| `updated_at` | `timestamptz` | auto via trigger |

#### RLS Policy
- `SELECT` → **public** (anon boleh baca)
- `INSERT / UPDATE / DELETE` → **authenticated only**

#### Storage Bucket: `portfolio-images`
- Akses: public read
- Folder: `/{item_id}/` untuk tiap portfolio item

---

### 3. Auth — Login Dashboard

#### [NEW] `app/admin/login/page.tsx`
- Form email + password (Client Component)
- Submit → `supabase.auth.signInWithPassword()`
- Sukses → redirect ke `/admin`
- Error → pesan error inline
- Desain dark mode, konsisten dengan website

#### [NEW] `app/admin/login/actions.ts`
- Server Action: `loginAction(formData)` → set session cookie → redirect

#### [NEW] `app/admin/layout.tsx`
- Server Component
- Cek session → jika tidak ada, redirect `/admin/login`
- Render `AdminHeader` + `{children}`

---

### 4. Dashboard Admin — CRUD

#### [NEW] `app/admin/page.tsx` — Home
- Stats: total project, jumlah Live / In Progress / Archived
- Tabel daftar semua portfolio (order, title, status, tahun, slug)
- Tombol "Tambah Baru" → `/admin/portfolio/new`
- Per baris: tombol Edit & Delete

#### [NEW] `app/admin/portfolio/new/page.tsx`
- Render `<PortfolioForm />` (kosong)
- Judul: "Tambah Portfolio Baru"

#### [NEW] `app/admin/portfolio/[id]/edit/page.tsx`
- Fetch item by id dari Supabase
- Render `<PortfolioForm defaultValues={item} />`

#### [NEW] `app/admin/portfolio/actions.ts` — Server Actions
```ts
createPortfolioItem(formData)   // insert + revalidatePath
updatePortfolioItem(id, formData) // update + revalidatePath
deletePortfolioItem(id)          // delete + revalidatePath
uploadImage(file, itemId)        // upload ke Supabase Storage → return public URL
```
Setiap aksi memanggil `revalidatePath("/")` dan `revalidatePath("/portfolio/[slug]")`.

#### [NEW] `components/admin/PortfolioForm.tsx`
- Shared form untuk create & edit
- Fields: semua kolom portfolio
- Tags & Features: input chip (ketik → Enter → tambah, klik x → hapus)
- Image upload: drag & drop atau file picker → preview + upload ke Storage
- Images gallery: list URL, bisa tambah/hapus
- Color: color picker hex
- Order: angka
- Validasi: title & slug wajib, slug lowercase-hyphen

#### [NEW] `components/admin/AdminHeader.tsx`
- Logo / nama site kiri
- Breadcrumb tengah
- Tombol Logout kanan → `supabase.auth.signOut()` → redirect login

---

### 5. Halaman Publik — ISR dari Supabase

#### [MODIFY] `components/homepage/portfolio/index.tsx`
```ts
export const revalidate = 60; // ISR 60 detik

// fetch dari Supabase, order by "order" ASC
const { data } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("order", { ascending: true });
```

#### [MODIFY] `app/portfolio/[slug]/page.tsx`
```ts
export const revalidate = 60; // ISR 60 detik

// generateStaticParams — fetch semua slug saat build
export async function generateStaticParams() { ... }

// page — fetch by slug
const { data } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("slug", slug)
    .single();
if (!data) notFound();
```

#### [KEEP] `data/portfolio.ts`
- Type `PortfolioItem` tetap dipakai sebagai TypeScript interface
- Array data dikosongkan atau dihapus

---

### 6. Struktur File Akhir

```
lib/
  supabase/
    client.ts              ← NEW
    server.ts              ← NEW

middleware.ts              ← NEW

app/
  admin/
    layout.tsx             ← NEW (auth guard)
    page.tsx               ← NEW (dashboard home)
    login/
      page.tsx             ← NEW
      actions.ts           ← NEW
    portfolio/
      new/
        page.tsx           ← NEW
      [id]/
        edit/
          page.tsx         ← NEW
      actions.ts           ← NEW

  portfolio/
    [slug]/
      page.tsx             ← MODIFY (Supabase + ISR)

components/
  admin/
    AdminHeader.tsx        ← NEW
    PortfolioForm.tsx      ← NEW

  homepage/portfolio/
    index.tsx              ← MODIFY (Supabase + ISR)

data/
  portfolio.ts             ← KEEP (type only, data dikosongkan)
```

---

## Verification Plan

### Setup
- [ ] Env vars terisi, Supabase project aktif
- [ ] `npm install` sukses
- [ ] `tsc --noEmit` tanpa error

### Auth
- [ ] `/admin` tanpa login → redirect `/admin/login`
- [ ] Login valid → masuk dashboard
- [ ] Logout → redirect login, session hilang

### CRUD
- [ ] Tambah item → muncul di tabel dashboard
- [ ] Edit item → data terupdate
- [ ] Delete item → hilang dari dashboard & publik (setelah ISR)
- [ ] Upload gambar → tersimpan di Supabase Storage, URL tampil di preview

### Publik (ISR)
- [ ] Homepage `#work` menampilkan data dari Supabase
- [ ] `/portfolio/[slug]` load dari Supabase
- [ ] Setelah edit di dashboard → max 60 detik perubahan terlihat di publik
- [ ] Slug invalid → 404
