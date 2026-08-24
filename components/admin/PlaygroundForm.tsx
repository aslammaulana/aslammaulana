"use client";

import { useState } from "react";
import { uploadPlaygroundImage } from "@/app/admin/(dashboard)/playground/actions";
import { UploadCloud, X, Plus, Loader2, ImageIcon } from "lucide-react";
import Image from "next/image";

export type PlaygroundFormData = {
    slug: string;
    title: string;
    type: string;
    description: string;
    overview: string;
    githubUrl: string;
    previewUrl: string;
    color: string;
    order: number;
    image: string;
    images: string[];
    tags: string[];
    features: string[];
};

type Props = {
    defaultValues?: Partial<PlaygroundFormData>;
    onSubmit: (data: PlaygroundFormData) => Promise<void>;
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

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 pt-6 pb-1 border-t border-white/8 mt-2">
            {children}
        </p>
    );
}

const PRESET_TYPES = [
    "Open Source",
    "Experiment",
    "Contribution",
    "Tool",
    "Library",
    "AI Agent",
    "UI Demo",
    "CLI",
];

export default function PlaygroundForm({ defaultValues, onSubmit, submitLabel = "Simpan", isEdit = false }: Props) {
    const [form, setForm] = useState<PlaygroundFormData>({
        slug: defaultValues?.slug ?? "",
        title: defaultValues?.title ?? "",
        type: defaultValues?.type ?? "Open Source",
        description: defaultValues?.description ?? "",
        overview: defaultValues?.overview ?? "",
        githubUrl: defaultValues?.githubUrl ?? "",
        previewUrl: defaultValues?.previewUrl ?? "",
        color: defaultValues?.color ?? "6366f1",
        order: defaultValues?.order ?? 0,
        image: defaultValues?.image ?? "",
        images: defaultValues?.images ?? [],
        tags: defaultValues?.tags ?? [],
        features: defaultValues?.features ?? [],
    });

    const [tagInput, setTagInput] = useState("");
    const [featureInput, setFeatureInput] = useState("");
    const [uploadingMain, setUploadingMain] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const set = <K extends keyof PlaygroundFormData>(key: K, value: PlaygroundFormData[K]) =>
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
            const res = await uploadPlaygroundImage(formData);
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

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;
        setUploadingGallery(true);
        setError(null);
        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                const res = await uploadPlaygroundImage(formData);
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
            await onSubmit(form);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
            setIsPending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* ── IDENTITAS PROYEK ── */}
            <SectionTitle>Identitas Playground</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Title" required>
                    <input
                        className={inputClass}
                        value={form.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Nama project / repository"
                    />
                </Field>
                <Field label="Slug" required>
                    <input
                        className={inputClass}
                        value={form.slug}
                        onChange={(e) => set("slug", slugify(e.target.value))}
                        placeholder="nama-project"
                    />
                </Field>
                <Field label="Tipe Project">
                    <div className="flex flex-col gap-2">
                        <select
                            className={inputClass}
                            value={PRESET_TYPES.includes(form.type) ? form.type : "Custom"}
                            onChange={(e) => {
                                if (e.target.value !== "Custom") {
                                    set("type", e.target.value);
                                }
                            }}
                        >
                            {PRESET_TYPES.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                            <option value="Custom">Custom (ketik di bawah)...</option>
                        </select>
                        {!PRESET_TYPES.includes(form.type) && (
                            <input
                                className={inputClass}
                                value={form.type}
                                onChange={(e) => set("type", e.target.value)}
                                placeholder="e.g. CLI Tool, Boilerplate"
                            />
                        )}
                    </div>
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

            <Field label="Deskripsi Singkat">
                <input
                    className={inputClass}
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Satu atau dua kalimat ringkas tentang apa yang dibuat..."
                />
            </Field>

            {/* ── TAUTAN & REPO ── */}
            <SectionTitle>Tautan &amp; Repository</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="GitHub Repository URL">
                    <input
                        className={inputClass}
                        value={form.githubUrl}
                        onChange={(e) => set("githubUrl", e.target.value)}
                        placeholder="https://github.com/username/repo"
                        type="url"
                    />
                </Field>
                <Field label="Live Demo / Preview URL">
                    <input
                        className={inputClass}
                        value={form.previewUrl}
                        onChange={(e) => set("previewUrl", e.target.value)}
                        placeholder="https://my-demo.vercel.app"
                        type="url"
                    />
                </Field>
            </div>

            {/* ── KONTEN & OVERVIEW ── */}
            <SectionTitle>Konten Detail</SectionTitle>
            <Field label="Overview / Penjelasan Proyek">
                <textarea
                    className={textareaClass}
                    value={form.overview}
                    onChange={(e) => set("overview", e.target.value)}
                    placeholder="Ceritakan latar belakang eksperimen, motivasi, atau teknologi yang dipelajari..."
                />
            </Field>

            {/* ── VISUAL & COLOR ── */}
            <SectionTitle>Visual &amp; Aksen</SectionTitle>
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
                            placeholder="6366f1"
                            maxLength={6}
                        />
                    </div>
                </Field>
            </div>

            {/* ── GAMBAR UTAMA ── */}
            <SectionTitle>Thumbnail / Gambar Utama</SectionTitle>
            <div className="flex flex-col gap-3">
                {form.image && (
                    <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden border border-white/10">
                        <Image src={form.image} alt="Main preview" fill unoptimized className="object-cover" />
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
                    {form.image ? "Ganti Gambar" : "Upload Gambar Utama"}
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

            {/* ── GALLERY ── */}
            <SectionTitle>Gallery Screenshot (Opsional)</SectionTitle>
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

            {/* ── TECH STACK / TAGS ── */}
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
                    placeholder="TypeScript, Python, WebGL... (Enter untuk tambah)"
                />
                <button
                    type="button"
                    onClick={addTag}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                    <Plus size={16} />
                </button>
            </div>

            {/* ── HIGHLIGHTS / FITUR UTAMA ── */}
            <SectionTitle>Highlights / Fitur Kunci</SectionTitle>
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
                    placeholder="Highlight fitur / inovasi... (Enter untuk tambah)"
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
