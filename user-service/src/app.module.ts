import { Module } from '@nestjs/common';
import { StudentModule } from './module/student/student.module';
import { TeacherModule } from './module/teacher/teacher.module';
import { KafkaConnectionModule } from './module/kafka-connection/kafka-connection.module';

@Module({
  imports: [StudentModule, TeacherModule, KafkaConnectionModule],
})
export class AppModule {}
