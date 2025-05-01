import { Column, Entity, Index, OneToMany } from 'typeorm';

import { RoleCode } from 'src/config/enums';
import { BaseEntity } from 'src/shared/entity/base.entity';
import { User } from '../interface/user.interface';
import { Exclude } from 'class-transformer';
import { UserStatus } from '../enums/user-status.enum';

import { MessageEntity } from '../../message/entity/message.entity';
import { GroupEntity } from '../../group/entity/group.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements User {
  @Column({ type: 'enum', enum: RoleCode })
  @Index()
  roleCode: RoleCode;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 255 })
  @Index()
  username: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Index()
  email: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @Index()
  phoneNumber: string | null;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string | null;

  @Column({ type: 'text', nullable: true })
  avatarUrl: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  bio: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  passwordChangedAt: Date | null;

  @Column({ type: 'bool', nullable: true })
  isTwoFactorEnabled: boolean | null;

  @Column({ type: 'bool', nullable: true })
  isRememberSignIn: boolean | null;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.USER_STATUS_ACTIVE,
  })
  @Index()
  status: UserStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  twoFactorSecretEmail: string | null;

  @OneToMany(() => MessageEntity, (message) => message.sender)
  messages?: MessageEntity[];
  @OneToMany(() => GroupEntity, (group) => group.creator)
  groups?: GroupEntity[];
}
