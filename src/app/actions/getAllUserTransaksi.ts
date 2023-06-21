'use server';

import prisma from '@/prisma';
import { decodeJWT } from './decodeJWT';

export async function getAllUserTransaksi() {
  const djwt = await decodeJWT();

  const transaksi = await prisma.transaksi.findMany({
    where: {
      user_id: djwt.data.id,
    },
    include: {
      produk: true,
    },
    orderBy: {
      verified: 'desc',
    },
  });

  return transaksi;
}
