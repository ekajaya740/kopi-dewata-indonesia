import { unlink } from 'fs';

export async function removeImage(filePath: string) {
  await unlink(filePath, () => {});
}
