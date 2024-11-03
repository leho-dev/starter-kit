import { _LOCALES } from "@/constants/lang";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: _LOCALES,
  defaultLocale: "vi"
  // localeDetection: false
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
