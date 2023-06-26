import Link from 'next/link';
import Image from 'next/image';
import { matchUser } from '@/app/actions/matchUser';
import { Suspense } from 'react';
import Loading from '@/app/admin/loading';
import classNames from 'classnames';
import 'react-toastify/dist/ReactToastify.css';
import SubmitButton from '@/components/SubmitButton';
import MultiSubmitButtons from '@/components/MultiSubmitButtons';

const Page = async () => {
  return (
    <>
      <div className='flex justify-center items-center w-full h-screen'>
        <form
          className='flex justify-center items-center md:bg-base-300 p-6 flex-col rounded-lg space-y-4 max-w-xl w-full'
          action={matchUser}>
          <Image
            src={'/logo.png'}
            alt={'Logo Kopi Dewata Indonesia'}
            priority={true}
            width={100}
            height={100}
            className='rounded-full'
          />
          <div className='flex flex-col justify-center space-y-1 w-full'>
            <input
              id='email'
              name='email'
              placeholder='Email'
              className={classNames('input input-bordered', {})}
              type='email'
            />
            <input
              id='password'
              name='password'
              placeholder='Password'
              className={classNames(`input input-bordered`, {})}
              type='password'
            />
          </div>
          <div className='flex justify-center flex-col w-full'>
            <>
              <MultiSubmitButtons
                btn-submit={{
                  name: 'Login',
                }}
                btn-link={{
                  name: 'Register',
                  href: '/register',
                }}
              />
            </>
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
