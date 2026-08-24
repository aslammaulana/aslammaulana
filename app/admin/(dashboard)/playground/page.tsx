import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/server";
import { Plus, Pencil, ExternalLink, Github } from "lucide-react";
import DeletePlaygroundButton from "@/components/admin/DeletePlaygroundButton";
import type { DbPlaygroundRow } from "@/data/playground";

export const revalidate = 0; // Dynamic dashboard

export default async function PlaygroundAdminPage() {
    const supabase = createAdminClient();
    const { data: rows } = await supabase
        .from("playground_items")
        .select("id, title, slug, type, order, preview_url, github_url, tags")
        .order("order", { ascending: true });

    const items = (rows ?? []) as Pick<
        DbPlaygroundRow,
        "id" | "title" | "slug" | "type" | "order" | "preview_url" | "github_url" | "tags"
    >[];

    const total = items.length;
    const openSourceCount = items.filter((i) => i.type === "Open Source").length;
    const experimentCount = items.filter((i) => i.type === "Experiment").length;
    const otherCount = total - openSourceCount - experimentCount;

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-white font-bold text-2xl">Playground &amp; Labs</h1>
                    <p className="text-white/40 text-sm mt-1">Kelola eksperimen, proyek open source, dan mini tools.</p>
                </div>
                <Link
                    href="/admin/playground/new"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#0f0f0e] text-sm font-semibold hover:bg-white/90 transition-all duration-200"
                >
                    <Plus size={16} />
                    Tambah Item Playground
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total Items", value: total, color: "text-white" },
                    { label: "Open Source", value: openSourceCount, color: "text-indigo-400" },
                    { label: "Experiments", value: experimentCount, color: "text-cyan-400" },
                    { label: "Other / Tools", value: otherCount, color: "text-purple-400" },
                ].map(({ label, value, color }) => (
                    <div
                        key={label}
                        className="flex flex-col gap-1 rounded-xl border border-white/8 px-5 py-4"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                        <p className="text-white/40 text-xs uppercase tracking-wider">{label}</p>
                        <p className={`text-2xl font-bold ${color}`}>{value}</p>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div
                className="rounded-2xl border border-white/8 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)" }}
            >
                <div className="px-6 py-4 border-b border-white/8">
                    <p className="text-white font-semibold text-sm">Daftar Item Playground</p>
                </div>

                {items.length === 0 ? (
                    <div className="px-6 py-16 text-center">
                        <p className="text-white/30 text-sm">Belum ada item playground. Klik "Tambah Item Playground" untuk mulai.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/8 text-white/30 text-xs uppercase tracking-wider">
                                    <th className="text-left px-6 py-3 font-semibold">No</th>
                                    <th className="text-left px-6 py-3 font-semibold">Judul</th>
                                    <th className="text-left px-6 py-3 font-semibold hidden sm:table-cell">Slug</th>
                                    <th className="text-left px-6 py-3 font-semibold">Tipe</th>
                                    <th className="text-left px-6 py-3 font-semibold hidden md:table-cell">Tags</th>
                                    <th className="text-right px-6 py-3 font-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, i) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-white/5 hover:bg-white/2 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-white/30">{item.order ?? i + 1}</td>
                                        <td className="px-6 py-4">
                                            <p className="text-white font-medium">{item.title}</p>
                                        </td>
                                        <td className="px-6 py-4 hidden sm:table-cell">
                                            <span className="font-mono text-white/40 text-xs">{item.slug}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
                                                {item.type || "Open Source"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <div className="flex flex-wrap gap-1">
                                                {(item.tags ?? []).slice(0, 3).map((tag, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 rounded text-[11px] bg-white/5 text-white/50 border border-white/5">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {(item.tags?.length ?? 0) > 3 && (
                                                    <span className="text-[11px] text-white/30 self-center">
                                                        +{(item.tags?.length ?? 0) - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {item.github_url && item.github_url !== "#" && (
                                                    <a
                                                        href={item.github_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white/20 transition-all"
                                                        title="Buka GitHub"
                                                    >
                                                        <Github size={13} />
                                                    </a>
                                                )}
                                                {item.preview_url && item.preview_url !== "#" && (
                                                    <a
                                                        href={item.preview_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white/20 transition-all"
                                                        title="Buka Live Demo"
                                                    >
                                                        <ExternalLink size={13} />
                                                    </a>
                                                )}
                                                <Link
                                                    href={`/admin/playground/${item.id}/edit`}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 text-xs hover:text-white hover:border-white/20 transition-all duration-200"
                                                >
                                                    <Pencil size={13} />
                                                    Edit
                                                </Link>
                                                <DeletePlaygroundButton id={item.id} title={item.title} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
