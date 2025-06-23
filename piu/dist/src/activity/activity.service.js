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
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const activity_entity_1 = require("../database/entities/activity.entity");
const status_enum_1 = require("../common/enums/status.enum");
let ActivityService = class ActivityService {
    constructor(activityRepo) {
        this.activityRepo = activityRepo;
    }
    async create(dto) {
        const activity = this.activityRepo.create(dto);
        if (dto.parentActivityId) {
            const parent = await this.activityRepo.findOneBy({
                id: dto.parentActivityId,
            });
            if (!parent)
                throw new common_1.NotFoundException('Parent activity not found');
            activity.parentActivity = parent;
        }
        return this.activityRepo.save(activity);
    }
    async findAll() {
        return this.activityRepo.find({
            where: { parentActivity: (0, typeorm_2.IsNull)() },
            relations: ['subActivities'],
        });
    }
    async findOne(id) {
        const activity = await this.activityRepo.findOne({
            where: { id },
            relations: ['subActivities', 'parentActivity'],
        });
        if (!activity)
            throw new common_1.NotFoundException('Activity not found');
        return activity;
    }
    async updateStatus(id, dto) {
        const activity = await this.activityRepo.findOne({
            where: { id },
            relations: ['subActivities', 'parentActivity'],
        });
        if (!activity)
            throw new common_1.NotFoundException('Activity not found');
        activity.status = dto.status;
        await this.activityRepo.save(activity);
        // ✅ Rule: Complete all sub-activities if parent is marked completed
        if (activity.subActivities?.length > 0 &&
            dto.status === status_enum_1.StatusEnum.COMPLETED) {
            for (const sub of activity.subActivities) {
                if (sub.status !== status_enum_1.StatusEnum.COMPLETED) {
                    sub.status = status_enum_1.StatusEnum.COMPLETED;
                    await this.activityRepo.save(sub);
                }
            }
        }
        // ✅ Rule: If all siblings complete, mark parent as completed
        if (activity.parentActivity && dto.status === status_enum_1.StatusEnum.COMPLETED) {
            const siblings = await this.activityRepo.find({
                where: { parentActivity: { id: activity.parentActivity.id } },
            });
            const allCompleted = siblings.every((s) => s.status === status_enum_1.StatusEnum.COMPLETED);
            if (allCompleted) {
                const parent = await this.activityRepo.findOneBy({
                    id: activity.parentActivity.id,
                });
                if (parent && parent.status !== status_enum_1.StatusEnum.COMPLETED) {
                    parent.status = status_enum_1.StatusEnum.COMPLETED;
                    await this.activityRepo.save(parent);
                }
            }
        }
        return activity;
    }
    async updateCurrentStatus(id, currentStatus) {
        const activity = await this.activityRepo.findOneBy({ id });
        if (!activity) {
            throw new common_1.NotFoundException('Activity not found');
        }
        activity.currentStatus = currentStatus;
        await this.activityRepo.save(activity);
        return activity;
    }
    async updateResponsibility(id, responsibility) {
        const activity = await this.activityRepo.findOne({ where: { id } });
        if (!activity) {
            throw new common_1.NotFoundException('Activity not found');
        }
        activity.responsibility = responsibility;
        return this.activityRepo.save(activity);
    }
};
exports.ActivityService = ActivityService;
exports.ActivityService = ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(activity_entity_1.Activity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ActivityService);
