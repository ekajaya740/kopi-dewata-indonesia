import { decodeJWT } from '@/app/actions/decodeJWT';
import prisma from '@/prisma';

import { NextApiRequest, NextApiResponse } from 'next';

// interface KeranjangRequest extends NextApiRequest {
//   body: {
//     produk_id: number;
//     qty: number;
//   };
// }

export async function POST(req: Request) {
  const djwt = await decodeJWT();
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
