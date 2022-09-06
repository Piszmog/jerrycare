/*
  Warnings:

  - The primary key for the `animals_on_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `animalId` on the `animals_on_users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `animals_on_users` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `animals_on_users` table. All the data in the column will be lost.
  - You are about to drop the column `animalId` on the `care` table. All the data in the column will be lost.
  - You are about to drop the column `careId` on the `care_steps` table. All the data in the column will be lost.
  - You are about to drop the column `authUserId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[animal_id,index]` on the table `care` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[care_id,index]` on the table `care_steps` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[animal_id,date]` on the table `days` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `animal_id` to the `animals_on_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `animals_on_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animal_id` to the `care` table without a default value. This is not possible if the table is not empty.
  - Added the required column `care_id` to the `care_steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animal_id` to the `days` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auth_user_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "animals_on_users" DROP CONSTRAINT "animals_on_users_animalId_fkey";

-- DropForeignKey
ALTER TABLE "animals_on_users" DROP CONSTRAINT "animals_on_users_userId_fkey";

-- DropForeignKey
ALTER TABLE "care" DROP CONSTRAINT "care_animalId_fkey";

-- DropForeignKey
ALTER TABLE "care_steps" DROP CONSTRAINT "care_steps_careId_fkey";

-- DropIndex
DROP INDEX "care_animalId_index_key";

-- DropIndex
DROP INDEX "care_steps_careId_index_key";

-- DropIndex
DROP INDEX "auth_user_id";

-- AlterTable
ALTER TABLE "animals_on_users" DROP CONSTRAINT "animals_on_users_pkey",
DROP COLUMN "animalId",
DROP COLUMN "createdAt",
DROP COLUMN "userId",
ADD COLUMN     "animal_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "animals_on_users_pkey" PRIMARY KEY ("user_id", "animal_id");

-- AlterTable
ALTER TABLE "care" DROP COLUMN "animalId",
ADD COLUMN     "animal_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "care_steps" DROP COLUMN "careId",
ADD COLUMN     "care_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "days" ADD COLUMN     "animal_id" INTEGER NOT NULL,
ALTER COLUMN "date" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "authUserId",
ADD COLUMN     "auth_user_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "care_animal_id_index_key" ON "care"("animal_id", "index");

-- CreateIndex
CREATE UNIQUE INDEX "care_steps_care_id_index_key" ON "care_steps"("care_id", "index");

-- CreateIndex
CREATE UNIQUE INDEX "days_animal_id_date_key" ON "days"("animal_id", "date");

-- CreateIndex
CREATE INDEX "auth_user_id" ON "users"("auth_user_id");

-- AddForeignKey
ALTER TABLE "animals_on_users" ADD CONSTRAINT "animals_on_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animals_on_users" ADD CONSTRAINT "animals_on_users_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "care" ADD CONSTRAINT "care_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "care_steps" ADD CONSTRAINT "care_steps_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "care"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "days" ADD CONSTRAINT "days_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
