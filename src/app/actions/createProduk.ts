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

  const kategori = await prisma.kategori.findFirst({
    where: {
      type: Object.values(KategoriType).find((t) => t === type),
      varietas: Object.values(Varietas).find((t) => t === varietas),
      process: Object.values(Process).find((t) => t === process),
      roast_level: Object.values(RoastLevel).find((t) => t === roastLevel),
      grind_size: Object.values(GrindSize).find((t) => t === grindSize),
    },
  });

  if (kategori === null) {
    await prisma.kategori.create({
      data: {
        type: Object.values(KategoriType).find((t) => t === type),
        varietas: Object.values(Varietas).find((t) => t === varietas),
        process: Object.values(Process).find((t) => t === process),
        roast_level: Object.values(RoastLevel).find((t) => t === roastLevel),
        grind_size: Object.values(GrindSize).find((t) => t === grindSize),
      },
    }); // TODO: Change with Error Handling
  }

  await prisma.produk.create({
    data: {
      nama,
      harga,
      stok,
      foto: filename,
      kategori: {
        connect: {
          id: kategori?.id,
        },
      },
      deskripsi,
    },
  });

  redirect('/admin/barang');
}
