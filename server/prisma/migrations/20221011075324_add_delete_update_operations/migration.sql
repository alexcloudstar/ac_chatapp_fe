-- DropForeignKey
ALTER TABLE "Punishment" DROP CONSTRAINT "Punishment_chatroomId_fkey";

-- DropForeignKey
ALTER TABLE "Punishment" DROP CONSTRAINT "Punishment_userId_fkey";

-- AddForeignKey
ALTER TABLE "Punishment" ADD CONSTRAINT "Punishment_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "chatrooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Punishment" ADD CONSTRAINT "Punishment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
