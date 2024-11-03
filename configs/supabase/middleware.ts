import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { _ROUTE_AUTH, _ROUTE_PRIVATES } from "@/constants/route";
import { _LOCALES } from "@/constants/lang";

export async function updateSession(request: NextRequest, response: NextResponse) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const privateGroup: string[] = _LOCALES.flatMap((locale) => _ROUTE_PRIVATES.map((route) => `/${locale}${route}`));
  const authGroup: string[] = _LOCALES.map((locale) => `/${locale}${_ROUTE_AUTH}`);

  if (!user && privateGroup.includes(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = _ROUTE_AUTH;
    return NextResponse.redirect(url);
  }

  if (user && authGroup.includes(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return response;
}
