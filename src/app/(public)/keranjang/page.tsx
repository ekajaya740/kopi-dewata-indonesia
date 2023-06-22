'use client';

import { decodeJWT } from '@/app/actions/decodeJWT';
import { deleteKeranjang } from '@/app/actions/deleteKeranjang';
import { getKeranjangByUser } from '@/app/actions/getKeranjangByUser';
import ProdukCard from '@/components/ProdukCard';
import { useMutation, useQuery } from '@tanstack/react-query';
import capitalize from 'capitalize';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsFillTrashFill } from 'react-icons/bs';

export default function Page() {
  const { data: keranjang, isLoading } = useQuery(
    ['keranjang'],
    getKeranjangByUser,
    {
      refetchInterval: 500,
    }
  );

  return (
    <div className='w-full container mx-auto space-y-4 pt-8'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Keranjangmu</h1>
        <Link className='btn btn-primary' href={'/checkout'}>
          Checkout
        </Link>
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {isLoading ? (
          <div>Loading...</div>
        ) : keranjang && keranjang.length === 0 ? (
          <p>Keranjang kosong</p>
        ) : (
          keranjang &&
          keranjang.map((item) => (
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
