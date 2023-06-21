import { appendFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

export async function uploadImage(file: File) {
  const extension = file.name.split('.').pop();
  const filename = uuidv4();
  const path = `./public/upload/produk/${filename}.${extension}`;

  const data = await file.arrayBuffer();

  await sharp(data)
    .webp({
      quality: 60,
    })
    .toFile(path);

  return filename + '.' + extension;
}
