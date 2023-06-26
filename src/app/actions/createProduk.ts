'use server';

import prisma from '@/prisma';
import { uploadImage } from '@/utils/uploadImage';
import {
  GrindSize,
  KategoriType,
  Process,
  RoastLevel,
  Varietas,
} from '@prisma/client';
import { redirect } from 'next/navigation';

export async function createProduk(formData: FormData) {
  const nama = formData.get('nama')?.valueOf();
  const harga = Number(formData.get('harga')?.valueOf());
  const stok = Number(formData.get('stok')?.valueOf());
  const type = formData.get('type')?.valueOf();
  const varietas = formData.get('varietas')?.valueOf();
  const process = formData.get('process')?.valueOf();
  const roastLevel = formData.get('roast_level')?.valueOf();
  const grindSize = formData.get('grind_size')?.valueOf();
  const deskripsi = formData.get('deskripsi')?.valueOf();

  if (!(typeof nama === 'string' && nama.length > 0)) {
    throw new Error('Nama diperlukan', { cause: 'nama' });
  }

  if (!(typeof harga === 'number' && harga > 0)) {
    throw new Error('Harga diperlukan', { cause: 'harga' });
  }

  if (!(typeof stok === 'number' && stok > 0)) {
    throw new Error('Stok diperlukan', { cause: 'stok' });
  }

  if (!(typeof deskripsi === 'string' && deskripsi.length > 0)) {
    throw new Error('Deskripsi diperlukan', { cause: 'deskripsi' });
  }

  const filename = await uploadImage(formData.get('file') as File);

  const kategoriId = await prisma.kategori
    .findFirst({
      where: {
        type: type as KategoriType,
        varietas: varietas as Varietas,
        process: process as Process,
        roast_level: roastLevel as RoastLevel,
        grind_size: grindSize as GrindSize,
      },
      select: {
        id: true,
      },
    })
    .then((kategori) => kategori?.id)
    .catch(() => null);

  await prisma.produk.create({
    data: {
      nama,
      harga,
      stok,
      foto: filename,
      kategori: {
        connectOrCreate: {
          where: {
            id: kategoriId || 0,
          },
          create: {
            type: type as KategoriType,
            varietas: varietas as Varietas,
            process: process as Process,
            roast_level: roastLevel as RoastLevel,
            grind_size: grindSize as GrindSize,
          },
        },
      },
      deskripsi,
    },
  });

  redirect('/admin/barang');
}
