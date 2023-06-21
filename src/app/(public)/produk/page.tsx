'use client';

// import { addToKeranjang } from '@/app/actions/addToKeranjang';
import { decodeJWT } from '@/app/actions/decodeJWT';
import { getAllProduct } from '@/app/actions/getAllProduct';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import capitalize from 'capitalize';
import prisma from '@/prisma';
import { addToKeranjang } from '@/app/actions/addToKeranjang';
import { useRouter } from 'next/navigation';
import ProdukCard from '@/components/ProdukCard';
import { getAllCategory } from '@/app/actions/getAllCategory';
import { GrindSize, Process, RoastLevel, Varietas } from '@prisma/client';

export default function Page() {
  const {
    data: produk,
    isLoading,
    isError,
    error,
  } = useQuery(['products'], getAllProduct);

  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full container mx-auto space-y-4 pt-8'>
      <div className='flex flex-wrap gap-1'>
        <input type='text' className='input w-full' placeholder='Cari Produk' />
        <select className='select select-bordered ' name='varietas'>
          <option disabled selected={produk ? true : false}>
            Pilih Varietas
          </option>
          {Object.keys(Varietas).map((item, index) => (
            <option value={item} key={index}>
              {capitalize.words(
                Object.values(Varietas)[index].replace('_', ' ')
              )}
            </option>
          ))}
        </select>
        <select className='select select-bordered ' name='process'>
          <option disabled selected={produk ? true : false}>
            Pilih Proses Biji Kopi
          </option>
          {Object.keys(Process).map((item, index) => (
            <option value={item} key={index}>
              {capitalize.words(
                Object.values(Process)[index].replace('_', ' ')
              )}
            </option>
          ))}
        </select>
        <select className='select select-bordered ' name='roast_level'>
          <option disabled selected={produk ? true : false}>
            Pilih Roast Level
          </option>
          {Object.keys(RoastLevel).map((item, index) => (
            <option value={item} key={index}>
              {capitalize.words(
                Object.values(RoastLevel)[index].replace('_', ' ')
              )}
            </option>
          ))}
        </select>
        <select className='select select-bordered ' name='grind_size'>
          <option disabled selected={produk ? true : false}>
            Pilih Grind Size
          </option>
          {Object.keys(GrindSize).map((item, index) => (
            <option value={item} key={index}>
              {capitalize.words(
                Object.values(GrindSize)[index].replace('_', ' ')
              )}
            </option>
          ))}
        </select>
      </div>
      <div className='grid grid-cols-4 gap-4'>
        {produk &&
          produk.map((item) => (
            <ProdukCard
              key={item.id}
              produk={item}
              actions={
                <>
                  {item.stok > 0 ? (
                    <button
                      className='btn btn-primary w-full'
                      onClick={async () => {
                        await addToKeranjang(item.id);
                        router.refresh();
                      }}>
                      Tambah ke keranjang
                    </button>
                  ) : (
                    <p>Produk habis</p>
                  )}
                </>
              }
            />
          ))}
      </div>
    </div>
  );
}
