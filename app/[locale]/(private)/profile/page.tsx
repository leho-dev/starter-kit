import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormClient } from "./client/FormClient";
import { Label } from "@/components/ui/label";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { getProfile } from "./actions";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

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
  const t = await getTranslations("profile");

  if (error) {
    throw new Error(error.message);
  }
  const user = data?.payload as User;

  return (
    <section className='flex flex-col space-y-2 w-[400px]'>
      <FormClient nickname={user?.nickname || ""} />
      <Card>
        <CardHeader>
          <CardTitle className='uppercase font-bold text-xl'>{t("title")}</CardTitle>
          <CardDescription className='text-muted-foreground'>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center space-x-4'>
            <Avatar className='w-20 h-20'>
              <AvatarImage src={user?.user_metadata.avatar_url} alt={user?.user_metadata.full_name} />
              <AvatarFallback>{user?.user_metadata.full_name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className='text-2xl font-bold'>{user?.user_metadata.full_name}</h2>
              <p className='text-muted-foreground'>{user?.email}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Label className='uppercase font-bold text-center'>
            {t("loginWith")} {user?.app_metadata.provider}
          </Label>
        </CardFooter>
      </Card>
    </section>
  );
}
