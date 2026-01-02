/*
  Warnings:

  - You are about to drop the column `about` on the `ContactInformationTranslation` table. All the data in the column will be lost.
  - You are about to drop the column `support` on the `ContactInformationTranslation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ContactInformationTranslation" DROP COLUMN "about",
DROP COLUMN "support";
