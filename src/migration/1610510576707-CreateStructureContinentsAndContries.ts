import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStructureContinentsAndContries1610510576707 implements MigrationInterface {
  name = 'CreateStructureContinentsAndContries1610510576707';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "countries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "capitalContry" character varying NOT NULL, "territorialExtension" integer NOT NULL, "localization" character varying NOT NULL, "language" character varying NOT NULL, "currency" character varying NOT NULL, "continent" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "continents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "area" jsonb NOT NULL, "population" jsonb NOT NULL, "contries" text NOT NULL, "totalContries" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "contriesId" uuid, CONSTRAINT "PK_d90f11072cee5e072115358a4b6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "continents" ADD CONSTRAINT "FK_7d75bc5a84b00b5082bdd3a1288" FOREIGN KEY ("contriesId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "query-result-cache"`);
    await queryRunner.query(`ALTER TABLE "continents" DROP CONSTRAINT "FK_7d75bc5a84b00b5082bdd3a1288"`);
    await queryRunner.query(`DROP TABLE "continents"`);
    await queryRunner.query(`DROP TABLE "countries"`);
  }
}
