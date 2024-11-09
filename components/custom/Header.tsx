import { useTranslations } from "next-intl";
import { LocaleSelect } from "./LocaleSelect";
import { Link } from "@/configs/i18n/routing";
import { ModeToggle } from "./ModeToggle";
import { UserProfile } from "./UserProfile";
import { Suspense } from "react";

const Header = () => {
  const t = useTranslations("header");

  return (
    <header className='shadow-md border-b-2'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='flex items-center uppercase font-bold text-xl'>
          <Link href='/'>{t("logoName")}</Link>
        </div>
        <div className='flex gap-2'>
          <Suspense fallback={"Loading ..."}>
            <LocaleSelect />
          </Suspense>
          <Suspense fallback={"Loading ..."}>
            <ModeToggle />
          </Suspense>
          <Suspense fallback={"Loading ..."}>
            <UserProfile />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export { Header };
