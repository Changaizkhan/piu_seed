import {
    Controller,
    Get,
    Post,
    Param,
    Patch,
    Body,
    ParseIntPipe,
    HttpCode,
    NotFoundException,
    BadRequestException,
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

@ApiTags('Activities')
@Controller('activities')
export class ActivityController {
    constructor(private readonly activityService: ActivityService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new activity' })
    @ApiResponse({ status: 201, description: 'Activity created successfully.' })
    async create(@Body() dto: CreateActivityDto) {
        try {
            return await this.activityService.create(dto);
        } catch (err) {
            console.error('Create activity failed:', err);
            throw new BadRequestException('Failed to create activity');
        }
    }

    @Get()
    @ApiOperation({ summary: 'Fetch all root-level activities' })
    @ApiResponse({ status: 200, description: 'Fetch all root activities.' })
    async findAll() {
        try {
            return await this.activityService.findAll();
        } catch (err) {
            console.error('Fetch all activities failed:', err);
            throw new BadRequestException('Failed to fetch activities');
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an activity by ID with its sub-activities' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: 200,
        description: 'Get a specific activity with its sub-activities.',
    })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.activityService.findOne(id);
        } catch (err) {
            console.error(`Find activity ${id} failed:`, err);
            if (err instanceof NotFoundException) throw err;
            throw new BadRequestException('Failed to fetch activity');
        }
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'Update the status of an activity' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: 200,
        description: 'Update the status of an activity.',
    })
    async updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateStatusDto,
    ) {
        try {
            return await this.activityService.updateStatus(id, dto);
        } catch (err) {
            console.error(`Update status for ${id} failed:`, err);
            if (err instanceof NotFoundException) throw err;
            throw new BadRequestException('Failed to update status');
        }
    }

    @Patch(':id/current-status')
    @ApiOperation({ summary: 'Update current status text of an activity' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Update the current status of an activity.' })
    async updateCurrentStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('currentStatus') currentStatus: string,
    ) {
        try {
            return await this.activityService.updateCurrentStatus(id, currentStatus);
        } catch (err) {
            console.error(`Update current status for ${id} failed:`, err);
            if (err instanceof NotFoundException) throw err;
            throw new BadRequestException('Failed to update current status');
        }
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
        try {
            return await this.activityService.updateResponsibility(id, body.responsibility);
        } catch (err) {
            console.error(`Update responsibility for ${id} failed:`, err);
            if (err instanceof NotFoundException) throw err;
            throw new BadRequestException('Failed to update responsibility');
        }
    }
}
