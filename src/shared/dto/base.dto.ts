import { BaseModel } from '../interface/base.interface';

export abstract class BaseDto implements BaseModel {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
