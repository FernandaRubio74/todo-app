import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/users/user.entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
//entidad de tarea, cada tarea tiene un id, titulo, descripcion, estado de completado, fecha de creacion y usuario asociado
export class Task{

    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    title: string;

    @IsString()
    @Column({nullable: true})
    description: string;

    @Column({ default: false })
    completed: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, user => user.tasks)
    user: User;
}
