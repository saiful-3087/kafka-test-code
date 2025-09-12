import { Controller } from '@nestjs/common';
import { ClassService } from './class.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('class')
export class ClassController {
  constructor(private readonly classesService: ClassService) {}
  @EventPattern('list_classes')
  async getAllClasses() {
    return this.classesService.getAllClassess();
  }

  @EventPattern('create_classes')
  async createClasses(@Payload() classes: Record<string, string>) {
    return this.classesService.createClasses(classes);
  }
}
