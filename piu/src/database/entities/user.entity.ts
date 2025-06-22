import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { Role } from './role.entity';
import { Enrollment } from './enrollment.entity';
// import { Comment } from './comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles!: Role[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments!: Enrollment[];

  // @OneToMany(() => Comment, comment => comment.user)
  // comments!: Comment[];
}
