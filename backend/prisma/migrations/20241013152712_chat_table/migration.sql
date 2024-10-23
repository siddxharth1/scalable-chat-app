/*
  Warnings:

  - You are about to drop the column `user_id` on the `GroupUsers` table. All the data in the column will be lost.
  - Added the required column `name` to the `GroupUsers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GroupUsers" DROP CONSTRAINT "GroupUsers_user_id_fkey";

-- DropIndex
DROP INDEX "GroupUsers_group_id_user_id_key";

-- AlterTable
ALTER TABLE "GroupUsers" DROP COLUMN "user_id",
ADD COLUMN     "name" TEXT NOT NULL;
