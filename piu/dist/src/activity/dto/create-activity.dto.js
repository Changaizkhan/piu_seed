"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateActivityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const status_enum_1 = require("../../common/enums/status.enum");
const timeline_quarter_enum_1 = require("../../common/enums/timeline-quarter.enum");
class CreateActivityDto {
}
exports.CreateActivityDto = CreateActivityDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Title is required' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Title must be at most 255 characters' }),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: status_enum_1.StatusEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(status_enum_1.StatusEnum, {
        message: `Status must be one of: ${Object.values(status_enum_1.StatusEnum).join(', ')}`,
    }),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, { message: 'Responsibility must be at most 255 characters' }),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "responsibility", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [String],
        enum: timeline_quarter_enum_1.TimelineQuarterEnum,
        description: 'Allowed values: Q1-2025, Q2-2025, etc.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(timeline_quarter_enum_1.TimelineQuarterEnum, {
        each: true,
        message: 'Each value must be a valid timeline quarter',
    }),
    __metadata("design:type", Array)
], CreateActivityDto.prototype, "timelineQuarters", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Optional custom text describing current progress or notes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Current Status must be a string' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Current Status must be at most 255 characters' }),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "currentStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'parentActivityId must be a number' }),
    (0, class_validator_1.ValidateIf)((o) => o.parentActivityId !== undefined),
    __metadata("design:type", Number)
], CreateActivityDto.prototype, "parentActivityId", void 0);
