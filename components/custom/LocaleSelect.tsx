"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

const LocaleSelect = () => {
  const t = useTranslations("locale");

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Select onValueChange={handleChangeLocale} defaultValue={locale}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='en'>{t("en")}</SelectItem>
        <SelectItem value='vi'>{t("vi")}</SelectItem>
      </SelectContent>
    </Select>
  );
};

export { LocaleSelect };
