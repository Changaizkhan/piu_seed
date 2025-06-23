"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// ormconfig.ts or wherever AppDataSource is defined
const typeorm_1 = require("typeorm");
const activity_entity_1 = require("./src/database/entities/activity.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'educational',
    synchronize: false,
    logging: false,
    entities: [
        activity_entity_1.Activity,
    ],
    // migrations: ['src/database/migrations/*.ts'],
    migrations: ['dist/database/migrations/*.js'],
});
