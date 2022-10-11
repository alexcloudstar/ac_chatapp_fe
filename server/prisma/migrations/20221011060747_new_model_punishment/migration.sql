-- CreateTable
CREATE TABLE "Punishment" (
    "id" SERIAL NOT NULL,
    "chatroomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Punishment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Punishment" ADD CONSTRAINT "Punishment_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "chatrooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Punishment" ADD CONSTRAINT "Punishment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
