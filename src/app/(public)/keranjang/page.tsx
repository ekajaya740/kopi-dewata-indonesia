'use client';

import { decodeJWT } from '@/app/actions/decodeJWT';
import { deleteKeranjang } from '@/app/actions/deleteKeranjang';
import { getKeranjangByUser } from '@/app/actions/getKeranjangByUser';
import ProdukCard from '@/components/ProdukCard';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsFillTrashFill } from 'react-icons/bs';
import cn from 'classnames';

export default function Page() {
  const { data: keranjang, isLoading } = useQuery(
    ['keranjang'],
    getKeranjangByUser
  );

  const router = useRouter();

  return (
    <div className='w-full container mx-auto space-y-4 pt-8 px-3 md:px-0'>
      <div className='flex justify-between flex-wrap'>
        <h1 className='text-3xl font-bold'>Keranjangmu</h1>
        <Link
          className={cn('btn', {
            'btn-primary': keranjang && keranjang.keranjang.length > 0,
            'btn-disabled': keranjang && keranjang.keranjang.length === 0,
          })}
          href={'/checkout'}>
          Checkout
        </Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {isLoading ? (
          <div>Loading...</div>
        ) : keranjang && keranjang.keranjang.length === 0 ? (
          <p>Keranjang kosong</p>
        ) : (
          keranjang &&
          keranjang.keranjang.map((item) => (
            <ProdukCard
              key={item.id}
              produk={item.produk}
              actions={
                <div className='flex gap-1'>
                  <input
                    type='number'
                    defaultValue={item.qty}
                    className='input w-full'
                    onChange={(e) => {
                      console.log(e.target.value);
                      if (e.target.value === '') {
                        return;
                      }
                      if (Number(e.target.value) <= 0) {
                        return;
                      }

                      if (Number(e.target.value) < item.produk.stok) {
                        fetch('/api/add-to-keranjang', {
                          method: 'POST',
                          body: JSON.stringify({
                            produk_id: item.produk.id,
                            qty: Number(e.target.value),
                          }),
                        });
                      }
                    }}
                  />
                  <button
                    className='bg-white rounded-full'
                    type='submit'
                    onClick={async () => {
                      await deleteKeranjang(item.id);
                      router.refresh();
                    }}>
                    <BsFillTrashFill className='text-3xl text-error m-2' />
                  </button>
                </div>
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
