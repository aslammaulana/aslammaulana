import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata = {
    title: "Admin — AslamMln",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/admin/login");

    return (
        <div className="min-h-screen bg-[#0f0e0f]">
            <AdminHeader email={user.email ?? ""} />
            <main className="w-full max-w-[1200px] mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
