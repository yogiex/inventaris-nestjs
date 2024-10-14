-- AlterTable
ALTER TABLE "Movement_Request_History_Log" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "requesterName" DROP NOT NULL,
ALTER COLUMN "approvedBy" DROP NOT NULL,
ALTER COLUMN "assignTo" DROP NOT NULL;
