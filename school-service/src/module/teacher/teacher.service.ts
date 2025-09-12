import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TeacherService {
  constructor(
      @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    ) {}
  
    async onModuleInit() {
      await this.kafkaClient.connect();
    }
  
    async createTeacher(teacher: any) {
      console.log('[School Service] Publishing teacher:', teacher);
      const returnedData = await firstValueFrom(
        this.kafkaClient.send('create_teacher', teacher),
      );
  
      console.log({ returnedData });
      return { message: 'Teacher event published', data: returnedData };
    }
  
    async getAllTeacher() {
      return firstValueFrom(this.kafkaClient.send('list_teacher', {}));
    }
}
