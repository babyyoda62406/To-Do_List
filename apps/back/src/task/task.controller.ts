import { Controller, Get, Post, Body, Patch, Param, Delete,  UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
;

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createTaskDto: CreateTaskDto , @Request() req: any) {
        const {uid} = req.user
        return await this.taskService.create(createTaskDto, uid);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll( @Request() req: any) {
        const {uid} = req.user
        return await this.taskService.findAll(uid);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string, @Request() req: any) {
        const {uid} = req.user
        return await this.taskService.findOne(id, uid);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req: any) {
        const {uid} = req.user
        return this.taskService.update(id, updateTaskDto , uid);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Request() req: any) {
        const {uid} = req.user
        return await this.taskService.remove(id , uid);
    }
}
