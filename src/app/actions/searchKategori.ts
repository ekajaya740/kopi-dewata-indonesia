'use server';

import prisma from '@/prisma';

export async function searchKategori(search: string) {
  const res = prisma.kategori.findMany({
    where: {
      nama: {
        contains: search,
      },
    },
  });

  return res;
}
