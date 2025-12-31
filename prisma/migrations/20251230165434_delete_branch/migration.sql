/*
  Warnings:

  - You are about to drop the column `branchesId` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the `Branch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BranchTranslation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_userId_fkey";

-- DropForeignKey
ALTER TABLE "BranchTranslation" DROP CONSTRAINT "BranchTranslation_documentId_fkey";

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_branchesId_fkey";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "branchesId";

-- DropTable
DROP TABLE "Branch";

-- DropTable
DROP TABLE "BranchTranslation";

-- DropEnum
DROP TYPE "BranchStatus";
