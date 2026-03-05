import { Module } from "@nestjs/common";
import { CareerModule } from "./career.module";
import { EnrollmentModule } from "./enroll.module";
import { SubjectModule } from "./subject.module";
import { EvaluationModule } from "./evaluation.module";
import { ScheduleModule } from "./schedule.module";
import { ContactModule } from "./contact.module";
import { ResourceModule } from "./resource.module";

@Module({
  imports: [CareerModule, SubjectModule, EnrollmentModule, EvaluationModule, ScheduleModule, ContactModule, ResourceModule],
  exports: [CareerModule, SubjectModule, EnrollmentModule, EvaluationModule, ScheduleModule, ContactModule, ResourceModule],
})
export class UniversityModule {}