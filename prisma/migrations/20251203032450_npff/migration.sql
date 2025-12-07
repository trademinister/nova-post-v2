/*
  Warnings:

  - You are about to drop the column `object` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "object";

-- CreateTable
CREATE TABLE "FFSettings" (
    "id" TEXT NOT NULL,
    "npLogin" TEXT,
    "npPassword" TEXT,
    "npOrganization" TEXT,
    "additionalOrganizationKey" TEXT,
    "isEnabled" BOOLEAN NOT NULL DEFAULT false,
    "type" TEXT NOT NULL DEFAULT 'default',
    "fulfillBy" TEXT NOT NULL DEFAULT 'locations',
    "sessionId" TEXT,

    CONSTRAINT "FFSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FFLocations" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "destinationWarehouse" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "ffSettingsId" TEXT,

    CONSTRAINT "FFLocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FFCollections" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "destinationWarehouse" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "ffSettingsId" TEXT,

    CONSTRAINT "FFCollections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FFPaymentMethods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "statuses" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ffSettingsId" TEXT,

    CONSTRAINT "FFPaymentMethods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FFSettings_sessionId_key" ON "FFSettings"("sessionId");

-- AddForeignKey
ALTER TABLE "FFSettings" ADD CONSTRAINT "FFSettings_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FFLocations" ADD CONSTRAINT "FFLocations_ffSettingsId_fkey" FOREIGN KEY ("ffSettingsId") REFERENCES "FFSettings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FFCollections" ADD CONSTRAINT "FFCollections_ffSettingsId_fkey" FOREIGN KEY ("ffSettingsId") REFERENCES "FFSettings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FFPaymentMethods" ADD CONSTRAINT "FFPaymentMethods_ffSettingsId_fkey" FOREIGN KEY ("ffSettingsId") REFERENCES "FFSettings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
