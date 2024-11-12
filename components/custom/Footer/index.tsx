import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");
  return (
    <footer className='border-t-2'>
      <div
        className='container mx-auto px-4 py-6 text-center italic text-muted-foreground'
        dangerouslySetInnerHTML={{ __html: t.raw("copyright") }}
      ></div>
    </footer>
  );
};

export { Footer };
