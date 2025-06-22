// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../ormconfig';

import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { CategoryModule } from './modules/category/category.module';
import { CourseModule } from './modules/course/course.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { QuestionModule } from './modules/question/question.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
    RoleModule,
    CategoryModule,
    CourseModule,
    LessonModule,
    QuizModule,
    QuestionModule,
    EnrollmentModule,
    ActivityModule,
  ],
})
export class AppModule { }
