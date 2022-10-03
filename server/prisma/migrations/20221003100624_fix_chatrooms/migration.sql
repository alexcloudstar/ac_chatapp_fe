/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Chatroom` table. All the data in the column will be lost.
  - You are about to drop the column `chatroomId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_chatroomId_fkey";

-- AlterTable
ALTER TABLE "Chatroom" DROP COLUMN "ownerId",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "chatroomId",
DROP COLUMN "postId";

-- AddForeignKey
ALTER TABLE "Chatroom" ADD CONSTRAINT "Chatroom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
