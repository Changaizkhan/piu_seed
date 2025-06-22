import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsOptional,
    IsEnum,
    IsArray,
    IsNumber,
    ValidateIf,
} from 'class-validator';
import { StatusEnum } from '../../common/enums/status.enum';
import { TimelineQuarterEnum } from '../../common/enums/timeline-quarter.enum';

export class CreateActivityDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    @MaxLength(255, { message: 'Title must be at most 255 characters' })
    title!: string;

    @ApiPropertyOptional({ enum: StatusEnum })
    @IsOptional()
    @IsEnum(StatusEnum, {
        message: `Status must be one of: ${Object.values(StatusEnum).join(', ')}`,
    })
    status?: StatusEnum;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(255, { message: 'Responsibility must be at most 255 characters' })
    responsibility?: string;

    @ApiPropertyOptional({
        type: [String],
        enum: TimelineQuarterEnum,
        description: 'Allowed values: Q1-2025, Q2-2025, etc.',
    })
    @IsOptional()
    @IsArray()
    @IsEnum(TimelineQuarterEnum, {
        each: true,
        message: 'Each value must be a valid timeline quarter',
    })
    timelineQuarters?: TimelineQuarterEnum[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber({}, { message: 'parentActivityId must be a number' })
    @ValidateIf((o) => o.parentActivityId !== undefined)
    parentActivityId?: number;
}
