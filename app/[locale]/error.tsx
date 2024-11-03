"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, HomeIcon, RefreshCwIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";

type ErrorType = { error: Error & { digest?: string }; reset: () => void };

export default function Error({ error, reset }: ErrorType) {
  const t = useTranslations("defaultPage.error");

  useEffect(() => {
    console.error("[error.tsx:15] ", error.message);
  }, [error]);

  return (
    <div className='min-h-full flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center'>
        <AlertTriangleIcon className='mx-auto h-12 w-12 text-red-500 mb-4' />
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>{t("title")}</h1>
        <p className='text-gray-600 mb-6'>{t("description")}</p>
        <div className='bg-gray-100 p-4 rounded-md mb-6'>
          <p className='text-sm text-gray-600'>{t("reminder")}</p>
        </div>
        <div className='flex flex-col space-y-3'>
          <Button onClick={() => reset()} className='w-full'>
            <RefreshCwIcon className='mr-2 h-4 w-4' />
            {t("tryAgain")}
          </Button>
          <Link href='/' passHref>
            <Button variant='outline' className='w-full'>
              <HomeIcon className='mr-2 h-4 w-4' />
              {t("redirect")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
