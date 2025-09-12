import { Controller } from '@nestjs/common';
import { StudentService } from './student.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @EventPattern('list_student')
  async getAllStudent() {
    return this.studentService.getAllStudents();
  }

  @EventPattern('create_student')
  async createStudent(@Payload() student: Record<string, string>) {
    return this.studentService.createStudent(student);
  }
}
