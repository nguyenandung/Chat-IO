import { IQuery } from '@nestjs/cqrs';

export class GetGroupQuery implements IQuery {
  constructor(public readonly groupId: number) {}
}
