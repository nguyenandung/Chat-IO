import { Repository } from 'typeorm';
import { Group } from '../interfaces/group.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from '../entity/group.entity';

@Injectable()
export class GroupRepository extends Repository<Group> {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly repository: Repository<Group>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
