import { createProduk } from '@/app/actions/createProduk';
import { getAllCategory } from '@/app/actions/getAllCategory';
import { searchKategori } from '@/app/actions/searchKategori';
import ProdukForm from '@/components/ProdukForm';
import { produk } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const capitalize = require('capitalize');

const Page = async () => {
  // const {
  //   isLoading,
  //   data: kategori,
  //   isError,
  //   error,
  // } = useQuery(['kategori'], getAllCategory);
  return (
    <>
      <h1 className='font-bold text-4xl pb-8'>Tambah Barang</h1>
      <ProdukForm />
    </>
  );
};

export default Page;
