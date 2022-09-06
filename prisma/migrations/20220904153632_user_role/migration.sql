/*
  Warnings:

  - Added the required column `updated_at` to the `days` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "animals_on_users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "days" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
