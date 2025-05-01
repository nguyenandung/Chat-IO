import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../implementations/delete-user.command';
import { UserService } from '../../user.service';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userService: UserService) {}

  async execute({ deleteUserInput: { id } }: DeleteUserCommand): Promise<void> {
    return await this.userService.deleteOne(id);
  }
}
