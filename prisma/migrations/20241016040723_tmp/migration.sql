/*
  Warnings:

  - You are about to drop the column `availability` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `inputBy` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Items` table. All the data in the column will be lost.
  - Added the required column `condition` to the `Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spec` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_inputBy_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "Movement_Request" DROP CONSTRAINT "Movement_Request_itemId_fkey";

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "availability",
DROP COLUMN "created_at",
DROP COLUMN "description",
DROP COLUMN "inputBy",
DROP COLUMN "name",
DROP COLUMN "quantity",
DROP COLUMN "status",
DROP COLUMN "supplierId",
DROP COLUMN "type",
DROP COLUMN "update_at",
ADD COLUMN     "condition" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "spec" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Items_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "inputBy" INTEGER NOT NULL,
    "status" "StatusItem" NOT NULL DEFAULT 'BARANG_MASUK',
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "type" "TypeBarang" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Items_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Items_type" ADD CONSTRAINT "Items_type_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items_type" ADD CONSTRAINT "Items_type_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items_type" ADD CONSTRAINT "Items_type_inputBy_fkey" FOREIGN KEY ("inputBy") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement_Request" ADD CONSTRAINT "Movement_Request_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
