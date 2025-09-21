/*
  Warnings:

  - The `reference_image_url` column on the `requirements` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."chatRoom" ADD COLUMN     "receiver_profile_image" TEXT,
ADD COLUMN     "sender_profile_image" TEXT;

-- AlterTable
ALTER TABLE "public"."requirements" DROP COLUMN "reference_image_url",
ADD COLUMN     "reference_image_url" TEXT[];
