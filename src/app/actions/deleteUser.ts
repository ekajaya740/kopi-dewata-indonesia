'use server';

import prisma from '@/prisma';

export async function deleteUser(id: number) {
  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  return user;
}
