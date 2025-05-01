import {
  FindOneOptions,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import {
  OrderBy,
  PaginationOptions,
  PaginationResult,
} from '../interface/pagination.interface';

export abstract class BaseService<T extends ObjectLiteral> {
  protected readonly repository: Repository<T>;
  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  public async find(params?: FindOneOptions<T>): Promise<T[]> {
    return await this.repository.find(params);
  }

  public async findOne(params?: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne(params);
  }

  public async findOneOrFail(params?: FindOneOptions<T>): Promise<T> {
    return await this.repository.findOneOrFail(params);
  }

  public createQueryBuilder(alias: string): SelectQueryBuilder<T> {
    return this.repository.createQueryBuilder(alias);
  }

  public async paginate<T>(
    builder: SelectQueryBuilder<T>,
    options?: PaginationOptions,
  ): Promise<PaginationResult<T>> {
    const {
      alias,
      query: { page = 1, perPage = 10, orderKeys = [], orderBys = [] },
    } = options;

    builder.andWhere(`${alias}.deletedAt IS NULL`);
    if (orderKeys.length && orderKeys.length === orderBys.length) {
      orderKeys.forEach((orderKey, index) => {
        const orderBy =
          orderBys[index] === OrderBy.ORDER_BY_ASC ? 'ASC' : 'DESC';
        if (
          Object.keys(this.repository.metadata.propertiesMap).includes(orderKey)
        ) {
          builder.orderBy(`${alias}.${orderKey}`, orderBy, 'NULLS LAST');
        }
      });
    }

    const skip = (page - 1) * perPage;
    const [data, total] = await builder
      .offset(skip)
      .limit(perPage)
      .getManyAndCount();

    const totalPages = Math.ceil(total / perPage);
    return {
      data,
      meta: {
        pagination: {
          total,
          totalPages,
          perPage,
          currentPage: page,
        },
      },
    };
  }
}
