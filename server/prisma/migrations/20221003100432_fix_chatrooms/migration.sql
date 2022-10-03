/*
  Warnings:

  - You are about to drop the `_ChatroomToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chatroomId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ChatroomToUser" DROP CONSTRAINT "_ChatroomToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatroomToUser" DROP CONSTRAINT "_ChatroomToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "chatroomId" INTEGER NOT NULL,
ADD COLUMN     "postId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ChatroomToUser";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "Chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
