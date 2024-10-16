/*
  Warnings:

  - You are about to drop the column `availbility` on the `Items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Items" DROP COLUMN "availbility",
ADD COLUMN     "availability" BOOLEAN NOT NULL DEFAULT true;
