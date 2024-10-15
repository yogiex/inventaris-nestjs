-- AlterTable
ALTER TABLE "Movement_Request" ADD COLUMN     "userAssignToId" INTEGER;

-- AddForeignKey
ALTER TABLE "Movement_Request" ADD CONSTRAINT "Movement_Request_userAssignToId_fkey" FOREIGN KEY ("userAssignToId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
