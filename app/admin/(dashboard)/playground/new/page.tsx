import PlaygroundForm, { type PlaygroundFormData } from "@/components/admin/PlaygroundForm";
import { createPlaygroundItem } from "../actions";

export default function NewPlaygroundPage() {
    async function handleCreate(data: PlaygroundFormData) {
        "use server";
        await createPlaygroundItem(data);
    }

    return (
        <div>
            <h1 className="text-white font-bold text-2xl mb-2">Tambah Item Playground Baru</h1>
            <p className="text-white/40 text-sm mb-8">Isi detail project/eksperimen lalu klik Simpan.</p>
            <div
                className="rounded-2xl border border-white/10 p-6"
                style={{ background: "rgba(255,255,255,0.02)" }}
            >
                <PlaygroundForm onSubmit={handleCreate} submitLabel="Buat Item Playground" />
            </div>
        </div>
    );
}
