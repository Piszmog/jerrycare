/*
  Warnings:

  - You are about to drop the column `completedSteps` on the `days` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "days" DROP COLUMN "completedSteps",
ADD COLUMN     "completed_steps" INTEGER[];
