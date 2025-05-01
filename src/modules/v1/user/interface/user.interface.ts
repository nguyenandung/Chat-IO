import { RoleCode, SocialProfilePlatform } from 'src/config/enums';
import { BaseModel } from 'src/shared/interface/base.interface';
import { UserStatus } from '../enums/user-status.enum';
import { Message } from '../../message/interfaces/message.interface';
import { Group } from '../../group/interfaces/group.interface';

export interface User extends BaseModel {
  roleCode: RoleCode;
  fullName: string;
  username: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  avatarUrl?: string;
  bio?: string;
  passwordChangedAt?: Date;
  isTwoFactorEnabled?: boolean;
  isRememberSignIn?: boolean;
  status?: UserStatus;
  socialProfiles?: SocialProfilePlatform[];
  twoFactorSecretEmail?: string;
  messages?: Message[];
  groups?: Group[];
}
