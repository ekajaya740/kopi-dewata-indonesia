'use server';

import prisma from '@/prisma';
import { decodeJWT } from './decodeJWT';

export const countUserKeranjang = async () => {
  const djwt = await decodeJWT();
  const keranjang = await prisma.keranjang.count({
    where: {
      user_id: djwt.data.id,
    },
  });

  return {
    keranjang,
    id: djwt.data.id,
  };
};
