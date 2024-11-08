import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className='flex-1 container'>{children}</main>
      <Footer />
    </>
  );
};

export { PageLayout };
