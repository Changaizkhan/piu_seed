import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Activity } from '../database/entities/activity.entity';
import * as fastCsv from 'fast-csv';
import { Response } from 'express';

@Injectable()
export class ExportService {
    constructor(
        @InjectRepository(Activity)
        private readonly activityRepo: Repository<Activity>,
    ) { }

    async streamActivitiesCsv(res: Response) {
        const parents = await this.activityRepo.find({
            where: { parentActivity: IsNull() },
            relations: ['subActivities'],
            order: { id: 'ASC' },
        });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="activities.csv"');

        const csvStream = fastCsv.format({ headers: true });
        csvStream.pipe(res);

        for (const parent of parents) {
            // Write parent
            csvStream.write({
                ID: parent.id,
                Title: parent.title,
                Status: parent.status,
                Responsibility: parent.responsibility,
                'Parent Activity ID': '',
                'Current Status': parent.currentStatus || '',
            });

            // Write sub-activities
            for (const sub of parent.subActivities) {
                csvStream.write({
                    ID: sub.id,
                    Title: `  ${sub.title}`,  // Indent for clarity
                    Status: sub.status,
                    Responsibility: sub.responsibility,
                    'Parent Activity ID': parent.id,
                    'Current Status': sub.currentStatus || '',
                });
            }
        }

        csvStream.end();
    }
}
