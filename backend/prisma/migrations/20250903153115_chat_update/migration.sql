-- DropForeignKey
ALTER TABLE "public"."chatRoom" DROP CONSTRAINT "chatRoom_room_name_fkey";

-- AlterTable
ALTER TABLE "public"."chatRoom" ALTER COLUMN "room_name" DROP NOT NULL;
