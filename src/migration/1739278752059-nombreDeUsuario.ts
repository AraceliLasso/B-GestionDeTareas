import { MigrationInterface, QueryRunner } from "typeorm";

export class NombreDeUsuario1739278752059 implements MigrationInterface {
    name = 'NombreDeUsuario1739278752059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credencial" ADD "nombreDeUsuario" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credencial" DROP COLUMN "nombreDeUsuario"`);
    }

}
