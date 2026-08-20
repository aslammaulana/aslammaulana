import PortfolioForm, { type PortfolioFormData } from "@/components/admin/PortfolioForm";
import { createPortfolioItem } from "../actions";

export default function NewPortfolioPage() {
    async function handleCreate(data: PortfolioFormData) {
        "use server";
        await createPortfolioItem(data);
    }

    return (
        <div>
            <h1 className="text-white font-bold text-2xl mb-2">Tambah Portfolio Baru</h1>
            <p className="text-white/40 text-sm mb-8">Isi semua field lalu klik Simpan.</p>
            <div
                className="rounded-2xl border border-white/10 p-6"
                style={{ background: "rgba(255,255,255,0.02)" }}
            >
                <PortfolioForm onSubmit={handleCreate} submitLabel="Buat Portfolio" />
            </div>
        </div>
    );
}
