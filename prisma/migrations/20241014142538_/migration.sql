-- DropForeignKey
ALTER TABLE "Movement_Request" DROP CONSTRAINT "Movement_Request_userId_fkey";

-- AlterTable
ALTER TABLE "Movement_Request" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Movement_Request" ADD CONSTRAINT "Movement_Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
