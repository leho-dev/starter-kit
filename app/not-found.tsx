import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("defaultPage.notFound");

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 text-center'>
      <AlertTriangleIcon className='mx-auto h-12 w-12 text-red-500 mb-4' />
      <p className='text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-300 mb-6'>{t("title")}</p>
      <p className='text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-md'>{t("description")}</p>
      <Link href='/' passHref>
        <Button variant='outline' size='lg' className='flex items-center gap-2'>
          <ArrowLeft className='w-4 h-4' />
          {t("redirect")}
        </Button>
      </Link>
    </div>
  );
}
