import { Module } from '@nestjs/common';
import { StudentModule } from './module/student/student.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConnectionModule } from './module/kafka-connection/kafka-connection.module';
import { TeacherModule } from './module/teacher/teacher.module';
import { ClassModule } from './module/class/class.module';

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
    StudentModule,
    KafkaConnectionModule,
    TeacherModule,
    ClassModule,
  ],
})
export class AppModule {}
