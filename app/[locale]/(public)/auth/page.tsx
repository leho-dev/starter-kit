import { getTranslations, setRequestLocale } from "next-intl/server";
import { LoginClient } from "./auth.client";
import { Metadata } from "next";
import { locale } from "@/types/global";

type PageType = { params: Promise<{ locale: locale }> };

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth");
  return {
    title: t("title")
  };
}

export default async function Page({ params }: PageType) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className='h-full flex justify-center items-center'>
      <LoginClient />
    </section>
  );
}
