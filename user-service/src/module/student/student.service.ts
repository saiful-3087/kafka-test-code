import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { IStudent } from 'interfaces/student.interface';

@Injectable()
export class StudentService {
  private readonly students: IStudent[] = [];
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  readonly createStudent = (student: IStudent) => {
    console.log('[User Service]: Create student');
    const newStudent: IStudent = {
      id: student.id ?? `student_${Date.now()}`,
      name: student.name,
      grade: student.grade,
    };
    this.students.push(newStudent);

    return newStudent;
  };

  readonly updateStudent = (data: Partial<IStudent>) => {
    console.log('[User Service]: Updating student');
    const willbeUpdated = this.students.find((te) => te.id === data.id);

    if (!willbeUpdated) {
      console.error('Can not find the student data');
      return null;
    }

    willbeUpdated.name = data.name ?? willbeUpdated.name;
    willbeUpdated.grade = data.grade ?? willbeUpdated.grade;
    this.kafkaClient.emit('student.updated', { data: { ...willbeUpdated } });

    return willbeUpdated;
  };

  readonly getStudent = (id: string) => {
    console.log('[User Service]: Get student with id: ' + id);
    return this.students.find((st) => st.id === id);
  };

  readonly getAllStudents = () => {
    console.log('[User Service]: Get All students ');
    return this.students;
  };
}
