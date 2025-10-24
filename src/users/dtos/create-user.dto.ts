import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

//dto para crear un usuario
export class CreateUserDto {
    @ApiProperty({ example: 'Fer Rubio', description: 'The name of the user' })
    name: string;
    
    @ApiProperty({ example: 'fer@gmail.com', description: 'The email of the user' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '!Pass123', description: 'The password of the user' })
    @IsString()
    password: string;
}