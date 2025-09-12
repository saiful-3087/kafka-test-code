import { Controller } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @EventPattern('list_teacher')
  async getAllTeacher() {
    return this.teacherService.getAllTeachers();
  }

  @EventPattern('create_teacher')
  async createTeacher(@Payload() teacher: Record<string, string>) {
    return this.teacherService.createTeacher(teacher);
  }
}
