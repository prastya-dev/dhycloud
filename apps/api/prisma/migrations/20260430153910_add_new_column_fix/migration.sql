/*
  Warnings:

  - A unique constraint covering the columns `[shareId]` on the table `Board` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTemplate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shareId" TEXT,
ADD COLUMN     "templateId" TEXT,
ADD COLUMN     "templateToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Board_shareId_key" ON "Board"("shareId");
