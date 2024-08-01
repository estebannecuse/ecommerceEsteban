import { MigrationInterface, QueryRunner } from "typeorm";

export class Prueba1721489010757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE 'prueba'")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE 'prueba'")
    }

}
