import { Module } from "@nestjs/common";
import { CareerModule } from "./career.module";
import { EnrollmentModule } from "./enroll.module";
import { SubjectModule } from "./subject.module";
import { EvaluationModule } from "./evaluation.module";
import { ScheduleModule } from "./schedule.module";

@Module({
  imports: [CareerModule, SubjectModule, EnrollmentModule, EvaluationModule, ScheduleModule],
  exports: [CareerModule, SubjectModule, EnrollmentModule, EvaluationModule, ScheduleModule],
})
export class UniversityModule {}