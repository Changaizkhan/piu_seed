"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const enrollment_controller_1 = require("./enrollment.controller");
describe('EnrollmentController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [enrollment_controller_1.EnrollmentController],
        }).compile();
        controller = module.get(enrollment_controller_1.EnrollmentController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
