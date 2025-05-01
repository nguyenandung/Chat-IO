import { BaseDto } from 'src/shared/dto/base.dto';
import { User } from '../../interface/user.interface';
import { RoleCode } from 'src/config/enums';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { UserStatus } from '../../enums/user-status.enum';
import { USER_CONSTANT } from '../../constants/user.constant';

export class UserDto extends BaseDto implements User {
  @IsEnum(RoleCode)
  roleCode: RoleCode;

  @IsString()
  @Length(1, 255)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  fullName: string;

  @IsString()
  @Length(1, 255)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  username: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9\-\+]{9,15}$/g, {
    message: USER_CONSTANT.parameters.phoneNumber.invalid,
  })
  @IsPhoneNumber('VN', {
    message: USER_CONSTANT.parameters.phoneNumber.invalid,
  })
  @Length(1, 20)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  password?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  bio?: string;

  @IsOptional()
  @IsDate()
  passwordChangedAt?: Date;

  @IsOptional()
  @IsBoolean()
  isTwoFactorEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  isRememberSignIn?: boolean;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsString()
  twoFactorSecretEmail?: string;
}
