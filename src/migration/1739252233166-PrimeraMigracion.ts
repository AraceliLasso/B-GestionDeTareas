import { MigrationInterface, QueryRunner } from "typeorm";

export class PrimeraMigracion1739252233166 implements MigrationInterface {
    name = 'PrimeraMigracion1739252233166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credencial" DROP COLUMN "username"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credencial" ADD "username" character varying(50) NOT NULL`);
    }

}
