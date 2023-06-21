// 'use client';
import Link from 'next/link';
import Image from 'next/image';
import { matchUser } from '@/app/actions/matchUser';
// import { useForm } from 'react-hook-form';

const classNames = require('classnames');

// TODO: Error handling

const Page = () => {
  // const { register, formState } = useForm();
  return (
    <>
      <div className='flex justify-center items-center w-full h-screen'>
        <form
          className='flex justify-center items-center bg-base-300 p-6 flex-col rounded-lg space-y-4 max-w-xl w-full'
          action={
            matchUser
            // async (formData) => {
            // try {
            //   await matchUser(formData);
            // } catch (e) {}
            // }
          }>
          <Image
            src={'/logo.png'}
            alt={'Logo Kopi Dewata Indonesia'}
            priority={true}
            width={100}
            height={100}
            className='rounded-full'
          />
          <div className='flex flex-col justify-center space-y-1 w-full'>
            <div className='form-control w-full'>
              <input
                id='email'
                name='email'
                placeholder='Email'
                className={classNames('input', {})}
                type='email'
              />
              <label className='label'>
                <span className={classNames(`label-text-alt`, {})}></span>
              </label>
            </div>
            <div className='form-control w-full'>
              <input
                id='password'
                name='password'
                placeholder='Password'
                className={classNames(`input`, {})}
                type='password'
              />
              <label className='label'>
                <span className={classNames(`label-text-alt`, {})}></span>
              </label>
            </div>
          </div>

          <div className='flex justify-center flex-col w-full'>
            {/* {formState.isLoading ? (
              <div>Loading...</div>
            ) : ( */}
            <>
              <button className='btn w-full btn-primary' type='submit'>
                Login
              </button>
              <Link className='btn btn-link' href={'/register'}>
                Register
              </Link>
            </>
            {/* )} */}
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
