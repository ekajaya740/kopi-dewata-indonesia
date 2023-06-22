import Link from 'next/link';
import { GiShoppingCart } from 'react-icons/gi';
import { GrTransaction } from 'react-icons/gr';
import NavbarMenu from './NavbarMenu';
import Image from 'next/image';
import { IoMdLogOut } from 'react-icons/io';
import { logout } from '@/app/actions/logout';
import { countUserKeranjang } from '@/app/actions/countUserKeranjang';

const Navbar = async () => {
  const keranjangCount = await countUserKeranjang();

  return (
    <nav className=' flex justify-between px-8 py-4  bg-primary items-center'>
      <Link href={'/'}>
        <Image
          src={'/logo.png'}
          alt={'Logo Kopi Dewata Indonesia'}
          width={64}
          height={64}
          className='rounded-full'
        />
      </Link>
      <ul className='flex space-x-4'>
       
        <li>
          <NavbarMenu href={'/produk'} nama={'Produk'} match={'produk'} />
        </li>
        
      </ul>
      <ul className='flex space-x-4 items-center'>
        <li>
          <Link href={'/keranjang'} className='indicator'>
            <span className='indicator-item badge indicator-start'>
              {keranjangCount.keranjang}
            </span>
            <GiShoppingCart className='text-3xl' />
          </Link>
        </li>
        <li>
          <div className='dropdown dropdown-end'>
            <Image
              src={`https://api.dicebear.com/6.x/pixel-art-neutral/png?seed=${keranjangCount.id}`}
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
    </nav>
  );
};

export default Navbar;
