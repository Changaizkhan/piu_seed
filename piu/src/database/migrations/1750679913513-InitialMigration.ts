import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1750679913513 implements MigrationInterface {
    name = 'InitialMigration1750679913513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."activities_status_enum" RENAME TO "activities_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."activities_status_enum" AS ENUM('Completed', 'In Process', 'Not Started')`);
        await queryRunner.query(`ALTER TABLE "activities" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "activities" ALTER COLUMN "status" TYPE "public"."activities_status_enum" USING "status"::"text"::"public"."activities_status_enum"`);
        await queryRunner.query(`ALTER TABLE "activities" ALTER COLUMN "status" SET DEFAULT 'In Process'`);
        await queryRunner.query(`DROP TYPE "public"."activities_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."activities_status_enum_old" AS ENUM('Completed', 'In Process', 'Delayed', 'Not Started')`);
        await queryRunner.query(`ALTER TABLE "activities" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "activities" ALTER COLUMN "status" TYPE "public"."activities_status_enum_old" USING "status"::"text"::"public"."activities_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "activities" ALTER COLUMN "status" SET DEFAULT 'In Process'`);
        await queryRunner.query(`DROP TYPE "public"."activities_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."activities_status_enum_old" RENAME TO "activities_status_enum"`);
    }

}
