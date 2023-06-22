'use client';

import { checkoutKeranjang } from '@/app/actions/checkoutKeranjang';
import { getKeranjangByUser } from '@/app/actions/getKeranjangByUser';
import ProdukCard from '@/components/ProdukCard';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

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
              <ProdukCard key={item.id} produk={item.produk} />
            ))}
        </div>
      </div>
      <div className='sticky bottom-0 bg-primary'>
        <div className='w-full container mx-auto p-4 flex justify-between items-center'>
          <h3 className='text-3xl font-bold'>
            Total Belanja:{' '}
            {Intl.NumberFormat('ID-id', {
              style: 'currency',
              currency: 'IDR',
            }).format(keranjang?.totalHarga || 0)}
          </h3>
          <button
            className='btn btn-secondary'
            onClick={async () => {
              if (keranjang?.total && keranjang?.qty) {
                await checkoutKeranjang(keranjang?.qty, keranjang?.total);
                router.replace('/');
                router.refresh();
              }
            }}>
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
