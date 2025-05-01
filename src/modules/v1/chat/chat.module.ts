import { Module } from '@nestjs/common';
import { MessageModule } from '../message/message.module';
import { ChatGateway } from './chat.gateway';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MessageModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '5d' },
    }),
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
