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

  const aggregate = await prisma.keranjang.aggregate({
    where: {
      user_id: djwt.data.id,
    },
    _sum: {
      total: true,
      qty: true,
    },
  });

  return {
    keranjang,
    qty: aggregate._sum.qty!,
    total: aggregate._sum.total!,
  };
};
