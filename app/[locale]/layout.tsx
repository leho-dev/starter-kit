import "@/app/globals.css";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/custom/Header";
import { Footer } from "@/components/custom/Footer";
import type { locale } from "@/types/global";
import { type ReactNode } from "react";
import { _LOCALES } from "@/constants/lang";

type LocaleLayoutType = { children: ReactNode; params: Promise<{ locale: locale }> };

export async function generateStaticParams() {
  return _LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutType) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className='flex-1 container'>{children}</main>
      <Footer />
    </>
  );
}
