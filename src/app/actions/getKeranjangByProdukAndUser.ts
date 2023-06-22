'use server';

import prisma from '@/prisma';
import { decodeJWT } from './decodeJWT';

export const getKeranjangByProdukAndUser = async (id: number) => {
  const djwt = await decodeJWT();

  const keranjang = await prisma.keranjang.findFirst({
    where: {
      user_id: djwt.data.id,
      produk_id: id,
    },
    include: {
      produk: true,
    },
  });

  console.log(keranjang);

  return keranjang;
};
