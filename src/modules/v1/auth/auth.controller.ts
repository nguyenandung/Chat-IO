import { Body, Controller, Post } from '@nestjs/common';
import { ApiPublic } from 'src/core/decorators/authentication.decorator';
import { AuthService } from './auth.service';
import { SigninWithCredentialsRequestDto } from './dto/requests/signin-with-credentials.dto';
import { SigninWithCredentialsResponseDto } from './dto/responses/signin-with-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiPublic()
  @Post('signin-with-credentials')
  async signInWithCredentials(
    @Body() signinWithCredentialsRequestDto: SigninWithCredentialsRequestDto,
  ): Promise<SigninWithCredentialsResponseDto> {
    const { accessToken, refreshToken } =
      await this.authService.signInWithCredentials(
        signinWithCredentialsRequestDto,
      );

    return { accessToken, refreshToken };
  }
}
