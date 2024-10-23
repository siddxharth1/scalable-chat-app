/*
  Warnings:

  - You are about to drop the column `name` on the `GroupUsers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[group_id,user_id]` on the table `GroupUsers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `GroupUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupUsers" DROP COLUMN "name",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GroupUsers_group_id_user_id_key" ON "GroupUsers"("group_id", "user_id");

-- AddForeignKey
ALTER TABLE "GroupUsers" ADD CONSTRAINT "GroupUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
