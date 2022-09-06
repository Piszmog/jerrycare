/*
  Warnings:

  - You are about to drop the column `auth_user_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[animalId,index]` on the table `care` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `animalId` to the `care` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authUserId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "care" ADD COLUMN     "animalId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "auth_user_id",
ADD COLUMN     "authUserId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "animals_on_users" (
    "userId" INTEGER NOT NULL,
    "animalId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "animals_on_users_pkey" PRIMARY KEY ("userId","animalId")
);

-- CreateTable
CREATE TABLE "animals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "care_steps" (
    "id" SERIAL NOT NULL,
    "careId" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "care_steps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "care_steps_careId_index_key" ON "care_steps"("careId", "index");

-- CreateIndex
CREATE UNIQUE INDEX "care_animalId_index_key" ON "care"("animalId", "index");

-- CreateIndex
CREATE INDEX "auth_user_id" ON "users"("authUserId");

-- AddForeignKey
ALTER TABLE "animals_on_users" ADD CONSTRAINT "animals_on_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animals_on_users" ADD CONSTRAINT "animals_on_users_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "care" ADD CONSTRAINT "care_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "care_steps" ADD CONSTRAINT "care_steps_careId_fkey" FOREIGN KEY ("careId") REFERENCES "care"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
