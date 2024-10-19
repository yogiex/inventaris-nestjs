/*
  Warnings:

  - The primary key for the `Items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `typeId` to the `Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- AlterTable
ALTER TABLE "Items" DROP CONSTRAINT "Items_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "typeId" INTEGER NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(30),
ADD CONSTRAINT "Items_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Items_id_seq";

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Items_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
