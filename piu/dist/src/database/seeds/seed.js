"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const faker_1 = require("@faker-js/faker");
const ormconfig_1 = require("../../../ormconfig");
const user_entity_1 = require("../entities/user.entity");
const role_entity_1 = require("../entities/role.entity");
const category_entity_1 = require("../entities/category.entity");
const course_entity_1 = require("../entities/course.entity");
const enrollment_entity_1 = require("../entities/enrollment.entity");
const lesson_entity_1 = require("../entities/lesson.entity");
const quiz_entity_1 = require("../entities/quiz.entity");
const question_entity_1 = require("../entities/question.entity");
const activity_entity_1 = require("../entities/activity.entity");
const status_enum_1 = require("../../common/enums/status.enum");
const dataSource = ormconfig_1.AppDataSource;
async function seed() {
    await dataSource.initialize();
    const roleRepo = dataSource.getRepository(role_entity_1.Role);
    const userRepo = dataSource.getRepository(user_entity_1.User);
    const categoryRepo = dataSource.getRepository(category_entity_1.Category);
    const courseRepo = dataSource.getRepository(course_entity_1.Course);
    const enrollmentRepo = dataSource.getRepository(enrollment_entity_1.Enrollment);
    const lessonRepo = dataSource.getRepository(lesson_entity_1.Lesson);
    const quizRepo = dataSource.getRepository(quiz_entity_1.Quiz);
    const questionRepo = dataSource.getRepository(question_entity_1.Question);
    const activityRepo = dataSource.getRepository(activity_entity_1.Activity);
    // Roles
    const roles = ['Admin', 'Teacher', 'Student'].map((name) => {
        const role = new role_entity_1.Role();
        role.name = name;
        return role;
    });
    await roleRepo.save(roles);
    // Teachers
    const teacherRole = roles.find((r) => r.name === 'Teacher');
    const teachers = [];
    for (let i = 0; i < 2; i++) {
        const user = new user_entity_1.User();
        user.fullName = faker_1.faker.person.fullName();
        user.email = faker_1.faker.internet.email();
        user.password = await bcrypt.hash('password123', 10);
        user.roles = [teacherRole];
        teachers.push(await userRepo.save(user));
    }
    // Students
    const studentRole = roles.find((r) => r.name === 'Student');
    const students = [];
    for (let i = 0; i < 5; i++) {
        const user = new user_entity_1.User();
        user.fullName = faker_1.faker.person.fullName();
        user.email = faker_1.faker.internet.email();
        user.password = await bcrypt.hash('password123', 10);
        user.roles = [studentRole];
        students.push(await userRepo.save(user));
    }
    // Categories
    const categoryNames = ['Science', 'Arts', 'Math'];
    const categories = [];
    for (const name of categoryNames) {
        const category = new category_entity_1.Category();
        category.name = name;
        categories.push(await categoryRepo.save(category));
    }
    // Courses
    const courses = [];
    for (let i = 0; i < 3; i++) {
        const course = new course_entity_1.Course();
        course.title = faker_1.faker.lorem.words(3);
        course.description = faker_1.faker.lorem.sentence();
        course.teacher = teachers[i % teachers.length];
        course.category = categories[i % categories.length];
        courses.push(await courseRepo.save(course));
    }
    // Enrollments
    for (const student of students) {
        const enrolledCourses = faker_1.faker.helpers.arrayElements(courses, 2);
        for (const course of enrolledCourses) {
            const enrollment = new enrollment_entity_1.Enrollment();
            enrollment.user = student;
            enrollment.course = course;
            await enrollmentRepo.save(enrollment);
        }
    }
    // Lessons, Quizzes, Questions
    for (const course of courses) {
        // Lessons
        for (let i = 0; i < 2; i++) {
            const lesson = new lesson_entity_1.Lesson();
            lesson.title = faker_1.faker.lorem.words(3);
            lesson.content = faker_1.faker.lorem.paragraph();
            lesson.course = course;
            await lessonRepo.save(lesson);
        }
        // Quiz
        const quiz = new quiz_entity_1.Quiz();
        quiz.title = `Quiz for ${course.title}`;
        quiz.course = course;
        await quizRepo.save(quiz);
        // Questions
        for (let i = 0; i < 3; i++) {
            const question = new question_entity_1.Question();
            question.text = faker_1.faker.lorem.sentence();
            question.quiz = quiz;
            await questionRepo.save(question);
        }
    }
    // Activities
    const parentActivity = activityRepo.create({
        title: '1.1 PIU Establishment',
        status: status_enum_1.StatusEnum.IN_PROCESS,
        responsibility: 'DD(Civil)',
        timelineQuarters: ['2024-Q1', '2024-Q2'],
    });
    await activityRepo.save(parentActivity);
    const subActivities = [
        {
            title: '1.1.1 Recruit Key Staff',
            status: status_enum_1.StatusEnum.COMPLETED,
            responsibility: 'AD(SSG)',
            timelineQuarters: ['2024-Q1'],
        },
        {
            title: '1.1.2 Setup PIU Office',
            status: status_enum_1.StatusEnum.IN_PROCESS,
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
