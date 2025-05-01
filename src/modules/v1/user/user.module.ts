import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';
import UserCommandHandlers from './commands';
import UserQueryHandlers from './queries';
import { UserController } from './user.controller';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity, UserRepository])],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService,
    ...UserCommandHandlers,
    ...UserQueryHandlers,
  ],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
