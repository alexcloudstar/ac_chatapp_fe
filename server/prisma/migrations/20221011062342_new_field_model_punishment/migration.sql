/*
  Warnings:

  - Added the required column `reason` to the `Punishment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Punishment" ADD COLUMN     "reason" TEXT NOT NULL;
