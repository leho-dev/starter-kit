import { useTranslations } from "next-intl";
import { LocaleSelect } from "./LocaleSelect";
import { Link } from "@/i18n/routing";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  const t = useTranslations("header");
  return (
    <header className='shadow-md border-b-2'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='flex items-center uppercase font-bold text-xl'>
          <Link href='/'>{t("logoName")}</Link>
        </div>
        <div className='flex gap-2'>
          <LocaleSelect />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export { Header };
