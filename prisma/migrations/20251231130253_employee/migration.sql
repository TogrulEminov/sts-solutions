/*
  Warnings:

  - You are about to drop the column `emailResponse` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `Employee` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Employee_experience_idx";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "emailResponse",
DROP COLUMN "experience",
ADD COLUMN     "phone" TEXT;
