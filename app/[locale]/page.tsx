import { Badge } from "@/components/ui/badge";
import { getAllNickname } from "./actions";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getRandomPastelColor, handleDatetime } from "@/utils/handleDatetime";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";
import { _ROUTE_PROFILE } from "@/constants/route";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { locale } from "@/types/global";

type NicknameType = {
  content: string;
  updatedAt: string;
  color: string;
};

type PageType = {
  params: Promise<{ locale: locale }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return {
    title: t("title")
  };
}

const techs: string[] = ["NextJS 15", "Shadcn/ui", "TailwindCSS", "Prisma"];

export default async function Page({ params }: PageType) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home.nickname");
  const tCommonText = await getTranslations("common.text");
  const { data, error } = await getAllNickname();
  if (error) {
    throw new Error(error.message);
  }
  const nicknames = data?.payload as Array<NicknameType>;

  return (
    <section className='h-full p-4 space-y-4'>
      <div className='flex flex-wrap gap-2 justify-center items-center'>
        {techs.map((tech, index) => (
          <Badge key={index} className='text-xl rounded-md'>
            {tech}
          </Badge>
        ))}
      </div>
      <Separator />
      <div className='flex flex-col justify-center items-center space-y-2'>
        <div className='text-center'>
          <h2 className='text-xl uppercase font-bold'>{t("title")}</h2>
          <p className='text-sm text-muted-foreground italic'>
            {t("description")}{" "}
            <Link href={_ROUTE_PROFILE} className='text-primary hover:underline'>
              {tCommonText("here")}.
            </Link>
          </p>
        </div>
        <div className='flex flex-wrap space-x-2'>
          {nicknames?.map((nickname, index) => {
            const randomBackgroundColor = getRandomPastelColor();

            return (
              <Tooltip key={index}>
                <TooltipTrigger>
                  <Badge style={{ background: randomBackgroundColor }} className='text-md rounded-md'>
                    {nickname.content}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side='bottom'>
                  <p className='text-muted-foreground'>{handleDatetime(new Date(nickname.updatedAt))}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </section>
  );
}
