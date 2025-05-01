import { BaseDto } from 'src/shared/dto/base.dto';
import { Message } from '../interfaces/message.interface';
import { IsString } from 'class-validator';

export class MessageDto extends BaseDto implements Message {
  @IsString()
  content: string;
}
