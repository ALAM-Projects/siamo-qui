/*
  Warnings:

  - You are about to drop the column `serviceRole` on the `User` table. All the data in the column will be lost.
  - Added the required column `mansione` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "serviceRole",
ADD COLUMN     "mansione" TEXT NOT NULL,
ALTER COLUMN "comune" DROP NOT NULL,
ALTER COLUMN "province" DROP NOT NULL;
