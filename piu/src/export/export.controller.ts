import { Controller, Get, Res } from '@nestjs/common';
import { ExportService } from './export.service';
import { Response } from 'express';

@Controller('export')
export class ExportController {
    constructor(private readonly exportService: ExportService) { }

    @Get('activities')
    async exportCsv(@Res() res: Response) {
        return this.exportService.streamActivitiesCsv(res);
    }
}
