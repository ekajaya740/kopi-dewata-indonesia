import prisma from '@/prisma';
import { Role } from '@prisma/client';
import { redirect } from 'next/navigation';

const bcrypt = require('bcrypt');

export async function createAdmin(data: FormData) {
  'use server';

  const nama = data.get('nama')?.valueOf();
  const noHp = data.get('noHp')?.valueOf();
  const alamat = data.get('alamat')?.valueOf();
  const email = data.get('email')?.valueOf();
  const password = data.get('password')?.valueOf();

  if (!(typeof nama === 'string' && nama.length > 0)) {
    throw new Error('Nama diperlukan');
  }

  if (!(typeof noHp === 'string' && noHp.length > 0)) {
    throw new Error('No Hp diperlukan');
  }

  if (!(typeof alamat === 'string' && alamat.length > 0)) {
    throw new Error('Alamat diperlukan');
  }

  if (!(typeof email === 'string' && email.length > 0)) {
    throw new Error('Email diperlukan');
  }

  if (!(typeof password === 'string' && password.length > 0)) {
    throw new Error('Password diperlukan');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      nama,
      no_hp: noHp,
      alamat,
      email,
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });
  redirect('/login');
}
