'use server';

import prisma from '@/prisma';
import { removeImage } from '@/utils/removeImage';

export async function deleteProduct(id: number) {
  const imagePath = await prisma.produk.findFirst({
    where: {
      id,
    },
    select: {
      foto: true,
    },
  });

  if (imagePath) {
    await removeImage(imagePath?.foto);
  }

  await prisma.$transaction([
    prisma.produk.update({
      where: {
        id,
      },
      data: {
        kategori: {
          disconnect: [],
        },
      },
    }),
    prisma.produk.delete({
      where: {
        id,
      },
    }),
  ]);
}
