'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const classnames = require('classnames');

interface MenuProps {
  icon: ReactNode;
  name: string;
  href: string;
}

const SidebarMenu = (props: MenuProps) => {
  const pathname = usePathname();

  return (
    <Link href={props.href} className='w-full'>
      <div
        className={classnames(
          'flex justify-between p-2 items-center bg-base-200 rounded-xl',
          {
            'bg-base-300 border-2': pathname.includes(props.href),
            'border-2 border-base-300': !pathname.includes(props.href),
          }
        )}>
        <div className='text-2xl'>{props.icon}</div>
        <h6 className='font-medium text-'>{props.name}</h6>
      </div>
    </Link>
  );
};

export default SidebarMenu;
