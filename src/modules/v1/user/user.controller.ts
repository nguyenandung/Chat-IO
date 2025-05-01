import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from './dto/requests/create-user.dto';
import {
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
} from './commands';
import { ApiPublic } from 'src/core/decorators/authentication.decorator';
import { UpdateUserDto } from './dto/requests/update-user.dto';
import { User } from './interface/user.interface';
import { GetUserQuery, ListUsersQuery } from './queries';
import { PaginationResult } from 'src/shared/interface/pagination.interface';
import { ListUsersDto } from './dto/requests/list-users.dto';

@Controller('api/users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiPublic()
  @Post()
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return await this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  @ApiPublic()
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return await this.commandBus.execute(
      new UpdateUserCommand({ id, ...updateUserDto }),
    );
  }

  @ApiPublic()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async DeleteUserCommand(@Param('id') id: number): Promise<void> {
    return await this.commandBus.execute(new DeleteUserCommand({ id }));
  }
  @ApiPublic()
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return await this.queryBus.execute(new GetUserQuery(id));
  }

  @ApiPublic()
  @Get()
  async listUsers(
    @Query() params: ListUsersDto,
  ): Promise<PaginationResult<User>> {
    return await this.queryBus.execute(new ListUsersQuery(params));
  }
}
