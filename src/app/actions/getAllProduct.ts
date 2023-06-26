'use server';
import prisma from '@/prisma';

export async function getAllProduct() {
  const produk = await prisma.produk.findMany({
    include: {
      kategori: true,
    },
  });

  return produk;
}
