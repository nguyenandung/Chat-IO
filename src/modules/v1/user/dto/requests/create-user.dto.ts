import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { CreateUserInput } from '../../interface/create-user.interface';

export class CreateUserDto
  extends PickType(UserDto, [
    'roleCode',
    'fullName',
    'email',
    'phoneNumber',
    'password',
  ])
  implements CreateUserInput {}
