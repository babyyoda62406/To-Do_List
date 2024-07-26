import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { APP_PIPE } from '@nestjs/core';
import { CustomValidationPipe } from './helpers/CustomValidationPipe';

@Module({
  imports: [AuthModule, TaskModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE, 
      useClass: CustomValidationPipe,
    },
  ],
})
export class AppModule {}
