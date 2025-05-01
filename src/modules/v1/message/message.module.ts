import { GroupModule } from './../group/group.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entity/message.entity';
import { UserEntity } from '../user/entity/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { MessageService } from './message.service';
import MessageCommandHandler from './commands';
import MessageQueryHandler from './queries';
import { MessageRepository } from './repository/message.repository';
import { UserModule } from '../user/user.module';
import { MessageController } from './message.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity, UserEntity]),
    GroupModule,
    UserModule,
    CqrsModule,
  ],
  providers: [
    MessageRepository,
    MessageService,
    ...MessageCommandHandler,
    ...MessageQueryHandler,
  ],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
