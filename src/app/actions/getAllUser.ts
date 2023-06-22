'use server';

import prisma from '@/prisma';

export async function getAllUser() {
  const user = await prisma.user.findMany({
    orderBy: {
      role: 'asc',
    },
  });

  return user;
}
