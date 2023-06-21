'use server';

import prisma from '@/prisma';
import { decodeJWT } from './decodeJWT';

export const addToKeranjang = async (id: number) => {
  const djwt = await decodeJWT();

  const keranjang = await prisma.keranjang.findFirst({
    where: {
      produk_id: id,
    },
  });

  const produk = await prisma.produk.findFirst({
    where: {
      id: id,
    },
  });

  if (keranjang === null) {
    const create = await prisma.keranjang.create({
      data: {
        produk_id: id,
        qty: 1,
        user_id: djwt.data.id,
        total: produk?.harga,
      },
    });

    return {
      keranjang: create,
    };
  } else {
    if (produk && produk?.stok < keranjang.qty + 1) {
      return {
        keranjang: null,
      };
    }
    const update = await prisma.keranjang.update({
      where: {
        id: keranjang.id,
      },
      data: {
        qty: keranjang.qty + 1,
        tanggal_diubah: new Date(),
        total: keranjang.total * (keranjang.qty + 1),
      },
    });

    return {
      keranjang: update,
    };
  }
};
