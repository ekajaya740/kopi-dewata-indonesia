'use client';

import { checkoutKeranjang } from '@/app/actions/checkoutKeranjang';
import { getKeranjangByUser } from '@/app/actions/getKeranjangByUser';
import { getProdukById } from '@/app/actions/getProdukById';
import ProdukCard from '@/components/ProdukCard';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const router = useRouter();

  const { data: keranjang } = useQuery(['keranjang'], getKeranjangByUser);

  if (keranjang?.keranjang.length === 0) {
    router.replace('/keranjang');
  }

  return (
    <>
      <div className='w-full container mx-auto h-screen space-y-4 pt-8'>
        <div className='flex justify-between'>
          <h1 className='text-3xl font-bold'>Checkout</h1>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {keranjang &&
            keranjang.keranjang.map((item) => (
              <div key={item.id} className='relative'>
                <div className='badge badge-primary absolute top-0 -right-1 z-10'>
                  {item.qty}
                </div>
                <ProdukCard produk={item.produk} />
              </div>
            ))}
        </div>
      </div>
      <div className='sticky bottom-0 bg-primary'>
        <div className='w-full container mx-auto p-4 flex justify-between items-center'>
          <h3 className='text-3xl font-bold text-accent'>
            Total Belanja:{' '}
            {Intl.NumberFormat('ID-id', {
              style: 'currency',
              currency: 'IDR',
            }).format(
              keranjang?.keranjang.reduce(
                (acc, curr) => acc + curr.produk.harga * curr.qty,
                0
              ) ?? 0
            )}
          </h3>
          <button
            className='btn btn-secondary'
            onClick={async () => {
              if (keranjang?.total && keranjang?.qty) {
                toast.success('Checkout berhasil');
                await checkoutKeranjang(keranjang?.qty, keranjang?.total);
                new Promise((resolve) => setTimeout(() => resolve(3000))).then(
                  () => {
                    router.replace('/');
                    router.refresh();
                  }
                );
                return;
              }
              toast.error('Checkout gagal');
            }}>
            Checkout
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Page;
