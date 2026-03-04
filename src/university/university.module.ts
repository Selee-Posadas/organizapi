import { Module } from "@nestjs/common";
import { CareerModule } from "./career.module";
import { EnrollmentModule } from "./enroll.module";
import { SubjectModule } from "./subject.module";
import { EvaluationModule } from "./evaluation.module";
import { ScheduleModule } from "./schedule.module";
import { ContactModule } from "./contact.module";

@Module({
  imports: [CareerModule, SubjectModule, EnrollmentModule, EvaluationModule, ScheduleModule, ContactModule],
  exports: [CareerModule, SubjectModule, EnrollmentModule, EvaluationModule, ScheduleModule, ContactModule],
})
export class UniversityModule {}