'use server';
import prisma from '@/prisma';
import { decodeJWT } from './decodeJWT';

export async function getUserById() {
  const djwt = await decodeJWT();

  const user = await prisma.user.findUnique({
    where: {
      id: djwt.data.id,
    },
  });

  return user;
}
