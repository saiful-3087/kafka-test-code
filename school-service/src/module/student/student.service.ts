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

  async createTeacher(teacher: any) {
    console.log('[School Service] Publishing teacher:', teacher);
    const returnedData = await firstValueFrom(
      this.kafkaClient.send('create_teacher', teacher),
    );

    console.log({ returnedData });
    return { message: 'Teacher event published', data: returnedData };
  }
}
