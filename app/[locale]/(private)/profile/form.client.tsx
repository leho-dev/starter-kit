"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHandleError } from "@/hooks/useHandleError";
import { useState } from "react";
import { updateNickname } from "./actions";
import { useTranslations } from "next-intl";

type FormClientType = { nickname: string };

const FormClient = ({ nickname }: FormClientType) => {
  const t = useTranslations("profile.form");
  const { handleErrorClient } = useHandleError();
  const [value, setValue] = useState<string>(nickname);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) {
      return;
    }

    await handleErrorClient({
      cb: async () => updateNickname(value),
      withSuccessNotify: true
    });
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center space-x-2'>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name='nickname'
        placeholder={t("placeholer")}
        className='text-center'
      />
      <Button type='submit'>{t("submit")}</Button>
    </form>
  );
};

export { FormClient };
