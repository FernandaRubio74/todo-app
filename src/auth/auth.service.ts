import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    //validacion del user
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findAll().then(users => users.find(user => user.email === email));

        if (!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }

        return user;
    }

    //generacion del jwt token al hacer login
    async login(user: any) {
        const payload = { email: user.email, sub: user.id, name: user.name };

        const {password, ...userWithoutPassword} = user;

        return {
            access_token: this.jwtService.sign(payload),
            user: userWithoutPassword,
        };
    }

}
