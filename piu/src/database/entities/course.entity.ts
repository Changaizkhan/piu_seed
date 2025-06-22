import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';
import { Enrollment } from './enrollment.entity';
import { Lesson } from './lesson.entity';
import { Quiz } from './quiz.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @ManyToOne(() => Category, (category) => category.courses)
  category!: Category;

  @ManyToOne(() => User)
  teacher!: User;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments!: Enrollment[];

  @OneToMany(() => Lesson, lesson => lesson.course)
  lessons!: Lesson[];

  @OneToMany(() => Quiz, quiz => quiz.course)
  quizzes!: Quiz[];
}




