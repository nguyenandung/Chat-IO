import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { UpdateUserInput } from '../../interface/update-user.interface';

export class UpdateUserDto
  extends PartialType(OmitType(UserDto, ['id']))
  implements UpdateUserInput {}
