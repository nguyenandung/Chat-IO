import { RoleCode } from 'src/config/enums';
import { PaginationQuery } from 'src/shared/interface/pagination.interface';
import { UserStatus } from '../enums/user-status.enum';

export interface ListUsersInput extends PaginationQuery {
  roleCodes?: RoleCode[];
  statuses?: UserStatus[];
}
