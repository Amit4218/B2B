/*
  Warnings:

  - The values [BUYER,SELLER,ADMIN] on the enum `role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."role_new" AS ENUM ('buyer', 'seller', 'admin');
ALTER TABLE "public"."users" ALTER COLUMN "role" TYPE "public"."role_new" USING ("role"::text::"public"."role_new");
ALTER TYPE "public"."role" RENAME TO "role_old";
ALTER TYPE "public"."role_new" RENAME TO "role";
DROP TYPE "public"."role_old";
COMMIT;
