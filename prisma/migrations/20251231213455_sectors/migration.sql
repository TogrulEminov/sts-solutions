-- AlterTable
ALTER TABLE "File" ADD COLUMN     "solutionsId" INTEGER;

-- CreateTable
CREATE TABLE "Solutions" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'published',
    "imageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Solutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolutionsTranslation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subTitle" TEXT,
    "description" TEXT,
    "subDescription" TEXT NOT NULL,
    "problems" JSONB NOT NULL,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "seoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SolutionsTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Solutions_documentId_key" ON "Solutions"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Solutions_imageId_key" ON "Solutions"("imageId");

-- CreateIndex
CREATE INDEX "Solutions_isDeleted_status_idx" ON "Solutions"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "Solutions_userId_isDeleted_idx" ON "Solutions"("userId", "isDeleted");

-- CreateIndex
CREATE INDEX "SolutionsTranslation_locale_idx" ON "SolutionsTranslation"("locale");

-- CreateIndex
CREATE INDEX "SolutionsTranslation_documentId_idx" ON "SolutionsTranslation"("documentId");

-- CreateIndex
CREATE INDEX "SolutionsTranslation_slug_idx" ON "SolutionsTranslation"("slug");

-- CreateIndex
CREATE INDEX "SolutionsTranslation_title_idx" ON "SolutionsTranslation"("title");

-- CreateIndex
CREATE INDEX "SolutionsTranslation_seoId_idx" ON "SolutionsTranslation"("seoId");

-- CreateIndex
CREATE UNIQUE INDEX "SolutionsTranslation_documentId_locale_key" ON "SolutionsTranslation"("documentId", "locale");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_solutionsId_fkey" FOREIGN KEY ("solutionsId") REFERENCES "Solutions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solutions" ADD CONSTRAINT "Solutions_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solutions" ADD CONSTRAINT "Solutions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolutionsTranslation" ADD CONSTRAINT "SolutionsTranslation_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Solutions"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolutionsTranslation" ADD CONSTRAINT "SolutionsTranslation_seoId_fkey" FOREIGN KEY ("seoId") REFERENCES "Seo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
