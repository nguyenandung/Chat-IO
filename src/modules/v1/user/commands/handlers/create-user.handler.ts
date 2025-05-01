import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../implementations/create-user.command';
import { UserService } from '../../user.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userService: UserService) {}
  async execute({ createUserInput }: CreateUserCommand): Promise<void> {
    return await this.userService.createOne(createUserInput);
  }
}
