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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityController = void 0;
// src/activity/activity.controller.ts
const common_1 = require("@nestjs/common");
const activity_service_1 = require("./activity.service");
const create_activity_dto_1 = require("./dto/create-activity.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
const update_responsibility_dto_1 = require("./dto/update-responsibility.dto");
const swagger_1 = require("@nestjs/swagger");
let ActivityController = class ActivityController {
    constructor(activityService) {
        this.activityService = activityService;
    }
    create(dto) {
        return this.activityService.create(dto);
    }
    findAll() {
        return this.activityService.findAll();
    }
    findOne(id) {
        return this.activityService.findOne(id);
    }
    updateStatus(id, dto) {
        return this.activityService.updateStatus(id, dto);
    }
    updateCurrentStatus(id, currentStatus) {
        return this.activityService.updateCurrentStatus(id, currentStatus);
    }
    async updateResponsibility(id, body) {
        return this.activityService.updateResponsibility(id, body.responsibility);
    }
};
exports.ActivityController = ActivityController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new activity' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Activity created successfully.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_activity_dto_1.CreateActivityDto]),
    __metadata("design:returntype", void 0)
], ActivityController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Fetch all root-level activities' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Fetch all root activities.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ActivityController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get an activity by ID with its sub-activities' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get a specific activity with its sub-activities.',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ActivityController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update the status of an activity' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update the status of an activity.',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", void 0)
], ActivityController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(':id/current-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update current status text of an activity' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Update the current status of an activity.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('currentStatus')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ActivityController.prototype, "updateCurrentStatus", null);
__decorate([
    (0, common_1.Patch)(':id/responsibility'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Update Responsibility of Activity' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiBody)({ type: update_responsibility_dto_1.UpdateResponsibilityDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_responsibility_dto_1.UpdateResponsibilityDto]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "updateResponsibility", null);
exports.ActivityController = ActivityController = __decorate([
    (0, swagger_1.ApiTags)('activities'),
    (0, common_1.Controller)('activities'),
    __metadata("design:paramtypes", [activity_service_1.ActivityService])
], ActivityController);
