'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavbarMenuProps {
  href: string;
  nama: string;
  match: string;
}

const NavbarMenu = (props: NavbarMenuProps) => {
  const pathname = usePathname();

  const pathArray = pathname.split('/');
  return (
    <Link
      href={props.href}
      className={`text-lg hover:underline ${
        pathArray.includes(props.match) ? 'font-bold' : ''
      }`}>
      {props.nama}
    </Link>
  );
};

export default NavbarMenu;
