import { ICommand } from '@nestjs/cqrs';
import { CreateUserInput } from '../../interface/create-user.interface';

export class CreateUserCommand implements ICommand {
  constructor(public readonly createUserInput: CreateUserInput) {}
}
