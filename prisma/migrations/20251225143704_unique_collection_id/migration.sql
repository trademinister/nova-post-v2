/*
  Warnings:

  - A unique constraint covering the columns `[collectionId]` on the table `FFCollections` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locationId]` on the table `FFLocations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FFCollections_collectionId_key" ON "FFCollections"("collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "FFLocations_locationId_key" ON "FFLocations"("locationId");
