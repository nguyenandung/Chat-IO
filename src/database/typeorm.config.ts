import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const postgresConfig = this.configService.get('database.pg');
    const entities: string[] = [
      join(process.cwd(), 'dist', 'modules', '**', '*.entity{.ts,.js}'),
    ];
    return {
      type: 'postgres',
      host: postgresConfig.host,
      port: Number(postgresConfig.port),
      username: postgresConfig.username,
      password: postgresConfig.password,
      database: postgresConfig.database,
      entities,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
