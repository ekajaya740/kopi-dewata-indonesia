/*
  Warnings:

  - You are about to drop the column `kategori_id` on the `produk` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `produk_kategori_id_fkey`;

-- AlterTable
ALTER TABLE `produk` DROP COLUMN `kategori_id`;

-- CreateTable
CREATE TABLE `_kategoriToproduk` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_kategoriToproduk_AB_unique`(`A`, `B`),
    INDEX `_kategoriToproduk_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_kategoriToproduk` ADD CONSTRAINT `_kategoriToproduk_A_fkey` FOREIGN KEY (`A`) REFERENCES `kategori`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_kategoriToproduk` ADD CONSTRAINT `_kategoriToproduk_B_fkey` FOREIGN KEY (`B`) REFERENCES `produk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
