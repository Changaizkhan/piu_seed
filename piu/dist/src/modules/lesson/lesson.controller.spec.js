"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const lesson_controller_1 = require("./lesson.controller");
describe('LessonController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [lesson_controller_1.LessonController],
        }).compile();
        controller = module.get(lesson_controller_1.LessonController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
