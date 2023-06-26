'use client';

import Loading from '@/app/admin/loading';
import classNames from 'classnames';
import Link from 'next/link';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export interface MultiSubmitButtonsProps {
  'btn-submit': {
    name: string;
  };
  'btn-link': {
    name: string;
    href: string;
  };
}

const MultiSubmitButtons = (props: MultiSubmitButtonsProps) => {
  const { pending } = useFormStatus();
  return pending ? (
    <Loading />
  ) : (
    <>
      <button
        disabled={pending}
        className={classNames('btn w-full btn-primary disabled:btn-disabled')}
        type='submit'>
        {props['btn-submit'].name}
      </button>
      <Link className='btn btn-link' href={props['btn-link'].href}>
        {props['btn-link'].name}
      </Link>
    </>
  );
};

export default MultiSubmitButtons;
