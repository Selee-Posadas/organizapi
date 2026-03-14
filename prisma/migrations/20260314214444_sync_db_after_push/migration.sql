/*
  Warnings:

  - You are about to drop the column `contactInfo` on the `Contact` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[enrollmentId,dayOfWeek,startTime]` on the table `class_schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "StudyType" AS ENUM ('CAREER', 'COURSE', 'CERTIFICATION', 'OTHER');

-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('TASK', 'UNIVERSITY', 'FINANCE', 'HABIT');

-- AlterTable
ALTER TABLE "Career" ADD COLUMN     "facultyContactInfo" TEXT,
ADD COLUMN     "institution" TEXT,
ADD COLUMN     "type" "StudyType" NOT NULL DEFAULT 'CAREER',
ADD COLUMN     "whatsappGroup" TEXT;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "careerId" TEXT,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "type" "CategoryType" NOT NULL DEFAULT 'TASK';

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "contactInfo",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "whatsappLink" TEXT;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "endTime" TEXT,
ADD COLUMN     "energyRequired" TEXT NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "enrollmentId" TEXT,
ADD COLUMN     "goalId" TEXT,
ADD COLUMN     "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "startTime" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "class_schedules_enrollmentId_dayOfWeek_startTime_key" ON "class_schedules"("enrollmentId", "dayOfWeek", "startTime");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
