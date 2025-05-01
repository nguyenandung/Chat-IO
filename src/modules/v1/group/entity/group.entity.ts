import { BaseEntity } from 'src/shared/entity/base.entity';
import { Group } from '../interfaces/group.interface';
import { UserEntity } from '../../user/entity/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MessageEntity } from '../../message/entity/message.entity';

@Entity('groups')
export class GroupEntity extends BaseEntity implements Group {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.groups)
  creator: UserEntity;

  @OneToMany(() => MessageEntity, (message) => message.group)
  messages: MessageEntity[];
}
