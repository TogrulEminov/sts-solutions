/*
  Warnings:

  - Added the required column `isMain` to the `ServicesSubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServicesSubCategory" ADD COLUMN     "isMain" BOOLEAN NOT NULL;
