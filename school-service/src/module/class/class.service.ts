import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClassService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async createClasses(classes: any) {
    console.log('[School Service] Publishing classes:', classes);
    const returnedData = await firstValueFrom(
      this.kafkaClient.send('create_classes', classes),
    );

    console.log({ returnedData });
    return { message: 'Classes event published', data: returnedData };
  }

  async getAllClasses() {
    return firstValueFrom(this.kafkaClient.send('list_classes', {}));
  }
}
