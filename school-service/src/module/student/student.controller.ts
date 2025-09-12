import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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
  @Patch(':id')
  async updateStudent(
    @Param('id') id: string,
    @Body() body: { name: string; grade?: string },
  ) {
    return this.studentService.updateStudent(id, body);
  }
}
