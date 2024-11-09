import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { locale } from "@/types/global";
import { Suspense } from "react";
import { UserList } from "./dynamic";
import { LoadingComponent } from "@/components/custom/Loading";

type PageType = {
  params: Promise<{ locale: locale }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return {
    title: t("title")
  };
}

const techs: string[] = ["NextJS 15", "Shadcn/ui", "TailwindCSS", "Prisma"];

export default async function Page({ params }: PageType) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className='h-full p-4 space-y-4'>
      <div className='flex flex-wrap gap-2 justify-center items-center'>
        {techs.map((tech, index) => (
          <Badge key={index} className='text-xl rounded-md'>
            {tech}
          </Badge>
        ))}
      </div>
      <Separator />
      <Suspense fallback={<LoadingComponent />}>
        <UserList />
      </Suspense>
    </section>
  );
}
