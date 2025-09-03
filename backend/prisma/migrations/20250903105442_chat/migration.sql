/*
  Warnings:

  - Added the required column `room_name` to the `chatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_id` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."chatRoom" ADD COLUMN     "room_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."messages" ADD COLUMN     "sender_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."chatRoom" ADD CONSTRAINT "chatRoom_room_name_fkey" FOREIGN KEY ("room_name") REFERENCES "public"."users"("user_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
