import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateGroupCommand } from '../implementations/create-group.command';
import { GroupService } from '../../group.service';
import { Group } from '../../interfaces/group.interface';

@CommandHandler(CreateGroupCommand)
export class CreateGroupHandler implements ICommandHandler<CreateGroupCommand> {
  constructor(private readonly groupService: GroupService) {}

  async execute({ name, userId }: CreateGroupCommand): Promise<Group> {
    return this.groupService.createGroup(userId, { name });
  }
}
