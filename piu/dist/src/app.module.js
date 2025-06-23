"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
// src/app.module.ts
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ormconfig_1 = require("../ormconfig");
const user_module_1 = require("./modules/user/user.module");
const role_module_1 = require("./modules/role/role.module");
const category_module_1 = require("./modules/category/category.module");
const course_module_1 = require("./modules/course/course.module");
const lesson_module_1 = require("./modules/lesson/lesson.module");
const quiz_module_1 = require("./modules/quiz/quiz.module");
const question_module_1 = require("./modules/question/question.module");
const enrollment_module_1 = require("./modules/enrollment/enrollment.module");
const activity_module_1 = require("./activity/activity.module");
const export_module_1 = require("./export/export.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(ormconfig_1.AppDataSource.options),
            user_module_1.UserModule,
            role_module_1.RoleModule,
            category_module_1.CategoryModule,
            course_module_1.CourseModule,
            lesson_module_1.LessonModule,
            quiz_module_1.QuizModule,
            question_module_1.QuestionModule,
            enrollment_module_1.EnrollmentModule,
            activity_module_1.ActivityModule,
            export_module_1.ExportModule,
        ],
    })
], AppModule);
