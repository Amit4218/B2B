-- CreateEnum
CREATE TYPE "public"."role" AS ENUM ('BUYER', 'SELLER', 'ADMIN');

-- CreateTable
CREATE TABLE "public"."users" (
    "user_id" TEXT NOT NULL,
    "role" "public"."role" NOT NULL,
    "user_name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "google_id" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."seller" (
    "seller_id" TEXT NOT NULL,
    "description" TEXT,
    "gst_number" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "public"."requirements" (
    "requirement_id" TEXT NOT NULL,
    "buyer_id" TEXT NOT NULL,
    "product_title" TEXT NOT NULL,
    "categories" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "reference_image_url" TEXT,
    "description" TEXT,
    "quantity_needed" TEXT,
    "price_range" TEXT,
    "city" TEXT,
    "state" TEXT,
    "delivery_location" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "requirements_pkey" PRIMARY KEY ("requirement_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "public"."users"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "public"."users"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "seller_seller_id_key" ON "public"."seller"("seller_id");

-- AddForeignKey
ALTER TABLE "public"."seller" ADD CONSTRAINT "seller_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."requirements" ADD CONSTRAINT "requirements_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
