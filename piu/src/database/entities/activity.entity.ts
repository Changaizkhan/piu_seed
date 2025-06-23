// src/activity/entities/activity.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { StatusEnum } from '../../common/enums/status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('activities')
export class Activity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id!: number;

    @Column()
    @ApiProperty()
    title!: string;

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.IN_PROCESS,
    })
    @ApiProperty({ enum: StatusEnum })
    status!: StatusEnum;

    @Column({ nullable: true })
    @ApiPropertyOptional()
    responsibility!: string;

    @Column('text', { array: true, nullable: true })
    @ApiPropertyOptional({ type: [String] })
    timelineQuarters!: string[];

    @Column({ nullable: true })
    @ApiPropertyOptional()
    currentStatus?: string;

    @ManyToOne(() => Activity, (a) => a.subActivities, { nullable: true })
    @ApiPropertyOptional({ type: () => Activity })
    parentActivity?: Activity;

    @OneToMany(() => Activity, (a) => a.parentActivity, { cascade: true })
    @ApiPropertyOptional({ type: () => [Activity] })
    subActivities!: Activity[];
}
