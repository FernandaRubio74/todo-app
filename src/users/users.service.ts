import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    // Método para crear un nuevo usuario
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create({ ...createUserDto });
        return this.usersRepository.save(user);
    }

    //obtener todos los usuarios
    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    //encontrar un usuario por su ID
    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    //actualizar un usuario
    async updateUser(id: number, data: Partial<User>): Promise<User> {
        const user = await this.findOne(id);
        Object.assign(user, data);
        return this.usersRepository.save(user);
    }

    //borrar un usuario (id)
    async deleteUser(id: number): Promise<void> {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
