import { Module } from '@nestjs/common';
import { StudentModule } from './module/student/student.module';
import { TeacherModule } from './module/teacher/teacher.module';

@Module({
  imports: [StudentModule, TeacherModule],
})
export class AppModule {}
