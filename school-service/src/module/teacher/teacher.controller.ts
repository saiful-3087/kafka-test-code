import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}
  @Post()
  async createTeacher(@Body() teacher: Record<string, string>) {
    return this.teacherService.createTeacher(teacher);
  }

  @Get()
  async getAllTeacher() {
    return this.teacherService.getAllTeacher();
  }

  @Patch(':id')
  async updateTeacher(
    @Param('id') id: string,
    @Body() body: { name: string; subject?: string },
  ) {
    return this.teacherService.updateTeacher(id, body);
  }
}
