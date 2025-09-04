-- AlterTable
ALTER TABLE "public"."requirements" ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."seller" ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "created_at" DROP DEFAULT;

-- CreateTable
CREATE TABLE "public"."session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
