import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsString({
        message: 'The title of the task must be a string'
    })
    @IsNotEmpty({
        message: 'The title of the task cannot be empty'
    })
    @IsOptional()
    status?: string;    
    
}
