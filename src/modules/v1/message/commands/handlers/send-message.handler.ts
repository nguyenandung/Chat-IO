import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendMessageCommand } from '../implementations/send-message.command';
import { MessageService } from '../../message.service';
import { Message } from '../../interfaces/message.interface';

@CommandHandler(SendMessageCommand)
export class SendMessageHandler implements ICommandHandler<SendMessageCommand> {
  constructor(private readonly messageService: MessageService) {}

  async execute({
    userId,
    groupId,
    content,
  }: SendMessageCommand): Promise<Message> {
    return await this.messageService.sendMessage(userId, { groupId, content });
  }
}
