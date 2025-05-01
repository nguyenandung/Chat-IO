import { AbstractBaseListDto } from 'src/shared/interface/pagination.interface';
import { ListUsersInput } from '../../interface/list-users.interface';
import { RoleCode } from 'src/config/enums';
import { UserStatus } from '../../enums/user-status.enum';
import { IsArray, IsEnum, IsOptional } from 'class-validator';

export class ListUsersDto
  extends AbstractBaseListDto
  implements ListUsersInput
{
  @IsOptional()
  @IsArray()
  @IsEnum(RoleCode, { each: true })
  roleCodes?: RoleCode[];

  @IsOptional()
  @IsArray()
  @IsEnum(UserStatus, { each: true })
  statuses?: UserStatus[];
}
