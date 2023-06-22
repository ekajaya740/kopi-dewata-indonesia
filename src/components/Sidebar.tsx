import Image from 'next/image';
import { AiFillDashboard } from 'react-icons/ai';
import { BsFillBoxFill } from 'react-icons/bs';
import { IoMdLogOut } from 'react-icons/io';

import SidebarMenu from './SidebarMenu';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/actions/logout';
import { MdVerified } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';
import { getUserById } from '@/app/actions/getUserById';
import capitalize from 'capitalize';

const Sidebar = async () => {
  const user = await getUserById();
  return (
    <aside className='menu lg:w-80 w-full h-screen bg-base-200 hidden lg:block'>
      <div className='w-full flex flex-col items-center space-y-8 px-4 py-8 h-full'>
        <div className='flex flex-col space-y-2 items-center'>
          <Image
            src={'/logo.png'}
            alt={'Logo Kopi Dewata Indonesia'}
            width={100}
            height={100}
            className='rounded-full'
          />
          <h1 className='text-xl font-bold'>
            Admin {capitalize.words(user?.nama ?? '')}
          </h1>
        </div>
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
              name='Pengguna'
              href='/admin/manajemen-pengguna'
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
