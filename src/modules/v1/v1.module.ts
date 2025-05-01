import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { GroupModule } from './group/group.module';

export const v1Modules = [
  AuthModule,
  UserModule,
  ChatModule,
  MessageModule,
  GroupModule,
];

@Module({
  imports: [...v1Modules],
  exports: [...v1Modules],
})
export class V1Modules {}
