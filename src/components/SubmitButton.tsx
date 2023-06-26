'use client';

import Loading from '@/app/admin/loading';
import classNames from 'classnames';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export interface SubmitButtonProps {
  name: string;
}

const SubmitButton = (props: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return pending ? (
    <Loading />
  ) : (
    <button
      disabled={pending}
      className={classNames('btn w-full btn-primary disabled:btn-disabled')}
      type='submit'>
      {props.name}
    </button>
  );
};

export default SubmitButton;
