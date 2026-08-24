# PRD — Pemisahan Gambar Card Homepage & Gambar Detail (`/[slug]`)
*(Portfolio & Playground Items)*

## 1. Ringkasan Eksekutif (Executive Summary)

Dokumen ini mendefinisikan kebutuhan teknis dan fungsional untuk **memisahkan pengelolaan aset gambar** antara:
1. **Gambar Utama (Card Thumbnail)**: Gambar yang ditampilkan pada kartu ringkasan di halaman Homepage (`PortfolioCard` di section `#work` dan `PlaygroundCard` di section `#playground`).
2. **Gambar Detail (Hero Banner `/[slug]`)**: Gambar resolusi tinggi / showcase banner yang tampil sebagai hero image utama di halaman detail (`/portfolio/[slug]` dan `/playground/[slug]`).

Fitur ini berlaku untuk kedua modul konten dinamis: **Portfolio** (`portfolio_items`) dan **Playground** (`playground_items`).

---

## 2. Latar Belakang & Problem Statement

### Kondisi Saat Ini
- Pada modul Portfolio dan Playground, hanya terdapat satu kolom `image` ("Gambar Utama") di database Supabase dan satu upload handler di Admin Form.
- Field `image` ini digunakan sekaligus di dua tempat dengan kebutuhan komposisi visual yang berbeda:
  - **Homepage Card**: Membutuhkan mockup/thumbnail yang fokus pada cover mini dengan rasio aspek kompak (16:10 / 16:9), border frame, dan bottom gradient fade.
  - **Detail Page `/[slug]`**: Membutuhkan banner hero besar beresolusi tinggi (misalnya full-page mockup, screenshot dashboard utuh, atau banner presentasi visual).

### Dampak & Masalah
- Ketika admin mengunggah screenshot panjang atau banner horizontal untuk kebutuhan halaman detail, gambar tersebut sering terpotong secara kurang optimal di card homepage.
- Sebaliknya, jika mengunggah thumbnail mini khusus card, gambar terlihat pecah atau kurang representatif saat dibuka sebagai hero image di halaman `/[slug]`.

### Solusi
Menyediakan dua field gambar terpisah:
- **`image`**: Thumbnail / Cover Card Homepage.
- **`detail_image`**: Banner Hero Utama Halaman Detail `/[slug]`.
- **Fallback Otomatis**: Jika `detail_image` tidak diisi atau kosong, sistem secara otomatis (*graceful fallback*) akan menggunakan `image`, sehingga data lama tetap kompatibel tanpa merusak tampilan.

---

## 3. Scope & Batasan

1. **Database (Supabase)**:
   - Menambahkan kolom `detail_image` (tipe `TEXT`, default `''` atau nullable) pada tabel `portfolio_items` dan `playground_items`.
2. **TypeScript Data Layer**:
   - Memperbarui type definitions (`PortfolioItem`, `DbPortfolioRow`, `PlaygroundItem`, `DbPlaygroundRow`).
   - Memperbarui fungsi mapper `mapPortfolioRow` dan `mapPlaygroundRow`.
3. **Server Actions (Admin)**:
   - Memperbarui payload mapper `toDbRow` pada `portfolio/actions.ts` dan `playground/actions.ts`.
   - Menggunakan existing bucket `portfolio-images` di Supabase Storage untuk upload kedua gambar.
4. **Admin Dashboard UI**:
   - Menambahkan section input/upload terpisah untuk **Gambar Detail** di `PortfolioForm.tsx` dan `PlaygroundForm.tsx`.
   - UI mencakup: tombol upload gambar, upload loader, preview thumbnail, tombol hapus/reset, serta input manual URL.
5. **Halaman Publik**:
   - `PortfolioCard.tsx` & `PlaygroundCard.tsx`: Memakai `item.image`.
   - `PortfolioDetailPage.tsx` & `PlaygroundDetailPage.tsx`: Memakai `item.detailImage || item.image`.
   - Galeri Screenshot (`item.images`): Tetap berfungsi normal sebagai galeri tambahan di bawah konten.

---

## 4. Perubahan Database (SQL Migration)

Jalankan perintah SQL berikut di **Supabase SQL Editor**:

```sql
-- ==============================================================================
-- 1. Tambah kolom detail_image pada tabel portfolio_items
-- ==============================================================================
ALTER TABLE public.portfolio_items
ADD COLUMN IF NOT EXISTS detail_image TEXT DEFAULT '';

-- ==============================================================================
-- 2. Tambah kolom detail_image pada tabel playground_items
-- ==============================================================================
ALTER TABLE public.playground_items
ADD COLUMN IF NOT EXISTS detail_image TEXT DEFAULT '';
```

### Skema Final Kolom Gambar pada Kedua Tabel

| Tabel | Kolom | Tipe | Default | Keterangan |
|---|---|---|---|---|
| `portfolio_items` | `image` | `TEXT` | `''` | URL Gambar Thumbnail Card Homepage |
| `portfolio_items` | `detail_image` | `TEXT` | `''` | URL Gambar Banner Hero di `/portfolio/[slug]` |
| `portfolio_items` | `images` | `TEXT[]` | `ARRAY[]::TEXT[]` | Array URL Galeri Screenshot tambahan |
| `playground_items` | `image` | `TEXT` | `''` | URL Gambar Thumbnail Card Homepage |
| `playground_items` | `detail_image` | `TEXT` | `''` | URL Gambar Banner Hero di `/playground/[slug]` |
| `playground_items` | `images` | `TEXT[]` | `ARRAY[]::TEXT[]` | Array URL Galeri Screenshot tambahan |

---

## 5. Rincian Perubahan Teknis (Implementation Details)

### 5.1. TypeScript Interface & Data Mapping

#### `data/portfolio.ts`
```ts
export type PortfolioItem = {
    id?: string;
    slug: string;
    category: string;
    title: string;
    description: string;
    tags: string[];
    previewUrl: string;
    image: string;          // Thumbnail Card Homepage
    detailImage?: string;   // [NEW] Hero Banner di /[slug]
    images: string[];       // Galeri Screenshot
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
    detail_image?: string | null; // [NEW]
    images: string[] | null;
    tags: string[] | null;
    features: string[] | null;
    order: number;
};

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
        detailImage: row.detail_image ?? undefined, // [NEW]
        images: row.images ?? [],
        tags: row.tags ?? [],
        features: row.features ?? [],
        order: row.order,
    };
}
```

#### `data/playground.ts`
```ts
export type PlaygroundItem = {
    id?: string;
    slug: string;
    title: string;
    type: string;
    description: string;
    overview?: string;
    githubUrl?: string;
    previewUrl?: string;
    image: string;          // Thumbnail Card Homepage
    detailImage?: string;   // [NEW] Hero Banner di /[slug]
    images: string[];       // Galeri Screenshot
    tags: string[];
    features?: string[];
    color: string;
    order?: number;
    createdAt?: string;
    updatedAt?: string;
};

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
    detail_image?: string | null; // [NEW]
    images: string[] | null;
    tags: string[] | null;
    features: string[] | null;
    color: string;
    order: number;
    created_at?: string;
    updated_at?: string;
};

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
        detailImage: row.detail_image ?? undefined, // [NEW]
        images: row.images ?? [],
        tags: row.tags ?? [],
        features: row.features ?? [],
        color: row.color || "6366f1",
        order: row.order ?? 0,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
```

---

### 5.2. Admin Server Actions

#### `app/admin/(dashboard)/portfolio/actions.ts`
Perbarui fungsi `toDbRow`:
```ts
function toDbRow(data: PortfolioFormData) {
    return {
        slug: data.slug.trim(),
        category: data.category.trim(),
        title: data.title.trim(),
        description: data.description.trim(),
        overview: data.overview.trim() || null,
        challenge: data.challenge.trim() || null,
        solution: data.solution.trim() || null,
        client: data.client.trim() || null,
        role: data.role.trim() || null,
        published_at: data.publishedAt.trim() || null,
        status: data.status || null,
        color: data.color.replace("#", "").trim(),
        image_position: data.imagePosition,
        preview_url: data.previewUrl.trim(),
        image: data.image.trim(),
        detail_image: (data.detailImage ?? "").trim(), // [NEW]
        images: data.images,
        tags: data.tags,
        features: data.features,
        order: data.order,
        updated_at: new Date().toISOString(),
    };
}
```

#### `app/admin/(dashboard)/playground/actions.ts`
Perbarui fungsi `toDbRow`:
```ts
function toDbRow(data: PlaygroundFormData) {
    return {
        slug: data.slug.trim(),
        title: data.title.trim(),
        type: data.type.trim() || "Open Source",
        description: data.description.trim(),
        overview: data.overview.trim() || null,
        github_url: data.githubUrl.trim() || null,
        preview_url: data.previewUrl.trim() || null,
        color: data.color.replace("#", "").trim() || "6366f1",
        image: data.image.trim(),
        detail_image: (data.detailImage ?? "").trim(), // [NEW]
        images: data.images ?? [],
        tags: data.tags ?? [],
        features: data.features ?? [],
        order: data.order ?? 0,
        updated_at: new Date().toISOString(),
    };
}
```

---

### 5.3. Form Admin Component (`PortfolioForm.tsx` & `PlaygroundForm.tsx`)

#### Struktur State Form:
```ts
export type PortfolioFormData = {
    // ...field lain
    image: string;         // Gambar Card Utama (Homepage)
    detailImage: string;   // Gambar Detail (Halaman /[slug])
    images: string[];      // Galeri Screenshot Tambahan
    // ...
};
```

#### Upload Handlers di Form:
```ts
const [uploadingMain, setUploadingMain] = useState(false);
const [uploadingDetail, setUploadingDetail] = useState(false); // [NEW]
const [uploadingGallery, setUploadingGallery] = useState(false);

const handleDetailImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingDetail(true);
    setError(null);
    try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await uploadPortfolioImage(formData); // atau uploadPlaygroundImage
        if (res.success && res.url) {
            set("detailImage", res.url);
        } else {
            setError(res.error || "Gagal mengunggah gambar detail.");
        }
    } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan saat mengunggah gambar.");
    } finally {
        setUploadingDetail(false);
        e.target.value = "";
    }
};
```

#### Tampilan UI di Form Admin:
Form akan memiliki 3 blok media yang rapi dan terorganisir:
1. **Gambar Utama (Card Homepage)**:
   - Preview thumbnail 16:10.
   - Tombol Upload + Status Loader.
   - Input URL alternatif.
   - Deskripsi petunjuk: *"Gambar ini tampil di kartu homepage (#work / #playground)."*
2. **Gambar Detail (Hero Banner `/[slug]`)**:
   - Preview banner.
   - Tombol Upload + Status Loader.
   - Input URL alternatif.
   - Deskripsi petunjuk: *"Gambar resolusi tinggi yang tampil sebagai hero banner di halaman /[slug]. Jika kosong, akan otomatis memakai Gambar Utama."*
3. **Galeri Screenshot (Gallery)**:
   - Multi-upload untuk screenshot fitur/section tambahan di bagian bawah halaman detail.

---

### 5.4. Komponen Halaman Publik

#### 1. Homepage Cards:
- **`components/homepage/portfolio/PortfolioCard.tsx`**:
  ```tsx
  <Image
      src={item.image}
      alt={item.title || "Portfolio preview"}
      fill
      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
  />
  ```
- **`components/homepage/playground/PlaygroundCard.tsx`**:
  ```tsx
  <Image
      src={item.image}
      alt={item.title || "Playground preview"}
      fill
      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
  />
  ```

#### 2. Detail Pages (`/[slug]`):
- **`components/portfolio/PortfolioDetailPage.tsx`**:
  ```tsx
  // Ambil gambar hero utama: prioritas detailImage, fallback ke image
  const heroImage = item.detailImage || item.image;

  // Galeri foto tetap mengambil list screenshot tambahan
  const images = (item.images?.length ? item.images : [heroImage]).filter(Boolean);
  ```
  Render Hero Image:
  ```tsx
  {heroImage && (
      <ScrollReveal animation="fade-up" duration={800} delay={100}>
          <div
              className="relative w-full mt-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              style={{ aspectRatio: "16/10" }}
          >
              <Image
                  src={heroImage}
                  alt={item.title}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                      background: `radial-gradient(ellipse at top, #${accentColor}20 0%, transparent 60%)`,
                  }}
              />
          </div>
      </ScrollReveal>
  )}
  ```

- **`components/playground/PlaygroundDetailPage.tsx`**:
  ```tsx
  // Ambil gambar hero utama: prioritas detailImage, fallback ke image
  const heroImage = item.detailImage || item.image;

  // Galeri foto screenshot demo
  const images = (item.images?.length ? item.images : [heroImage]).filter(Boolean);
  ```
  Render Hero Image:
  ```tsx
  {heroImage && (
      <ScrollReveal animation="fade-up" duration={800} delay={100}>
          <div
              className="relative w-full mt-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              style={{ aspectRatio: "16/9" }}
          >
              <Image
                  src={heroImage}
                  alt={item.title}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                      background: `radial-gradient(ellipse at top, #${accentColor}25 0%, transparent 65%)`,
                  }}
              />
          </div>
      </ScrollReveal>
  )}
  ```

---

## 6. Struktur File yang Terlibat

```
data/
  portfolio.ts                                   ← MODIFY (tambah detailImage & detail_image)
  playground.ts                                  ← MODIFY (tambah detailImage & detail_image)

app/admin/(dashboard)/
  portfolio/
    actions.ts                                   ← MODIFY (update toDbRow)
  playground/
    actions.ts                                   ← MODIFY (update toDbRow)

components/admin/
  PortfolioForm.tsx                              ← MODIFY (tambah upload & input Gambar Detail)
  PlaygroundForm.tsx                             ← MODIFY (tambah upload & input Gambar Detail)

components/portfolio/
  PortfolioDetailPage.tsx                        ← MODIFY (hero render item.detailImage || item.image)

components/playground/
  PlaygroundDetailPage.tsx                       ← MODIFY (hero render item.detailImage || item.image)

components/homepage/portfolio/
  PortfolioCard.tsx                              ← KEEP (memakai item.image)

components/homepage/playground/
  PlaygroundCard.tsx                             ← KEEP (memakai item.image)

supabase/
  migration_add_detail_image.sql                 ← NEW (script SQL alter table)
```

---

## 7. Rencana Verifikasi & Testing (Acceptance Criteria)

### A. Database & Schema Check
- [ ] Kolom `detail_image` berhasil ditambahkan di tabel `portfolio_items` dan `playground_items` tanpa merusak data yang sudah ada.
- [ ] Item lama yang memiliki `detail_image` kosong (`null` atau `''`) tidak menghasilkan runtime error.

### B. Admin Dashboard Form Test
- [ ] Buka form tambah (`/admin/portfolio/new` & `/admin/playground/new`): terdapat 2 input upload gambar (**Gambar Utama** dan **Gambar Detail**) serta multi-upload **Galeri**.
- [ ] Unggah file gambar untuk Gambar Utama: preview muncul, url tersimpan.
- [ ] Unggah file gambar untuk Gambar Detail: preview muncul, url tersimpan.
- [ ] Coba edit item yang sudah ada (`/admin/portfolio/[id]/edit`): kedua URL gambar terisi dengan benar pada form edit.

### C. Homepage Display Test
- [ ] Pada homepage section `#work`, kartu portfolio menampilkan **Gambar Utama (`image`)**.
- [ ] Pada homepage section `#playground`, kartu playground menampilkan **Gambar Utama (`image`)**.

### D. Detail Page `/[slug]` Display Test
- [ ] Buka `/portfolio/[slug]`: Hero banner menampilkan **Gambar Detail (`detailImage`)**.
- [ ] Buka `/playground/[slug]`: Hero banner menampilkan **Gambar Detail (`detailImage`)**.
- [ ] Coba skenario fallback (kosongkan Gambar Detail pada salah satu item): Hero banner otomatis menampilkan **Gambar Utama (`image`)** tanpa error atau broken image.
- [ ] Galeri screenshot di bagian bawah halaman detail tetap memuat seluruh foto dari array `images`.

---

## 8. Panduan Eksekusi Langkah-demi-Langkah

1. **Jalankan SQL Migration** di Dashboard Supabase.
2. **Perbarui TypeScript Types & Mapper** di `data/portfolio.ts` dan `data/playground.ts`.
3. **Perbarui Server Actions** di `app/admin/(dashboard)/portfolio/actions.ts` dan `playground/actions.ts`.
4. **Perbarui Form Admin** di `components/admin/PortfolioForm.tsx` dan `components/admin/PlaygroundForm.tsx`.
5. **Perbarui Halaman Detail** di `components/portfolio/PortfolioDetailPage.tsx` dan `components/playground/PlaygroundDetailPage.tsx`.
6. **Lakukan Build & Test** (`npm run build` / `npx tsc --noEmit`) untuk memastikan tidak ada kesalahan kompilasi.
