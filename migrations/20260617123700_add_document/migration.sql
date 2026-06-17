-- AlterTable
ALTER TABLE "User" ADD COLUMN "document" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_document_key" ON "User"("document");
