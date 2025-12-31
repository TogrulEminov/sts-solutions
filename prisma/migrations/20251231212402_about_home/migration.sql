/*
  Warnings:

  - You are about to drop the column `advantages` on the `AboutHomeTranslations` table. All the data in the column will be lost.
  - You are about to drop the column `chairmanMessage` on the `AboutHomeTranslations` table. All the data in the column will be lost.
  - You are about to drop the column `chairmanName` on the `AboutHomeTranslations` table. All the data in the column will be lost.
  - You are about to drop the column `chairmanRole` on the `AboutHomeTranslations` table. All the data in the column will be lost.
  - You are about to drop the column `chairmanTitle` on the `AboutHomeTranslations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AboutHomeTranslations" DROP COLUMN "advantages",
DROP COLUMN "chairmanMessage",
DROP COLUMN "chairmanName",
DROP COLUMN "chairmanRole",
DROP COLUMN "chairmanTitle",
ADD COLUMN     "sectors" JSONB,
ADD COLUMN     "subtitle" TEXT;
