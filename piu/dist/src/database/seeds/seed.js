"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../../../ormconfig");
const activity_entity_1 = require("../entities/activity.entity");
const status_enum_1 = require("../../common/enums/status.enum");
const dataSource = ormconfig_1.AppDataSource;
async function seed() {
    await dataSource.initialize();
    const activityRepo = dataSource.getRepository(activity_entity_1.Activity);
    // Activities
    const parentActivity = activityRepo.create({
        title: '1.1 PIU Establishment',
        status: status_enum_1.StatusEnum.IN_PROCESS,
        responsibility: 'DD(Civil)',
        timelineQuarters: ['2024-Q1', '2024-Q2'],
    });
    await activityRepo.save(parentActivity);
    const subActivities = [
        {
            title: '1.1.1 Recruit Key Staff',
            status: status_enum_1.StatusEnum.COMPLETED,
            responsibility: 'AD(SSG)',
            timelineQuarters: ['2024-Q1'],
        },
        {
            title: '1.1.2 Setup PIU Office',
            status: status_enum_1.StatusEnum.IN_PROCESS,
            responsibility: 'DD(E&T)',
            timelineQuarters: ['2024-Q2'],
        },
    ];
    for (const sub of subActivities) {
        const activity = activityRepo.create({
            ...sub,
            parentActivity,
        });
        await activityRepo.save(activity);
    }
    console.log('✅ Seeding complete.');
    process.exit(0);
}
seed().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});
