"use client";

import { useState } from "react";
import { uploadPortfolioImage } from "@/app/admin/(dashboard)/portfolio/actions";
import { UploadCloud, X, Plus, Loader2, ImageIcon } from "lucide-react";
import Image from "next/image";

export type PortfolioFormData = {
    slug: string;
    category: string;
    title: string;
    description: string;
    overview: string;
    challenge: string;
    solution: string;
    client: string;
    role: string;
    publishedAt: string;
    status: string;
    color: string;
    imagePosition: "left" | "right";
    previewUrl: string;
    order: number;
    image: string;
    detailImage: string;
    images: string[];
    tags: string[];
    features: string[];
};

type Props = {
    defaultValues?: Partial<PortfolioFormData>;
    onSubmit: (data: PortfolioFormData) => Promise<{ success?: boolean; error?: string } | void>;
    submitLabel?: string;
    isEdit?: boolean;
};

function slugify(str: string) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}

/* ── Small reusable styled input components ── */
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                {label}{required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            {children}
        </div>
    );
}

const inputClass =
    "w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-white/30 focus:bg-white/8 transition-all duration-150";

const textareaClass =
    "w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-white/30 resize-y min-h-[100px] transition-all duration-150";

/* ── Section header ── */
function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 pt-6 pb-1 border-t border-white/8 mt-2">
            {children}
        </p>
    );
}

export default function PortfolioForm({ defaultValues, onSubmit, submitLabel = "Simpan", isEdit = false }: Props) {
    const [form, setForm] = useState<PortfolioFormData>({
        slug: defaultValues?.slug ?? "",
        category: defaultValues?.category ?? "",
        title: defaultValues?.title ?? "",
        description: defaultValues?.description ?? "",
        overview: defaultValues?.overview ?? "",
        challenge: defaultValues?.challenge ?? "",
        solution: defaultValues?.solution ?? "",
        client: defaultValues?.client ?? "",
        role: defaultValues?.role ?? "",
        publishedAt: defaultValues?.publishedAt ?? "",
        status: defaultValues?.status ?? "In Progress",
        color: defaultValues?.color ?? "0c4778",
        imagePosition: defaultValues?.imagePosition ?? "left",
        previewUrl: defaultValues?.previewUrl ?? "",
        order: defaultValues?.order ?? 0,
        image: defaultValues?.image ?? "",
        detailImage: defaultValues?.detailImage ?? "",
        images: defaultValues?.images ?? [],
        tags: defaultValues?.tags ?? [],
        features: defaultValues?.features ?? [],
    });

    const [tagInput, setTagInput] = useState("");
    const [featureInput, setFeatureInput] = useState("");
    const [uploadingMain, setUploadingMain] = useState(false);
    const [uploadingDetail, setUploadingDetail] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const set = <K extends keyof PortfolioFormData>(key: K, value: PortfolioFormData[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const handleTitleChange = (value: string) => {
        set("title", value);
        if (!isEdit) set("slug", slugify(value));
    };

    /* ── Image upload handlers via Server Action ── */
    const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingMain(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await uploadPortfolioImage(formData);
            if (res.success && res.url) {
                set("image", res.url);
            } else {
                setError(res.error || "Gagal mengunggah gambar utama.");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Terjadi kesalahan saat mengunggah gambar.");
        } finally {
            setUploadingMain(false);
            e.target.value = "";
        }
    };

    const handleDetailImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingDetail(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await uploadPortfolioImage(formData);
            if (res.success && res.url) {
                set("detailImage", res.url);
            } else {
                setError(res.error || "Gagal mengunggah gambar detail.");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Terjadi kesalahan saat mengunggah gambar detail.");
        } finally {
            setUploadingDetail(false);
            e.target.value = "";
        }
    };

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;
        setUploadingGallery(true);
        setError(null);
        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                const res = await uploadPortfolioImage(formData);
                if (res.success && res.url) {
                    setForm((prev) => ({ ...prev, images: [...prev.images, res.url!] }));
                } else {
                    setError(res.error || `Gagal mengunggah gambar ${file.name}.`);
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Terjadi kesalahan saat mengunggah galeri.");
        } finally {
            setUploadingGallery(false);
            e.target.value = "";
        }
    };

    /* ── Chip helpers ── */
    const addTag = () => {
        const t = tagInput.trim();
        if (t && !form.tags.includes(t)) {
            set("tags", [...form.tags, t]);
            setTagInput("");
        }
    };

    const addFeature = () => {
        const f = featureInput.trim();
        if (f) {
            set("features", [...form.features, f]);
            setFeatureInput("");
        }
    };

    /* ── Submit ── */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim() || !form.slug.trim()) {
            setError("Title dan Slug wajib diisi.");
            return;
        }
        setError(null);
        setIsPending(true);
        try {
            const res = await onSubmit(form);
            if (res && res.error) {
                setError(res.error);
                setIsPending(false);
            }
        } catch (err) {
            if (err instanceof Error && (err.message.includes("NEXT_REDIRECT") || (err as unknown as { digest?: string }).digest?.includes("NEXT_REDIRECT"))) {
                return;
            }
            setError(err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan.");
            setIsPending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* ── IDENTITAS ── */}
            <SectionTitle>Identitas</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Title" required>
                    <input
                        className={inputClass}
                        value={form.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Nama proyek"
                    />
                </Field>
                <Field label="Slug" required>
                    <input
                        className={inputClass}
                        value={form.slug}
                        onChange={(e) => set("slug", slugify(e.target.value))}
                        placeholder="nama-proyek"
                    />
                </Field>
                <Field label="Kategori">
                    <input
                        className={inputClass}
                        value={form.category}
                        onChange={(e) => set("category", e.target.value)}
                        placeholder="Company Profile, NGO Profile, dll"
                    />
                </Field>
                <Field label="Deskripsi Singkat">
                    <input
                        className={inputClass}
                        value={form.description}
                        onChange={(e) => set("description", e.target.value)}
                        placeholder="Satu kalimat singkat"
                    />
                </Field>
                <Field label="Tahun">
                    <input
                        className={inputClass}
                        value={form.publishedAt}
                        onChange={(e) => set("publishedAt", e.target.value)}
                        placeholder="2024"
                    />
                </Field>
                <Field label="Status">
                    <select
                        className={inputClass}
                        value={form.status}
                        onChange={(e) => set("status", e.target.value)}
                    >
                        <option value="Live">Live</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Archived">Archived</option>
                    </select>
                </Field>
                <Field label="URL Preview">
                    <input
                        className={inputClass}
                        value={form.previewUrl}
                        onChange={(e) => set("previewUrl", e.target.value)}
                        placeholder="https://..."
                        type="url"
                    />
                </Field>
                <Field label="Urutan (Order)">
                    <input
                        className={inputClass}
                        value={form.order}
                        onChange={(e) => set("order", Number(e.target.value))}
                        type="number"
                        min={0}
                    />
                </Field>
            </div>

            {/* ── KLIEN & PERAN ── */}
            <SectionTitle>Klien & Peran</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nama Klien">
                    <input
                        className={inputClass}
                        value={form.client}
                        onChange={(e) => set("client", e.target.value)}
                        placeholder="PT. Example Indonesia"
                    />
                </Field>
                <Field label="Peran Anda">
                    <input
                        className={inputClass}
                        value={form.role}
                        onChange={(e) => set("role", e.target.value)}
                        placeholder="Web Developer, Designer, dll"
                    />
                </Field>
            </div>

            {/* ── KONTEN ── */}
            <SectionTitle>Konten</SectionTitle>
            <Field label="Overview">
                <textarea
                    className={textareaClass}
                    value={form.overview}
                    onChange={(e) => set("overview", e.target.value)}
                    placeholder="Ceritakan latar belakang & tujuan proyek ini..."
                />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Tantangan">
                    <textarea
                        className={textareaClass}
                        value={form.challenge}
                        onChange={(e) => set("challenge", e.target.value)}
                        placeholder="Apa tantangan utama yang dihadapi?"
                    />
                </Field>
                <Field label="Solusi">
                    <textarea
                        className={textareaClass}
                        value={form.solution}
                        onChange={(e) => set("solution", e.target.value)}
                        placeholder="Bagaimana Anda menyelesaikannya?"
                    />
                </Field>
            </div>

            {/* ── VISUAL ── */}
            <SectionTitle>Visual</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Warna Aksen (hex tanpa #)">
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            value={`#${form.color}`}
                            onChange={(e) => set("color", e.target.value.replace("#", ""))}
                            className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                        />
                        <input
                            className={inputClass}
                            value={form.color}
                            onChange={(e) => set("color", e.target.value.replace("#", ""))}
                            placeholder="0c4778"
                            maxLength={6}
                        />
                    </div>
                </Field>
                <Field label="Posisi Gambar (di layout detail)">
                    <select
                        className={inputClass}
                        value={form.imagePosition}
                        onChange={(e) => set("imagePosition", e.target.value as "left" | "right")}
                    >
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                    </select>
                </Field>
            </div>

            {/* ── GAMBAR UTAMA (HOMEPAGE CARD) ── */}
            <SectionTitle>Gambar Utama (Card Thumbnail Homepage)</SectionTitle>
            <p className="text-white/40 text-xs -mt-2">
                Gambar thumbnail yang tampil pada kartu portfolio di halaman depan (#work).
            </p>
            <div className="flex flex-col gap-3">
                {form.image && (
                    <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden border border-white/10">
                        <Image src={form.image} alt="Main card thumbnail" fill unoptimized className="object-cover" />
                        <button
                            type="button"
                            onClick={() => set("image", "")}
                            className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white/80 hover:text-white"
                        >
                            <X size={14} />
                        </button>
                    </div>
                )}
                <label className="flex items-center gap-2 w-fit px-4 py-2.5 rounded-lg border border-white/15 bg-white/5 text-white/60 text-sm cursor-pointer hover:bg-white/10 hover:text-white transition-all duration-200">
                    {uploadingMain ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <UploadCloud size={16} />
                    )}
                    {form.image ? "Ganti Gambar Utama" : "Upload Gambar Utama"}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleMainImageUpload}
                        disabled={uploadingMain}
                    />
                </label>
                <p className="text-white/30 text-xs">Atau isi URL langsung:</p>
                <input
                    className={inputClass}
                    value={form.image}
                    onChange={(e) => set("image", e.target.value)}
                    placeholder="https://... atau path /assets/..."
                />
            </div>

            {/* ── GAMBAR DETAIL (HERO /[SLUG]) ── */}
            <SectionTitle>Gambar Detail (Hero Banner /[slug])</SectionTitle>
            <p className="text-white/40 text-xs -mt-2">
                Gambar resolusi tinggi / showcase banner yang tampil sebagai hero banner di halaman detail (/portfolio/[slug]). Jika dikosongkan, otomatis menggunakan Gambar Utama.
            </p>
            <div className="flex flex-col gap-3">
                {form.detailImage && (
                    <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden border border-white/10">
                        <Image src={form.detailImage} alt="Detail hero banner" fill unoptimized className="object-cover" />
                        <button
                            type="button"
                            onClick={() => set("detailImage", "")}
                            className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white/80 hover:text-white"
                        >
                            <X size={14} />
                        </button>
                    </div>
                )}
                <label className="flex items-center gap-2 w-fit px-4 py-2.5 rounded-lg border border-white/15 bg-white/5 text-white/60 text-sm cursor-pointer hover:bg-white/10 hover:text-white transition-all duration-200">
                    {uploadingDetail ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <UploadCloud size={16} />
                    )}
                    {form.detailImage ? "Ganti Gambar Detail" : "Upload Gambar Detail"}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleDetailImageUpload}
                        disabled={uploadingDetail}
                    />
                </label>
                <p className="text-white/30 text-xs">Atau isi URL langsung:</p>
                <input
                    className={inputClass}
                    value={form.detailImage}
                    onChange={(e) => set("detailImage", e.target.value)}
                    placeholder="https://... atau path /assets/..."
                />
            </div>

            {/* ── GALLERY ── */}
            <SectionTitle>Gallery</SectionTitle>
            <div className="flex flex-col gap-3">
                {form.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                        {form.images.map((url, i) => (
                            <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                                <Image src={url} alt={`Gallery ${i + 1}`} fill unoptimized className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => set("images", form.images.filter((_, idx) => idx !== i))}
                                    className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white/80 hover:text-white"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <label className="flex items-center gap-2 w-fit px-4 py-2.5 rounded-lg border border-white/15 bg-white/5 text-white/60 text-sm cursor-pointer hover:bg-white/10 hover:text-white transition-all duration-200">
                    {uploadingGallery ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <ImageIcon size={16} />
                    )}
                    Upload ke Gallery
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleGalleryUpload}
                        disabled={uploadingGallery}
                    />
                </label>
            </div>

            {/* ── TAGS ── */}
            <SectionTitle>Tech Stack / Tags</SectionTitle>
            <div className="flex flex-wrap gap-2 mb-2">
                {form.tags.map((tag, i) => (
                    <span
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border border-white/15 bg-white/5 text-white/70"
                    >
                        {tag}
                        <button type="button" onClick={() => set("tags", form.tags.filter((_, idx) => idx !== i))}>
                            <X size={11} className="text-white/40 hover:text-white" />
                        </button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    className={inputClass}
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                    placeholder="Next.js, Tailwind... (Enter untuk tambah)"
                />
                <button
                    type="button"
                    onClick={addTag}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                    <Plus size={16} />
                </button>
            </div>

            {/* ── FITUR ── */}
            <SectionTitle>Fitur Utama</SectionTitle>
            <div className="flex flex-col gap-2 mb-2">
                {form.features.map((feat, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between px-3 py-2 rounded-lg border border-white/8 bg-white/3 text-white/70 text-sm"
                    >
                        <span>{feat}</span>
                        <button
                            type="button"
                            onClick={() => set("features", form.features.filter((_, idx) => idx !== i))}
                        >
                            <X size={13} className="text-white/40 hover:text-white" />
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    className={inputClass}
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
                    placeholder="Deskripsi fitur... (Enter untuk tambah)"
                />
                <button
                    type="button"
                    onClick={addFeature}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                    <Plus size={16} />
                </button>
            </div>

            {/* ── ERROR + SUBMIT ── */}
            {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                    {error}
                </p>
            )}

            <div className="flex justify-end pt-4 border-t border-white/8 mt-2">
                <button
                    type="submit"
                    disabled={isPending}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-[#0f0f0e] text-sm font-semibold hover:bg-white/90 transition-all duration-200 disabled:opacity-60"
                >
                    {isPending && <Loader2 size={15} className="animate-spin" />}
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}
