/*
  Warnings:

  - You are about to drop the column `itemTypeId` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the column `requesterId` on the `Movement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_itemTypeId_fkey";

-- AlterTable
ALTER TABLE "Movement" DROP COLUMN "itemTypeId",
DROP COLUMN "requesterId";
