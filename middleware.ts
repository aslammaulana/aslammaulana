import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Refresh session — do NOT remove this
    const { data: { user } } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;
    const isAdminRoute = pathname.startsWith("/admin");
    const isLoginPage = pathname === "/admin/login";

    // Not logged in → redirect to login
    if (isAdminRoute && !isLoginPage && !user) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Already logged in → redirect away from login page
    if (isLoginPage && user) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    return supabaseResponse;
}

export const config = {
    matcher: ["/admin/:path*"],
};
