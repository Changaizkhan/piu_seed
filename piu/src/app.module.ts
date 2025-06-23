// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../ormconfig';
import { ActivityModule } from './activity/activity.module';
import { ExportModule } from './export/export.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    ActivityModule,
    ExportModule,
  ],
})
export class AppModule { }
