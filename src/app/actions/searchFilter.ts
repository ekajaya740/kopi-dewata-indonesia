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
        type: {
          equals: type,
        },
        varietas: {
          equals: varietas,
        },
        process: {
          equals: process,
        },
        roast_level: {
          equals: roastLevel,
        },
        grind_size: {
          equals: grindSize,
        },
      },
    },
    include: {
      kategori: true,
    },
  });

  return search;
}
