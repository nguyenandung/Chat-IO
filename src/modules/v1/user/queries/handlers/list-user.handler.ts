import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListUsersQuery } from '../implementations/list-users.query';
import { UserService } from '../../user.service';
import { PaginationResult } from 'src/shared/interface/pagination.interface';
import { User } from '../../interface/user.interface';
import { RoleCode } from 'src/config/enums';
import { SHARE_MODULE_CONSTANTS } from 'src/shared/constaints/shared.constant';
import { Brackets } from 'typeorm';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements IQueryHandler<ListUsersQuery> {
  constructor(private readonly userService: UserService) {}

  async execute({
    listUsersInput,
  }: ListUsersQuery): Promise<PaginationResult<User>> {
    const alias: string = 'u';
    const queryBuilder = this.userService.createQueryBuilder(alias);

    const {
      orderBys,
      orderKeys,
      page,
      perPage,
      search,
      roleCodes = [RoleCode.USER],
      statuses = [],
    } = listUsersInput || {};

    if (search) {
      const pattern = `%${search.replace(SHARE_MODULE_CONSTANTS.list.patternEscapedSearch, '\\$&')}%`;
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where(
            `unaccent(${alias}.fullName) ILIKE unaccent(:pattern) ESCAPE '\\'`,
            { pattern },
          )
            .orWhere(
              `unaccent(${alias}.username) ILIKE unaccent(:pattern) ESCAPE '\\'`,
              {
                pattern,
              },
            )
            .orWhere(
              `unaccent(${alias}.email) ILIKE unaccent(:pattern) ESCAPE '\\'`,
              { pattern },
            )
            .orWhere(
              `unaccent(${alias}.phoneNumber) ILIKE unaccent(:pattern) ESCAPE '\\'`,
              {
                pattern,
              },
            );
        }),
      );
    }

    if (roleCodes.length > 0) {
      queryBuilder.andWhere(`${alias}.roleCode IN(:...roleCodes)`, {
        roleCodes,
      });
    }

    if (statuses.length > 0) {
      queryBuilder.andWhere(`${alias}.status IN(:...statuses)`, {
        statuses,
      });
    }

    return await this.userService.paginate(queryBuilder, {
      alias,
      query: {
        page,
        perPage,
        orderBys,
        orderKeys,
      },
    });
  }
}
