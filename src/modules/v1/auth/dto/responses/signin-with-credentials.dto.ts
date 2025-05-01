import { IsString } from 'class-validator';

export class SigninWithCredentialsResponseDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
