import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';
export class Users1733036774223 implements Seeder {
  track = true;

  public async run(dataSource: DataSource): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const hashedPassword = await bcrypt.hash('123456', 10);
      await queryRunner.query(
        `INSERT INTO users (role_code , full_name, username , email,phone_number , password) VALUES ('2', 'admin','admin', 'andungkoi@gmail.com','0867372693', '${hashedPassword}')`,
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      console.error('Error when seeding admin user:', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
