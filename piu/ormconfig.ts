// ormconfig.ts or wherever AppDataSource is defined
import { DataSource } from 'typeorm';
import { Activity } from './src/database/entities/activity.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'educational',
  synchronize: false,
  logging: false,
  entities: [
    Activity,
  ],
  // migrations: ['src/database/migrations/*.ts'],
  migrations: ['dist/database/migrations/*.js'],
});
