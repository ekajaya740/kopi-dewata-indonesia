'use server';

import prisma from '@/prisma';
import { VerfikasiType } from '@prisma/client';

export async function getAllPendingTransaksi() {
  const transaksi = await prisma.transaksi.findMany({
    where: {
      verified: VerfikasiType.UNVERIFIED,
    },
    include: {
      produk: true,
      user: true,
    },
    orderBy: {
      verified: 'desc',
    },
  });

  return transaksi;
}
