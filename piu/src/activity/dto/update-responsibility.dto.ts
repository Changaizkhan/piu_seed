import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { ALLOWED_RESPONSIBILITIES } from '../../constants/allowed-responsibilities';

export class UpdateResponsibilityDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(ALLOWED_RESPONSIBILITIES, {
        message: 'Invalid responsibility. Only approved designations are allowed.',
    })
    responsibility!: string;
}
