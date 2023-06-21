'use server';

import prisma from '@/prisma';
import { decodeJWT } from './decodeJWT';
import { redirect } from 'next/navigation';
import { produk } from '@prisma/client';

export const checkoutKeranjang = async (qty: number, total: number) => {
  const djwt = await decodeJWT();
  const keranjangQty = await prisma.keranjang.findMany({
    where: {
      user_id: djwt.data.id,
    },
    select: {
      qty: true,
    },
  });

  const produk = await prisma.produk.findMany({
    where: {
      keranjang: {
        some: {
          user_id: djwt.data.id,
        },
      },
    },
  });

  produk.map(async (p, index) => {
    const date = new Date();
    const update = await prisma.produk.update({
      where: {
        id: p.id,
      },
      data: {
        stok: p.stok - keranjangQty[index].qty,
      },
    });

    const transaksi = await prisma.transaksi.create({
      data: {
        user_id: djwt.data.id,
        qty: qty,
        total: total,
        tanggal_beli: date,
        produk_id: p.id,
      },
    });
  });

  const keranjang = await prisma.keranjang.deleteMany({
    where: {
      user_id: djwt.data.id,
    },
  });
};
