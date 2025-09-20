/*
  Warnings:

  - A unique constraint covering the columns `[sender_id,receiver_id]` on the table `chatRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "chatRoom_sender_id_receiver_id_key" ON "public"."chatRoom"("sender_id", "receiver_id");
