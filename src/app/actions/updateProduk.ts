'use server';

import prisma from '@/prisma';
import { removeImage } from '@/utils/removeImage';
import { uploadImage } from '@/utils/uploadImage';
import {
  GrindSize,
  KategoriType,
  Process,
  RoastLevel,
  Varietas,
} from '@prisma/client';
import { redirect } from 'next/navigation';

export const updateProduct = async (formData: FormData, id: number) => {
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

  const file = formData.get('file') as File;

  console.log(file);

  const oldFile = await prisma.produk.findFirst({
    where: {
      id: id,
    },
    select: {
      foto: true,
    },
  });

  const getFilename = async () => {
    if (file.size !== 0) {
      await removeImage(`/public/upload/${oldFile?.foto}`);

      const filename = await uploadImage(file);

      return filename;
    }

    return oldFile?.foto;
  };

  const newFilename = await getFilename();

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

  await prisma.produk.update({
    where: {
      id: id,
    },
    data: {
      nama: nama,
      harga: harga,
      stok: stok,
      foto: newFilename,
      kategori_id: kategori?.id,
    },
  });

  redirect('/admin/barang');
};
