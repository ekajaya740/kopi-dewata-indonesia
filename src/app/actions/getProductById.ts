'use server';

import prisma from '@/prisma';

export const getProductById = async (id: number | undefined) => {
  if (id) {
    const produk = await prisma.produk.findFirst({
      where: {
        id: id,
      },
      include: {
        kategori: true,
      },
    });

    return produk;
  }
};
