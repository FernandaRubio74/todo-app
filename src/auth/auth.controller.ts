import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, 
        private readonly usersService: UsersService
    ) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully registered.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async register(@Body() createUserDto: CreateUserDto) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        return this.usersService.createUser(createUserDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully logged in.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async login(@Body() loginDto: LoginUserDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }
}
