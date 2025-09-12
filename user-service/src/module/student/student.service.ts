import { Injectable } from '@nestjs/common';
import { IStudent } from 'interfaces/student.interface';

@Injectable()
export class StudentService {
  private readonly students: IStudent[] = [];

  readonly createStudent = (student: Record<string, string>) => {
    console.log('[User Service]: Create student');
    const newStudent: IStudent = {
      id: student.id ?? `student_${Date.now()}`,
      name: student.name,
      grade: student.grade,
    };
    this.students.push(newStudent);

    return newStudent;
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
