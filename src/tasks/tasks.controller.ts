import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './task.entity/task.entity';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { UpdateTaskDto } from './dtos/update-task.dto';

//uso de jwt guard para proteger las rutas, ya que solo el user loggeado puede acceder a sus tareas
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }


    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'The task has been successfully created.' })
    createTask(@Body() body: CreateTaskDto, @Request() req: any): Promise<Task> {
        const userId = req.user.userId;
        return this.tasksService.createTask(body, userId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all tasks' })
    @ApiResponse({ status: 200, description: 'List of all tasks.' })
    findAll(@Request() req: any): Promise<Task[]> {
        const userId = req.user.userId;
        return this.tasksService.findAllTasks(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get task by ID' })
    @ApiResponse({ status: 200, description: 'Task details.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    findOne(@Param('id') id: string, @Request() req: any): Promise<Task> {
        const userId = req.user.userId;
        return this.tasksService.findTaskById(+id, userId);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update task by ID' })
    @ApiResponse({ status: 200, description: 'The task has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    @ApiResponse({ status: 403, description: 'Forbidden - Not your task.' })
    async updateTask(
        @Param('id') id: string,
        @Body() body: UpdateTaskDto,
        @Request() req: any
    ): Promise<Task> {
        const userId = req.user.userId;
        return this.tasksService.updateTask(+id, body, userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete task by ID' })
    @ApiResponse({ status: 200, description: 'The task has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    @ApiResponse({ status: 403, description: 'Forbidden - Not your task.' })
    deleteTask(@Param('id') id: string, @Request() req: any): Promise<void> {
        const userId = req.user.userId;
        return this.tasksService.deleteTask(+id, userId);
    }
}
