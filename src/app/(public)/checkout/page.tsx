'use client';

import { checkoutKeranjang } from '@/app/actions/checkoutKeranjang';
import { getKeranjangByUser } from '@/app/actions/getKeranjangByUser';
import ProdukCard from '@/components/ProdukCard';
import { produk } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import capitalize from 'capitalize';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const { data: keranjang } = useQuery(['keranjang'], getKeranjangByUser);

  const total = keranjang && keranjang.reduce((a, b) => a + b.total, 0);
  const qtys = keranjang && keranjang.reduce((a, b) => a + b.qty, 0);

  console.log(total);
  return (
    <>
      <div className='w-full container mx-auto h-screen space-y-4 pt-8'>
        <div className='flex justify-between'>
          <h1 className='text-3xl font-bold'>Checkout</h1>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {keranjang &&
            keranjang.map((item) => (
              <ProdukCard key={item.id} produk={item.produk} />
              // <div key={item.id}>
              //   <div className='card bg-neutral card-compact' key={item.id}>
              //     <figure className='w-full '>
              //       <Image
              //         src={`/upload/produk/${item.produk.foto}`}
              //         alt={''}
              //         width={600}
              //         height={300}
              //         className='object-cover'
              //       />
              //     </figure>
              //     <div className='card-body'>
              //       <div className='flex flex-wrap'>
              //         <div className='flex flex-wrap'>
              //           <div className='badge'>
              //             {capitalize
              //               .words(item.produk.kategori.type)
              //               .replace('_', ' ')}
              //           </div>
              //           <div className='badge'>
              //             {capitalize
              //               .words(item.produk.kategori.varietas)
              //               .replace('_', ' ')}
              //           </div>
              //           <div className='badge'>
              //             {capitalize
              //               .words(item.produk.kategori.process)
              //               .replace('_', ' ')}
              //           </div>
              //           <div className='badge'>
              //             {capitalize
              //               .words(item.produk.kategori.grind_size)
              //               .replace('_', ' ')}
              //           </div>
              //           <div className='badge'>
              //             {capitalize
              //               .words(item.produk.kategori.roast_level)
              //               .replace('_', ' ')}
              //           </div>
              //         </div>
              //       </div>
              //       <h1 className='text-xl'>{item.produk.nama}</h1>
              //       <p className='card-title'>
              //         {Intl.NumberFormat('ID-id', {
              //           style: 'currency',
              //           currency: 'IDR',
              //         }).format(item.produk.harga)}
              //       </p>
              //     </div>
              //   </div>
              // </div>
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
            }).format(total ? total : 0)}
          </h3>
          <button
            className='btn btn-secondary'
            onClick={async () => {
              if (qtys && total) {
                await checkoutKeranjang(qtys, total);
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
