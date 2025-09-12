import { Controller, Param } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ITeacher } from 'interfaces/teacher.interface';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @MessagePattern('list_teacher')
  async getAllTeacher() {
    return this.teacherService.getAllTeachers();
  }

  @MessagePattern('create_teacher')
  async createTeacher(@Payload() teacher: ITeacher) {
    return this.teacherService.createTeacher(teacher);
  }

  @MessagePattern('update_teache')
  async updateTeacher(@Payload() teacher: ITeacher) {
    return this.teacherService.updateTeacher( teacher);
  }
}
