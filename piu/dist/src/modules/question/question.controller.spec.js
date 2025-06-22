"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const question_controller_1 = require("./question.controller");
describe('QuestionController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [question_controller_1.QuestionController],
        }).compile();
        controller = module.get(question_controller_1.QuestionController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
