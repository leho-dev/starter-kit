import { locale } from "@/types/global";
import { setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";

type LayoutType = { children: ReactNode; params: Promise<{ locale: locale }> };

const Layout = async ({ children, params }: LayoutType) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return <>{children}</>;
};

export default Layout;
