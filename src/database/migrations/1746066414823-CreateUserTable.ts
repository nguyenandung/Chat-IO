import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1746066414823 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "users_role_code_enum" AS ENUM('1', '2')`,
    );
    await queryRunner.query(
      `CREATE TYPE "users_status_enum" AS ENUM('1', '2')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "role_code" "users_role_code_enum" NOT NULL, "full_name" character varying(255) NOT NULL, "username" character varying(255) NOT NULL, "email" character varying(100), "phone_number" character varying(20), "password" character varying(255), "avatar_url" text, "bio" character varying(255), "password_changed_at" TIMESTAMP WITH TIME ZONE, "is_two_factor_enabled" boolean, "is_remember_sign_in" boolean, "status" "users_status_enum" NOT NULL DEFAULT '1', "two_factor_secret_email" character varying(255), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4c9cc87b3af04f8eed8bc046bc" ON "users" ("role_code") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_17d1817f241f10a3dbafb169fd" ON "users" ("phone_number") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3676155292d72c67cd4e090514" ON "users" ("status") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_3676155292d72c67cd4e090514"`);
    await queryRunner.query(`DROP INDEX "IDX_17d1817f241f10a3dbafb169fd"`);
    await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
    await queryRunner.query(`DROP INDEX "IDX_fe0bb3f6520ee0469504521e71"`);
    await queryRunner.query(`DROP INDEX "IDX_4c9cc87b3af04f8eed8bc046bc"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "users_status_enum"`);
    await queryRunner.query(`DROP TYPE "users_role_code_enum"`);
  }
}
