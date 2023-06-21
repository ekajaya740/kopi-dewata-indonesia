'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';

const RegisterForm = ({
  action,
}: {
  action: string | ((formData: FormData) => void) | undefined;
}) => {
  const { register, formState } = useForm();
  return (
    <form
      className='flex justify-center items-center bg-base-300 p-6 flex-col rounded-lg space-y-4 max-w-xl w-full'
      action={action}>
      <h1 className='font-bold text-3xl'>Register</h1>
      <div className='flex flex-col justify-center space-y-1 w-full'>
        <input
          {...register('nama')}
          id='nama'
          name='nama'
          placeholder='Nama'
          className='input'
          type='text'
        />
        <input
          {...register('noHp')}
          id='noHp'
          name='noHp'
          placeholder='No. HP'
          className='input'
          type='text'
        />
        <input
          {...register('alamat')}
          id='alamat'
          name='alamat'
          placeholder='Alamat'
          className='input'
          type='text'
        />
        <input
          {...register('email')}
          id='email'
          name='email'
          placeholder='Email'
          className='input'
          type='email'
        />
        <input
          {...register('password')}
          id='password'
          name='password'
          placeholder='Password'
          className='input'
          type='password'
        />
      </div>
      <div className='flex justify-center flex-col w-full'>
        {formState.isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <button className='btn w-full btn-primary' type='submit'>
              Register
            </button>
            <Link className='btn btn-link' href={'/login'}>
              Login
            </Link>
          </>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
