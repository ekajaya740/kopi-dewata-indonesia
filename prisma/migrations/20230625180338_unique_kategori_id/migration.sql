/*
  Warnings:

  - A unique constraint covering the columns `[kategori_id]` on the table `produk` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `produk_kategori_id_key` ON `produk`(`kategori_id`);
