/*
  Warnings:

  - You are about to drop the column `userId` on the `Chatroom` table. All the data in the column will be lost.
  - Added the required column `chatroomsUserId` to the `Chatroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Chatroom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chatroom" DROP CONSTRAINT "Chatroom_userId_fkey";

-- AlterTable
ALTER TABLE "Chatroom" DROP COLUMN "userId",
ADD COLUMN     "chatroomsUserId" INTEGER NOT NULL,
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Chatroom" ADD CONSTRAINT "Chatroom_chatroomsUserId_fkey" FOREIGN KEY ("chatroomsUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
