import { ApiProperty } from "@nestjs/swagger";

//dto para login
export class LoginUserDto {
    @ApiProperty({ example: 'fer@gmail.com', description: 'The email of the user' })    
    email: string;

    @ApiProperty({ example: '!Pass123', description: 'The password of the user' })
    password: string;
}