import { IsNumber } from 'class-validator';
import { DeleteUserInput } from '../../interface/delete-user.interface';

export class DeleteUserRequestDto implements DeleteUserInput {
  @IsNumber()
  id: number;
}
