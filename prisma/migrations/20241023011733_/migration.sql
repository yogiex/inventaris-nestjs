/*
  Warnings:

  - You are about to drop the column `update_at` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `availability` on the `Items_type` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Items_type` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Items_type` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Movement_Request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Movement_Request_History_Log` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Items_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemAvailability" AS ENUM ('TERSEDIA', 'TIDAK_TERSEDIA');

-- CreateEnum
CREATE TYPE "MovementStatus" AS ENUM ('PENGAJUAN', 'DISETUJUI', 'DITOLAK', 'SEDANG_DIPINDAHKAN', 'SELESAI');

-- CreateEnum
CREATE TYPE "MovementType" AS ENUM ('BARANG_MASUK', 'BARANG_KELUAR', 'PEMINDAHAN');

-- DropForeignKey
ALTER TABLE "Movement_Request" DROP CONSTRAINT "Movement_Request_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Movement_Request" DROP CONSTRAINT "Movement_Request_userAssignToId_fkey";

-- DropForeignKey
ALTER TABLE "Movement_Request" DROP CONSTRAINT "Movement_Request_userId_fkey";

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "update_at",
ADD COLUMN     "availability" "ItemAvailability" NOT NULL DEFAULT 'TERSEDIA',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Items_type" DROP COLUMN "availability",
DROP COLUMN "status",
DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "update_at",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Movement_Request";

-- DropTable
DROP TABLE "Movement_Request_History_Log";

-- DropEnum
DROP TYPE "StatusItem";

-- CreateTable
CREATE TABLE "ItemMovement" (
    "id" SERIAL NOT NULL,
    "itemId" TEXT NOT NULL,
    "movementId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemMovement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movement" (
    "id" SERIAL NOT NULL,
    "MovementTitle" TEXT,
    "itemTypeId" INTEGER NOT NULL,
    "movementType" "MovementType" NOT NULL,
    "status" "MovementStatus" NOT NULL DEFAULT 'PENGAJUAN',
    "quantity" INTEGER NOT NULL,
    "fromRoomId" INTEGER,
    "toRoomId" INTEGER,
    "requesterId" INTEGER NOT NULL,
    "requesterName" TEXT NOT NULL,
    "approvedById" INTEGER,
    "assignedToId" INTEGER,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movement_log" (
    "id" SERIAL NOT NULL,
    "MovementTitle" TEXT,
    "movementType" TEXT NOT NULL,
    "itemTypeName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "fromRoom" TEXT,
    "toRoom" TEXT,
    "requesterName" TEXT NOT NULL,
    "approvedBy" TEXT,
    "assignedTo" TEXT,
    "inputBy" TEXT,
    "status" "MovementStatus" NOT NULL,
    "itemAvailability" "ItemAvailability" NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movement_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemMovement_itemId_movementId_key" ON "ItemMovement"("itemId", "movementId");

-- AddForeignKey
ALTER TABLE "ItemMovement" ADD CONSTRAINT "ItemMovement_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemMovement" ADD CONSTRAINT "ItemMovement_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_itemTypeId_fkey" FOREIGN KEY ("itemTypeId") REFERENCES "Items_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_fromRoomId_fkey" FOREIGN KEY ("fromRoomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_toRoomId_fkey" FOREIGN KEY ("toRoomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
