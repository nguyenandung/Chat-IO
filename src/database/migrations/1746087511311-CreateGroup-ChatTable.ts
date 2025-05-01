import { MigrationInterface, QueryRunner } from 'typeorm';

export class $MIGRATIONNAME1746087511311 implements MigrationInterface {
  name = ' $MIGRATIONNAME1746087511311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "groups" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying(255) NOT NULL, "creator_id" integer, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "messages" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "content" text NOT NULL, "sender_id" integer, "group_id" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ADD CONSTRAINT "FK_33b49cd404bac777f795028c3b0" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_22133395bd13b970ccd0c34ab22" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_d3607f0e3fc4217505168fc3932" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_d3607f0e3fc4217505168fc3932"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_22133395bd13b970ccd0c34ab22"`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" DROP CONSTRAINT "FK_33b49cd404bac777f795028c3b0"`,
    );
    await queryRunner.query(`DROP TABLE "messages"`);
    await queryRunner.query(`DROP TABLE "groups"`);
  }
}
