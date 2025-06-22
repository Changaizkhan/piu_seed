import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '../../common/enums/status.enum';
import { IsEnum } from 'class-validator';

export class UpdateStatusDto {
    @ApiProperty({ enum: StatusEnum })
    @IsEnum(StatusEnum)
    status!: StatusEnum;
}
