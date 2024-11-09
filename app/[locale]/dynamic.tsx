import { Link } from "@/configs/i18n/routing";
import { _ROUTE_PROFILE } from "@/constants/route";
import { getTranslations } from "next-intl/server";
import { getAllNickname } from "./actions";
import { getRandomPastelColor, handleDatetime } from "@/utils/handleDatetime";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

type NicknameType = {
  content: string;
  updatedAt: string;
  color: string;
};

const UserList = async () => {
  const t = await getTranslations("home.nickname");
  const tCommonText = await getTranslations("common.text");

  const { data, error } = await getAllNickname();
  if (error) {
    throw new Error(error.message);
  }
  const nicknames = data?.payload as Array<NicknameType>;

  return (
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
  );
};

export { UserList };
