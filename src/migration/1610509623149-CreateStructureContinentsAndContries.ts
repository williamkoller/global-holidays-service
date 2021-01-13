import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateStructureContinentsAndContries1610509623149 implements MigrationInterface {
  name = 'CreateStructureContinentsAndContries1610509623149'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "countries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "capitalContry" character varying NOT NULL, "territorialExtension" integer NOT NULL, "localization" character varying NOT NULL, "language" character varying NOT NULL, "currency" character varying NOT NULL, "continent" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "continent" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "area" text NOT NULL, "population" text NOT NULL, "contries" text NOT NULL, "totalContries" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "contriesId" uuid, CONSTRAINT "PK_1d0d8f1398cdebe7f83068b269c" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "continent" ADD CONSTRAINT "FK_eb2bafca1b247e1829c5d17191b" FOREIGN KEY ("contriesId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "query-result-cache"`)
    await queryRunner.query(`ALTER TABLE "continent" DROP CONSTRAINT "FK_eb2bafca1b247e1829c5d17191b"`)
    await queryRunner.query(`DROP TABLE "continent"`)
    await queryRunner.query(`DROP TABLE "countries"`)
  }
}
