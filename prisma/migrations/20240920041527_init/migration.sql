-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movement_Request" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "requesterName" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movement_Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Items_roomId_key" ON "Items"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "Movement_Request_itemId_key" ON "Movement_Request"("itemId");

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement_Request" ADD CONSTRAINT "Movement_Request_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement_Request" ADD CONSTRAINT "Movement_Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
