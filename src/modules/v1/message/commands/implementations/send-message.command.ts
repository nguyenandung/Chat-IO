import { ICommand } from '@nestjs/cqrs';

export class SendMessageCommand implements ICommand {
  constructor(
    public readonly userId: number,
    public readonly groupId: number,
    public readonly content: string,
  ) {}
}
