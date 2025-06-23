import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusEnum } from '../../common/enums/status.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateStatusDto {
    @ApiProperty({ enum: StatusEnum })
    @IsEnum(StatusEnum)
    status!: StatusEnum;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    currentStatus?: string;
}
