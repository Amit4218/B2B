/*
  Warnings:

  - You are about to drop the column `is_chatroom_deleted` on the `chatRoom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."chatRoom" DROP COLUMN "is_chatroom_deleted",
ADD COLUMN     "receiver_chatroom_delete" TEXT,
ADD COLUMN     "sender_chatroom_delete" TEXT;
