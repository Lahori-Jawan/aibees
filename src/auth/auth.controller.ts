import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '@src/user/dto/login-user.dto';
import { Public } from 'src/app/common/auth/public.meta';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Public()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create new user' })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  login(@Body() loginUserDto: LoginDto) {
    return this.authService.loginUser(loginUserDto);
  }
}
