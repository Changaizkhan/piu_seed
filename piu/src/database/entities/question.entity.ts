import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;

    @ManyToOne(() => Quiz, quiz => quiz.questions)
    quiz!: Quiz;
}
