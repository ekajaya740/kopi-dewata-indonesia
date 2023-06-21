import { ReactNode } from 'react';

export interface DialogProps {
  message: string;
  actions: ReactNode;
}

const Dialog = (props: DialogProps) => {
  return (
    <dialog id='dialog' className='modal'>
      <form method='dialog' className='modal-box'>
        <h3 className='font-bold text-lg'>Error</h3>
        <p className='py-4'>{props.message}</p>
      </form>
      <form method='dialog' className='modal-backdrop w-full'>
        {props.actions}
      </form>
    </dialog>
  );
};

export default Dialog;
