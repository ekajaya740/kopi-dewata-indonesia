-- DropForeignKey
ALTER TABLE `keranjang` DROP FOREIGN KEY `keranjang_produk_id_fkey`;

-- DropForeignKey
ALTER TABLE `transaksi` DROP FOREIGN KEY `transaksi_produk_id_fkey`;

-- AlterTable
ALTER TABLE `keranjang` MODIFY `produk_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `transaksi` MODIFY `produk_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `keranjang` ADD CONSTRAINT `keranjang_produk_id_fkey` FOREIGN KEY (`produk_id`) REFERENCES `produk`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_produk_id_fkey` FOREIGN KEY (`produk_id`) REFERENCES `produk`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
