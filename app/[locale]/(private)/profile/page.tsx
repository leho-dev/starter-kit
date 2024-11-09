import { FormClient } from "./form.client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { getProfile } from "./actions";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Suspense } from "react";
import { LoadingComponent } from "@/components/custom/Loading";
import { Profile } from "./dynamic";

export const dynamic = "force-dynamic";

type User = SupabaseUser & {
  nickname?: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("profile");
  return {
    title: t("title")
  };
}

export default async function Page() {
  const { data, error } = await getProfile();

  if (error) {
    throw new Error(error.message);
  }
  const user = data?.payload as User;

  return (
    <section className='flex flex-col space-y-2 w-[400px]'>
      <Suspense fallback={<LoadingComponent />}>
        <FormClient nickname={user?.nickname || ""} />
      </Suspense>
      <Suspense fallback={<LoadingComponent />}>
        <Profile user={user} />
      </Suspense>
    </section>
  );
}
