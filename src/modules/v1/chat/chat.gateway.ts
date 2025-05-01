import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../message/message.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('joinGroup')
  async handleJoinGroup(client: Socket, groupId: number) {
    client.join(`group_${groupId}`);
    client.emit('joinedGroup', `Joined group ${groupId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    client: Socket,
    payload: { groupId: number; content: string },
  ) {
    const userId = client['user'].sub;
    const message = await this.messageService.sendMessage(userId, {
      groupId: payload.groupId,
      content: payload.content,
    });
    this.server.to(`group_${payload.groupId}`).emit('newMessage', message);
  }
}
