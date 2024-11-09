import { Skeleton } from "../ui/skeleton";

const LoadingPage = () => {
  return (
    <section className=' py-4 h-full flex flex-col justify-center items-center'>
      <div className='flex gap-4 justify-center items-center'>
        <Skeleton className='h-12 w-12 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
        </div>
      </div>
      <div className='mt-4 flex flex-col gap-4'>
        <Skeleton className='h-4 w-[300px]' />
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
    </section>
  );
};

const LoadingComponent = () => {
  return (
    <section className=' py-4 flex flex-col justify-center items-center'>
      <div className='flex gap-4 justify-center items-center'>
        <Skeleton className='h-12 w-12 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
        </div>
      </div>
    </section>
  );
};

export { LoadingComponent, LoadingPage };
