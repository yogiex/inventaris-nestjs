/*
  Warnings:

  - The values [CONSUMEABLE] on the enum `TypeBarang` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeBarang_new" AS ENUM ('CONSUMABLE', 'INVENTORY');
ALTER TABLE "Items_type" ALTER COLUMN "type" TYPE "TypeBarang_new" USING ("type"::text::"TypeBarang_new");
ALTER TYPE "TypeBarang" RENAME TO "TypeBarang_old";
ALTER TYPE "TypeBarang_new" RENAME TO "TypeBarang";
DROP TYPE "TypeBarang_old";
COMMIT;
