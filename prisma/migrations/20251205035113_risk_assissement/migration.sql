-- AlterTable
ALTER TABLE "FFSettings" ADD COLUMN     "orderRiskAssissemnt" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "orderRiskLevels" TEXT[] DEFAULT ARRAY['HIGH']::TEXT[];
