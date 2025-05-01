import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../implementations/get-user.query';
import { UserService } from '../../user.service';
import { User } from '../../interface/user.interface';
import { RoleCode } from 'src/config/enums';
import { IsNull } from 'typeorm';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userService: UserService) {}

  async execute({ id }: GetUserQuery): Promise<User> {
    return await this.userService.findOneOrFail({
      where: { id, roleCode: RoleCode.USER, deletedAt: IsNull() },
    });
  }
}
