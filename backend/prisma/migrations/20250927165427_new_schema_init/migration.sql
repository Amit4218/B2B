-- CreateEnum
CREATE TYPE "public"."role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "public"."users" (
    "user_id" TEXT NOT NULL,
    "role" "public"."role" NOT NULL DEFAULT 'user',
    "avatar" TEXT NOT NULL DEFAULT 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png',
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "google_id" TEXT,
    "city" TEXT,
    "state" TEXT,
    "description" TEXT,
    "gst_number" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."requirements" (
    "requirement_id" TEXT NOT NULL,
    "buyer_id" TEXT NOT NULL,
    "product_title" TEXT NOT NULL,
    "categories" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "reference_image_url" TEXT[],
    "description" TEXT,
    "quantity_needed" TEXT,
    "price_range" TEXT,
    "city" TEXT,
    "state" TEXT,
    "delivery_location" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "paymentId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "requirements_pkey" PRIMARY KEY ("requirement_id")
);

-- CreateTable
CREATE TABLE "public"."chatRoom" (
    "room_id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentId" TEXT,
    "room_name" TEXT,
    "blocked" TEXT,
    "sender_name" TEXT,
    "receiver_name" TEXT,
    "sender_profile_image" TEXT,
    "receiver_profile_image" TEXT,
    "sender_chatroom_delete" TEXT,
    "receiver_chatroom_delete" TEXT,

    CONSTRAINT "chatRoom_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "public"."messages" (
    "message_id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "public"."session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."otp" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "public"."users"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "public"."users"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "chatRoom_sender_id_receiver_id_key" ON "public"."chatRoom"("sender_id", "receiver_id");

-- CreateIndex
CREATE UNIQUE INDEX "otp_email_key" ON "public"."otp"("email");

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
