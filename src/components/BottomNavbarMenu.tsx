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

const BottomNavbarMenu = (props: MenuProps) => {
  const pathname = usePathname();

  return (
    <Link href={props.href} className='w-full bg-primary'>
      <div
        className={classnames(
          'flex flex-col justify-center p-2 items-center rounded-xl',
          {
            'active text-white': pathname.includes(props.href),
            // 'border-2 border-base-300': !pathname.includes(props.href),
          }
        )}>
        <div className='text-2xl'>{props.icon}</div>
      </div>
    </Link>
  );
};

export default BottomNavbarMenu;
