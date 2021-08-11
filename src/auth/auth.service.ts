import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { messages } from 'src/app/common/messages';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    user['accessToken'] = this.createToken({ id: user.id });

    return user;
  }

  async loginUser({ email, password }) {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new NotFoundException(messages.USER_NOT_FOUND);

    const isPasswordMatch = await user.validatePassword(password);

    if (!isPasswordMatch)
      throw new BadRequestException(messages.BAD_LOGIN_REQUEST);

    user['accessToken'] = this.createToken({ id: user.id });

    return user;
  }

  createToken(payload) {
    return this.jwtService.sign(payload);
  }
}
