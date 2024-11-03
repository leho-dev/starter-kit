"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/configs/supabase/client";
import type { Provider } from "@supabase/supabase-js";
import { _ROUTE_AUTH_CALLBACK } from "@/constants/route";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useHandleError } from "@/hooks/useHandleError";
import { ResponseType } from "@/types/response";

const LoginClient = () => {
  const t = useTranslations("common.text");
  const tAuth = useTranslations("auth");

  const { handleErrorClient } = useHandleError();

  const handleLogin = async (provider: Provider) => {
    const supabase = createClient();
    const redirectTo = `${location.origin}${_ROUTE_AUTH_CALLBACK}`;

    await handleErrorClient({
      cb: async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: provider,
          options: { redirectTo }
        });
        return { data, error } as ResponseType;
      },
      withSuccessNotify: false
    });
  };

  return (
    <Card className='w-[400px]'>
      <CardHeader>
        <CardTitle className='uppercase font-bold text-xl'>{tAuth("title")}</CardTitle>
        <CardDescription className='text-muted-foreground'>{tAuth("description")}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        <Button variant='outline' onClick={() => handleLogin("google")} className='w-full max-w-sm'>
          {t("loginWith")} Google
        </Button>
        <Button variant='outline' onClick={() => handleLogin("github")} className='w-full max-w-sm'>
          {t("loginWith")} GitHub
        </Button>
      </CardContent>
    </Card>
  );
};

export { LoginClient };
