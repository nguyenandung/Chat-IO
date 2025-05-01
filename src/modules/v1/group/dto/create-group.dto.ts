import { PickType } from '@nestjs/mapped-types';
import { CreateGroupInput } from '../interfaces/create-group.interface';
import { GroupDto } from './group.dto';

export class CreateGroupDto
  extends PickType(GroupDto, ['name'])
  implements CreateGroupInput {}
