import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  //propiedades opcionales para actualizar una tarea
  
  @ApiProperty({ required: false, description: 'Title of the task', example: 'Buy groceries' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false, description: 'Description of the task', example: 'This is an optional task description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false, description: 'Completion status of the task', example: true })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}