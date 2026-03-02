-- CreateTable
CREATE TABLE "SubjectCorrelative" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "requiredSubjectId" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "SubjectCorrelative_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubjectCorrelative_subjectId_requiredSubjectId_key" ON "SubjectCorrelative"("subjectId", "requiredSubjectId");

-- AddForeignKey
ALTER TABLE "SubjectCorrelative" ADD CONSTRAINT "SubjectCorrelative_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectCorrelative" ADD CONSTRAINT "SubjectCorrelative_requiredSubjectId_fkey" FOREIGN KEY ("requiredSubjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
