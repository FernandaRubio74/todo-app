import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity/user.entity';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    createUser(@Body() body: CreateUserDto) {
        return this.usersService.createUser(body);
    }

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
