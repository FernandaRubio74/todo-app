import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    //propiedades para crear una tarea

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Buy groceries', description: 'The title of the task' })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Milk, Bread, Eggs', description: 'The description of the task' })
    description: string

    @ApiProperty({ example: false, description: 'The completion status of the task' })
    isCompleted: boolean;
}