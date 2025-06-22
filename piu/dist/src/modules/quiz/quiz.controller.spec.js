"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const quiz_controller_1 = require("./quiz.controller");
describe('QuizController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [quiz_controller_1.QuizController],
        }).compile();
        controller = module.get(quiz_controller_1.QuizController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
