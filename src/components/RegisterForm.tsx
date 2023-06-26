'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import MultiSubmitButtons from './MultiSubmitButtons';

const RegisterForm = ({
  action,
}: {
  action: string | ((formData: FormData) => void) | undefined;
}) => {
  return (
    <form
      className='flex justify-center items-center md:bg-base-300 p-6 flex-col rounded-lg space-y-4 max-w-xl w-full'
      action={action}>
      <h1 className='font-bold text-3xl'>Register</h1>
      <div className='flex flex-col justify-center space-y-1 w-full'>
        <input
          id='nama'
          name='nama'
          placeholder='Nama'
          className='input input-bordered'
          type='text'
        />
        <input
          id='noHp'
          name='noHp'
          placeholder='No. HP'
          className='input input-bordered'
          type='text'
        />
        <input
          id='alamat'
          name='alamat'
          placeholder='Alamat'
          className='input input-bordered'
          type='text'
        />
        <input
          id='email'
          name='email'
          placeholder='Email'
          className='input input-bordered'
          type='email'
        />
        <input
          id='password'
          name='password'
          placeholder='Password'
          className='input input-bordered'
          type='password'
        />
      </div>
      <div className='flex justify-center flex-col w-full'>
        <MultiSubmitButtons
          btn-submit={{
            name: 'Register',
          }}
          btn-link={{
            name: 'Login',
            href: '/login',
          }}
        />
      </div>
    </form>
  );
};

export default RegisterForm;
