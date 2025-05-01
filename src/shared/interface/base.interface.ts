export interface BaseModel {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  page?: number;
  pageSize?: number;
}
