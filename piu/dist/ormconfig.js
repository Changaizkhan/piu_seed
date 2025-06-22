"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// ormconfig.ts or wherever AppDataSource is defined
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./src/database/entities/user.entity");
const role_entity_1 = require("./src/database/entities/role.entity");
const category_entity_1 = require("./src/database/entities/category.entity");
const course_entity_1 = require("./src/database/entities/course.entity");
const enrollment_entity_1 = require("./src/database/entities/enrollment.entity");
const lesson_entity_1 = require("./src/database/entities/lesson.entity");
const quiz_entity_1 = require("./src/database/entities/quiz.entity");
const question_entity_1 = require("./src/database/entities/question.entity");
const activity_entity_1 = require("./src/database/entities/activity.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'educational',
    synchronize: false,
    logging: false,
    entities: [
        user_entity_1.User,
        role_entity_1.Role,
        category_entity_1.Category,
        course_entity_1.Course,
        enrollment_entity_1.Enrollment,
        lesson_entity_1.Lesson,
        quiz_entity_1.Quiz,
        question_entity_1.Question,
        activity_entity_1.Activity,
    ],
    // migrations: ['src/database/migrations/*.ts'],
    migrations: ['dist/database/migrations/*.js'],
});
