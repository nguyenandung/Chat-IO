import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { AbstractBaseListDto } from 'src/shared/interface/pagination.interface';

export class GetChatHistoryDto extends AbstractBaseListDto {
  @Type(() => Number)
  @IsNumber()
  groupId: number;
}
