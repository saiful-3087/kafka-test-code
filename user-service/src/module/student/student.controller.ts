import { Controller, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IStudent } from 'interfaces/student.interface';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @MessagePattern('list_student')
  async getAllStudent() {
    return this.studentService.getAllStudents();
  }

  @MessagePattern('create_student')
  async createStudent(@Payload() student: IStudent) {
    return this.studentService.createStudent(student);
  }

  @MessagePattern('update_student')
  async updateStudent(@Payload() student: IStudent) {
    return this.studentService.updateStudent(student);
  }
}
