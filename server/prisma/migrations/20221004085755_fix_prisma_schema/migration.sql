/*
  Warnings:

  - You are about to drop the column `chatroomId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Chatroom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_chatroomId_fkey";

-- AlterTable
ALTER TABLE "Chatroom" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "chatroomId";

-- AddForeignKey
ALTER TABLE "Chatroom" ADD CONSTRAINT "Chatroom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
