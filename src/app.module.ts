import { Module } from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './modules/v1/auth/auth.module';
import { AuthGuard } from './core/guards/authentication.guard';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';

import { EventEmitterModule } from '@nestjs/event-emitter';

import { DatabaseModule } from './database/database.module';

import rootConfig from './config/index';

import { UserModule } from './modules/v1/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      load: rootConfig,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: parseInt(process.env.DB_PORT),
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_DATABASE,
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],

    //   logging: true,
    //   namingStrategy: new SnakeNamingStrategy(),
    // }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),

    UserModule,

    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
