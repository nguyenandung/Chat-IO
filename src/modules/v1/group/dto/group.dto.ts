import { BaseDto } from 'src/shared/dto/base.dto';
import { Group } from '../interfaces/group.interface';
import { Message } from '../../message/interfaces/message.interface';
import { User } from '../../user/interface/user.interface';
import { IsString } from 'class-validator';

export class GroupDto extends BaseDto implements Group {
  @IsString()
  name: string;
}
