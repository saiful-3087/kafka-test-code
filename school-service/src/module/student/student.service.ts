import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StudentService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async createStudent(student: any) {
    console.log('[School Service] Publishing student:', student);
    const returnedData = await firstValueFrom(
      this.kafkaClient.send('create_student', student),
    );

    console.log({ returnedData });
    return { message: 'Student event published', data: returnedData };
  }

  async getAllStudent() {
    return firstValueFrom(this.kafkaClient.send('list_student', {}));
  }

  readonly updateStudent = (
    id: string,
    body: { name: string; grade?: string },
  ) => {
    return firstValueFrom(
      this.kafkaClient.send('update_student', { id, ...body }),
    );
  };
}
