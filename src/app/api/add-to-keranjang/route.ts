import { decodeJWT } from '@/app/actions/decodeJWT';
import prisma from '@/prisma';

export async function POST(req: Request) {
  const { produk_id, qty } = await req.json();

  const keranjang = await prisma.keranjang.findFirst({
    where: {
      produk_id: produk_id,
    },
    include: {
      produk: true,
    },
  });

  if (keranjang !== null) {
    const update = await prisma.keranjang.update({
      where: {
        id: keranjang.id,
      },
      data: {
        qty: qty,
      },
    });

    return new Response(
      JSON.stringify({
        status: 'success',
        data: update,
      })
    );
  }
}
