import { getTranslations } from "next-intl/server";
import { LoginClient } from "./client/LoginClient";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth");
  return {
    title: t("title")
  };
}

export default async function Page() {
  return (
    <section className='h-full flex justify-center items-center'>
      <LoginClient />
    </section>
  );
}
