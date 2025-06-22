// ormconfig.ts or wherever AppDataSource is defined
import { DataSource } from 'typeorm';
import { User } from './src/database/entities/user.entity';
import { Role } from './src/database/entities/role.entity';
import { Category } from './src/database/entities/category.entity';
import { Course } from './src/database/entities/course.entity';
import { Enrollment } from './src/database/entities/enrollment.entity';
import { Lesson } from './src/database/entities/lesson.entity';
import { Quiz } from './src/database/entities/quiz.entity';
import { Question } from './src/database/entities/question.entity';
import { Activity } from './src/database/entities/activity.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'educational',
  synchronize: false,
  logging: false,
  entities: [
    User,
    Role,
    Category,
    Course,
    Enrollment,
    Lesson,
    Quiz,
    Question,
    Activity,
  ],
  // migrations: ['src/database/migrations/*.ts'],
  migrations: ['dist/database/migrations/*.js'],
});
