import { Module } from "@nestjs/common";
import { CareerModule } from "./career.module";
import { EnrollmentModule } from "./enroll.module";
import { SubjectModule } from "./subject.module";

@Module({
  imports: [CareerModule, SubjectModule, EnrollmentModule],
  exports: [CareerModule, SubjectModule, EnrollmentModule],
})
export class UniversityModule {}