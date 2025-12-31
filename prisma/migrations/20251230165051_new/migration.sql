/*
  Warnings:

  - You are about to drop the column `certificatesId` on the `File` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BranchStatus" AS ENUM ('ACTIVE', 'PLANNED');

-- AlterTable
ALTER TABLE "CategoriesTranslations" ADD COLUMN     "features" JSONB;

-- AlterTable
ALTER TABLE "File" DROP COLUMN "certificatesId",
ADD COLUMN     "aboutId" INTEGER,
ADD COLUMN     "projectsId" INTEGER,
ADD COLUMN     "servicesId" INTEGER;

-- AlterTable
ALTER TABLE "SectionContentTranslations" ADD COLUMN     "highlightWord" TEXT;

-- CreateTable
CREATE TABLE "Faq" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'published',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "orderNumber" INTEGER DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "FaqTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slider" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'published',
    "imageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "link" TEXT,
    "orderNumber" SERIAL,

    CONSTRAINT "Slider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SliderTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "highlightNo" TEXT,
    "unitText" TEXT,
    "slug" TEXT NOT NULL,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SliderTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StrategicGoals" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'published',
    "imageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "StrategicGoals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StrategicGoalsTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "seoId" INTEGER,

    CONSTRAINT "StrategicGoalsTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutHome" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'published',
    "imageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "AboutHome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutHomeTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "statistics" JSONB,
    "advantages" JSONB,
    "chairmanTitle" TEXT,
    "chairmanMessage" TEXT,
    "chairmanName" TEXT,
    "chairmanRole" TEXT,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutHomeTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "About" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'published',
    "imageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "highlightWord" TEXT,
    "description" TEXT NOT NULL,
    "statistics" JSONB,
    "advantages" JSONB,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonials" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'published',
    "imageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestimonialsTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestimonialsTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInformation" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "phoneSecond" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "adressLink" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ContactInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInformationTranslation" (
    "id" SERIAL NOT NULL,
    "adress" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "hightlightWord" TEXT,
    "workHours" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "tag" TEXT,
    "support" TEXT NOT NULL,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactInformationTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Youtube" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "url" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'published',
    "imageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "duration" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Youtube_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YoutubeTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YoutubeTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partners" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'published',
    "imageId" INTEGER,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnersTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnersTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'published',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "orderNumber" INTEGER DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PositionTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PositionTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'published',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "imageId" INTEGER,
    "experience" INTEGER,
    "orderNumber" INTEGER DEFAULT 0,
    "email" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "emailResponse" BOOLEAN DEFAULT false,
    "positionId" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "EmployeeTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expertise" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'published',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "orderNumber" INTEGER DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Expertise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpertiseTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpertiseTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'published',
    "imageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "expertiseId" TEXT,
    "branchesId" TEXT,
    "eventDate" TEXT NOT NULL,
    "eventHistory" BOOLEAN DEFAULT false,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectsTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "highlight" TEXT,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "seoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectsTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'published',
    "imageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "expertiseId" TEXT,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicesTranslations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "ourStrengths" JSONB,
    "highlight" TEXT,
    "steps" JSONB,
    "offerings" JSONB,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "seoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicesTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "isoCode" TEXT NOT NULL,
    "status" "BranchStatus" NOT NULL DEFAULT 'ACTIVE',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BranchTranslation" (
    "id" SERIAL NOT NULL,
    "countryName" TEXT NOT NULL,
    "locale" "Locales" NOT NULL DEFAULT 'az',
    "documentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BranchTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Faq_documentId_key" ON "Faq"("documentId");

-- CreateIndex
CREATE INDEX "Faq_isDeleted_idx" ON "Faq"("isDeleted");

-- CreateIndex
CREATE INDEX "Faq_createdAt_idx" ON "Faq"("createdAt");

-- CreateIndex
CREATE INDEX "Faq_status_idx" ON "Faq"("status");

-- CreateIndex
CREATE INDEX "Faq_userId_idx" ON "Faq"("userId");

-- CreateIndex
CREATE INDEX "Faq_orderNumber_idx" ON "Faq"("orderNumber");

-- CreateIndex
CREATE INDEX "Faq_isDeleted_status_idx" ON "Faq"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "Faq_isDeleted_createdAt_idx" ON "Faq"("isDeleted", "createdAt");

-- CreateIndex
CREATE INDEX "FaqTranslations_title_idx" ON "FaqTranslations"("title");

-- CreateIndex
CREATE INDEX "FaqTranslations_locale_idx" ON "FaqTranslations"("locale");

-- CreateIndex
CREATE INDEX "FaqTranslations_documentId_idx" ON "FaqTranslations"("documentId");

-- CreateIndex
CREATE INDEX "FaqTranslations_slug_idx" ON "FaqTranslations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "FaqTranslations_documentId_locale_key" ON "FaqTranslations"("documentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Slider_documentId_key" ON "Slider"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Slider_imageId_key" ON "Slider"("imageId");

-- CreateIndex
CREATE INDEX "Slider_isDeleted_idx" ON "Slider"("isDeleted");

-- CreateIndex
CREATE INDEX "Slider_status_idx" ON "Slider"("status");

-- CreateIndex
CREATE INDEX "Slider_createdAt_idx" ON "Slider"("createdAt");

-- CreateIndex
CREATE INDEX "Slider_userId_idx" ON "Slider"("userId");

-- CreateIndex
CREATE INDEX "Slider_isDeleted_status_idx" ON "Slider"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "SliderTranslations_locale_idx" ON "SliderTranslations"("locale");

-- CreateIndex
CREATE INDEX "SliderTranslations_documentId_idx" ON "SliderTranslations"("documentId");

-- CreateIndex
CREATE INDEX "SliderTranslations_slug_idx" ON "SliderTranslations"("slug");

-- CreateIndex
CREATE INDEX "SliderTranslations_title_idx" ON "SliderTranslations"("title");

-- CreateIndex
CREATE UNIQUE INDEX "SliderTranslations_documentId_locale_key" ON "SliderTranslations"("documentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "StrategicGoals_documentId_key" ON "StrategicGoals"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "StrategicGoals_slug_key" ON "StrategicGoals"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "StrategicGoals_imageId_key" ON "StrategicGoals"("imageId");

-- CreateIndex
CREATE INDEX "StrategicGoals_isDeleted_status_idx" ON "StrategicGoals"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "StrategicGoals_slug_isDeleted_idx" ON "StrategicGoals"("slug", "isDeleted");

-- CreateIndex
CREATE INDEX "StrategicGoals_userId_isDeleted_idx" ON "StrategicGoals"("userId", "isDeleted");

-- CreateIndex
CREATE INDEX "StrategicGoals_createdAt_idx" ON "StrategicGoals"("createdAt");

-- CreateIndex
CREATE INDEX "StrategicGoalsTranslations_locale_idx" ON "StrategicGoalsTranslations"("locale");

-- CreateIndex
CREATE INDEX "StrategicGoalsTranslations_documentId_idx" ON "StrategicGoalsTranslations"("documentId");

-- CreateIndex
CREATE INDEX "StrategicGoalsTranslations_title_idx" ON "StrategicGoalsTranslations"("title");

-- CreateIndex
CREATE UNIQUE INDEX "StrategicGoalsTranslations_documentId_locale_key" ON "StrategicGoalsTranslations"("documentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "AboutHome_documentId_key" ON "AboutHome"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "AboutHome_imageId_key" ON "AboutHome"("imageId");

-- CreateIndex
CREATE INDEX "AboutHome_isDeleted_idx" ON "AboutHome"("isDeleted");

-- CreateIndex
CREATE INDEX "AboutHome_status_idx" ON "AboutHome"("status");

-- CreateIndex
CREATE INDEX "AboutHome_createdAt_idx" ON "AboutHome"("createdAt");

-- CreateIndex
CREATE INDEX "AboutHome_userId_idx" ON "AboutHome"("userId");

-- CreateIndex
CREATE INDEX "AboutHome_isDeleted_status_idx" ON "AboutHome"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "AboutHomeTranslations_locale_idx" ON "AboutHomeTranslations"("locale");

-- CreateIndex
CREATE INDEX "AboutHomeTranslations_documentId_idx" ON "AboutHomeTranslations"("documentId");

-- CreateIndex
CREATE INDEX "AboutHomeTranslations_slug_idx" ON "AboutHomeTranslations"("slug");

-- CreateIndex
CREATE INDEX "AboutHomeTranslations_title_idx" ON "AboutHomeTranslations"("title");

-- CreateIndex
CREATE UNIQUE INDEX "AboutHomeTranslations_documentId_locale_key" ON "AboutHomeTranslations"("documentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "About_documentId_key" ON "About"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "About_imageId_key" ON "About"("imageId");

-- CreateIndex
CREATE INDEX "About_isDeleted_idx" ON "About"("isDeleted");

-- CreateIndex
CREATE INDEX "About_status_idx" ON "About"("status");

-- CreateIndex
CREATE INDEX "About_createdAt_idx" ON "About"("createdAt");

-- CreateIndex
CREATE INDEX "About_userId_idx" ON "About"("userId");

-- CreateIndex
CREATE INDEX "About_isDeleted_status_idx" ON "About"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "AboutTranslations_locale_idx" ON "AboutTranslations"("locale");

-- CreateIndex
CREATE INDEX "AboutTranslations_documentId_idx" ON "AboutTranslations"("documentId");

-- CreateIndex
CREATE INDEX "AboutTranslations_slug_idx" ON "AboutTranslations"("slug");

-- CreateIndex
CREATE INDEX "AboutTranslations_title_idx" ON "AboutTranslations"("title");

-- CreateIndex
CREATE UNIQUE INDEX "AboutTranslations_documentId_locale_key" ON "AboutTranslations"("documentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Testimonials_documentId_key" ON "Testimonials"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Testimonials_imageId_key" ON "Testimonials"("imageId");

-- CreateIndex
CREATE INDEX "Testimonials_isDeleted_idx" ON "Testimonials"("isDeleted");

-- CreateIndex
CREATE INDEX "Testimonials_status_idx" ON "Testimonials"("status");

-- CreateIndex
CREATE INDEX "Testimonials_createdAt_idx" ON "Testimonials"("createdAt");

-- CreateIndex
CREATE INDEX "Testimonials_userId_idx" ON "Testimonials"("userId");

-- CreateIndex
CREATE INDEX "Testimonials_isDeleted_status_idx" ON "Testimonials"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "Testimonials_isDeleted_createdAt_idx" ON "Testimonials"("isDeleted", "createdAt");

-- CreateIndex
CREATE INDEX "TestimonialsTranslations_locale_idx" ON "TestimonialsTranslations"("locale");

-- CreateIndex
CREATE INDEX "TestimonialsTranslations_documentId_idx" ON "TestimonialsTranslations"("documentId");

-- CreateIndex
CREATE INDEX "TestimonialsTranslations_slug_idx" ON "TestimonialsTranslations"("slug");

-- CreateIndex
CREATE INDEX "TestimonialsTranslations_title_idx" ON "TestimonialsTranslations"("title");

-- CreateIndex
CREATE UNIQUE INDEX "TestimonialsTranslations_documentId_locale_key" ON "TestimonialsTranslations"("documentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "ContactInformation_documentId_key" ON "ContactInformation"("documentId");

-- CreateIndex
CREATE INDEX "ContactInformation_isDeleted_idx" ON "ContactInformation"("isDeleted");

-- CreateIndex
CREATE INDEX "ContactInformation_createdAt_idx" ON "ContactInformation"("createdAt");

-- CreateIndex
CREATE INDEX "ContactInformation_phone_idx" ON "ContactInformation"("phone");

-- CreateIndex
CREATE INDEX "ContactInformation_email_idx" ON "ContactInformation"("email");

-- CreateIndex
CREATE INDEX "ContactInformation_userId_idx" ON "ContactInformation"("userId");

-- CreateIndex
CREATE INDEX "ContactInformationTranslation_locale_idx" ON "ContactInformationTranslation"("locale");

-- CreateIndex
CREATE INDEX "ContactInformationTranslation_title_idx" ON "ContactInformationTranslation"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ContactInformationTranslation_documentId_locale_key" ON "ContactInformationTranslation"("documentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Youtube_documentId_key" ON "Youtube"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Youtube_imageId_key" ON "Youtube"("imageId");

-- CreateIndex
CREATE INDEX "Youtube_isDeleted_idx" ON "Youtube"("isDeleted");

-- CreateIndex
CREATE INDEX "Youtube_status_idx" ON "Youtube"("status");

-- CreateIndex
CREATE INDEX "Youtube_createdAt_idx" ON "Youtube"("createdAt");

-- CreateIndex
CREATE INDEX "Youtube_userId_idx" ON "Youtube"("userId");

-- CreateIndex
CREATE INDEX "Youtube_isDeleted_status_idx" ON "Youtube"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "Youtube_isDeleted_createdAt_idx" ON "Youtube"("isDeleted", "createdAt");

-- CreateIndex
CREATE INDEX "YoutubeTranslations_locale_idx" ON "YoutubeTranslations"("locale");

-- CreateIndex
CREATE INDEX "YoutubeTranslations_documentId_idx" ON "YoutubeTranslations"("documentId");

-- CreateIndex
CREATE INDEX "YoutubeTranslations_slug_idx" ON "YoutubeTranslations"("slug");

-- CreateIndex
CREATE INDEX "YoutubeTranslations_title_idx" ON "YoutubeTranslations"("title");

-- CreateIndex
CREATE UNIQUE INDEX "YoutubeTranslations_documentId_locale_key" ON "YoutubeTranslations"("documentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Partners_documentId_key" ON "Partners"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Partners_imageId_key" ON "Partners"("imageId");

-- CreateIndex
CREATE INDEX "Partners_isDeleted_idx" ON "Partners"("isDeleted");

-- CreateIndex
CREATE INDEX "Partners_createdAt_idx" ON "Partners"("createdAt");

-- CreateIndex
CREATE INDEX "Partners_status_idx" ON "Partners"("status");

-- CreateIndex
CREATE INDEX "Partners_userId_idx" ON "Partners"("userId");

-- CreateIndex
CREATE INDEX "Partners_isDeleted_status_idx" ON "Partners"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "Partners_isDeleted_createdAt_idx" ON "Partners"("isDeleted", "createdAt");

-- CreateIndex
CREATE INDEX "PartnersTranslations_title_idx" ON "PartnersTranslations"("title");

-- CreateIndex
CREATE INDEX "PartnersTranslations_locale_idx" ON "PartnersTranslations"("locale");

-- CreateIndex
CREATE INDEX "PartnersTranslations_documentId_idx" ON "PartnersTranslations"("documentId");

-- CreateIndex
CREATE INDEX "PartnersTranslations_slug_idx" ON "PartnersTranslations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PartnersTranslations_documentId_locale_key" ON "PartnersTranslations"("documentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Position_documentId_key" ON "Position"("documentId");

-- CreateIndex
CREATE INDEX "Position_isDeleted_idx" ON "Position"("isDeleted");

-- CreateIndex
CREATE INDEX "Position_createdAt_idx" ON "Position"("createdAt");

-- CreateIndex
CREATE INDEX "Position_status_idx" ON "Position"("status");

-- CreateIndex
CREATE INDEX "Position_userId_idx" ON "Position"("userId");

-- CreateIndex
CREATE INDEX "Position_orderNumber_idx" ON "Position"("orderNumber");

-- CreateIndex
CREATE INDEX "Position_isDeleted_status_idx" ON "Position"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "PositionTranslations_title_idx" ON "PositionTranslations"("title");

-- CreateIndex
CREATE INDEX "PositionTranslations_locale_idx" ON "PositionTranslations"("locale");

-- CreateIndex
CREATE INDEX "PositionTranslations_documentId_idx" ON "PositionTranslations"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "PositionTranslations_documentId_locale_key" ON "PositionTranslations"("documentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_documentId_key" ON "Employee"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_imageId_key" ON "Employee"("imageId");

-- CreateIndex
CREATE INDEX "Employee_isDeleted_idx" ON "Employee"("isDeleted");

-- CreateIndex
CREATE INDEX "Employee_createdAt_idx" ON "Employee"("createdAt");

-- CreateIndex
CREATE INDEX "Employee_status_idx" ON "Employee"("status");

-- CreateIndex
CREATE INDEX "Employee_userId_idx" ON "Employee"("userId");

-- CreateIndex
CREATE INDEX "Employee_orderNumber_idx" ON "Employee"("orderNumber");

-- CreateIndex
CREATE INDEX "Employee_email_idx" ON "Employee"("email");

-- CreateIndex
CREATE INDEX "Employee_experience_idx" ON "Employee"("experience");

-- CreateIndex
CREATE INDEX "Employee_isDeleted_status_idx" ON "Employee"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "EmployeeTranslations_title_idx" ON "EmployeeTranslations"("title");

-- CreateIndex
CREATE INDEX "EmployeeTranslations_locale_idx" ON "EmployeeTranslations"("locale");

-- CreateIndex
CREATE INDEX "EmployeeTranslations_documentId_idx" ON "EmployeeTranslations"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeTranslations_documentId_locale_key" ON "EmployeeTranslations"("documentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Expertise_documentId_key" ON "Expertise"("documentId");

-- CreateIndex
CREATE INDEX "Expertise_isDeleted_idx" ON "Expertise"("isDeleted");

-- CreateIndex
CREATE INDEX "Expertise_createdAt_idx" ON "Expertise"("createdAt");

-- CreateIndex
CREATE INDEX "Expertise_status_idx" ON "Expertise"("status");

-- CreateIndex
CREATE INDEX "Expertise_userId_idx" ON "Expertise"("userId");

-- CreateIndex
CREATE INDEX "Expertise_orderNumber_idx" ON "Expertise"("orderNumber");

-- CreateIndex
CREATE INDEX "Expertise_isDeleted_status_idx" ON "Expertise"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "ExpertiseTranslations_title_idx" ON "ExpertiseTranslations"("title");

-- CreateIndex
CREATE INDEX "ExpertiseTranslations_locale_idx" ON "ExpertiseTranslations"("locale");

-- CreateIndex
CREATE INDEX "ExpertiseTranslations_documentId_idx" ON "ExpertiseTranslations"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "ExpertiseTranslations_documentId_locale_key" ON "ExpertiseTranslations"("documentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_documentId_key" ON "Projects"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_imageId_key" ON "Projects"("imageId");

-- CreateIndex
CREATE INDEX "Projects_isDeleted_status_idx" ON "Projects"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "Projects_userId_isDeleted_idx" ON "Projects"("userId", "isDeleted");

-- CreateIndex
CREATE INDEX "ProjectsTranslations_locale_idx" ON "ProjectsTranslations"("locale");

-- CreateIndex
CREATE INDEX "ProjectsTranslations_documentId_idx" ON "ProjectsTranslations"("documentId");

-- CreateIndex
CREATE INDEX "ProjectsTranslations_slug_idx" ON "ProjectsTranslations"("slug");

-- CreateIndex
CREATE INDEX "ProjectsTranslations_title_idx" ON "ProjectsTranslations"("title");

-- CreateIndex
CREATE INDEX "ProjectsTranslations_seoId_idx" ON "ProjectsTranslations"("seoId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectsTranslations_documentId_locale_key" ON "ProjectsTranslations"("documentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Services_documentId_key" ON "Services"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Services_imageId_key" ON "Services"("imageId");

-- CreateIndex
CREATE INDEX "Services_isDeleted_status_idx" ON "Services"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "Services_userId_isDeleted_idx" ON "Services"("userId", "isDeleted");

-- CreateIndex
CREATE INDEX "ServicesTranslations_locale_idx" ON "ServicesTranslations"("locale");

-- CreateIndex
CREATE INDEX "ServicesTranslations_documentId_idx" ON "ServicesTranslations"("documentId");

-- CreateIndex
CREATE INDEX "ServicesTranslations_slug_idx" ON "ServicesTranslations"("slug");

-- CreateIndex
CREATE INDEX "ServicesTranslations_title_idx" ON "ServicesTranslations"("title");

-- CreateIndex
CREATE INDEX "ServicesTranslations_seoId_idx" ON "ServicesTranslations"("seoId");

-- CreateIndex
CREATE UNIQUE INDEX "ServicesTranslations_documentId_locale_key" ON "ServicesTranslations"("documentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_documentId_key" ON "Branch"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_isoCode_key" ON "Branch"("isoCode");

-- CreateIndex
CREATE INDEX "Branch_isoCode_idx" ON "Branch"("isoCode");

-- CreateIndex
CREATE INDEX "Branch_status_idx" ON "Branch"("status");

-- CreateIndex
CREATE INDEX "Branch_isDeleted_idx" ON "Branch"("isDeleted");

-- CreateIndex
CREATE INDEX "Branch_createdAt_idx" ON "Branch"("createdAt");

-- CreateIndex
CREATE INDEX "Branch_userId_idx" ON "Branch"("userId");

-- CreateIndex
CREATE INDEX "Branch_isDeleted_status_idx" ON "Branch"("isDeleted", "status");

-- CreateIndex
CREATE INDEX "BranchTranslation_locale_idx" ON "BranchTranslation"("locale");

-- CreateIndex
CREATE INDEX "BranchTranslation_documentId_idx" ON "BranchTranslation"("documentId");

-- CreateIndex
CREATE INDEX "BranchTranslation_countryName_idx" ON "BranchTranslation"("countryName");

-- CreateIndex
CREATE UNIQUE INDEX "BranchTranslation_documentId_locale_key" ON "BranchTranslation"("documentId", "locale");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "AboutHome"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_projectsId_fkey" FOREIGN KEY ("projectsId") REFERENCES "Projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "Services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faq" ADD CONSTRAINT "Faq_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaqTranslations" ADD CONSTRAINT "FaqTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Faq"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slider" ADD CONSTRAINT "Slider_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slider" ADD CONSTRAINT "Slider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SliderTranslations" ADD CONSTRAINT "SliderTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Slider"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrategicGoals" ADD CONSTRAINT "StrategicGoals_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrategicGoals" ADD CONSTRAINT "StrategicGoals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrategicGoalsTranslations" ADD CONSTRAINT "StrategicGoalsTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "StrategicGoals"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrategicGoalsTranslations" ADD CONSTRAINT "StrategicGoalsTranslations_seoId_fkey" FOREIGN KEY ("seoId") REFERENCES "Seo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AboutHome" ADD CONSTRAINT "AboutHome_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AboutHome" ADD CONSTRAINT "AboutHome_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AboutHomeTranslations" ADD CONSTRAINT "AboutHomeTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "AboutHome"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "About" ADD CONSTRAINT "About_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "About" ADD CONSTRAINT "About_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AboutTranslations" ADD CONSTRAINT "AboutTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "About"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonials" ADD CONSTRAINT "Testimonials_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonials" ADD CONSTRAINT "Testimonials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestimonialsTranslations" ADD CONSTRAINT "TestimonialsTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Testimonials"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactInformation" ADD CONSTRAINT "ContactInformation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactInformationTranslation" ADD CONSTRAINT "ContactInformationTranslation_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "ContactInformation"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Youtube" ADD CONSTRAINT "Youtube_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Youtube" ADD CONSTRAINT "Youtube_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YoutubeTranslations" ADD CONSTRAINT "YoutubeTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Youtube"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partners" ADD CONSTRAINT "Partners_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partners" ADD CONSTRAINT "Partners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnersTranslations" ADD CONSTRAINT "PartnersTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Partners"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PositionTranslations" ADD CONSTRAINT "PositionTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Position"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("documentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeTranslations" ADD CONSTRAINT "EmployeeTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Employee"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expertise" ADD CONSTRAINT "Expertise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpertiseTranslations" ADD CONSTRAINT "ExpertiseTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Expertise"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_expertiseId_fkey" FOREIGN KEY ("expertiseId") REFERENCES "Expertise"("documentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_branchesId_fkey" FOREIGN KEY ("branchesId") REFERENCES "Branch"("documentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectsTranslations" ADD CONSTRAINT "ProjectsTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Projects"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectsTranslations" ADD CONSTRAINT "ProjectsTranslations_seoId_fkey" FOREIGN KEY ("seoId") REFERENCES "Seo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_expertiseId_fkey" FOREIGN KEY ("expertiseId") REFERENCES "Expertise"("documentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesTranslations" ADD CONSTRAINT "ServicesTranslations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Services"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesTranslations" ADD CONSTRAINT "ServicesTranslations_seoId_fkey" FOREIGN KEY ("seoId") REFERENCES "Seo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BranchTranslation" ADD CONSTRAINT "BranchTranslation_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Branch"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;
