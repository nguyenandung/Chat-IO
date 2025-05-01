import { ICommand } from '@nestjs/cqrs';
import { DeleteUserInput } from '../../interface/delete-user.interface';

export class DeleteUserCommand implements ICommand {
  constructor(public readonly deleteUserInput: DeleteUserInput) {}
}
