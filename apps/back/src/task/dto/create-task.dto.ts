import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString({
        message: 'The title of the task must be a string'
    })
    @IsNotEmpty({
        message: 'The title of the task cannot be empty'
    })
    title: string;

    @IsString({
        message: 'The description of the task must be a string'
    })
    @IsNotEmpty({
        message: 'The description of the task cannot be empty'
    })
    description: string;        
}
