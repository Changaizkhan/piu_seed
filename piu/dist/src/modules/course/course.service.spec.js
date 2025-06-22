"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const course_service_1 = require("./course.service");
describe('CourseService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [course_service_1.CourseService],
        }).compile();
        service = module.get(course_service_1.CourseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
