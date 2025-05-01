import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../interfaces/message.interface';
import { MessageEntity } from '../entity/message.entity';

@Injectable()
export class MessageRepository extends Repository<Message> {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<Message>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
