import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],  
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}