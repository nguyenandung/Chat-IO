import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SeederOptions } from 'typeorm-extension';
import { databaseConfig } from 'src/config/database.config';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: databaseConfig.pg.host,
  port: Number(databaseConfig.pg.port),
  username: databaseConfig.pg.username,
  password: databaseConfig.pg.password,
  database: databaseConfig.pg.database,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  seeds: ['src/database/seeds/**/*.ts'],
  seedTracking: true,
  factories: [],
  migrationsTableName: 'tbl_migrations',
  namingStrategy: new SnakeNamingStrategy(),
  seedTableName: 'tbl_seeds',
};

export const dataSource = new DataSource(options);

async () => {
  await dataSource.initialize();
};
