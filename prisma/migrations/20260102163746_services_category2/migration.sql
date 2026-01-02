/*
  Warnings:

  - You are about to drop the column `isMain` on the `ServicesSubCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ServicesCategory" ADD COLUMN     "isMain" BOOLEAN;

-- AlterTable
ALTER TABLE "ServicesSubCategory" DROP COLUMN "isMain";
