"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

const LocaleSelect = () => {
  const t = useTranslations("common.locale");

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeLocale = async (newLocale: string) => {
    // TODO: too much rerender
    router.push(pathname, { locale: newLocale });
    router.refresh();
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
