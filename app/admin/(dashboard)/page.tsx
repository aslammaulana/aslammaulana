import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/server";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import type { DbPortfolioRow } from "@/data/portfolio";

export default async function AdminDashboard() {
    const supabase = createAdminClient();
    const { data: rows } = await supabase
        .from("portfolio_items")
        .select("id, title, slug, status, published_at, order, preview_url")
        .order("order", { ascending: true });

    const items = (rows ?? []) as Pick<DbPortfolioRow, "id" | "title" | "slug" | "status" | "published_at" | "order" | "preview_url">[];

    const total = items.length;
    const live = items.filter((i) => i.status === "Live").length;
    const inProgress = items.filter((i) => i.status === "In Progress").length;
    const archived = items.filter((i) => i.status === "Archived").length;

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-white font-bold text-2xl">Dashboard</h1>
                    <p className="text-white/40 text-sm mt-1">Kelola portfolio Anda dari sini.</p>
                </div>
                <Link
                    href="/admin/portfolio/new"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#0f0f0e] text-sm font-semibold hover:bg-white/90 transition-all duration-200"
                >
                    <Plus size={16} />
                    Tambah Portfolio
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total", value: total, color: "text-white" },
                    { label: "Live", value: live, color: "text-green-400" },
                    { label: "In Progress", value: inProgress, color: "text-yellow-400" },
                    { label: "Archived", value: archived, color: "text-white/40" },
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
                style={{ background: "rgba(255,255,200,0.02)" }}
            >
                <div className="px-6 py-4 border-b border-white/8">
                    <p className="text-white font-semibold text-sm">Semua Portfolio</p>
                </div>

                {items.length === 0 ? (
                    <div className="px-6 py-16 text-center">
                        <p className="text-white/30 text-sm">Belum ada portfolio. Klik "Tambah Portfolio" untuk mulai.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/8 text-white/30 text-xs uppercase tracking-wider">
                                    <th className="text-left px-6 py-3 font-semibold">No</th>
                                    <th className="text-left px-6 py-3 font-semibold">Judul</th>
                                    <th className="text-left px-6 py-3 font-semibold hidden sm:table-cell">Slug</th>
                                    <th className="text-left px-6 py-3 font-semibold hidden md:table-cell">Tahun</th>
                                    <th className="text-left px-6 py-3 font-semibold">Status</th>
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
                                        <td className="px-6 py-4 hidden md:table-cell text-white/50">
                                            {item.published_at ?? "—"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    item.status === "Live"
                                                        ? "bg-green-500/15 text-green-400"
                                                        : item.status === "In Progress"
                                                        ? "bg-yellow-500/15 text-yellow-400"
                                                        : "bg-white/5 text-white/30"
                                                }`}
                                            >
                                                {item.status ?? "—"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {item.preview_url && item.preview_url !== "#" && (
                                                    <a
                                                        href={item.preview_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white/20 transition-all"
                                                    >
                                                        <ExternalLink size={13} />
                                                    </a>
                                                )}
                                                <Link
                                                    href={`/admin/portfolio/${item.id}/edit`}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 text-xs hover:text-white hover:border-white/20 transition-all duration-200"
                                                >
                                                    <Pencil size={13} />
                                                    Edit
                                                </Link>
                                                <DeleteButton id={item.id} title={item.title} />
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
