import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Activity } from '../database/entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusEnum } from '../common/enums/status.enum';

@Injectable()
export class ActivityService {
    constructor(
        @InjectRepository(Activity)
        private readonly activityRepo: Repository<Activity>,
    ) { }

    async create(dto: CreateActivityDto) {
        const activity = this.activityRepo.create(dto);

        if (dto.parentActivityId) {
            const parent = await this.activityRepo.findOneBy({
                id: dto.parentActivityId,
            });
            if (!parent) throw new NotFoundException('Parent activity not found');
            activity.parentActivity = parent;
        }

        return this.activityRepo.save(activity);
    }

    async findAll() {
        return this.activityRepo.find({
            where: { parentActivity: IsNull() },
            relations: ['subActivities'],
        });
    }

    async findOne(id: number) {
        const activity = await this.activityRepo.findOne({
            where: { id },
            relations: ['subActivities', 'parentActivity'],
        });
        if (!activity) throw new NotFoundException('Activity not found');
        return activity;
    }

    async updateStatus(id: number, dto: UpdateStatusDto) {
        const activity = await this.activityRepo.findOne({
            where: { id },
            relations: ['subActivities', 'parentActivity'],
        });

        if (!activity) throw new NotFoundException('Activity not found');

        activity.status = dto.status;
        await this.activityRepo.save(activity);

        // ✅ Rule: Complete all sub-activities if parent is marked completed
        if (
            activity.subActivities?.length > 0 &&
            dto.status === StatusEnum.COMPLETED
        ) {
            for (const sub of activity.subActivities) {
                if (sub.status !== StatusEnum.COMPLETED) {
                    sub.status = StatusEnum.COMPLETED;
                    await this.activityRepo.save(sub);
                }
            }
        }

        // ✅ Rule: If all siblings complete, mark parent as completed
        if (activity.parentActivity && dto.status === StatusEnum.COMPLETED) {
            const siblings = await this.activityRepo.find({
                where: { parentActivity: { id: activity.parentActivity.id } },
            });

            const allCompleted = siblings.every(
                (s) => s.status === StatusEnum.COMPLETED,
            );

            if (allCompleted) {
                const parent = await this.activityRepo.findOneBy({
                    id: activity.parentActivity.id,
                });
                if (parent && parent.status !== StatusEnum.COMPLETED) {
                    parent.status = StatusEnum.COMPLETED;
                    await this.activityRepo.save(parent);
                }
            }
        }

        return activity;
    }
}
