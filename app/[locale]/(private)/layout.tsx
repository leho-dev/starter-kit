const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <section className='flex h-full justify-center items-center'>{children}</section>;
};

export default Layout;
