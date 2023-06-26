import Link from 'next/link';
import { GiHamburgerMenu, GiShoppingCart } from 'react-icons/gi';
import { GrTransaction } from 'react-icons/gr';
import NavbarMenu from './NavbarMenu';
import Image from 'next/image';
import { IoMdLogOut } from 'react-icons/io';
import { logout } from '@/app/actions/logout';
import { countUserKeranjang } from '@/app/actions/countUserKeranjang';
import { decodeJWT } from '@/app/actions/decodeJWT';
import { Role } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Sidebar from './Sidebar';
import cn from 'classnames';
import SidebarMenu from './SidebarMenu';
import { AiFillDashboard } from 'react-icons/ai';
import { BsFillBoxFill } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';

const Navbar = async () => {
  const keranjangCount = await countUserKeranjang();

  const djwt = await decodeJWT();

  return djwt.data.role === Role.ADMIN ? (
    <nav className='flex justify-center px-8 py-4 bg-primary items-center z-[9999]'>
      <Link href={'/'}>
        <Image
          src={'/logo.png'}
          alt={'Logo Kopi Dewata Indonesia'}
          width={64}
          height={64}
          className='rounded-full'
        />
      </Link>
    </nav>
  ) : (
    <nav className='flex justify-between px-8 py-4 bg-primary items-center z-[9999]'>
      <>
        <Link href={'/'}>
          <Image
            src={'/logo.png'}
            alt={'Logo Kopi Dewata Indonesia'}
            width={64}
            height={64}
            className='rounded-full'
          />
        </Link>
        <ul className='flex space-x-4 items-center'>
          <li>
            <Link href={'/keranjang'} className='indicator'>
              <span
                className={cn('indicator-item badge indicator-start', {
                  'badge-secondary': keranjangCount?.keranjang ?? 0 > 0,
                })}>
                {keranjangCount?.keranjang ?? 0}
              </span>
              <GiShoppingCart className='text-3xl hover:text-secondary text-white' />
            </Link>
          </li>
          <li>
            <div className='dropdown dropdown-end'>
              <Image
                src={`https://api.dicebear.com/6.x/pixel-art-neutral/png?seed=${keranjangCount?.id}`}
                alt={''}
                width={100}
                height={100}
                className='avatar rounded-full w-12'
                tabIndex={0}
              />
              <div
                tabIndex={0}
                className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 space-y-2'>
                <Link className='btn flex' href={'/transaksi'}>
                  <GrTransaction />
                  <p>Transaksi</p>
                </Link>
                <form action={logout} className='w-full'>
                  <button className='btn btn-error w-full' type='submit'>
                    <IoMdLogOut />
                    <p>Log Out</p>
                  </button>
                </form>
              </div>
            </div>
          </li>
        </ul>
      </>
    </nav>
  );
};

export default Navbar;
