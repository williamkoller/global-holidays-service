import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUserTable1610077099484 implements MigrationInterface {
  name = 'CreateUserTable1610077099484'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await queryRunner.query(`CREATE TYPE "user_roles_enum" AS ENUM('system', 'admin')`)
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL DEFAULT 'system', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300) NOT NULL DEFAULT 'system', "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "roles" "user_roles_enum" array NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TYPE "user_roles_enum"`)
    await queryRunner.query('DROP EXTENSION "uuid-ossp";')
  }
}
