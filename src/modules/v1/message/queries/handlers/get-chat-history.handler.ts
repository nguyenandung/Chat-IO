import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetChatHistoryQuery } from '../implementations/get-chat-history.query';
import { MessageService } from '../../message.service';
import { PaginationResult } from 'src/shared/interface/pagination.interface';
import { Message } from '../../interfaces/message.interface';

@QueryHandler(GetChatHistoryQuery)
export class GetChatHistoryHandler
  implements IQueryHandler<GetChatHistoryQuery>
{
  constructor(private readonly messageService: MessageService) {}

  async execute(
    query: GetChatHistoryQuery,
  ): Promise<PaginationResult<Message>> {
    const { groupId, pagination } = query;
    return this.messageService.getChatHistory({
      groupId,
      page: pagination?.page,
      perPage: pagination?.perPage,
      orderBys: pagination?.orderBys,
      orderKeys: pagination?.orderKeys,
    });
  }
}
