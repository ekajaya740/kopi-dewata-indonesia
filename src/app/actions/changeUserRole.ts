'use server';

import prisma from '@/prisma';
import { Role } from '@prisma/client';

export async function changeUserRole(id: number, role: Role) {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      role: role,
      tanggal_diubah: new Date(),
    },
  });

  return user;
}
