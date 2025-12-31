/*
  Warnings:

  - You are about to drop the column `highlightNo` on the `SliderTranslations` table. All the data in the column will be lost.
  - You are about to drop the column `unitText` on the `SliderTranslations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Slider" ALTER COLUMN "orderNumber" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SliderTranslations" DROP COLUMN "highlightNo",
DROP COLUMN "unitText";
