import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Patch(':id')
  async updateClasses(
    @Param('id') id: string,
    @Body() body: { name: string; grade?: string },
  ) {
    return this.classesService.updateClasses(id, body);
  }
}
