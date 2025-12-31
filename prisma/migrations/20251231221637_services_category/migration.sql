-- AlterTable
ALTER TABLE "File" ADD COLUMN     "servicesCategoryId" INTEGER;

-- CreateTable
CREATE TABLE "ServicesCategory" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'published',
    "imageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "ServicesCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicesCategoryTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "seoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicesCategoryTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServicesCategory_documentId_key" ON "ServicesCategory"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "ServicesCategory_imageId_key" ON "ServicesCategory"("imageId");

-- CreateIndex
CREATE INDEX "ServicesCategory_isDeleted_status_idx" ON "ServicesCategory"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "ServicesCategory_userId_isDeleted_idx" ON "ServicesCategory"("userId", "isDeleted");

-- CreateIndex
CREATE INDEX "ServicesCategoryTranslations_locale_idx" ON "ServicesCategoryTranslations"("locale");

-- CreateIndex
CREATE INDEX "ServicesCategoryTranslations_documentId_idx" ON "ServicesCategoryTranslations"("documentId");

-- CreateIndex
CREATE INDEX "ServicesCategoryTranslations_slug_idx" ON "ServicesCategoryTranslations"("slug");

-- CreateIndex
CREATE INDEX "ServicesCategoryTranslations_title_idx" ON "ServicesCategoryTranslations"("title");

-- CreateIndex
CREATE INDEX "ServicesCategoryTranslations_seoId_idx" ON "ServicesCategoryTranslations"("seoId");

-- CreateIndex
CREATE UNIQUE INDEX "ServicesCategoryTranslations_documentId_locale_key" ON "ServicesCategoryTranslations"("documentId", "locale");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_servicesCategoryId_fkey" FOREIGN KEY ("servicesCategoryId") REFERENCES "ServicesCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesCategory" ADD CONSTRAINT "ServicesCategory_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesCategory" ADD CONSTRAINT "ServicesCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesCategoryTranslations" ADD CONSTRAINT "ServicesCategoryTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "ServicesCategory"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesCategoryTranslations" ADD CONSTRAINT "ServicesCategoryTranslations_seoId_fkey" FOREIGN KEY ("seoId") REFERENCES "Seo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
