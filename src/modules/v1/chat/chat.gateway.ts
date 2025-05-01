import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { MessageService } from '../message/message.service';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' },
  allowEIO3: true,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.query.token as string;
    console.log('Client connected:', client.id, 'Token:', token);

    if (!token) {
      console.error('No token provided for client:', client.id);
      client.emit('error', { message: 'No token provided' });
      client.disconnect(true);
      return;
    }

    try {
      // Xác minh token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });
      console.log('Token verified, payload:', payload);

      // Kiểm tra user
      const user = await this.userService.findOne({
        where: { id: payload.id },
        select: ['id'],
      });
      if (!user) {
        console.error('User not found for id:', payload.id);
        client.emit('error', { message: 'User not found' });
        client.disconnect(true);
        return;
      }

      // Lưu user vào client
      client['user'] = user;
      console.log('Connection successful for user:', user.id);
    } catch (error) {
      console.error('Connection error:', error.message);
      client.emit('error', { message: 'Invalid token' });
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('joinGroup')
  async handleJoinGroup(client: Socket, groupId: number) {
    try {
      const user = client['user'];
      if (!user || !user.id) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      console.log('Join group:', groupId, 'User:', user.id);
      client.join(`group_${groupId}`);
      client.emit('joinedGroup', `Joined group ${groupId}`);
    } catch (error) {
      console.error('Error in joinGroup:', error.message);
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    client: Socket,
    payload: { groupId: number; content: string },
  ) {
    try {
      const user = client['user'];
      if (!user || !user.id) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      console.log('Send message:', payload, 'User:', user.id);
      const message = await this.messageService.sendMessage(user.id, {
        groupId: payload.groupId,
        content: payload.content,
      });
      this.server.to(`group_${payload.groupId}`).emit('newMessage', message);
    } catch (error) {
      console.error('Error in sendMessage:', error.message);
      client.emit('error', { message: error.message });
    }
  }
}
