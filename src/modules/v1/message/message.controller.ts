import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiPublic,
  GetUserByRequest,
} from 'src/core/decorators/authentication.decorator';
import { SendMessageDto } from './dto/send-message.dto';
import { SendMessageCommand } from './commands';
import { GetChatHistoryDto } from './dto/get-chat-history.dto';
import { PaginationResult } from 'src/shared/interface/pagination.interface';
import { Message } from './interfaces/message.interface';
import { GetChatHistoryQuery } from './queries';

@Controller('/api/messages')
export class MessageController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async sendMessage(
    @GetUserByRequest() { id }: { id: number },
    @Body() { content, groupId }: SendMessageDto,
  ): Promise<void> {
    return await this.commandBus.execute(
      new SendMessageCommand(id, groupId, content),
    );
  }

  @ApiPublic()
  @Get()
  async getChatHistory(
    @Query() { groupId, page, perPage, orderBys, orderKeys }: GetChatHistoryDto,
  ): Promise<PaginationResult<Message>> {
    return this.queryBus.execute(
      new GetChatHistoryQuery(groupId, { page, perPage, orderBys, orderKeys }),
    );
  }
}
