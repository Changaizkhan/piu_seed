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
        try {
            const activity = this.activityRepo.create(dto);

            if (dto.parentActivityId) {
                const parent = await this.activityRepo.findOneBy({
                    id: dto.parentActivityId,
                });
                if (!parent) throw new NotFoundException('Parent activity not found');
                activity.parentActivity = parent;
            }

            return await this.activityRepo.save(activity);
        } catch (err) {
            console.error('Create activity failed:', err);
            throw new BadRequestException('Failed to create activity');
        }
    }

    async findAll() {
        try {
            return await this.activityRepo.find({
                where: { parentActivity: IsNull() },
                relations: ['subActivities'],
            });
        } catch (err) {
            console.error('Fetch all activities failed:', err);
            throw new BadRequestException('Failed to fetch activities');
        }
    }

    async findOne(id: number) {
        try {
            const activity = await this.activityRepo.findOne({
                where: { id },
                relations: ['subActivities', 'parentActivity'],
            });
            if (!activity) throw new NotFoundException('Activity not found');
            return activity;
        } catch (err) {
            console.error(`Fetch activity ${id} failed:`, err);
            if (err instanceof NotFoundException) throw err;
            throw new BadRequestException('Failed to fetch activity');
        }
    }

    async updateStatus(id: number, dto: UpdateStatusDto) {
        try {
            const activity = await this.activityRepo.findOne({
                where: { id },
                relations: ['subActivities', 'parentActivity'],
            });
            if (!activity) throw new NotFoundException('Activity not found');

            activity.status = dto.status;
            await this.activityRepo.save(activity);

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
        } catch (err) {
            console.error(`Update status for ${id} failed:`, err);
            if (err instanceof NotFoundException) throw err;
            throw new BadRequestException('Failed to update status');
        }
    }

    async updateCurrentStatus(id: number, currentStatus: string) {
        try {
            const activity = await this.activityRepo.findOneBy({ id });
            if (!activity) throw new NotFoundException('Activity not found');

            activity.currentStatus = currentStatus;
            await this.activityRepo.save(activity);
            return activity;
        } catch (err) {
            console.error(`Update current status for ${id} failed:`, err);
            if (err instanceof NotFoundException) throw err;
            throw new BadRequestException('Failed to update current status');
        }
    }

    async updateResponsibility(id: number, responsibility: string) {
        try {
            const activity = await this.activityRepo.findOne({ where: { id } });
            if (!activity) throw new NotFoundException('Activity not found');

            activity.responsibility = responsibility;
            return await this.activityRepo.save(activity);
        } catch (err) {
            console.error(`Update responsibility for ${id} failed:`, err);
            if (err instanceof NotFoundException) throw err;
            throw new BadRequestException('Failed to update responsibility');
        }
    }
}
