import { BaseModel } from 'src/shared/interface/base.interface';
import { User } from '../../user/interface/user.interface';
import { Message } from '../../message/interfaces/message.interface';

export interface Group extends BaseModel {
  name: string;
  creator: User;
  messages: Message[];
}
