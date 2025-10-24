import { IsEmail, IsString, Matches, MinLength } from "class-validator";
import { Task } from "src/tasks/task.entity/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

//entidad de usuario. con id, name, email, password y una relacion uno a muchos con tareas
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    name: string;

    @Column({ unique: true })
    @IsString()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    @MinLength(5, { message: 'At least 5 characters' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password needs at least one uppercase letter, one lowercase letter, and one number or special character',
    })
    password: string;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];
}