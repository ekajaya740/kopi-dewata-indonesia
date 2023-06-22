import { AiFillDashboard } from 'react-icons/ai';
import BottomNavbarMenu from './BottomNavbarMenu';
import { BsFillBoxFill } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';

const BottomNavbar = () => {
  return (
    <div className='btm-nav'>
      <BottomNavbarMenu
        icon={<AiFillDashboard />}
        name='Dashboard'
        href='/admin/dashboard'
      />
      <BottomNavbarMenu
        icon={<BsFillBoxFill />}
        name='Barang'
        href='/admin/barang'
      />
      <BottomNavbarMenu
        icon={<MdVerified />}
        name='Verifikasi Transaksi'
        href='/admin/verifikasi-transaksi'
      />
      <BottomNavbarMenu
        icon={<RiAdminFill />}
        name='Pengguna'
        href='/admin/manajemen-pengguna'
      />
    </div>
  );
};

export default BottomNavbar;
