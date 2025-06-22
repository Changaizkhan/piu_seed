// src/activity/activity.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from '../database/entities/activity.entity';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Activity])],
    controllers: [ActivityController],
    providers: [ActivityService],
})
export class ActivityModule { }
