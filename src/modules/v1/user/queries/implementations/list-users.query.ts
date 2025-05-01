import { IQuery } from '@nestjs/cqrs';
import { ListUsersInput } from '../../interface/list-users.interface';

export class ListUsersQuery implements IQuery {
  constructor(public readonly listUsersInput: ListUsersInput) {}
}
