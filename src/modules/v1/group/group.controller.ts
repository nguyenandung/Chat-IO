import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiPublic,
  GetUserByRequest,
} from 'src/core/decorators/authentication.decorator';
import { CreateGroupDto } from './dto/create-group.dto';
import { CreateGroupCommand } from './commands';
import { GetGroupQuery } from './queries';

@Controller('/api/groups')
export class GroupController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @GetUserByRequest() { id }: { id: number },
    @Body() { name }: CreateGroupDto,
  ): Promise<void> {
    console.log('createGroupDto', name);
    return await this.commandBus.execute(new CreateGroupCommand(id, name));
  }

  @ApiPublic()
  @Get(':id')
  async getGroup(@Param('id') groupId: number): Promise<void> {
    return await this.queryBus.execute(new GetGroupQuery(groupId));
  }
}
