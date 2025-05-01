import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGroupQuery } from '../implementations/get-group.query';
import { GroupService } from '../../group.service';
import { Group } from '../../interfaces/group.interface';

@QueryHandler(GetGroupQuery)
export class GetGroupHandler implements IQueryHandler<GetGroupQuery> {
  constructor(private readonly groupService: GroupService) {}

  async execute({ groupId }: GetGroupQuery): Promise<Group> {
    return this.groupService.getGroup(groupId);
  }
}
