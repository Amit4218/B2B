-- AlterTable
ALTER TABLE "public"."requirements" ADD COLUMN     "paymentId" TEXT;

-- CreateTable
CREATE TABLE "public"."chatRoom" (
    "room_id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentId" TEXT,

    CONSTRAINT "chatRoom_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "public"."messages" (
    "message_id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("message_id")
);

-- AddForeignKey
ALTER TABLE "public"."chatRoom" ADD CONSTRAINT "chatRoom_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chatRoom" ADD CONSTRAINT "chatRoom_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."chatRoom"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;
