import Image from 'next/image';
import { AiFillDashboard } from 'react-icons/ai';
import { BsFillBoxFill } from 'react-icons/bs';
import { IoMdLogOut } from 'react-icons/io';

import SidebarMenu from './SidebarMenu';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/actions/logout';
import { MdVerified } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';

// TODO: Add path

const Sidebar = () => {
  return (
    <aside className='w-80 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-base-200'>
      <div className='w-full flex flex-col items-center space-y-8 px-4 py-8 h-full'>
        <Image
          src={'/logo.png'}
          alt={'Logo Kopi Dewata Indonesia'}
          width={100}
          height={100}
          className='rounded-full'
        />
        <div className='flex flex-col w-full h-full justify-between'>
          <div className='flex flex-col space-y-2 w-full'>
            <SidebarMenu
              icon={<AiFillDashboard />}
              name='Dashboard'
              href='/admin/dashboard'
            />
            <SidebarMenu
              icon={<BsFillBoxFill />}
              name='Barang'
              href='/admin/barang'
            />
            <SidebarMenu
              icon={<MdVerified />}
              name='Verifikasi Transaksi'
              href='/admin/verifikasi-transaksi'
            />
            <SidebarMenu
              icon={<RiAdminFill />}
              name='Tambah Admin'
              href='/admin/tambah-admin'
            />
          </div>
          <form action={logout}>
            <button className='btn btn-primary w-full' type='submit'>
              <IoMdLogOut /> <p>Log Out</p>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
