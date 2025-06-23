
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';
import { Activity } from '../database/entities/activity.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Activity])],
    controllers: [ExportController],
    providers: [ExportService],
})
export class ExportModule { }