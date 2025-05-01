import { ICommand } from '@nestjs/cqrs';

export class CreateGroupCommand implements ICommand {
  constructor(
    public readonly userId: number,
    public readonly name: string,
  ) {}
}
