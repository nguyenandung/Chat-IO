import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './entity/group.entity';
import { UserEntity } from '../user/entity/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { GroupService } from './group.service';
import { GroupRepository } from './repository/group.repository';
import { UserModule } from '../user/user.module';
import GroupCommandHandler from './commands';
import GroupQueryHandler from './queries';
import { GroupController } from './group.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([GroupEntity, UserEntity]),
    UserModule,
    CqrsModule,
  ],
  controllers: [GroupController],
  providers: [
    GroupService,
    GroupRepository,
    ...GroupCommandHandler,
    ...GroupQueryHandler,
  ],
  exports: [GroupService],
})
export class GroupModule {}
