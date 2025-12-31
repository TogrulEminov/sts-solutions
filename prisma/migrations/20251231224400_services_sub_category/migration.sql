-- AlterTable
ALTER TABLE "File" ADD COLUMN     "servicesSubCategoryId" INTEGER;

-- CreateTable
CREATE TABLE "ServicesSubCategory" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'published',
    "imageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "servicesCategoryId" TEXT,

    CONSTRAINT "ServicesSubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicesSubCategoryTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "features" JSONB,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "seoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicesSubCategoryTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServicesSubCategory_documentId_key" ON "ServicesSubCategory"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "ServicesSubCategory_imageId_key" ON "ServicesSubCategory"("imageId");

-- CreateIndex
CREATE INDEX "ServicesSubCategory_isDeleted_status_idx" ON "ServicesSubCategory"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "ServicesSubCategory_userId_isDeleted_idx" ON "ServicesSubCategory"("userId", "isDeleted");

-- CreateIndex
CREATE INDEX "ServicesSubCategoryTranslations_locale_idx" ON "ServicesSubCategoryTranslations"("locale");

-- CreateIndex
CREATE INDEX "ServicesSubCategoryTranslations_documentId_idx" ON "ServicesSubCategoryTranslations"("documentId");

-- CreateIndex
CREATE INDEX "ServicesSubCategoryTranslations_slug_idx" ON "ServicesSubCategoryTranslations"("slug");

-- CreateIndex
CREATE INDEX "ServicesSubCategoryTranslations_title_idx" ON "ServicesSubCategoryTranslations"("title");

-- CreateIndex
CREATE INDEX "ServicesSubCategoryTranslations_seoId_idx" ON "ServicesSubCategoryTranslations"("seoId");

-- CreateIndex
CREATE UNIQUE INDEX "ServicesSubCategoryTranslations_documentId_locale_key" ON "ServicesSubCategoryTranslations"("documentId", "locale");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_servicesSubCategoryId_fkey" FOREIGN KEY ("servicesSubCategoryId") REFERENCES "ServicesSubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesSubCategory" ADD CONSTRAINT "ServicesSubCategory_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesSubCategory" ADD CONSTRAINT "ServicesSubCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesSubCategory" ADD CONSTRAINT "ServicesSubCategory_servicesCategoryId_fkey" FOREIGN KEY ("servicesCategoryId") REFERENCES "ServicesCategory"("documentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesSubCategoryTranslations" ADD CONSTRAINT "ServicesSubCategoryTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "ServicesSubCategory"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesSubCategoryTranslations" ADD CONSTRAINT "ServicesSubCategoryTranslations_seoId_fkey" FOREIGN KEY ("seoId") REFERENCES "Seo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
