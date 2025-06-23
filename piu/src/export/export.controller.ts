import { Controller, Get, Res } from '@nestjs/common';
import { ExportService } from './export.service';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Export')
@Controller('export')
export class ExportController {
    constructor(private readonly exportService: ExportService) { }

    @Get('activities')
    @ApiOperation({ summary: 'Download activities as CSV' })
    @ApiResponse({ status: 200, description: 'CSV file stream will download' })
    async exportCsv(@Res() res: Response) {
        return this.exportService.streamActivitiesCsv(res);
    }
}
