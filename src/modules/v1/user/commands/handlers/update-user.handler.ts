import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../implementations/update-user.command';
import { UserService } from '../../user.service';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userService: UserService) {}
  async execute({ updateUserInput }: UpdateUserCommand): Promise<void> {
    return await this.userService.updateOne(updateUserInput);
  }
}
