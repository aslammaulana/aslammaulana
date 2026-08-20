"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deletePortfolioItem } from "@/app/admin/portfolio/actions";

export default function DeleteButton({ id, title }: { id: string; title: string }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Hapus "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
        setLoading(true);
        try {
            await deletePortfolioItem(id);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 text-xs hover:bg-red-500/15 hover:border-red-500/40 transition-all duration-200 disabled:opacity-50"
        >
            {loading ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
            Hapus
        </button>
    );
}
