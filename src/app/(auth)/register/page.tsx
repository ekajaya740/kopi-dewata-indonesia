import { createAdmin } from '@/app/actions/createAdmin';
import { createUser } from '@/app/actions/createUser';
import RegisterForm from '@/components/RegisterForm';
import Link from 'next/link';

// TODO: Error handling

const Page = async () => {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <RegisterForm action={createUser} />
    </div>
  );
};

export default Page;
