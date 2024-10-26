/*
  Warnings:

  - You are about to drop the column `roomId` on the `Items_type` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Items_type" DROP CONSTRAINT "Items_type_roomId_fkey";

-- AlterTable
ALTER TABLE "Items_type" DROP COLUMN "roomId";
