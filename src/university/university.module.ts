import { Module } from '@nestjs/common';
import { CareerModule } from './career.module';
import { EnrollmentModule } from './enroll.module';
import { SubjectModule } from './subject.module';
import { EvaluationModule } from './evaluation.module';
import { ScheduleModule } from './schedule.module';
import { ContactModule } from './contact.module';
import { ResourceModule } from './resource.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [
    CareerModule,
    SubjectModule,
    EnrollmentModule,
    EvaluationModule,
    ScheduleModule,
    ContactModule,
    ResourceModule,
    TaskModule,
  ],
  exports: [
    CareerModule,
    SubjectModule,
    EnrollmentModule,
    EvaluationModule,
    ScheduleModule,
    ContactModule,
    ResourceModule,
    TaskModule,
  ],
})
export class UniversityModule {}
