/*
  Warnings:

  - You are about to drop the column `type` on the `FFFilteredTags` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FFFilteredTags" DROP COLUMN "type",
ADD COLUMN     "types" TEXT[] DEFAULT ARRAY['order']::TEXT[];
