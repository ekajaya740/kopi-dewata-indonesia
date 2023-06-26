/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `kategori` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[varietas]` on the table `kategori` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[process]` on the table `kategori` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roast_level]` on the table `kategori` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[grind_size]` on the table `kategori` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `kategori_type_key` ON `kategori`(`type`);

-- CreateIndex
CREATE UNIQUE INDEX `kategori_varietas_key` ON `kategori`(`varietas`);

-- CreateIndex
CREATE UNIQUE INDEX `kategori_process_key` ON `kategori`(`process`);

-- CreateIndex
CREATE UNIQUE INDEX `kategori_roast_level_key` ON `kategori`(`roast_level`);

-- CreateIndex
CREATE UNIQUE INDEX `kategori_grind_size_key` ON `kategori`(`grind_size`);
