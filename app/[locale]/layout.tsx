import "@/app/globals.css";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { locale } from "@/types/global";
import { type ReactNode } from "react";
import { _LOCALES } from "@/constants/lang";
import { setRequestLocale } from "next-intl/server";
import { BaseLayout } from "@/components/custom/BaseLayout";
import { PageLayout } from "@/components/custom/PageLayout";

type LocaleLayoutType = { children: ReactNode; params: Promise<{ locale: locale }> };

export async function generateStaticParams() {
  return _LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutType) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  return (
    <BaseLayout locale={locale}>
      <PageLayout>{children}</PageLayout>
    </BaseLayout>
  );
}
