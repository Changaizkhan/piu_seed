"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const question_service_1 = require("./question.service");
describe('QuestionService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [question_service_1.QuestionService],
        }).compile();
        service = module.get(question_service_1.QuestionService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
