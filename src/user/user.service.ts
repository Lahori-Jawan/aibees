import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { messages } from 'src/app/common/messages';
import { DUPLICATE_ERROR } from '@src/app/common/errorCodes';
import { ServerException } from '@src/app/common/exceptions/server';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let user: User;
    try {
      user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code == DUPLICATE_ERROR) {
        throw new ConflictException(messages.DUPLICATE_USER);
      }
      this.logger.error(JSON.stringify(error, null, 2));
      throw new ServerException();
    }

    return user;
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new BadRequestException(messages.USER_NOT_FOUND);
    }

    return user;
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  findAll() {
    return this.userRepository.find();
  }
}
