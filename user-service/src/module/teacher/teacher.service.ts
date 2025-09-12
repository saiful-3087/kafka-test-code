import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ITeacher } from 'interfaces/teacher.interface';
import * as _ from 'lodash';

@Injectable()
export class TeacherService {
  private readonly teachers: ITeacher[] = [];
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  readonly createTeacher = (teacher: ITeacher) => {
    console.log('[User Service]: Create teacher');
    const newTeacher: ITeacher = {
      id: teacher.id ?? `teacher_${Date.now()}`,
      name: teacher.name,
      subject: teacher.subject,
    };
    this.teachers.push(newTeacher);

    return newTeacher;
  };

  readonly updateTeacher = (data: Partial<ITeacher>) => {
    console.log('[User Service]: Updating teacher');
    const willbeUpdated = this.teachers.find((te) => te.id === data.id);

    if (!willbeUpdated) {
      console.error('Can not find the teacher data');
      return null;
    }

    willbeUpdated.name = data.name ?? willbeUpdated.name;
    willbeUpdated.subject = data.subject ?? willbeUpdated.subject;
    this.kafkaClient.emit('teacher.updated', { data: { ...willbeUpdated } });

    return willbeUpdated;
  };

  readonly updateTeacherClass = (data: Record<string, unknown>) => {
    console.log('[User Service]: Update affected Teacher');
    console.log({ data });

    const teacher = this.teachers.find(
      (teac) => teac.id === _.get(data, 'teacher.id', ''),
    );

    if (!teacher) {
      console.log('Can not find the affected teacher...');
      return null;
    }

    teacher.subject = _.get(data, 'subject', '') as string;
  };

  readonly getTeacher = (id: string) => {
    console.log('[User Service]: Get teacher with id: ' + id);
    return this.teachers.find((st) => st.id === id);
  };

  readonly getAllTeachers = () => {
    console.log('[User Service]: Get All teachers ');
    return this.teachers;
  };
}
