import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity/task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateTaskDto } from './dtos/update-task.dto';



@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,

        private readonly usersService: UsersService,
    ) { }

    //creación de tareas, usando el userId para asignar la tarea al usuario correspondiente
    async createTask(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
        const user = await this.usersService.findOne(userId);

        const task = this.taskRepository.create({ ...createTaskDto, user });

        return this.taskRepository.save(task);
    }

    //obtener todas las tareas de un usuario específico
    async findAllTasks(userId: number): Promise<Task[]> {
        return this.taskRepository.find({
            where: { user: { id: userId } },
            relations: ['user']
        });
    }

    //obtener una tarea específica por su ID, asegurando que pertenece al usuario
    async findTaskById(id: number, userId: number): Promise<Task> {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        if (task.user.id !== userId) {
            throw new UnauthorizedException(`You do not have access to this task`);
        }

        return task;
    }

    //eliminar una tarea específica por su ID, asegurando que pertenece al usuario
    async deleteTask(id: number, userId: number): Promise<void> {
        await this.findTaskById(id, userId);

        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }


    //actualizar una tarea específica por su ID, asegurando que pertenece al usuario
    async updateTask(id: number, data: UpdateTaskDto, userId: number): Promise<Task> {
        const task = await this.findTaskById(id, userId);

        if (data.title !== undefined) task.title = data.title;
        if (data.description !== undefined) task.description = data.description;
        if (data.isCompleted !== undefined) task.isCompleted = data.isCompleted;

        return this.taskRepository.save(task);
    }

}
