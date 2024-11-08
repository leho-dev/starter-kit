import createMiddleware from "next-intl/middleware";
import { routing } from "@/configs/i18n/routing";
import { updateSession } from "./configs/supabase/middleware";
import { type NextRequest } from "next/server";

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);
  return await updateSession(request, response);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|icons|manifest).*)"]
};
