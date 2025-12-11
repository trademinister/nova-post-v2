-- AlterTable
ALTER TABLE "FFCollections" ADD COLUMN     "remainsIsActive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "FFLocations" ADD COLUMN     "remainsIsActive" BOOLEAN NOT NULL DEFAULT false;
