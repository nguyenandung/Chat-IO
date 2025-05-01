import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SigninWithCredentialsRequestDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  isRemember?: boolean;
}
