/*
  Warnings:

  - Changed the type of `type` on the `Punishment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PunishmentType" AS ENUM ('MUTE', 'BAN', 'KICK', 'WARN');

-- AlterTable
ALTER TABLE "Punishment" DROP COLUMN "type",
ADD COLUMN     "type" "PunishmentType" NOT NULL;
