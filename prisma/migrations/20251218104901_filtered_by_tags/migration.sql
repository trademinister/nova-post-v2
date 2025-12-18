-- AlterTable
ALTER TABLE "FFSettings" ADD COLUMN     "filteredByTagsIsActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "filteredTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "filteredTagsTypes" TEXT[] DEFAULT ARRAY['order']::TEXT[];
