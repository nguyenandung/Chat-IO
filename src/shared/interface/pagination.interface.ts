import { Transform, Type } from 'class-transformer';
import {
  isArray,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export interface PaginationResult<T> {
  data: T[];
  meta?: {
    pagination: {
      currentPage: number;
      perPage: number;
      total: number;
      totalPages: number;
    };
  };
}

export enum OrderBy {
  ORDER_BY_ASC = 1,
  ORDER_BY_DESC = 2,
}

export class Order {
  @IsString()
  key: string;
  @IsEnum(OrderBy)
  by: OrderBy;
}

export type PaginationQuery = {
  page?: number;
  perPage?: number;
  search?: string;
  orderKeys?: string[];
  orderBys?: OrderBy[];
};

export type PaginationOptions = {
  alias?: string;
  query?: PaginationQuery;
};

export interface BaseListInput<T> extends PaginationQuery {
  fields: T;
}

export abstract class AbstractBaseListDto implements PaginationQuery {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  perPage?: number = 10;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (isArray(value) ? value : [value]))
  orderKeys?: string[];

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  search?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(OrderBy)
  @Type(() => Number)
  @Transform(({ value }) => (isArray(value) ? value : [value]))
  orderBys?: OrderBy[];
}
