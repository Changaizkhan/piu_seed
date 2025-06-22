"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const lesson_service_1 = require("./lesson.service");
describe('LessonService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [lesson_service_1.LessonService],
        }).compile();
        service = module.get(lesson_service_1.LessonService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
