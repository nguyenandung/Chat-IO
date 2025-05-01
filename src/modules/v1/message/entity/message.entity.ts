import { BaseEntity } from 'src/shared/entity/base.entity';
import { Message } from '../interfaces/message.interface';
import { UserEntity } from '../../user/entity/user.entity';
import { GroupEntity } from '../../group/entity/group.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('messages')
export class MessageEntity extends BaseEntity implements Message {
  @Column({ type: 'text' })
  content: string;
  @ManyToOne(() => UserEntity, (user) => user.messages)
  sender: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.messages)
  group: GroupEntity;
}
