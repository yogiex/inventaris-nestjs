/*
  Warnings:

  - Added the required column `inputBy` to the `Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inputItem` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusItem" AS ENUM ('BARANG_MASUK', 'PENDING', 'BARANG_SEDANG_DIPINDAHKAN', 'BARANG_BERHASIL_DIPINDAHKAN');

-- CreateEnum
CREATE TYPE "TypeBarang" AS ENUM ('CONSUMEABLE', 'INVENTORY');

-- AlterTable
ALTER TABLE "Items" ADD COLUMN     "availbility" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "inputBy" INTEGER NOT NULL,
ADD COLUMN     "status" "StatusItem" NOT NULL DEFAULT 'BARANG_MASUK',
ADD COLUMN     "type" "TypeBarang" NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "inputItem" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Movement_Request_History_Log" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "requesterName" TEXT NOT NULL,
    "approvedBy" TEXT NOT NULL,
    "assignTo" TEXT NOT NULL,
    "inputBy" TEXT NOT NULL,
    "inputName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "roomName" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movement_Request_History_Log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_inputBy_fkey" FOREIGN KEY ("inputBy") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
