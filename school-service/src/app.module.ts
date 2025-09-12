import { Module } from '@nestjs/common';
import { SchoolModule } from './module/school/school.module';
import { StudentModule } from './module/student/student.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConnectionModule } from './module/kafka-connection/kafka-connection.module';
import { TeacherModule } from './module/teacher/teacher.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'school-service',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'school-consumer',
          },
        },
      },
    ]),
    SchoolModule,
    StudentModule,
    KafkaConnectionModule,
    TeacherModule,
  ],
})
export class AppModule {}
