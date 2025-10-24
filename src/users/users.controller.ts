import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity/user.entity';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

//este controlador maneja las rutas relacionadas con los usuarios, no se usan para la app básica, 
// pero para conocer a nivel de backend cómo se manejan los usuarios y la base de datos
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of all users.' })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get user by ID'})
    @ApiParam({name: 'id', type: 'string', description: 'User ID'})
    @ApiResponse({status: 200, description: 'User details'})
    @ApiResponse({status: 404, description: 'User not found'})
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(+id);    
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user by ID' })
    @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
    updateUser(@Param('id') id: string, @Body() body: Partial<User>) {
        return this.usersService.updateUser(+id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(+id);
    }
}
