'use server';

import prisma from '@/prisma';
import { Role, user } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function generateToken(user: user) {
  const secret = process.env.JWT_SECRET;
  const expire = process.env.JWT_EXPIRE;

  const data = {
    id: user.id,
    role: user.role,
  };

  return jwt.sign({ data: data }, secret, {
    expiresIn: expire,
  });
}

export async function matchUser(formData: FormData) {
  const email = formData.get('email')?.valueOf();
  const password = formData.get('password')?.valueOf();

  if (!(typeof email === 'string' && email.length > 0)) {
    return {
      error: 'Email diperlukan',
    };
  }

  if (!(typeof password === 'string' && password.length > 0)) {
    return {
      error: 'Password diperlukan',
    };
  }

  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: email,
    },
  });

  if (typeof user === 'object' && 'error' in user) {
    return {
      error: 'User tidak ditemukan',
    };
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return {
      error: 'Password salah',
    };
  }

  const token = await generateToken(user);

  console.log(jwt.decode(token, process.env.JWT_SECRET));

  cookies().set({
    name: 'JWT',
    httpOnly: true,
    value: token,
    expires: Date.now() + 3600 * 1000,
    path: '/',
  });

  if (user.role === Role.USER) {
    redirect('/');
  }

  if (user.role === Role.ADMIN) {
    redirect('/admin');
  }
}
