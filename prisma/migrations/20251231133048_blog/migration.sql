/*
  Warnings:

  - You are about to drop the column `servicesId` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "servicesId";

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'published',
    "imageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "view" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "readTime" TEXT NOT NULL,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "seoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blog_documentId_key" ON "Blog"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_imageId_key" ON "Blog"("imageId");

-- CreateIndex
CREATE INDEX "Blog_isDeleted_status_createdAt_idx" ON "Blog"("isDeleted", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Blog_userId_isDeleted_idx" ON "Blog"("userId", "isDeleted");

-- CreateIndex
CREATE INDEX "Blog_view_isDeleted_idx" ON "Blog"("view", "isDeleted");

-- CreateIndex
CREATE INDEX "BlogTranslations_slug_locale_idx" ON "BlogTranslations"("slug", "locale");

-- CreateIndex
CREATE INDEX "BlogTranslations_documentId_idx" ON "BlogTranslations"("documentId");

-- CreateIndex
CREATE INDEX "BlogTranslations_seoId_idx" ON "BlogTranslations"("seoId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogTranslations_documentId_locale_key" ON "BlogTranslations"("documentId", "locale");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogTranslations" ADD CONSTRAINT "BlogTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Blog"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogTranslations" ADD CONSTRAINT "BlogTranslations_seoId_fkey" FOREIGN KEY ("seoId") REFERENCES "Seo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
