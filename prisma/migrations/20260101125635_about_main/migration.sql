/*
  Warnings:

  - You are about to drop the column `advantages` on the `AboutTranslations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AboutTranslations" DROP COLUMN "advantages",
ADD COLUMN     "experienceDescription" TEXT,
ADD COLUMN     "experienceYears" INTEGER,
ADD COLUMN     "purpose" JSONB,
ADD COLUMN     "sectors" JSONB,
ADD COLUMN     "subDescription" TEXT,
ADD COLUMN     "subTitle" TEXT,
ADD COLUMN     "teamDescription" TEXT;
