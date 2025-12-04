-- CreateEnum
CREATE TYPE "Status" AS ENUM ('published', 'draft');

-- CreateEnum
CREATE TYPE "Locales" AS ENUM ('az', 'tr', 'ru', 'en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'uk', 'cs', 'sk', 'ro', 'bg', 'el', 'sv', 'no', 'da', 'fi', 'hu', 'zh', 'ja', 'ko', 'hi', 'th', 'vi', 'id', 'ms', 'ar', 'fa', 'he', 'bn', 'ur', 'sw', 'am', 'kk', 'uz', 'ky', 'tg', 'tk', 'ka', 'hy', 'be', 'sr', 'hr', 'bs', 'sl', 'mk', 'sq');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN', 'CONTENT_MANAGER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdById" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "updatedById" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "fileKey" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "publicUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "certificatesId" INTEGER,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seo" (
    "id" SERIAL NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "metaKeywords" TEXT NOT NULL,
    "metaTitle" TEXT NOT NULL,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "imageId" INTEGER,

    CONSTRAINT "Seo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" SERIAL NOT NULL,
    "socialName" TEXT NOT NULL,
    "socialLink" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'published',
    "documentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'published',
    "imageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "seoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoriesTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionContent" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'published',
    "key" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "orderNumber" INTEGER DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SectionContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionContentTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "subTitle" TEXT,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "SectionContentTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_isDeleted_idx" ON "User"("isDeleted");

-- CreateIndex
CREATE INDEX "User_email_username_idx" ON "User"("email", "username");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_createdById_idx" ON "User"("createdById");

-- CreateIndex
CREATE INDEX "User_updatedById_idx" ON "User"("updatedById");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE INDEX "VerificationToken_expires_idx" ON "VerificationToken"("expires");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "File_fileKey_key" ON "File"("fileKey");

-- CreateIndex
CREATE INDEX "File_createdAt_mimeType_idx" ON "File"("createdAt", "mimeType");

-- CreateIndex
CREATE UNIQUE INDEX "Seo_imageId_key" ON "Seo"("imageId");

-- CreateIndex
CREATE INDEX "Seo_locale_idx" ON "Seo"("locale");

-- CreateIndex
CREATE INDEX "Seo_imageId_idx" ON "Seo"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Social_socialName_key" ON "Social"("socialName");

-- CreateIndex
CREATE UNIQUE INDEX "Social_socialLink_key" ON "Social"("socialLink");

-- CreateIndex
CREATE UNIQUE INDEX "Social_documentId_key" ON "Social"("documentId");

-- CreateIndex
CREATE INDEX "Social_status_idx" ON "Social"("status");

-- CreateIndex
CREATE INDEX "Social_createdAt_idx" ON "Social"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_documentId_key" ON "Categories"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_imageId_key" ON "Categories"("imageId");

-- CreateIndex
CREATE INDEX "Categories_isDeleted_status_idx" ON "Categories"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "Categories_slug_isDeleted_idx" ON "Categories"("slug", "isDeleted");

-- CreateIndex
CREATE INDEX "Categories_userId_isDeleted_idx" ON "Categories"("userId", "isDeleted");

-- CreateIndex
CREATE INDEX "Categories_createdAt_idx" ON "Categories"("createdAt");

-- CreateIndex
CREATE INDEX "CategoriesTranslations_locale_idx" ON "CategoriesTranslations"("locale");

-- CreateIndex
CREATE INDEX "CategoriesTranslations_documentId_idx" ON "CategoriesTranslations"("documentId");

-- CreateIndex
CREATE INDEX "CategoriesTranslations_seoId_idx" ON "CategoriesTranslations"("seoId");

-- CreateIndex
CREATE INDEX "CategoriesTranslations_title_idx" ON "CategoriesTranslations"("title");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriesTranslations_documentId_locale_key" ON "CategoriesTranslations"("documentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "SectionContent_documentId_key" ON "SectionContent"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "SectionContent_key_key" ON "SectionContent"("key");

-- CreateIndex
CREATE INDEX "SectionContent_isDeleted_idx" ON "SectionContent"("isDeleted");

-- CreateIndex
CREATE INDEX "SectionContent_createdAt_idx" ON "SectionContent"("createdAt");

-- CreateIndex
CREATE INDEX "SectionContent_status_idx" ON "SectionContent"("status");

-- CreateIndex
CREATE INDEX "SectionContent_key_idx" ON "SectionContent"("key");

-- CreateIndex
CREATE INDEX "SectionContent_userId_idx" ON "SectionContent"("userId");

-- CreateIndex
CREATE INDEX "SectionContent_orderNumber_idx" ON "SectionContent"("orderNumber");

-- CreateIndex
CREATE INDEX "SectionContent_isDeleted_status_idx" ON "SectionContent"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "SectionContent_isDeleted_key_idx" ON "SectionContent"("isDeleted", "key");

-- CreateIndex
CREATE INDEX "SectionContentTranslations_title_idx" ON "SectionContentTranslations"("title");

-- CreateIndex
CREATE INDEX "SectionContentTranslations_locale_idx" ON "SectionContentTranslations"("locale");

-- CreateIndex
CREATE INDEX "SectionContentTranslations_documentId_idx" ON "SectionContentTranslations"("documentId");

-- CreateIndex
CREATE INDEX "SectionContentTranslations_slug_idx" ON "SectionContentTranslations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SectionContentTranslations_documentId_locale_key" ON "SectionContentTranslations"("documentId", "locale");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seo" ADD CONSTRAINT "Seo_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesTranslations" ADD CONSTRAINT "CategoriesTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Categories"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesTranslations" ADD CONSTRAINT "CategoriesTranslations_seoId_fkey" FOREIGN KEY ("seoId") REFERENCES "Seo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionContent" ADD CONSTRAINT "SectionContent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionContentTranslations" ADD CONSTRAINT "SectionContentTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "SectionContent"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;
