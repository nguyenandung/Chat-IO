import { Message } from './message.interface';

export type SendMessageInput = Pick<Message, 'content' | 'id'>;
