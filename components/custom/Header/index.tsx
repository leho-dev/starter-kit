import { useTranslations } from "next-intl";
import { Link } from "@/configs/i18n/routing";
import { ModeToggle } from "./ModeToggle.client";
import { UserProfile } from "./UserProfile.client";
import { LocaleSelect } from "./LocalSlelect.client";

const Header = () => {
  const tHeader = useTranslations("header");

  return (
    <header className='shadow-md border-b-2'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='flex items-center uppercase font-bold text-xl'>
          <Link prefetch={true} href='/'>
            {tHeader("logoName")}
          </Link>
        </div>
        <div className='flex gap-2'>
          <LocaleSelect />
          <ModeToggle />
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export { Header };
