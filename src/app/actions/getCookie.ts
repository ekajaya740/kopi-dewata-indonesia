'use server';

import { cookies } from 'next/headers';

export async function getCookie(key: string) {
  const cookie = cookies().get(key);

  return cookie;
}
