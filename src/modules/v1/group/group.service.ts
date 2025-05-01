import { BaseService } from 'src/shared/services/base.service';
import { Group } from './interfaces/group.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GroupRepository } from './repository/group.repository';
import { UserRepository } from '../user/repository/user.repository';
import { EntityManager } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UserEntity } from '../user/entity/user.entity';
import { GroupEntity } from './entity/group.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GroupService extends BaseService<Group> {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly userRepository: UserRepository,
    private readonly entityManager: EntityManager,
  ) {
    super(groupRepository);
  }

  async createGroup(
    userId: number,
    createGroupDto: CreateGroupDto,
  ): Promise<Group> {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const { name } = createGroupDto;
        const user = await transactionalEntityManager.findOne(UserEntity, {
          where: { id: userId },
        });

        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const existingGroup = await this.findOne({
          where: { name: name, deletedAt: null },
        });

        if (existingGroup) {
          throw new HttpException(
            'Group already exists',
            HttpStatus.BAD_REQUEST,
          );
        }

        const group = plainToInstance(GroupEntity, {
          ...createGroupDto,
          creator: user,
        });

        return await transactionalEntityManager.save(GroupEntity, group);
      },
    );
  }

  async getGroup(groupId: number): Promise<Group> {
    const group = await this.findOneOrFail({
      where: { id: groupId, deletedAt: null },
      relations: ['creator'],
    });
    return group as GroupEntity;
  }
}
