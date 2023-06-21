'use server';

import prisma from '@/prisma';

export async function deleteKeranjang(id: number) {
  console.log('id', id);
  const keranjang = await prisma.keranjang.delete({
    where: {
      id: id,
    },
  });
  console.log('id', keranjang);

  return keranjang;
}
