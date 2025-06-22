"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const enrollment_service_1 = require("./enrollment.service");
describe('EnrollmentService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [enrollment_service_1.EnrollmentService],
        }).compile();
        service = module.get(enrollment_service_1.EnrollmentService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
