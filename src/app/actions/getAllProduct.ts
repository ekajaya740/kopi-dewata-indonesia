'use server';

import prisma from '@/prisma';

export const getAllProduct = async () => {
  const produk = await prisma.produk.findMany({
    include: {
      kategori: true,
    },
  });

  console.log(produk);

  return produk;
};
