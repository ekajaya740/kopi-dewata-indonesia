'use server';

import prisma from '@/prisma';

export const getAllCategory = async () => {
  const kategori = await prisma.kategori.findMany();

  return kategori;
};
