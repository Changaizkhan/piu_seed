import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { AppDataSource } from '../../../ormconfig';
import { Activity } from '../entities/activity.entity';
import { StatusEnum } from '../../common/enums/status.enum';

const dataSource = AppDataSource;

async function seed() {
  await dataSource.initialize();
  const activityRepo = dataSource.getRepository(Activity);

  // Activities
  const parentActivity = activityRepo.create({
    title: '1.1 PIU Establishment',
    status: StatusEnum.IN_PROCESS,
    responsibility: 'DD(Civil)',
    timelineQuarters: ['2024-Q1', '2024-Q2'],
  });
  await activityRepo.save(parentActivity);

  const subActivities = [
    {
      title: '1.1.1 Recruit Key Staff',
      status: StatusEnum.COMPLETED,
      responsibility: 'AD(SSG)',
      timelineQuarters: ['2024-Q1'],
    },
    {
      title: '1.1.2 Setup PIU Office',
      status: StatusEnum.IN_PROCESS,
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
