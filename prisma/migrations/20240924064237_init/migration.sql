-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" TEXT,
ALTER COLUMN "profileUrl" DROP NOT NULL,
ALTER COLUMN "profileUrl" DROP DEFAULT;
