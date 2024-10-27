import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { locale } from "@/types/global";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    timeZone: "Asia/Ho_Chi_Minh",
    now: new Date(),
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
