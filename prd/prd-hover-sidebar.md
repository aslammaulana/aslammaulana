# Product Requirement Document (PRD)
# Implementasi Collapsible Hover Sidebar pada Admin Dashboard (`/admin/*`) `aslammaulana`

> **Status:** Ready for Implementation  
> **Target Scope:** Khusus halaman `/admin` dan seluruh sub-halaman dashboard (`/admin/portfolio/*`, `/admin/playground/*`), **KECUALI** `/admin/login`  
> **Benchmark Source:** `tmbh` (`tmbh/components/Sidebar.tsx`, `tmbh/components/DashboardShell.tsx`, `tmbh/components/Header.tsx`)  
> **Tanggal:** 24 Agustus 2026  

---

## 1. Latar Belakang & Tujuan

### 1.1 Latar Belakang
Saat ini, area dashboard admin pada `aslammaulana` (`/admin/*`) menggunakan top header konvensional (`AdminHeader.tsx`) yang menempati ruang vertikal atas. Untuk meningkatkan efisiensi navigasi, kemudahan manajemen konten (Portfolio & Playground), serta menyajikan UX yang modern dan interaktif seperti pada proyek **`tmbh`**, akan diterapkan **Collapsible Hover Sidebar** khusus di seluruh area Admin Dashboard.

Halaman `/admin/login` dan seluruh halaman publik website (Homepage `/`, `/about`, `/portfolio/[slug]`, `/playground/[slug]`) **tetap mempertahankan tata letak aslinya** dan tidak terpengaruh oleh sidebar ini.

### 1.2 Tujuan
1. Menerapkan **Sidebar Admin Collapsible (Hover-to-Expand)** pada `app/admin/(dashboard)` dengan mekanisme, animasi, dan feel yang **persis sama** seperti di `tmbh`.
2. Menyediakan navigasi satu-klik ke seluruh fitur CMS:
   - **Portfolio CMS** (`/admin`)
   - **Tambah Portfolio** (`/admin/portfolio/new`)
   - **Playground CMS** (`/admin/playground`)
   - **Tambah Playground** (`/admin/playground/new`)
   - **Kembali ke Homepage** (`/`)
   - **User Info & Tombol Logout Supabase**
3. Menyediakan mode **Mobile Drawer Sidebar** dengan tombol hamburger dan backdrop overlay yang responsif untuk layar mobile (`< md`).
4. Mengintegrasikan `AdminShell` pada `app/admin/(dashboard)/layout.tsx` dengan offset `md:pl-[64px]` sehingga konten admin tidak tertimpa saat sidebar dalam kondisi default (collapsed).

---

## 2. Analisis Benchmark Mekanisme Sidebar `tmbh`

| Fitur / Parameter | Implementasi di `tmbh` | Adaptasi pada Admin `aslammaulana` |
|---|---|---|
| **Scope Penerapan** | Dashboard Area (`/dashboard/*`) | Admin Dashboard (`/admin/*` dalam `(dashboard)` layout) |
| **Lebar Collapsed (Desktop)** | `w-[64px]` (4rem) | `w-[64px]` (Ikon navigasi & logo monogram di tengah) |
| **Lebar Expanded (Desktop)** | `hover:w-[240px]` | `hover:w-[240px]` (Melebar saat kursor hover) |
| **Durasi & Kurva Animasi** | `transition-all duration-300 ease-in-out` | `transition-all duration-300 ease-in-out` |
| **Posisi & Layering** | `fixed left-0 top-0 z-40 h-screen` | `fixed left-0 top-0 z-40 h-screen` (Floating overlay tanpa pergeseran layout) |
| **Penyembunyian Teks** | `opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap` | `opacity-0 group-hover:opacity-100 whitespace-nowrap` |
| **Offset Konten Admin** | `md:pl-[64px]` pada content wrapper | `md:pl-[64px]` pada main container di `AdminShell` |
| **Mobile Drawer (`< md`)** | `fixed z-50 w-[80%] max-w-[300px] -translate-x-full` $\rightarrow$ `translate-x-0` | Slide in dari kiri ke kanan dengan backdrop overlay (`bg-black/60`) |
| **Bottom / Footer Action** | User profile & Settings | User Email display + Tombol Logout + Link Homepage |

---

## 3. Spesifikasi Fungsional & Menu Navigasi Admin

### 3.1 Daftar Menu Sidebar Admin

```ts
// Menu Utama (Top Section)
export const adminNavItems = [
  {
    label: "Portfolio CMS",
    href: "/admin",
    icon: FolderGit2, // atau Briefcase
    exact: true,
  },
  {
    label: "Tambah Portfolio",
    href: "/admin/portfolio/new",
    icon: PlusCircle,
    exact: true,
  },
  {
    label: "Playground CMS",
    href: "/admin/playground",
    icon: Sparkles, // atau FlaskConical
    exact: true,
  },
  {
    label: "Tambah Playground",
    href: "/admin/playground/new",
    icon: PlusCircle,
    exact: true,
  },
];
```

#### Menu Bawah (Bottom Section / Utilities):
1. **Kembali ke Homepage** (`/`) dengan ikon `Home` / `ArrowUpRight`.
2. **User Info (Email):** Menampilkan avatar/ikon `User` dan alamat email admin yang sedang login (hanya tampil penuh saat sidebar expanded).
3. **Tombol Logout:** Ikon `LogOut` yang memicu `supabase.auth.signOut()` dan redirect ke `/admin/login`.

---

### 3.2 Perilaku Interaksi Desktop (`md:` ke atas)
1. **Default (Collapsed — 64px):**
   - Hanya logo kotak monogram `AM` dan ikon-ikon navigasi yang terlihat vertikal di tengah.
   - Seluruh label teks tersembunyi (`opacity-0 whitespace-nowrap`).
2. **Hovered (Expanded — 240px):**
   - Saat kursor mouse masuk ke area sidebar (`aside.group:hover`), sidebar melebar secara mulus menjadi `240px`.
   - Header menampilkan logo `AM` + teks "Aslam CMS" / "Admin Dashboard".
   - Teks label setiap menu muncul dengan transisi opacity (`opacity-100`).
   - Konten halaman admin tidak bergeser karena sidebar mengambang (`fixed z-40`).
3. **Active State:**
   - Link rute aktif memiliki highlight: `bg-white/15 text-white font-semibold border border-white/10 shadow-sm`.
   - Link inaktif: `text-white/60 hover:text-white hover:bg-white/10 transition-colors`.

---

### 3.3 Perilaku Interaksi Mobile (`< md`)
1. Sidebar desktop disembunyikan (`hidden md:flex`).
2. Terdapat **Admin Mobile Header** di bagian atas:
   - Menampilkan Logo `AM Admin` dan tombol Hamburger Menu.
3. Saat tombol Hamburger di-klik:
   - Sidebar mobile muncul (*slide-in*) dari kiri (`translate-x-0`).
   - Backdrop overlay gelap (`bg-black/60 fixed inset-0 z-45`) muncul di belakang drawer.
   - Teks label langsung terlihat (`opacity-100`).
   - Terdapat tombol `X` di header drawer untuk menutup sidebar.
4. Sidebar otomatis tertutup jika:
   - Tombol `X` di-klik.
   - Area backdrop di-klik.
   - Pengguna berpindah rute navigasi.

---

### 3.4 Pengecualian Halaman Login (`/admin/login`)
- Halaman `/admin/login` berada di luar route group `(dashboard)` (`app/admin/login/page.tsx`).
- Halaman login **TIDAK** menggunakan `AdminShell` maupun `AdminSidebar`, sehingga tampilannya tetap bersih khusus form login tanpa sidebar.

---

## 4. Desain & Visual Tokens (Dark Aesthetic)

| Elemen | Token CSS / Nilai |
|---|---|
| **Background Sidebar** | `#0f0e0f` (atau `#141414`) dengan `backdrop-blur-md` |
| **Border Kanan** | `border-r border-white/10` (atau `border-[#ffffff27]`) |
| **Logo Monogram** | Box rounded `h-9 w-9 bg-white text-black font-bold flex items-center justify-center` |
| **Menu Item Height** | `h-10` (padding `px-3`, rounded `rounded-xl`) |
| **Active Item** | `bg-white/15 text-white font-semibold border border-white/10` |
| **Inactive Item** | `text-zinc-400 hover:text-white hover:bg-white/10` |
| **Logout Button** | `text-red-400/80 hover:text-red-300 hover:bg-red-500/10` |
| **Content Padding** | `md:pl-[64px]` pada main layout container |

---

## 5. Arsitektur File & Rencana Perubahan

```
aslammaulana/
├── components/
│   └── admin/
│       ├── AdminSidebar.tsx       ← [NEW] Sidebar utama (Hover Desktop + Mobile Drawer + Logout)
│       ├── AdminShell.tsx         ← [NEW] Shell layout admin (Sidebar + Mobile Header + md:pl-[64px])
│       ├── AdminMobileHeader.tsx  ← [NEW] Top bar mobile khusus admin dengan hamburger trigger
│       ├── AdminHeader.tsx        ← [DEPRECATE / REPLACE] Digantikan oleh AdminShell & AdminSidebar
│       ├── PortfolioForm.tsx      ← [TETAP]
│       └── PlaygroundForm.tsx     ← [TETAP]
├── app/
│   └── admin/
│       ├── login/
│       │   └── page.tsx           ← [TETAP] Bebas dari sidebar (tanpa sidebar)
│       └── (dashboard)/
│           ├── layout.tsx         ← [MODIFY] Membungkus children dengan <AdminShell user={user}>
│           ├── page.tsx           ← [TETAP] Portfolio CMS List
│           ├── portfolio/...      ← [TETAP]
│           └── playground/...     ← [TETAP]
```

---

## 6. Rencana Implementasi Step-by-Step

### Langkah 1: Pembuatan Komponen `AdminSidebar.tsx`
- Buat komponen `AdminSidebar` dengan struktur desktop `aside.group hover:w-[240px]` dan mobile drawer `aside.translate-x-0`.
- Tambahkan integrasi `usePathname()` untuk auto-highlight rute aktif (`/admin`, `/admin/portfolio/*`, `/admin/playground/*`).
- Tambahkan aksi `handleLogout` menggunakan `createClient()` Supabase.

### Langkah 2: Pembuatan Komponen `AdminMobileHeader.tsx` & `AdminShell.tsx`
- Buat top header mobile yang hanya aktif di layar `< md`.
- Buat layout wrapper `AdminShell` yang mengatur state `mobileSidebarOpen`, backdrop overlay, dan `md:pl-[64px]` untuk konten.

### Langkah 3: Update `app/admin/(dashboard)/layout.tsx`
- Gantikan `AdminHeader` lama dengan `AdminShell`.
- Teruskan informasi email pengguna dari server component ke `AdminShell`.

### Langkah 4: Testing & Verifikasi
- Uji hover pada desktop: Melebar dari `64px` ke `240px` secara mulus tanpa menggeser tabel/form CMS.
- Uji navigasi: Klik Portfolio CMS, Tambah Portfolio, Playground CMS, Tambah Playground, dan Kembali ke Homepage.
- Uji Logout: Memastikan session terhapus dan diarahkan ke `/admin/login`.
- Uji Mobile: Memastikan drawer mobile terbuka dan tertutup dengan benar.
- Uji Isolasi: Memastikan `/admin/login` dan halaman publik (`/`, `/about`, dll.) tidak memiliki sidebar.

---

## 7. Rencana Pengujian (Verification Plan)

| Skenario Pengujian | Hasil yang Diharapkan |
|---|---|
| **Hover Desktop di `/admin`** | Sidebar melebar dari `64px` ke `240px` dengan animasi 300ms saat mouse diarahkan ke sidebar. |
| **Unhover Desktop** | Sidebar mengecil kembali ke `64px` dan teks menghilang secara mulus tanpa layout shift. |
| **Konten Admin Tidak Tertimpa** | Tabel portfolio & playground memiliki margin kiri aman berkat `md:pl-[64px]`. |
| **Navigasi Aktif** | Tab aktif tersorot sesuai rute yang sedang dibuka. |
| **Pengecualian `/admin/login`** | Halaman login tidak menampilkan sidebar sama sekali. |
| **Halaman Publik Bebas Sidebar** | Homepage `/`, `/about`, `/portfolio/*` tetap menggunakan navigasi publik aslinya. |
| **Logout Aksi** | Mengklik tombol logout berhasil sign out dan me-redirect ke `/admin/login`. |
| **Build & Type Check** | `npm run build` berhasil 100% tanpa error TypeScript/Linting. |
