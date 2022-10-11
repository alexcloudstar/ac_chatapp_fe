/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverId_fkey";

-- DropIndex
DROP INDEX "Message_receiverId_key";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "receiverId";
