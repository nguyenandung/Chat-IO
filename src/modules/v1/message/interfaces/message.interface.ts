import { BaseModel } from 'src/shared/interface/base.interface';

export interface Message extends BaseModel {
  content: string;
}
