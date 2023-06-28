import { createAdmin } from '@/app/actions/createAdmin';
import { createUser } from '@/app/actions/createUser';
import Loading from '@/app/admin/loading';
import RegisterForm from '@/components/RegisterForm';
import Link from 'next/link';
import { Suspense } from 'react';

const Page = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className='flex justify-center items-center w-full h-screen'>
        <RegisterForm action={createUser} />
      </div>
    </Suspense>
  );
};

export default Page;
