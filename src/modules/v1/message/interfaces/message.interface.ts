import { BaseModel } from 'src/shared/interface/base.interface';
import { User } from '../../user/interface/user.interface';
import { Group } from '../../group/interfaces/group.interface';

export interface Message extends BaseModel {
  content: string;
  sender: User;
  group: Group;
}
