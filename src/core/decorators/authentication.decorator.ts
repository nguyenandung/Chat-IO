import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

export const ApiPublic = () => SetMetadata('isPublic', true);

export const GetUserByRequest = createParamDecorator(
  (key: string, context: ExecutionContext): { id: string } => {
    const { user } = context.switchToHttp().getRequest();

    return key ? user?.[key] : user;
  },
);
