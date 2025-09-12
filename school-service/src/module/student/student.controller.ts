import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(@Body() student: Record<string, string>) {
    return this.studentService.createStudent(student);
  }

  @Get()
  async getAllStudent() {
    return this.studentService.getAllStudent();
  }
}
