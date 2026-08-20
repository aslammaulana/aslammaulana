# Panduan Mengisi Form Portfolio untuk Website Institusi / NGO
*(Studi Kasus: Website Profil LT3Q Elmasudy)*

Dokumen ini adalah contoh konkret cara mengisi setiap kolom pada **Dashboard Admin Portfolio** (`/admin/portfolio/new` atau edit) berdasarkan screenshot website lembaga/institusi seperti **LT3Q Elmasudy**.

---

## 1. Identitas Proyek

| Kolom Form | Nilai / Contoh Isian | Penjelasan |
|---|---|---|
| **Title** | `LT3Q Elmasudy — Pusat Kajian Al-Qur'an` | Nama resmi proyek / website. |
| **Slug** | `lt3q-elmasudy` *(otomatis terisi)* | Digunakan untuk link URL: `/portfolio/lt3q-elmasudy`. |
| **Kategori** | `NGO Profile` atau `Education / Non-Profit` | Menjelaskan jenis proyek. |
| **Deskripsi Singkat** | `Website profil lembaga pendidikan & pusat kajian Al-Qur'an terpadu.` | Teks 1 kalimat yang muncul di card portfolio homepage. |
| **Tahun** | `2024` | Tahun pembuatan / peluncuran website. |
| **Status** | `Live` | Pilih **Live** jika web sudah online, atau **In Progress** jika masih tahap develop. |
| **URL Preview** | `https://elmasudy.org` *(atau link domain/demo)* | Tautan langsung ke website yang sudah aktif. |
| **Urutan (Order)** | `1` *(atau nomor urut sesuai keinginan)* | Menentukan posisi urutan kartu di homepage (angka lebih kecil = tampil paling atas/kiri). |

---

## 2. Klien & Peran

| Kolom Form | Nilai / Contoh Isian |
|---|---|
| **Nama Klien** | `Yayasan LT3Q Elmasudy Center Indonesia` |
| **Peran Anda** | `Full-Stack Web Developer & UI Designer` *(sesuaikan peran Anda)* |

---

## 3. Konten (Storytelling & Case Study)

### A. Overview (Tentang Proyek)
> **Contoh Isian:**  
> *"LT3Q Elmasudy merupakan lembaga pendidikan Islam yang berfokus pada pembelajaran dan kajian Al-Qur'an (Tahsin, Tahfidz, dan Tafsir). Proyek ini bertujuan merancang dan membangun website profil institusi yang modern, elegan, dan informatif untuk memudahkan masyarakat, calon santri, dan donatur dalam mengakses informasi program daurah Ramadhan, jenjang sekolah formal, profil pengajar, serta rekam jejak kegiatan santri secara transparan."*

### B. Tantangan (Challenge)
> **Contoh Isian:**  
> *"Lembaga memiliki banyak program pendidikan dengan jenjang berbeda (Daurah Ramadhan, TPA, MDTA, MTS, hingga SMA Plus) serta ratusan dokumentasi foto kegiatan wisuda yang perlu ditampilkan tanpa membuat halaman terasa padat atau lambat saat diakses di perangkat seluler."*

### C. Solusi (Solution)
> **Contoh Isian:**  
> *"1. Menyusun struktur informasi modular dengan kategori kartu terpisah antara Program Daurah dan Program Sekolah.*  
> *2. Mengimplementasikan galeri foto berbasis lazy loading dan visual grid responsif.*  
> *3. Mengadopsi perpaduan warna navy blue dan gold yang mencerminkan nuansa islami, profesional, dan terpercaya."*

---

## 4. Visual & Styling

| Kolom Form | Nilai Rekomendasi | Penjelasan |
|---|---|---|
| **Warna Aksen (Hex tanpa `#`)** | `0e3b64` *(Navy Blue)* atau `d4af37` *(Gold)* | Warna dominan dari brand website (diambil dari warna banner/logo). |
| **Posisi Gambar** | `left` | Tata letak tampilan detail hero card. |

---

## 5. Gambar Utama & Gallery Screenshot

1. **Gambar Utama (Hero Image):**
   - Upload screenshot bagian atas (Hero Section + Headline + Foto Ustadz) atau mockup laptop beresolusi tinggi (format 16:9 / 16:10).

2. **Gallery Screenshot (Galeri Screenshot Pendukung):**
   - **Screenshot 1:** Section *Program Daurah Ramadhan* & *Program Sekolah*
   - **Screenshot 2:** Section *History & Visi Misi*
   - **Screenshot 3:** Section *Galeri Perjalanan Para Santri & Wisuda Akbar*
   - **Screenshot 4:** Tampilan *Footer & Kontak Lembaga*

---

## 6. Tech Stack / Tags

Tambahkan tag satu per satu (ketik lalu tekan **Enter** atau klik icon **+**):
- `Next.js`
- `Tailwind CSS`
- `TypeScript`
- `Lucide Icons`
- `Supabase` *(jika menggunakan database dinamis)*

---

## 7. Fitur Utama (Features)

Tambahkan poin-poin fitur satu per satu (ketik lalu tekan **Enter**):
1. `Hero banner dengan headline institusi dan CTA program terintegrasi`
2. `Katalog Program Daurah Ramadhan dan Program Sekolah modular`
3. `Profil sejarah lembaga (About & History) terstruktur`
4. `Bagian Visi & Misi dengan icon informatif`
5. `Galeri dokumentasi kegiatan santri dan wisuda akbar responsif`
6. `Daftar mitra & legalitas institusi pendukung`
7. `Footer lengkap dengan alamat kantor, Google Maps, & media sosial`

---

## 💡 Tips Tambahan
- **Resolusi Gambar**: Gunakan format `.webp` atau `.png` beresolusi jelas (minimal 1200px lebar) agar tampilan di halaman detail tajam.
- **Slug Unik**: Pastikan slug belum pernah digunakan di project lain agar tidak terjadi konflik URL.
- **Auto-Sync**: Setelah klik tombol **Simpan / Buat Portfolio**, data langsung tersimpan di Supabase dan otomatis tampil di halaman homepage maupun halaman `/portfolio/lt3q-elmasudy`.
