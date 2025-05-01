import { PaginationQuery } from 'src/shared/interface/pagination.interface';

export class GetChatHistoryQuery {
  constructor(
    public readonly groupId: number,
    public readonly pagination?: PaginationQuery,
  ) {}
}
