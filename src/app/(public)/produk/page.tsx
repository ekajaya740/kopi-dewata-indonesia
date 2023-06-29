'use client';

import { getAllProduct } from '@/app/actions/getAllProduct';
import { useMutation, useQuery } from '@tanstack/react-query';
import capitalize from 'capitalize';
import { addToKeranjang } from '@/app/actions/addToKeranjang';
import ProdukCard from '@/components/ProdukCard';
import {
  GrindSize,
  KategoriType,
  Process,
  RoastLevel,
  Varietas,
} from '@prisma/client';
import { searchFilter } from '@/app/actions/searchFilter';
import Loading from '@/app/(public)/loading';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
  // const { data: produk, isLoading } = useQuery(['product'], getAllProduct);

  const { data: produk, isLoading } = useQuery(
    ['product'],
    async () => {
      return await getAllProduct();
    },
    {
      refetchInterval: 10,
    }
  );

  const router = useRouter();

  const { mutate, data } = useMutation(searchFilter, {
    onSuccess: (data) => {
      console.log('mutate', data);
    },
  });

  return (
    <>
      <div className='w-full container mx-auto space-y-4 pt-8'>
        <div className='flex flex-wrap gap-1 px-3 md:px-0'>
          <select
            className='select select-bordered'
            name='type'
            defaultValue={'NULL'}
            onChange={(e) => {
              mutate({
                type: e.target.value as KategoriType,
              });
              router.refresh();
            }}>
            <option value={'NULL'}>Pilih Tipe Produk</option>
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
            defaultValue={'NULL'}
            onChange={(e) => {
              mutate({
                varietas: Object.values(Varietas)[e.target.selectedIndex - 1],
              });
              router.refresh();
            }}>
            <option value={'NULL'}>Pilih Varietas</option>
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
            defaultValue={'NULL'}
            onChange={(e) => {
              mutate({
                process: Object.values(Process)[e.target.selectedIndex - 1],
              });
              router.refresh();
            }}>
            <option value={'NULL'}>Pilih Proses Biji Kopi</option>
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
            defaultValue={'NULL'}
            onChange={(e) => {
              mutate({
                roastLevel:
                  Object.values(RoastLevel)[e.target.selectedIndex - 1],
              });
              router.refresh();
            }}>
            <option value={'NULL'}>Pilih Roast Level</option>
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
            defaultValue={'NULL'}
            onChange={(e) => {
              mutate({
                grindSize:
                  Object.values(GrindSize)[e.target.selectedIndex - 1 - 1],
              });
              router.refresh();
            }}>
            <option value={'NULL'}>Pilih Grind Size</option>
            {Object.keys(GrindSize).map((item, index) => (
              <option value={item} key={index}>
                {capitalize.words(
                  Object.values(GrindSize)[index].replace('_', ' ')
                )}
              </option>
            ))}
          </select>
        </div>
        {isLoading || isLoading ? (
          <Loading />
        ) : (
          <div className='flex flex-col space-y-2'>
            {data && data.length === 0 ? (
              <div className='flex flex-col space-y-1'>
                <p className='text-error'>Tidak ada data</p>
                <p className='font-bold'>
                  Berikut produk lain yang di rekomendasikan
                </p>
              </div>
            ) : (
              <></>
            )}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:p-0 p-3'>
              {data && data.length !== 0 ? (
                data.map((item) => (
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
              ) : produk && produk.length !== 0 ? (
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
                ))
              ) : (
                <p>Tidak ada data</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
