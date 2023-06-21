'use server';

import prisma from '@/prisma';
import { decodeJWT } from './decodeJWT';

export const getKeranjangByUser = async () => {
  const djwt = await decodeJWT();

  const keranjang = await prisma.keranjang.findMany({
    where: {
      user_id: djwt.data.id,
    },
    include: {
      produk: {
        include: {
          kategori: true,
        },
      },
    },
  });

  return keranjang;
};
