import { Group } from './../group/interfaces/group.interface';
import { BaseService } from 'src/shared/services/base.service';
import { MessageEntity } from './entity/message.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessageRepository } from './repository/message.repository';
import { UserRepository } from '../user/repository/user.repository';
import { GroupService } from '../group/group.service';
import { Message } from './interfaces/message.interface';
import { EntityManager } from 'typeorm';
import { SendMessageDto } from './dto/send-message.dto';
import { UserEntity } from '../user/entity/user.entity';
import { plainToInstance } from 'class-transformer';
import { PaginationResult } from 'src/shared/interface/pagination.interface';
import { GetChatHistoryDto } from './dto/get-chat-history.dto';

@Injectable()
export class MessageService extends BaseService<Message> {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
    private readonly groupService: GroupService,

    private readonly entityManager: EntityManager,
  ) {
    super(messageRepository);
  }

  async sendMessage(
    userId: number,
    sendMessageDto: SendMessageDto,
  ): Promise<Message> {
    return await this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const { content, groupId } = sendMessageDto;
        const user = await transactionalEntityManager.findOne(UserEntity, {
          where: { id: userId },
        });

        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const group = await this.groupService.getGroup(groupId);
        if (!group) {
          throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        }

        const message = plainToInstance(MessageEntity, {
          content: content,
          sender: user,
          group,
        });
        return transactionalEntityManager.save(MessageEntity, message);
      },
    );
  }

  async getChatHistory(
    dto: GetChatHistoryDto,
  ): Promise<PaginationResult<Message>> {
    const { groupId, page, perPage, orderBys, orderKeys } = dto;

    const group = await this.groupService.getGroup(groupId);
    if (!group) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    const builder = this.createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.group', 'group')
      .where('message.group_id = :groupId', { groupId })
      .andWhere('message.deletedAt IS NULL');

    return this.paginate(builder, {
      alias: 'message',
      query: { page, perPage, orderBys, orderKeys },
    });
  }
}
