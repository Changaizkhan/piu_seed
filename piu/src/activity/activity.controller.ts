// src/activity/activity.controller.ts
import {
    Controller,
    Get,
    Post,
    Param,
    Patch,
    Body,
    ParseIntPipe,
    HttpCode,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateResponsibilityDto } from './dto/update-responsibility.dto';
import {
    ApiTags,
    ApiResponse,
    ApiParam,
    ApiOperation,
    ApiBody
} from '@nestjs/swagger';

@ApiTags('activities')
@Controller('activities')
export class ActivityController {
    constructor(private readonly activityService: ActivityService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new activity' })
    @ApiResponse({ status: 201, description: 'Activity created successfully.' })
    create(@Body() dto: CreateActivityDto) {
        return this.activityService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Fetch all root-level activities' })
    @ApiResponse({ status: 200, description: 'Fetch all root activities.' })
    findAll() {
        return this.activityService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an activity by ID with its sub-activities' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: 200,
        description: 'Get a specific activity with its sub-activities.',
    })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.activityService.findOne(id);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'Update the status of an activity' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: 200,
        description: 'Update the status of an activity.',
    })
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateStatusDto,
    ) {
        return this.activityService.updateStatus(id, dto);
    }

    @Patch(':id/current-status')
    @ApiOperation({ summary: 'Update current status text of an activity' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Update the current status of an activity.' })
    updateCurrentStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('currentStatus') currentStatus: string,
    ) {
        return this.activityService.updateCurrentStatus(id, currentStatus);
    }

    @Patch(':id/responsibility')
    @HttpCode(200)
    @ApiOperation({ summary: 'Update Responsibility of Activity' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: UpdateResponsibilityDto })
    async updateResponsibility(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateResponsibilityDto,
    ) {
        return this.activityService.updateResponsibility(id, body.responsibility);
    }

}
