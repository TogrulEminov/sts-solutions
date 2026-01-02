/*
  Warnings:

  - You are about to drop the column `experienceYears` on the `AboutTranslations` table. All the data in the column will be lost.
  - You are about to drop the column `highlightWord` on the `AboutTranslations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "About" ADD COLUMN     "experienceYears" INTEGER;

-- AlterTable
ALTER TABLE "AboutTranslations" DROP COLUMN "experienceYears",
DROP COLUMN "highlightWord";
