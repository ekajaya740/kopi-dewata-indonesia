'use server';

import prisma from '@/prisma';
import {
  GrindSize,
  KategoriType,
  Process,
  RoastLevel,
  Varietas,
} from '@prisma/client';

export async function searchFilter({
  type,
  varietas,
  process,
  roastLevel,
  grindSize,
}: {
  type?: KategoriType;
  varietas?: Varietas;
  process?: Process;
  roastLevel?: RoastLevel;
  grindSize?: GrindSize;
}) {
  const search = await prisma.produk.findMany({
    where: {
      kategori: {
        some: {
          type: type,
          varietas: varietas,
          process: process,
          roast_level: roastLevel,
          grind_size: grindSize,
        },
      },
    },
    include: {
      kategori: true,
    },
  });

  return search;
}
