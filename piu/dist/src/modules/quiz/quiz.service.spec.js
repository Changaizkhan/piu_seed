"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const quiz_service_1 = require("./quiz.service");
describe('QuizService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [quiz_service_1.QuizService],
        }).compile();
        service = module.get(quiz_service_1.QuizService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
