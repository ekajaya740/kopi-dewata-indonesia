'use server';

import prisma from '@/prisma';

export async function getProdukById(id: number) {
  const produk = await prisma.produk.findUnique({
    where: {
      id: id,
    },
    include: {
      kategori: true,
      keranjang: {
        include: {
          user: true,
        },
      },
    },
  });

  return produk;
}
