import { Controller } from '@nestjs/common';
import { StudentService } from './student.service';
import {  MessagePattern, Payload } from '@nestjs/microservices';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @MessagePattern('list_student')
  async getAllStudent() {
    return this.studentService.getAllStudents();
  }

  @MessagePattern('create_student')
  async createStudent(@Payload() student: Record<string, string>) {
    return this.studentService.createStudent(student);
  }
}
