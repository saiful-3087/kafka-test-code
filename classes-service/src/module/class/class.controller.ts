import { Controller } from '@nestjs/common';
import { ClassService } from './class.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { IClass } from 'src/interfaces/class.interface';

@Controller('class')
export class ClassController {
  constructor(private readonly classesService: ClassService) {}
  @MessagePattern('list_classes')
  async getAllClasses() {
    return this.classesService.getAllClassess();
  }

  @MessagePattern('create_classes')
  async createClasses(@Payload() classes: IClass) {
    return this.classesService.createClasses(classes);
  }

  @MessagePattern('update_classes')
  async updateClasses(@Payload() classes: IClass) {
    return this.classesService.updateClasses(classes);
  }

  @EventPattern('student.updated')
  async updateStudentInClass(@Payload() student: Record<string, string>) {
    return this.classesService.updateStudentInClass(student);
  }

  @EventPattern('teacher.updated')
  async updateTeacherInClass(@Payload() teacher: Record<string, string>) {
    return this.classesService.updateTeacherInClass(teacher);
  }
}
