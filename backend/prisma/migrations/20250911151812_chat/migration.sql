-- DropForeignKey
ALTER TABLE "public"."chatRoom" DROP CONSTRAINT "chatRoom_receiver_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."chatRoom" DROP CONSTRAINT "chatRoom_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_room_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."requirements" DROP CONSTRAINT "requirements_buyer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."seller" DROP CONSTRAINT "seller_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."session" DROP CONSTRAINT "session_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."chatRoom" ADD COLUMN     "receiver_name" TEXT,
ADD COLUMN     "sender_name" TEXT;

-- AddForeignKey
ALTER TABLE "public"."seller" ADD CONSTRAINT "seller_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."requirements" ADD CONSTRAINT "requirements_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chatRoom" ADD CONSTRAINT "chatRoom_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chatRoom" ADD CONSTRAINT "chatRoom_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."chatRoom"("room_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
