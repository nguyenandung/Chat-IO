import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { SigninWithCredentialsRequestDto } from './dto/requests/signin-with-credentials.dto';
import { SigninWithCredentialsResponseDto } from './dto/responses/signin-with-credentials.dto';
import { log } from 'console';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async signInWithCredentials(
    signInWithCredentials: SigninWithCredentialsRequestDto,
  ): Promise<SigninWithCredentialsResponseDto> {
    const { username, password } = signInWithCredentials;
    const userByUsername = await this.userService.findOne({
      where: [{ username }, { email: username }, { phoneNumber: username }],
      select: ['id', 'password'],
    });
    if (!userByUsername)
      throw new UnauthorizedException('Your account is not registered');

    const isPasswordValid = await bcrypt.compare(
      password,
      userByUsername.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Password is incorrect');

    const payload = {
      id: userByUsername.id,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '5d',
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
