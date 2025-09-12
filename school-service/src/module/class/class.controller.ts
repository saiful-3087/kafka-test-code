import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClassService } from './class.service';

@Controller('class')
export class ClassController {
  constructor(private readonly classesService: ClassService) {}

    @Post()
    async createClasses(@Body() classes: Record<string, string>) {
      return this.classesService.createClasses(classes);
    }
  
    @Get()
    async getAllClasses() {
      return this.classesService.getAllClasses();
    }
}
