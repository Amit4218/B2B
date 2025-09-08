-- AlterTable
ALTER TABLE "public"."chatRoom" ADD COLUMN     "blocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_chatroom_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."requirements" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;
