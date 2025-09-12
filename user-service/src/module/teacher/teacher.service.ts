import { Injectable } from '@nestjs/common';
import { ITeacher } from 'interfaces/teacher.interface';

@Injectable()
export class TeacherService {
  private readonly teachers: ITeacher[] = [];

  readonly createTeacher = (teacher: Record<string, string>) => {
    console.log('[User Service]: Create teacher');
    const newTeacher: ITeacher = {
      id: teacher.id ?? `teacher_${Date.now()}`,
      name: teacher.name,
      subject: teacher.subject,
    };
    this.teachers.push(newTeacher);

    return newTeacher;
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
