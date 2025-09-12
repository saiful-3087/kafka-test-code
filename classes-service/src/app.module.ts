import { Module } from '@nestjs/common';
import { ClassModule } from './module/class/class.module';

@Module({
  imports: [ClassModule],
})
export class AppModule {}
