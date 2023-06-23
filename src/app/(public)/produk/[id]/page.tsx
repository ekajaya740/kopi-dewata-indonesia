'use client';

import { decodeJWT } from '@/app/actions/decodeJWT';
import { getKeranjangByProdukAndUser } from '@/app/actions/getKeranjangByProdukAndUser';
import { getProdukById } from '@/app/actions/getProdukById';
import getUserKeranjang from '@/app/actions/getUserKeranjang';
import Loading from '@/app/admin/loading';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import { GrTransaction } from 'react-icons/gr';

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  const { data: produk } = useQuery(['produk', id], () =>
    getProdukById(Number(id))
  );
  const { data: keranjang } = useQuery(['keranjang', id], () =>
    getKeranjangByProdukAndUser(Number(id))
  );
  return (
    <Suspense fallback={<Loading />}>
      <div className='w-full container mx-auto p-8'>
        <div className='w-full md:grid md:grid-cols-3 md:gap-4 flex flex-col'>
          <Image
            src={`/upload/produk/${produk?.foto}`}
            alt={`Foto produk ${produk && produk !== null ? produk.nama : ''}`}
            width={500}
            height={500}
            className='w-full object-cover col-span-1'
          />
          <div className='col-span-2 flex space-y-4 flex-col'>
            <h1 className='text-4xl font-bold'>{produk?.nama}</h1>
            <h2 className='text-xl font-medium'>
              {Intl.NumberFormat('ID-id', {
                style: 'currency',
                currency: 'IDR',
              }).format(produk?.harga ?? 0)}
            </h2>
            <p>Stok: {produk?.stok}</p>
            {keranjang && keranjang.produk_id === produk?.id ? (
              <div className='flex flex-wrap gap-1'>
                <input
                  type='number'
                  name='qty'
                  id='qty'
                  className='input max-w-xs'
                  defaultValue={
                    keranjang && keranjang !== null ? keranjang.qty : 0
                  }
                  onChange={(e) => {
                    console.log(e.target.value);
                    if (e.target.value === '') {
                      return;
                    }
                    if (Number(e.target.value) <= 0) {
                      return;
                    }

                    if (
                      Number(e.target.value) < ((produk && produk?.stok) ?? 0)
                    ) {
                      fetch('/api/add-to-keranjang', {
                        method: 'POST',
                        body: JSON.stringify({
                          produk_id: Number(id),
                          qty: Number(e.target.value),
                        }),
                      });
                    }
                  }}
                />
                <Link className='btn btn-primary' href={'/keranjang'}>
                  <GiShoppingCart className='text-3xl' />
                </Link>
              </div>
            ) : (
              <button className='btn btn-primary max-w-xs'>
                Masukkan ke Keranjang
              </button>
            )}
            <div className='flex w-full flex-col space-y-1'>
              <div>
                <h3 className='text-xl font-bold'>Deskripsi</h3>
                <p>{produk?.deskripsi}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
