import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { Role } from '@prisma/client';

export class AuthError extends Error {}

interface UserJwtPayload {
  data: {
    id: number;
    role: Role;
  };
  jti: string;
  iat: number;
}

export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get('JWT')?.value;

  console.log('TOKEN', token);

  if (!token) throw new AuthError('Missing user token');

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verified.payload as unknown as UserJwtPayload;
  } catch (err) {
    // req.cookies.set({
    //   name: 'JWT',
    //   value: '',
    // });
    throw new AuthError('Your token has expired.');
  }
}
