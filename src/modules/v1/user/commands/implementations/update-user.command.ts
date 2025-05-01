import { ICommand } from '@nestjs/cqrs';
import { UpdateUserInput } from '../../interface/update-user.interface';

export class UpdateUserCommand implements ICommand {
  constructor(public readonly updateUserInput: UpdateUserInput) {}
}
