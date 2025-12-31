/*
  Warnings:

  - You are about to drop the column `eventDate` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `eventHistory` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `expertiseId` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `ProjectsTranslations` table. All the data in the column will be lost.
  - You are about to drop the `Expertise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExpertiseTranslations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServicesTranslations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expertise" DROP CONSTRAINT "Expertise_userId_fkey";

-- DropForeignKey
ALTER TABLE "ExpertiseTranslations" DROP CONSTRAINT "ExpertiseTranslations_documentId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_servicesId_fkey";

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_expertiseId_fkey";

-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_expertiseId_fkey";

-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_userId_fkey";

-- DropForeignKey
ALTER TABLE "ServicesTranslations" DROP CONSTRAINT "ServicesTranslations_documentId_fkey";

-- DropForeignKey
ALTER TABLE "ServicesTranslations" DROP CONSTRAINT "ServicesTranslations_seoId_fkey";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "eventDate",
DROP COLUMN "eventHistory",
DROP COLUMN "expertiseId";

-- AlterTable
ALTER TABLE "ProjectsTranslations" DROP COLUMN "address",
ADD COLUMN     "subTitle" TEXT;

-- DropTable
DROP TABLE "Expertise";

-- DropTable
DROP TABLE "ExpertiseTranslations";

-- DropTable
DROP TABLE "Services";

-- DropTable
DROP TABLE "ServicesTranslations";
