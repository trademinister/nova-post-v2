/*
  Warnings:

  - You are about to drop the column `filteredTags` on the `FFSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FFSettings" DROP COLUMN "filteredTags";

-- CreateTable
CREATE TABLE "FFFilteredTags" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'order',
    "ffSettingsId" TEXT,

    CONSTRAINT "FFFilteredTags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FFFilteredTags" ADD CONSTRAINT "FFFilteredTags_ffSettingsId_fkey" FOREIGN KEY ("ffSettingsId") REFERENCES "FFSettings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
