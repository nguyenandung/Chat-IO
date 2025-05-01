import { BaseService } from 'src/shared/services/base.service';
import { User } from './interface/user.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { EntityManager, Not } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { USER_CONSTANT } from './constants/user.constant';
import { CreateUserDto } from './dto/requests/create-user.dto';
import { handleHashPassword } from 'src/shared/utils/security.util';
import { plainToInstance } from 'class-transformer';
import { CreateUserInput } from './interface/create-user.interface';
import { UpdateUserInput } from './interface/update-user.interface';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  public async mapDtoToEntity(
    userDto: CreateUserDto,
    options: { entityManager: EntityManager },
  ): Promise<UserEntity> {
    const { fullName, password, phoneNumber } = userDto || {};
    const { entityManager } = options;

    const username = await this.generateUsername(fullName, entityManager);

    if (password) {
      userDto.password = await handleHashPassword(password);
    }

    if (phoneNumber) {
      await this.validatePhoneNumber(
        { phoneNumber },
        { entityManager, isCreate: true },
      );
    }

    return {
      ...plainToInstance(UserEntity, {
        ...userDto,
        username,
      }),
      password: userDto.password,
    };
  }

  private async generateUsername(
    fullName: string,
    entityManager: EntityManager,
  ): Promise<string> {
    fullName = fullName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');

    const existingUser = await entityManager.getRepository(UserEntity).findOne({
      where: { fullName },
      select: ['id', 'username'],
      order: { createdAt: 'DESC' },
    });

    if (!existingUser) {
      return fullName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9- ]/, '');
    }

    const { username } = existingUser;
    const matchUsername = username.match(/-(\d+)$/);
    if (matchUsername) {
      const number = parseInt(matchUsername[1], 10);
      return username.replace(/-(\d+)$/, `-${number + 1}`);
    } else {
      return username + '-1';
    }
  }

  public async deleteOne(id: number): Promise<void> {
    const transactionManager = this.userRepository.manager;
    await transactionManager.transaction(async (transactionManager) => {
      await transactionManager.update(UserEntity, id, {
        deletedAt: new Date(),
      });
    });
  }

  public async updateOne(user: UpdateUserInput): Promise<void> {
    const { id, phoneNumber } = user;
    const transactionManager = this.userRepository.manager;
    await transactionManager.transaction(async (entityManager) => {
      await this.validateUser({ id, phoneNumber }, { entityManager });
      await entityManager.update(UserEntity, id, user);
    });
  }

  private async validateUser(
    user: Partial<Pick<User, 'id' | 'phoneNumber'>>,
    options: { entityManager: EntityManager },
  ): Promise<void> {
    await this.validatePhoneNumber(user, options);
  }

  public async validatePhoneNumber(
    user: Partial<Pick<User, 'id' | 'phoneNumber'>>,
    options: { entityManager: EntityManager; isCreate?: boolean },
  ): Promise<void> {
    const { id, phoneNumber } = user || {};
    const { entityManager, isCreate } = options || {};

    if (phoneNumber) {
      const usersByPhoneNumber = await entityManager
        .getRepository(UserEntity)
        .find({
          where: { phoneNumber, ...(id && !isCreate && { id: Not(id) }) },
          select: ['id'],
        });
      if (usersByPhoneNumber.length > 0) {
        throw new HttpException(
          {
            errorCode: USER_CONSTANT.parameters.phoneNumber.alreadyExists.code,
            message: USER_CONSTANT.parameters.phoneNumber.alreadyExists.message,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }

  public async createOne(user: CreateUserInput): Promise<void> {
    const transactionManager = this.userRepository.manager;
    return await transactionManager.transaction(async (entityManager) => {
      await entityManager.insert(
        UserEntity,
        await this.mapDtoToEntity(user, { entityManager }),
      );
    });
  }
}
