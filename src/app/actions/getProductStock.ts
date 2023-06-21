'use server';

import prisma from '@/prisma';

export async function getProductStock() {
  const product = await prisma.produk.findMany({
    select: {
      stok: true,
    },
  });

  const totalStock = product.reduce((acc, curr) => {
    return acc + curr.stok;
  }, 0);

  return totalStock;
}
