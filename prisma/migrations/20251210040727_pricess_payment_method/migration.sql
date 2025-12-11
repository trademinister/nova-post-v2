/*
  Warnings:

  - You are about to drop the column `type` on the `FFSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FFSettings" DROP COLUMN "type",
ADD COLUMN     "processPaymentgMethod" BOOLEAN NOT NULL DEFAULT false;
