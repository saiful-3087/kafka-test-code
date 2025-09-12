import { Global, Inject, Module, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user-service-client',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'user-consumer',
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaConnectionModule {
  // implements OnModuleInit {
  // constructor(
  //   @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  // ) {}
  // async onModuleInit() {
  //   const listeningTopics = ['class.updated'];
  //   listeningTopics.forEach((topic) => {
  //     this.kafkaClient.subscribeToResponseOf(topic);
  //   });
  //   await this.kafkaClient.connect();
  // }
}
