'use client';

import { getAllProduct } from '@/app/actions/getAllProduct';
import { useMutation, useQuery } from '@tanstack/react-query';
import capitalize from 'capitalize';
import { addToKeranjang } from '@/app/actions/addToKeranjang';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ProdukCard from '@/components/ProdukCard';
import {
  GrindSize,
  KategoriType,
  Process,
  RoastLevel,
  Varietas,
} from '@prisma/client';
import { searchFilter } from '@/app/actions/searchFilter';
import { Suspense } from 'react';
import Loading from '@/app/admin/loading';

export default function Page() {
  const { data: produk, isLoading } = useQuery(['products'], getAllProduct, {
    refetchInterval: 100,
  });

  const router = useRouter();

  const mutate = useMutation(searchFilter, {
    onSuccess: (data) => {
      console.log('mutate', data);
    },
  });

  return (
    <Suspense fallback={<Loading />}>
      <div className='w-full container mx-auto space-y-4 pt-8'>
        <div className='flex flex-wrap gap-1 px-3 md:px-0'>
          <select
            className='select select-bordered'
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
                roastLevel:
                  Object.values(RoastLevel)[e.target.selectedIndex - 1],
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
        {isLoading || mutate.isLoading ? (
          <Loading />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:p-0 p-3'>
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
        )}
      </div>
    </Suspense>
  );
}
