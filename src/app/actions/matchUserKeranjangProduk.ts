import prisma from '@/prisma';

export default async function matchUserKeranjangProduk(user_id: number) {
  const keranjang = await prisma.keranjang.findMany({
    where: {
      user_id: user_id,
    },
    select: {
      produk_id: true,
    },
  });

  return keranjang;
}
