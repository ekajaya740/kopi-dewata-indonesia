'use client';

// import { addToKeranjang } from '@/app/actions/addToKeranjang';
import { decodeJWT } from '@/app/actions/decodeJWT';
import { getAllProduct } from '@/app/actions/getAllProduct';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import capitalize from 'capitalize';
import prisma from '@/prisma';
import { addToKeranjang } from '@/app/actions/addToKeranjang';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import ProdukCard from '@/components/ProdukCard';
import { getAllCategory } from '@/app/actions/getAllCategory';
import {
  GrindSize,
  KategoriType,
  Process,
  RoastLevel,
  Varietas,
} from '@prisma/client';
import { searchFilter } from '@/app/actions/searchFilter';
import { useState } from 'react';

export default function Page() {
  const [enabled, setEnabled] = useState(true);
  const {
    data: produk,
    isLoading,
    isError,
    error,
  } = useQuery(['products'], getAllProduct, {
    refetchInterval: 500,
    enabled: enabled,
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const mutate = useMutation(searchFilter, {
    onSuccess: (data) => {
      console.log('mutate', data);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full container mx-auto space-y-4 pt-8'>
      <div className='flex flex-wrap gap-1'>
        <select
          className='select select-bordered '
          name='type'
          onChange={(e) => {
            mutate.mutate({
              type: Object.values(KategoriType)[e.target.selectedIndex - 1],
            });
          }}>
          <option selected={produk ? true : false} value={'NULL'}>
            Pilih Tipe Produk
          </option>
          {Object.keys(KategoriType).map((item, index) => (
            <option value={item} key={index}>
              {capitalize.words(
                Object.values(KategoriType)[index].replace('_', ' ')
              )}
            </option>
          ))}
        </select>
        <select
          className='select select-bordered '
          name='varietas'
          onChange={(e) => {
            mutate.mutate({
              varietas: Object.values(Varietas)[e.target.selectedIndex - 1],
            });
          }}>
          <option selected={produk ? true : false} value={'NULL'}>
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
        <select
          className='select select-bordered '
          name='process'
          onChange={(e) => {
            mutate.mutate({
              process: Object.values(Process)[e.target.selectedIndex - 1],
            });
          }}>
          <option selected={produk ? true : false} value={'NULL'}>
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
        <select
          className='select select-bordered '
          name='roast_level'
          onChange={(e) => {
            mutate.mutate({
              roastLevel: Object.values(RoastLevel)[e.target.selectedIndex - 1],
            });
          }}>
          <option selected={produk ? true : false} value={'NULL'}>
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
        <select
          className='select select-bordered '
          name='grind_size'
          onChange={(e) => {
            mutate.mutate({
              grindSize:
                Object.values(GrindSize)[e.target.selectedIndex - 1 - 1],
            });
          }}>
          <option selected={produk ? true : false} value={'NULL'}>
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
        {mutate.data && mutate.data.length === 0
          ? mutate.data.map((item) => (
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
            ))
          : produk &&
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
