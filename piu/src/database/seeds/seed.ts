import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

import { AppDataSource } from '../../../ormconfig';

import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Category } from '../entities/category.entity';
import { Course } from '../entities/course.entity';
import { Enrollment } from '../entities/enrollment.entity';
import { Lesson } from '../entities/lesson.entity';
import { Quiz } from '../entities/quiz.entity';
import { Question } from '../entities/question.entity';
import { Activity } from '../entities/activity.entity';
import { StatusEnum } from '../../common/enums/status.enum';

const dataSource = AppDataSource;

async function seed() {
  await dataSource.initialize();

  const roleRepo = dataSource.getRepository(Role);
  const userRepo = dataSource.getRepository(User);
  const categoryRepo = dataSource.getRepository(Category);
  const courseRepo = dataSource.getRepository(Course);
  const enrollmentRepo = dataSource.getRepository(Enrollment);
  const lessonRepo = dataSource.getRepository(Lesson);
  const quizRepo = dataSource.getRepository(Quiz);
  const questionRepo = dataSource.getRepository(Question);
  const activityRepo = dataSource.getRepository(Activity);

  // Roles
  const roles = ['Admin', 'Teacher', 'Student'].map((name) => {
    const role = new Role();
    role.name = name;
    return role;
  });
  await roleRepo.save(roles);

  // Teachers
  const teacherRole = roles.find((r) => r.name === 'Teacher')!;
  const teachers: User[] = [];
  for (let i = 0; i < 2; i++) {
    const user = new User();
    user.fullName = faker.person.fullName();
    user.email = faker.internet.email();
    user.password = await bcrypt.hash('password123', 10);
    user.roles = [teacherRole];
    teachers.push(await userRepo.save(user));
  }

  // Students
  const studentRole = roles.find((r) => r.name === 'Student')!;
  const students: User[] = [];
  for (let i = 0; i < 5; i++) {
    const user = new User();
    user.fullName = faker.person.fullName();
    user.email = faker.internet.email();
    user.password = await bcrypt.hash('password123', 10);
    user.roles = [studentRole];
    students.push(await userRepo.save(user));
  }

  // Categories
  const categoryNames = ['Science', 'Arts', 'Math'];
  const categories: Category[] = [];
  for (const name of categoryNames) {
    const category = new Category();
    category.name = name;
    categories.push(await categoryRepo.save(category));
  }

  // Courses
  const courses: Course[] = [];
  for (let i = 0; i < 3; i++) {
    const course = new Course();
    course.title = faker.lorem.words(3);
    course.description = faker.lorem.sentence();
    course.teacher = teachers[i % teachers.length];
    course.category = categories[i % categories.length];
    courses.push(await courseRepo.save(course));
  }

  // Enrollments
  for (const student of students) {
    const enrolledCourses = faker.helpers.arrayElements(courses, 2);
    for (const course of enrolledCourses) {
      const enrollment = new Enrollment();
      enrollment.user = student;
      enrollment.course = course;
      await enrollmentRepo.save(enrollment);
    }
  }

  // Lessons, Quizzes, Questions
  for (const course of courses) {
    // Lessons
    for (let i = 0; i < 2; i++) {
      const lesson = new Lesson();
      lesson.title = faker.lorem.words(3);
      lesson.content = faker.lorem.paragraph();
      lesson.course = course;
      await lessonRepo.save(lesson);
    }

    // Quiz
    const quiz = new Quiz();
    quiz.title = `Quiz for ${course.title}`;
    quiz.course = course;
    await quizRepo.save(quiz);

    // Questions
    for (let i = 0; i < 3; i++) {
      const question = new Question();
      question.text = faker.lorem.sentence();
      question.quiz = quiz;
      await questionRepo.save(question);
    }
  }

  // Activities
  const parentActivity = activityRepo.create({
    title: '1.1 PIU Establishment',
    status: StatusEnum.IN_PROCESS,
    responsibility: 'DD(Civil)',
    timelineQuarters: ['2024-Q1', '2024-Q2'],
  });
  await activityRepo.save(parentActivity);

  const subActivities = [
    {
      title: '1.1.1 Recruit Key Staff',
      status: StatusEnum.COMPLETED,
      responsibility: 'AD(SSG)',
      timelineQuarters: ['2024-Q1'],
    },
    {
      title: '1.1.2 Setup PIU Office',
      status: StatusEnum.IN_PROCESS,
      responsibility: 'DD(E&T)',
      timelineQuarters: ['2024-Q2'],
    },
  ];

  for (const sub of subActivities) {
    const activity = activityRepo.create({
      ...sub,
      parentActivity,
    });
    await activityRepo.save(activity);
  }

  console.log('✅ Seeding complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
