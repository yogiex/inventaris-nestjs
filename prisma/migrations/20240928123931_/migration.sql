/*
  Warnings:

  - A unique constraint covering the columns `[supplierId]` on the table `Items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `supplierId` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Items" ADD COLUMN     "supplierId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Items_supplierId_key" ON "Items"("supplierId");

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
