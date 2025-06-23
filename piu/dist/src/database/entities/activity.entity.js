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
exports.Activity = void 0;
// src/activity/entities/activity.entity.ts
const typeorm_1 = require("typeorm");
const status_enum_1 = require("../../common/enums/status.enum");
const swagger_1 = require("@nestjs/swagger");
let Activity = class Activity {
};
exports.Activity = Activity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Activity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Activity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: status_enum_1.StatusEnum,
        default: status_enum_1.StatusEnum.IN_PROCESS,
    }),
    (0, swagger_1.ApiProperty)({ enum: status_enum_1.StatusEnum }),
    __metadata("design:type", String)
], Activity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], Activity.prototype, "responsibility", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, nullable: true }),
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    __metadata("design:type", Array)
], Activity.prototype, "timelineQuarters", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], Activity.prototype, "currentStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Activity, (a) => a.subActivities, { nullable: true }),
    (0, swagger_1.ApiPropertyOptional)({ type: () => Activity }),
    __metadata("design:type", Activity)
], Activity.prototype, "parentActivity", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Activity, (a) => a.parentActivity, { cascade: true }),
    (0, swagger_1.ApiPropertyOptional)({ type: () => [Activity] }),
    __metadata("design:type", Array)
], Activity.prototype, "subActivities", void 0);
exports.Activity = Activity = __decorate([
    (0, typeorm_1.Entity)('activities')
], Activity);
