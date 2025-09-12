import { Module } from '@nestjs/common';
import { ClassModule } from './module/class/class.module';
import { KafkaConnectionModule } from './module/kafka-connection/kafka-connection.module';

@Module({
  imports: [ClassModule, KafkaConnectionModule],
})
export class AppModule {}
