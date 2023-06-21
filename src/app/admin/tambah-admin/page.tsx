import { createAdmin } from '@/app/actions/createAdmin';
import RegisterForm from '@/components/RegisterForm';

const Page = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <RegisterForm action={createAdmin} />
    </div>
  );
};

export default Page;
