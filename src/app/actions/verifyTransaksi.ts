'use server';

import prisma from '@/prisma';
import { VerfikasiType } from '@prisma/client';

export default async function verifyTransaksi(
  id: number,
  verified: VerfikasiType
) {
  const transaksi = await prisma.transaksi.update({
    where: {
      id: id,
    },
    data: {
      verified: verified,
      tanggal_verifikasi: new Date(),
    },
  });

  return transaksi;
}
