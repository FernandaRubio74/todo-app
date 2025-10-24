import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Fer Rubio', description: 'The name of the user' })
    name: string;
    
    @ApiProperty({ example: 'fer@gmail.com', description: 'The email of the user' })
    email: string;

    @ApiProperty({ example: '!Pass123', description: 'The password of the user' })
    password: string;
}