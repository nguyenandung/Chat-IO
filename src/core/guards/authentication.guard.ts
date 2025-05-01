import { UserService } from './../../modules/v1/user/user.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenByRequest(request);

    if (!accessToken) return false;

    let payload: { id: number };
    try {
      payload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });
    } catch (e) {
      return false;
    }
    const user = await this.userService.findOne({
      where: { id: payload.id },
      select: ['id'],
    });
    if (!user) return false;
    request.user = user;
    return true;
  }

  public extractTokenByRequest(request: Request): string | undefined {
    if (request.query?.accessToken) return request.query.accessToken as string;
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
